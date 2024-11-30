import { useState } from 'react';

const useGenerateImage = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const callApi = async (promptDetails: { product: string; background: string; placement: string; platform: string; }) => {
    const api_key = "uCvXEEnlB4wR8tjnWLX7s";
    const url = "https://api.flair.ai/generate-image/v1";

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
          seed: 42
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }

      const result = await response.json();
      setImages(result.images);
    } catch (error) {
      setError('There has been a problem with your fetch operation: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    callApi,
    loading,
    images,
    error
  };
};

export default useGenerateImage;
