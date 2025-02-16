"use client";  // Mark this component as a client-side component

import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";

export default function UploadPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: { target: { files: any } }) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      setImageUrl(URL.createObjectURL(file));
      setIsCaptured(true);
      uploadImage(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraStarted(true);
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const video = videoRef.current;
    if (video && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured_image.png", { type: "image/png" });
          setImageUrl(URL.createObjectURL(blob));
          setIsCaptured(true);
          uploadImage(file);
        }
      }, "image/png");
    }
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {  // ✅ Fix: Ensure trailing slash
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image. Status: ${response.status}`);
      }

      // ✅ Correctly handle PDF response
      const blob = await response.blob();
      const pdfUrl = window.URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);

      // ✅ Use a hidden <a> element to trigger the download
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.setAttribute("download", "digitized_notes.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      <Navbar />
      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Upload Your Note</h1>
          <div className="bg-white shadow-2xl rounded-lg p-8">
            <p className="text-lg text-gray-700 mb-6 text-center">
              Transform your handwritten notes into digital text with our advanced AI technology.
            </p>
            <div className="space-y-6">
              {!isCaptured && (
                <>
                  <label htmlFor="file-upload" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer">
                    Upload Image
                  </label>
                  <input id="file-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                </>
              )}

              {!isCameraStarted && !isCaptured && (
                <button onClick={startCamera} className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out">
                  Start Camera
                </button>
              )}

              {!isCaptured && (
                <button onClick={captureImage} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out">
                  Capture Image
                </button>
              )}

              {isUploading && <p className="text-center text-gray-600">Uploading and processing...</p>}

              {pdfUrl && (
                <div className="text-center mt-4">
                  <a href={pdfUrl} download="digitized_notes.pdf" className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition">
                    Download PDF
                  </a>
                </div>
              )}
            </div>

            {imageUrl && (
              <div className="mt-6 text-center">
                <h3 className="text-lg font-medium text-gray-800">Captured Image:</h3>
                <img src={imageUrl} alt="Captured" className="mt-4 rounded-lg max-w-full h-auto" />
              </div>
            )}

            <div className="mt-6">
              {isCameraStarted && !isCaptured && (
                <video ref={videoRef} width="100%" height="auto" autoPlay playsInline className="border-2 border-gray-400 rounded-lg" />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
