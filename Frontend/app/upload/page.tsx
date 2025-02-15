"use client";  // Mark this component as a client-side component

import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Button } from "react-day-picker";

export default function UploadPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null); // To store captured image
  const videoRef = useRef<HTMLVideoElement>(null); // Reference to the video element
  const [isCameraStarted, setIsCameraStarted] = useState(false); // Track if the camera is started
  const [isCaptured, setIsCaptured] = useState(false); // Track if an image is captured

  // Handle file selection (image upload)
  const handleFileSelect = (event: { target: { files: any; }; }) => {
    const files = event.target.files;
    if (files.length > 0) {
      console.log("Selected files:", files);
      // You can perform further actions like uploading the selected files
      setImageUrl(URL.createObjectURL(files[0])); // Show uploaded image
      setIsCaptured(true); // Mark as captured
    }
  };

  // Start camera feed
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();  // Ensure video starts playing
      }
      setIsCameraStarted(true);
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  // Capture image from camera
  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const video = videoRef.current;
    if (video && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setImageUrl(dataUrl); // Set the captured image URL
      setIsCaptured(true); // Mark as captured
    }
  };

  // Clean up the camera stream when the component is unmounted
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // Stop the tracks
      }
    };
  }, []);

  // Handle Done button click
  const handleDone = () => {
    alert("Image capture/upload is complete.");
    // Add logic for submitting the image or further steps here
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
              {/* File upload button */}
              {!isCaptured && (
                <>
                  <label
                    htmlFor="file-upload"
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer block text-center flex items-center justify-center"
                  >
                    Upload Image
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </>
              )}


              {/* Camera capture button */}
              {!isCameraStarted && !isCaptured && (
                <button
                  onClick={startCamera}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out"
                >
                  Start Camera
                </button>
              )}


              {/* Capture image button */}
              {!isCaptured && (
                <button
                  onClick={captureImage}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out"
                >
                  Capture Image
                </button>
              )}

              {/* Done button */}
              {isCaptured && (
                <button
                  onClick={handleDone}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out"
                >
                  Done
                </button>
              )}
            </div>

            {/* Show captured image */}
            {imageUrl && (
              <div className="mt-6 text-center">
                <h3 className="text-lg font-medium text-gray-800">Captured Image:</h3>
                <img src={imageUrl} alt="Captured" className="mt-4 rounded-lg max-w-full h-auto" />
              </div>
            )}

            {/* Video feed */}
            <div className="mt-6">
              {isCameraStarted && !isCaptured && (
                <video
                  ref={videoRef}
                  width="100%"
                  height="auto"
                  autoPlay
                  playsInline
                  className="border-2 border-gray-400 rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
