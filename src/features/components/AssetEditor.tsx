import React, { useState } from "react";
import Draggable from "react-draggable"; 
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css"; 

const AssetEditor = () => {
  const [userImageUrl, setUserImageUrl] = useState("https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg?semt=ais_hybrid"); // URL for user's uploaded image
  const [generatedImageUrl, setGeneratedImageUrl] = useState(""); 

  return (
    <div className="w-full min-h-screen border border-white border-opacity-10 text-white flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl" style={{ minHeight: "400px" }}>
        {/* Draggable and Resizable Left Section */}
        <Draggable bounds="parent">
          <div className="absolute">
            <ResizableBox
              width={300}
              height={300}
              minConstraints={[200, 200]}
              maxConstraints={[500, 500]}
              resizeHandles={["se", "ne", "nw", "sw"]}
              className="border-2 border-green-500 relative flex items-center justify-center p-4 bg-black"
            >
              {userImageUrl ? (
                <img
                  src={userImageUrl}
                  alt="User Uploaded"
                  className="w-full h-auto object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-green-400 text-lg font-medium">
                    Place your product and props here
                  </p>
                </div>
              )}
            </ResizableBox>
          </div>
        </Draggable>

        {/* Draggable and Resizable Right Section */}
        <Draggable bounds="parent">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <ResizableBox
              width={300}
              height={300}
              minConstraints={[200, 200]}
              maxConstraints={[500, 500]}
              resizeHandles={["se", "ne", "nw", "sw"]}
              className="border-2 border-green-500 relative flex items-center justify-center p-4 bg-[#001800]"
            >
              {generatedImageUrl ? (
                <img
                  src={generatedImageUrl}
                  alt="Generated"
                  className="w-full h-auto object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-green-400 text-lg font-medium">
                    Generated images will appear here
                  </p>
                  <p className="text-green-400 text-sm mt-2">
                    Click the "Generate" button.
                  </p>
                </div>
              )}
            </ResizableBox>
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default AssetEditor;
