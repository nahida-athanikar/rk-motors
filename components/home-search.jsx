"use client";

import { Camera, Upload } from 'lucide-react';
import { Input } from './ui/input';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useFetch from '@/hooks/use-fetch';
import { processImageSearch } from '@/actions/home';

const HomeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [searchImage, setSearchImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  // Use the useFetch hook for image processing
  const {
    loading: isProcessing,
    fn: processImageFn,
    data: processResult,
    error: processError,
  } = useFetch(processImageSearch);

   const onDrop = acceptedFiles => {
      const file = acceptedFiles[0];

      if(file) {
        if(file.size > 10 * 1024 * 1024) {
          toast.error("Image size must be less than 10MB");
          return;
        }

        setIsUploading(true);
        setSearchImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setIsUploading(false);
          toast.success("Image uploaded successfully");
        };

        reader.onerror = () => {
          setIsUploading(false);
          toast.error("Failed to read the image");
        };

        reader.readAsDataURL(file);
      }
  }; 

  const {getRootProps, getInputProps, isDragActive, isDragReject} = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });


  // ✅ Define the submit handler
  const handleTextSubmit = async(e) => {
    e.preventDefault(); // prevents page reload
    if(!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleImageSearch = async(e) => {
    e.preventDefault();

    if(!searchImage) {
      toast.error("Please upload an image first");
      return;
    }

    // Add AI logic
    await processImageFn(searchImage);
    
  };

  useEffect(() => {
    if (processError) {
      toast.error(
        "Failed to analyze image: " + (processError.message || "Unknown error")
      );
    }
  }, [processError]);

   // Handle process result and errors with useEffect
  useEffect(() => {
    if (processResult?.success) {
      const params = new URLSearchParams();

      // Add extracted params to the search
      if (processResult.data.make) params.set("make", processResult.data.make);
      if (processResult.data.bodyType)
        params.set("bodyType", processResult.data.bodyType);
      if (processResult.data.color)
        params.set("color", processResult.data.color);

      // Redirect to search results
      router.push(`/cars?${params.toString()}`);
    }
  }, [processResult, router]);



 return (
  <div className="mt-4 px-2 sm:px-4">
    {/* 🔍 Text Search Form */}
    <form onSubmit={handleTextSubmit}>
      <div className="relative flex items-center bg-white rounded-full shadow-lg border border-gray-200 py-2 px-4">
        
        <Camera
          size={30}
          onClick={() => setIsImageSearchActive(!isImageSearchActive)}
          className={`p-0.5 cursor-pointer rounded-full transition ${
            isImageSearchActive
              ? "bg-[#00A7FF] text-white animate-pulse"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        />

        <Input
          type="text"
          placeholder="Search by Make, Model or try Image AI Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-none focus-visible:ring-0 shadow-none text-sm placeholder-gray-400 flex-1"
        />

        <Button
          type="submit"
          className="rounded-full px-5 py-5 text-sm font-semibold bg-black hover:bg-gray-800"
        >
          Search
        </Button>
      </div>
    </form>

    {/* 🖼️ Image Upload Section */}
    {isImageSearchActive && (
      <div className="mt-5 animate-slideDown">
        <form onSubmit={handleImageSearch}>
          <div className="p-6 text-center border-2 border-dashed border-grey-300 rounded-3xl 
bg-transparent backdrop-blur-md shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all">

            {imagePreview ? (
              <div className="flex flex-col items-center gap-3">
                <img
                  src={imagePreview}
                  alt="Car preview"
                  className="h-40 object-contain rounded-xl shadow-xl"
                />

                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full text-black border-white"
                  onClick={() => {
                    setSearchImage(null);
                    setImagePreview("");
                    toast.info("Image removed");
                  }}
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className="cursor-pointer flex flex-col items-center"
              >
                <input {...getInputProps()} />
                <Upload className="h-10 w-10 text-gray-300 mb-3" />
                <p className="text-gray-400 font-medium">
                  Drop car image or browse
                </p>
                <span className="text-xs text-gray-400 mt-1">
                  JPG / PNG (max 10MB)
                </span>
              </div>
            )}
          </div>

          {imagePreview && (
            <Button
  type="submit"
  className="w-full mt-3 rounded-full py-4 font-semibold 
  bg-gradient-to-r from-red-600 via-red-500 to-red-700 
  text-white shadow-[0_0_20px_rgba(255,0,0,0.35)] hover:opacity-90 transition"

              disabled={isUploading || isProcessing}
            >
              {isUploading
                ? "Uploading..."
                : isProcessing
                ? "Analyzing..."
                : "Search with Image"}
            </Button>
          )}
        </form>
      </div>
    )}
  </div>
);
}

export default HomeSearch;