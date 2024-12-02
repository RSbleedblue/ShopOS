import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addGeneratedImage } from '@/redux/Slice/productSlice';
import html2canvas from 'html2canvas';

interface PromptDetails {
  product: string;
  background: string;
  placement: string;
  platform: string;
}

const useGenerateImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  
  // Get selected images from Redux store
  const selectedImages = useSelector((state: RootState) => 
    state.product.products.filter(p => state.product.selectedImageIds.includes(p.id))
  );

  const captureAssetEditorSnapshot = async (): Promise<string | null> => {
    const assetEditorElement = document.querySelector('.asset-editor-container') as HTMLElement;
    
    if (!assetEditorElement) {
      console.error('Asset editor container not found');
      return null;
    }

    try {
      const canvas = await html2canvas(assetEditorElement, {
        useCORS: true,
        scale: 1,
        logging: false,
        imageTimeout: 0
      });

      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Failed to capture asset editor snapshot:', error);
      return null;
    }
  };

  const callApi = async (promptDetails: PromptDetails) => {
    const api_key = "your_api_key_here";
    const url = "https://your-image-generation-api.com/generate";

    // Capture snapshot of current asset editor state
    const referenceSnapshot = await captureAssetEditorSnapshot();

    setLoading(true);
    setError('');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': api_key
        },
        body: JSON.stringify({
          pipeline_type: "default",
          prompt: `${promptDetails.product}, ${promptDetails.background}, ${promptDetails.placement}, ${promptDetails.platform}`,
          negative_prompt: "blurry, cropped, ugly, chaotic, random, colorful, cluttered, distorted, drawing, painting, graphic design, 3d rendering, fake, plastic",
          guidance_scale: 7.5,
          num_inference_steps: 25,
          width: 1024,
          height: 1024,
          seed: 42,
          reference_image: referenceSnapshot, // Include the captured snapshot
          reference_images: selectedImages.map(img => img.previewUrl) // Include selected images
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }

      const result = await response.json();
      
      // Dispatch generated images to Redux store
      result.images.forEach((imageUrl: string, index: number) => {
        dispatch(addGeneratedImage({
          id: `generated-${Date.now()}-${index}`,
          previewUrl: imageUrl,
          prompt: `${promptDetails.product}, ${promptDetails.background}, ${promptDetails.placement}, ${promptDetails.platform}`
        }));
      });

    } catch (error) {
      setError('There has been a problem with your fetch operation: ' + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    callApi,
    loading,
    error
  };
};

export default useGenerateImage;