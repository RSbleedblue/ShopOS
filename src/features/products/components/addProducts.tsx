import React from "react";
import { addProduct, selectImage } from "@/redux/Slice/productSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux"; 

interface ImagePreview {
  id: string;
  previewUrl: string;
}

const AddProduct = () => {
  const dispatch = useDispatch();
  const storedProducts = useSelector((state: RootState) => state.product.products);
  const selectedImages = useSelector((state: RootState) => state.product.selectedImageIds);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImagePreview: ImagePreview = {
          id: `${Date.now()}-${index}`,
          previewUrl: reader.result as string, 
        };
        dispatch(addProduct(newImagePreview));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageClick = (imageId: string) => {
    dispatch(selectImage(imageId));
  };

  return (
    <div className="border border-white p-2 w-[40%] border-opacity-10">
      <h1 className="my-1 text-lg text-white">Add Products</h1>
      <p className="my-2 text-sm text-white">Products</p>
      <div className="flex items-center">
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-5 py-2 transition-all duration-300 border border-opacity-10 border-white rounded-lg cursor-pointer hover:border-orange"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-white">Upload Product Photo</span>
          <input
            id="file-upload"
            type="file"
            multiple
            className="absolute inset-0 w-12 h-12 opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-3 mt-4">
        {storedProducts.map((image) => (
          <div
            key={image.id}
            onClick={() => handleImageClick(image.id)}
            className={`w-[100px] h-[100px] border p-[2px] border-opacity-10 rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-all relative
              ${selectedImages.includes(image.id) 
                ? 'border-orange border-2' 
                : 'border-white hover:border-orange'
              }`}
          >
            <img
              src={image.previewUrl}
              alt={`preview-${image.id}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProduct;