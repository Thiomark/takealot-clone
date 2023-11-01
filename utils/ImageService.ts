const BASE_URLS = {
  CLOUDINARY: "",
  SUPABASE: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
};

const CURRENT_SERVICE = "SUPABASE"; // Change this to "CLOUDINARY" when you want to use Cloudinary

export const ImageService = {
  generateURL(imageName: string) {
    return `${BASE_URLS[CURRENT_SERVICE]}/${imageName}`;
  },
};
