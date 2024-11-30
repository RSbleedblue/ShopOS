import { useState } from "react";

interface ImagePreview {
  id: string;
  previewUrl: string;
}

const AddProduct = () => {
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImagePreviews: ImagePreview[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push({
          id: (Date.now() + i).toString(),
          previewUrl: reader.result as string, // Type assertion for the base64 string
        });
        if (newImagePreviews.length === files.length) {
          setImagePreviews((prev) => [...prev, ...newImagePreviews]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border border-white p-2 w-[40%] border-opacity-10">
      <h1 className="my-1 text-lg text-white">Add Products</h1>
      <p className="my-2 text-sm text-white">Products</p>
      <div className="flex items-center">
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-5 py-2 transition-all duration-300 border-2 border-white rounded-lg cursor-pointer hover:border-orange-400"
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
      {/* Display the image previews */}
      <div className="flex flex-wrap gap-3 mt-4">
        {imagePreviews.map((image) => (
          <div
            key={image.id}
            id={image.id}
            className="w-[100px] h-[100px] border-2 p-[2px] border-white relative rounded-md overflow-hidden"
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
