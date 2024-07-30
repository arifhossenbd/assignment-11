
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const useImageUpload = () => {
    return image_hosting_api
};

export default useImageUpload;

