import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const OCRUploader = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);

      if (uploadedFile.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(uploadedFile));
      } else if (uploadedFile.type === "application/pdf") {
        setFilePreview(URL.createObjectURL(uploadedFile));
      }

      simulateAPICall(uploadedFile);
    }
  };

  const simulateAPICall = (uploadedFile) => {
    setLoading(true);
    setTimeout(() => {
      setExtractedText(
        `Simulated extracted text from "${uploadedFile.name}".\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.`
      );
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row font-inter bg-blue-50">
      <div className="w-full lg:w-1/2 h-full bg-white p-8 shadow-lg flex flex-col">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
          Upload & Preview
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Upload an image or PDF to preview and extract its text content.
        </p>

        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
            className="block w-full max-w-sm px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mt-6 flex-1">
          <h3 className="text-lg font-semibold text-gray-800">File Preview:</h3>
          <div className="mt-4 border border-gray-300 rounded-lg bg-gray-50 h-full overflow-auto flex items-center justify-center">
            {filePreview && file.type.startsWith("image/") ? (
              <img
                src={filePreview}
                alt="Uploaded"
                className="max-w-full max-h-full rounded-md shadow"
              />
            ) : filePreview && file.type === "application/pdf" ? (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={filePreview} />
              </Worker>
            ) : (
              <p className="text-gray-500 italic">No file preview available.</p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-full bg-gray-100 p-8 flex flex-col">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
          Extracted Text
        </h1>
        <div className="flex-1 border border-gray-300 rounded-lg bg-white overflow-auto p-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-blue-500 font-semibold">
                Extracting text...
              </p>
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mt-4"></div>
            </div>
          ) : extractedText ? (
            <textarea
              value={extractedText}
              readOnly
              className="w-full h-full text-sm bg-gray-50 border-none focus:outline-none resize-none p-3"
            />
          ) : (
            <p className="text-gray-500 italic text-center">
              Extracted text will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OCRUploader;
