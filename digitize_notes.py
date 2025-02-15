import openai
import cv2
import numpy as np
import base64
import os

# Set your OpenAI API key
client = openai.OpenAI(api_key="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")  # Updated syntax

# Ensure output directory exists for diagrams
output_dir = "extracted_diagrams"
os.makedirs(output_dir, exist_ok=True)

def encode_image(image_path):
    """Encodes an image as a Base64 string for OpenAI API."""
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode("utf-8")

def extract_text_openai(image_path):
    """Uses OpenAI's GPT-4o to extract and structure text from handwritten notes."""
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
    """Extracts diagrams from the image and saves them separately."""
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)

    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    saved_images = []

    count = 0
    for contour in contours:
        if cv2.contourArea(contour) > 1000:  # Filter small noise
            x, y, w, h = cv2.boundingRect(contour)
            cropped_img = img[y:y+h, x:x+w]  # Crop the diagram
            
            save_path = os.path.join(output_dir, f"diagram_{count}.png")
            cv2.imwrite(save_path, cropped_img)
            saved_images.append(save_path)
            count += 1

    return saved_images

def describe_diagrams(diagram_paths):
    """Uses GPT-4o to analyze and describe diagrams."""
    descriptions = {}
    for diagram_path in diagram_paths:
        base64_image = encode_image(diagram_path)

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Describe this diagram in detail."},
                        {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{base64_image}"}}
                    ]
                }
            ],
            max_tokens=500
        )

        descriptions[diagram_path] = response.choices[0].message.content

    return descriptions

# Main function to process handwritten notes
def digitize_notes(image_path):
    text = extract_text_openai(image_path)
    diagrams = extract_and_save_diagrams(image_path)
    
    # Donot use this below, it describes the shape not what the image is.    
    # diagram_descriptions = describe_diagrams(diagrams) 

    return text, diagrams

# Run digitization on an example image
image_path = 'test_image.png'
text, diagram_descriptions = digitize_notes(image_path)

def generate_pdf(output_pdf_path, text, diagram_paths):
    """Creates a PDF with extracted text and diagrams, handling text wrapping."""
    c = canvas.Canvas(output_pdf_path, pagesize=letter)
    width, height = letter  # Standard letter-size PDF

    # Set text properties
    c.setFont("Helvetica-Bold", 14)
    c.drawString(100, height - 50, "Digitized Notes")

    c.setFont("Helvetica", 12)
    text_width = 500  # Max width for text wrapping
    y_position = height - 80  # Start below the title

    # Wrap text into multiple lines
    wrapped_text = []
    for line in text.split("\n"):
        wrapped_text.extend(textwrap.wrap(line, width=80))  # Adjust width for wrapping

    for line in wrapped_text:
        if y_position < 50:  # If near the bottom, create a new page
            c.showPage()
            c.setFont("Helvetica", 12)
            y_position = height - 50
        c.drawString(50, y_position, line)
        y_position -= 15  # Move to the next line

    # Add diagrams
    if diagram_paths:
        c.showPage()  # Start a new page for diagrams
        c.setFont("Helvetica-Bold", 14)
        c.drawString(100, height - 50, "Extracted Diagrams")
        y_position = height - 150  # Adjust starting position

        for diagram_path in diagram_paths:
            if y_position < 100:  # If near the bottom, create a new page
                c.showPage()
                c.setFont("Helvetica-Bold", 14)
                c.drawString(100, height - 50, "Extracted Diagrams (cont.)")
                y_position = height - 150

            # Load and resize image to fit in PDF
            img = Image.open(diagram_path)
            img.thumbnail((400, 300))  # Resize to fit within the page
            
            img_width, img_height = img.size
            img_x = (width - img_width) / 2  # Center align image
            
            # Draw image on PDF
            c.drawInlineImage(diagram_path, img_x, y_position, width=img_width, height=img_height)
            y_position -= img_height + 20  # Move down for next image

    c.save()
    print(f"PDF saved at {output_pdf_path}")

output_pdf_path = "digitized_notes.pdf"
generate_pdf(output_pdf_path, text, diagram_descriptions)
