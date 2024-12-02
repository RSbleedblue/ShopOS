import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { RootState } from "@/redux/store";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import "react-resizable/css/styles.css";
import { deleteProduct } from "@/redux/Slice/productSlice";

interface Position {
  width: number;
  height: number;
}

const AssetEditor = () => {
  const dispatch = useDispatch();
  const { products, selectedImageIds } = useSelector((state: RootState) => state.product);
  const selectedImages = products.filter(product => selectedImageIds.includes(product.id));
  
  const [imageSizes, setImageSizes] = useState<Record<string, Position>>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onResize = (imageId: string, _: any, data: { size: { width: number; height: number } }) => {
    setImageSizes(prev => ({
      ...prev,
      [imageId]: {
        width: data.size.width,
        height: data.size.height
      }
    }));
  };

  const handleDelete = (imageId: string) => {
    dispatch(deleteProduct([imageId]));
  };

  return (
    <div 
      className="relative w-[30%] h-screen bg-dark border border-white border-opacity-10 asset-editor-container"
      // Added data attribute for testing
      data-testid="asset-editor-container"
    >
      <p className="p-2 text-gray-300 text-xl font-semibold">Asset Editor</p>
      {selectedImages.map((image) => (
        <Draggable key={image.id} bounds="parent" defaultPosition={{ x: 0, y: 0 }}>
          <div className="absolute cursor-move">
            <ResizableBox
              width={imageSizes[image.id]?.width || 200}
              height={imageSizes[image.id]?.height || 200}
              onResize={(e, data) => onResize(image.id, e, data)}
              minConstraints={[50, 50]}
              maxConstraints={[500, 500]}
              resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
              className="relative group"
            >
              <div className="w-full h-full relative">
                <img
                  src={image.previewUrl}
                  alt={`Image ${image.id}`}
                  className="w-full h-full object-contain"
                  draggable={false}
                />
                <div className="absolute inset-0 border-2 border-dashed border-blue-500 opacity-0 group-hover:opacity-100" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={() => handleDelete(image.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </ResizableBox>
          </div>
        </Draggable>
      ))}

      {selectedImages.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          Select images from the library to create your composition
        </div>
      )}
    </div>
  );
};

export default AssetEditor;