"use client";  // Client-side component

import { useRouter } from "next/navigation";

export default function PdfPage() {
  const router = useRouter();

  // Handle Delete button click
  const handleDelete = () => {
    localStorage.removeItem("capturedImage"); 
    router.push("/upload"); // Redirect to the Upload page
  };


  const handleRetake = () => {
    router.push("/upload"); // Redirect to the Upload page
  };

  // Handle Download button click (you'll need a backend API for this)
  const handleDownload = () => {
    // You will need to generate the PDF on the backend and provide a download link.
    alert("PDF download functionality is not implemented yet.");
  };

  const capturedImage = localStorage.getItem("capturedImage");

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your PDF</h1>
      <div className="bg-white shadow-2xl rounded-lg p-8">
        <p className="text-lg text-gray-700 mb-6 text-center">
          Here is the PDF
        </p>

        {capturedImage && (
          <div className="text-center">
            <img src={capturedImage} alt="Captured" className="mt-4 rounded-lg max-w-full h-auto" />
          </div>
        )}

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            Delete
          </button>
          <button
            onClick={handleDownload}
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            Download
          </button>
          <button
            onClick={handleRetake}
            className="w-full bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out"
          >
            Retake
          </button>
        </div>
      </div>
    </div>
  );
}