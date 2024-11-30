import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGenerateImage from "../hooks/useGeneration";

const promptSchema = z.object({
  product: z.string().min(1, "Product is required."),
  background: z.string().min(1, "Background is required."),
  placement: z.string().min(1, "Placement is required."),
  platform: z.string().min(1, "Platform is required."),
  numberOfResults: z
    .number()
    .min(1, "Number of results must be at least 1")
    .optional(),
  referenceImage: z.string().optional(),
  correctColor: z.boolean().optional(),
  renderStrength: z.number().min(0).max(1).optional(),
  colorStrength: z.number().min(0).max(1).optional(),
});

const platforms = [
  "circular platform",
  "circular marble platform",
  "circular beige platform",
  "circular reflective platform",
  "circular glass platform",
  "smooth circular platform",
  "white plastic platform",
];

const backgrounds = [
  "a natural beige background",
  "lighthouse by the sea",
  "sunset in the mountains",
  "city skyline",
];

const placements = [
  "on",
  "standing on",
  "lying on",
  "balancing on",
];

const PromptBuilder = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      product: "shoe",
      background: "a natural beige background",
      placement: "on",
      platform: "circular platform",
      numberOfResults: 1,
      referenceImage: "",
      correctColor: false,
      renderStrength: 0.7,
      colorStrength: 0.7,
    },
  });

  const { callApi } = useGenerateImage();

  const onSubmit = (data: { product: string; background: string; placement: string; platform: string; }) => {
    const promptDetails = {
      product: data.product,
      background: data.background,
      placement: data.placement,
      platform: data.platform,
    };
    
    callApi(promptDetails);
  };

  const generatedPrompt = `${watch("product")}, \n${watch(
    "background"
  )}\n ${watch("placement")}\n${watch("platform")}`;

  return (
    <div className="w-[40%] border border-white border-opacity-10 text-gray-300 p-2">
      <h1 className="text-xl mb-4">Generate Photoshoot</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="rounded-md m-2 p-2 border border-white border-opacity-10 w-[95%]">
          <p className="text-sm text-gray-300 font-semibold">
            "{generatedPrompt}"
          </p>
        </div>

        <Button 
          type="submit" 
          className="p-2 w-[95%] bg-orange hover:bg-brick m-2"
        >
          GENERATE
        </Button>

        <p className="text-gray-300 m-2">
          Edit the prompt in the form below.
        </p>

        {/* Product */}
        <div className="flex flex-col m-2 gap-2">
          <label htmlFor="product" className="text-sm text-gray-500">
            Product
          </label>
          <Controller
            name="product"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={`w-full ${field.value ? 'border-orange-500' : ''}`}>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent className="bg-dark text-white">
                  <SelectItem value="shoe">Shoe</SelectItem>
                  <SelectItem value="watch">Watch</SelectItem>
                  <SelectItem value="bag">Bag</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.product && (
            <p className="text-red-500 text-xs mt-1">{errors.product.message}</p>
          )}
        </div>

        <div className="flex flex-col m-2 gap-2">
          <label htmlFor="background" className="text-sm text-gray-500">
            Background
          </label>
          <Controller
            name="background"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={`w-full ${field.value ? 'border-orange-500' : ''}`}>
                  <SelectValue placeholder="Select background" />
                </SelectTrigger>
                
                <SelectContent className="bg-dark text-white">
                  {backgrounds.map((background) => (
                    <SelectItem key={background} value={background}>
                      {background}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.background && (
            <p className="text-red-500 text-xs mt-1">{errors.background.message}</p>
          )}
        </div>

        {/* Placement */}
        <div className="flex flex-col m-2 gap-2">
          <label htmlFor="placement" className="text-sm text-gray-500">
            Placement
          </label>
          <Controller
            name="placement"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={`w-full ${field.value ? 'border-orange-500' : ''}`}>
                  <SelectValue placeholder="Select placement" />
                </SelectTrigger>
                
                <SelectContent className="bg-dark text-white">
                  {placements.map((placement) => (
                    <SelectItem key={placement} value={placement}>
                      {placement}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.placement && (
            <p className="text-red-500 text-xs mt-1">{errors.placement.message}</p>
          )}
        </div>

        {/* Platform */}
        <div className="flex flex-col m-2 gap-2">
          <label htmlFor="platform" className="text-sm text-gray-500">
            Platform
          </label>
          <Controller
            name="platform"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={`w-full ${field.value ? 'border-orange-500' : ''}`}>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                
                <SelectContent className="bg-dark text-white">
                  {platforms.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.platform && (
            <p className="text-red-500 text-xs mt-1">{errors.platform.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default PromptBuilder;