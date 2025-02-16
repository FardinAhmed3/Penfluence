"use client"; // client-side component

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function UploadPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileSelect = (event: { target: { files: any } }) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      setImageUrl(URL.createObjectURL(file));
      setIsCaptured(true);
      setPdfUrl(null);
      uploadImage(file);
    }
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://192.168.0.2:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image. Status: ${response.status}`);
      }

      const blob = await response.blob();
      setPdfUrl(window.URL.createObjectURL(blob));
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = () => {
    if (confirm("Are you sure you want to delete this image?")) {
      setImageUrl(null);
      setPdfUrl(null);
      setIsCaptured(false);
      router.push("/");
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
              Transform your handwritten notes into digital text with the power of AI.
            </p>
            <div className="space-y-6">
              {!isCaptured && (
                <>
                  <label htmlFor="file-upload" className="w-full block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer text-center">
                    Upload Image
                  </label>
                  <input id="file-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                  <button
                    onClick={() => document.getElementById("mobile-camera")?.click()}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer text-center"
                  >
                    Capture Image
                  </button>
                  <input id="mobile-camera" type="file" accept="image/*" capture="environment" onChange={handleFileSelect} className="hidden" />
                </>
              )}
              {isCaptured && (
                <>
                  {imageUrl && (
                    <div className="mt-6 text-center">
                      <h3 className="text-lg font-medium text-gray-800">Captured Image:</h3>
                      <img src={imageUrl} alt="Captured" className="mt-4 rounded-lg max-w-full h-auto" />
                    </div>
                  )}
                  {isUploading && <p className="text-center text-gray-600">Uploading and processing...</p>}
                  <div className="flex space-x-4 mt-4">
                    <button onClick={deleteImage} className="flex-1 bg-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-red-700 transition">
                      Delete Image
                    </button>
                    <button
                      onClick={() => document.getElementById("mobile-retake")?.click()}
                      className="flex-1 bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition"
                    >
                      Retake Image
                    </button>
                    <input id="mobile-retake" type="file" accept="image/*" capture="environment" onChange={handleFileSelect} className="hidden" />
                    <label htmlFor="file-upload-2" className="flex-1 cursor-pointer bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition text-center">
                      Upload Another Image
                    </label>
                    <input id="file-upload-2" type="file" accept="image/*" capture="environment" onChange={handleFileSelect} className="hidden" />
                  </div>
                  {pdfUrl && (
                    <div className="text-center mt-4">
                      <a href={pdfUrl} download="digitized_notes.pdf" className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition">
                        Download PDF
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
