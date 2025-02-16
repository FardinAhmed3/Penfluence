from fastapi import APIRouter, File, UploadFile
from fastapi.responses import StreamingResponse
import openai
import cv2
import numpy as np
import base64
import os
from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import textwrap
from PIL import Image

# Set your OpenAI API key
client = openai.OpenAI(api_key="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")

# Initialize FastAPI Router
router = APIRouter()

# Ensure output directory exists for diagrams
output_dir = "extracted_diagrams"
os.makedirs(output_dir, exist_ok=True)

def encode_image(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode("utf-8")

def extract_text_openai(image_path):
    base64_image = encode_image(image_path)
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Extract and structure the handwritten text into readable notes."},
                    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{base64_image}"}}
                ]
            }
        ],
        max_tokens=1000
    )
    return response.choices[0].message.content

def extract_and_save_diagrams(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)

    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    saved_images = []

    count = 0
    for contour in contours:
        if cv2.contourArea(contour) > 1000:
            x, y, w, h = cv2.boundingRect(contour)
            cropped_img = img[y:y+h, x:x+w]
            save_path = os.path.join(output_dir, f"diagram_{count}.png")
            cv2.imwrite(save_path, cropped_img)
            saved_images.append(save_path)
            count += 1
    return saved_images

def generate_pdf(text, diagram_paths):
    pdf_buffer = BytesIO()
    c = canvas.Canvas(pdf_buffer, pagesize=letter)
    width, height = letter

    c.setFont("Helvetica-Bold", 14)
    c.drawString(100, height - 50, "Digitized Notes")

    c.setFont("Helvetica", 12)
    y_position = height - 80

    wrapped_text = []
    for line in text.split("\n"):
        wrapped_text.extend(textwrap.wrap(line, width=100))

    for line in wrapped_text:
        if y_position < 50:
            c.showPage()
            c.setFont("Helvetica", 12)
            y_position = height - 50
        c.drawString(50, y_position, line)
        y_position -= 15

    if diagram_paths:
        c.showPage()
        c.setFont("Helvetica-Bold", 14)
        c.drawString(100, height - 50, "Extracted Diagrams")
        img_width, img_height = 150, 150
        x_positions = [140, 310]
        y_position = height - 250
        images_on_page = 0

        for i, diagram_path in enumerate(diagram_paths):
            if images_on_page == 8:
                c.showPage()
                c.setFont("Helvetica-Bold", 14)
                c.drawString(100, height - 50, "Extracted Diagrams (cont.)")
                y_position = height - 150
                images_on_page = 0

            img_x = x_positions[i % 2]
            c.drawInlineImage(diagram_path, img_x, y_position, width=img_width, height=img_height)
            if i % 2 == 1:
                y_position -= img_height + 20
            images_on_page += 1

    c.save()
    pdf_buffer.seek(0)
    return pdf_buffer

@router.post("/", summary="Upload an image and receive a digitized PDF")
async def upload_image(file: UploadFile = File(...)):
    """
    Uploads an image file, processes it using OpenAI and OpenCV,
    and returns a digitized PDF containing structured text and extracted diagrams.
    """
    if not file:
        return {"error": "No file uploaded!"}

    # Save the uploaded file temporarily
    image_path = f"temp_{file.filename}"
    with open(image_path, "wb") as buffer:
        buffer.write(await file.read())

    # Process the image
    text = extract_text_openai(image_path)
    diagrams = extract_and_save_diagrams(image_path)
    pdf_buffer = generate_pdf(text, diagrams)

    # Cleanup temporary image file
    os.remove(image_path)

    return StreamingResponse(
        pdf_buffer, 
        media_type="application/pdf", 
        headers={"Content-Disposition": "attachment; filename=digitized_notes.pdf"}
    )
