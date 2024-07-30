import { useScroll, motion } from "framer-motion";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useGet from "../../../Hooks/useGet";
import { useEffect, useState } from "react";
import { HashLoader, PulseLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import useImageUpload from "../../../Hooks/useImageUpload";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import LoadingButton from "../../../Component/LoadingButton/LoadingButton";

const UpdateBlog = () => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const imageUpload = useImageUpload();
    const [fileUrl, setFileUrl] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state || location?.pathname;
    const { scrollYProgress } = useScroll();
    const { id } = useParams();
    const { data, status, error, isLoading } = useGet(`/api/v1/blog/${id}`) || {};
    const [blog, setBlog] = useState([])
    useEffect(() => {
        if (data) {
            setBlog(data);
        }
    }, [data]);
    const { title, category, shortDesc, fullDesc, image, _id } = blog;

    if (isLoading) {
        return <HashLoader />;
    }
    if (status === 'error' && !blog || blog.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-screen mx-auto md:gap-5 gap-2">
                <h2>Blog currently not available</h2>
                {error && <p>{error.message}</p>}
                <Link className="px-4 py-2 bg-gray-400 hover:text-white hover:bg-gray-600 rounded-lg" to="/">Go Blogs Page</Link>
            </div>
        );
    }

    const onSubmit = async (data) => {
        try {
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(imageUpload, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });

            if (res?.data?.success) {
                const updateBlog = {
                    title: data?.title,
                    category: data?.category,
                    shortDesc: data?.shortDesc,
                    fullDesc: data?.fullDesc,
                    image: res?.data?.data?.display_url,
                    author: user?.displayName,
                    authorImg: user?.photoURL,
                    email: user?.email,
                    date: new Date(),
                };

                const blogRes = await axiosSecure.patch(`/api/v1/blog/${_id}`, updateBlog);

                if (blogRes.data.modifiedCount > 0) {
                    toast.custom(
                        <div className="bg-gray-50 rounded-xl shadow-2xl p-4 space-y-2 text-gray-700">
                            <div className="flex justify-center mx-auto"><PulseLoader /></div>
                            <h2 className="md:text-2xl text-xl font-semibold">Well done!</h2>
                            <h2 className="md-text-xl text-lg font-semibold text-pink-800">Mr/Ms, {user?.displayName}!</h2>
                            <h2 className="font-semibold">Your blog has been successfully updated.</h2>
                            <p>Thank you for your contribution!</p>
                        </div>
                    )
                }
                reset();
                navigate(from) || "/blogs";
            } else {
                console.error('ImgBB API Error:', res.data.error.message);
            }
        } catch (error) {
            console.error('Axios Error:', error.message);
        }
    };

    const handleFile = (event) => {
        const files = event?.target?.files;

        if (files.length > 0 && files[0].type.startsWith("image/")) {
            const url = URL.createObjectURL(files[0]);
            setFileUrl(url);
        } else {
            toast.error("Something went wrong")
        }
    };


    return (
        <div className="flex justify-center mx-auto my-5 px-4 md:px-0">
            <Helmet>
                <title>Blog Haven | Update</title>
            </Helmet>
            <motion.div
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="md:w-1/2 w-96 p-4 md:p-8 rounded-2xl shadow bg-gray-200 dark:bg-gray-800">
                <motion.div
                    initial={{ x: 1000 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 2, duration: 2 }}
                    className="flex flex-col items-center gap-5">
                    <Link to="/"><button className="outline text-gray-700 outline-white hover:outline-gray-500 outline-1 shadow-lg hover:bg-gray-200 hover:animate-pulse hover:text-black rounded-lg flex items-center justify-center gap-2 px-4 py-1  dark:text-white dark:bg-gray-700 dark:hover:bg-gray-800">Go Back Home</button></Link>
                    <h2 className="dark:text-gray-400 text-gray-500 md:text-lg xl:text-4xl font-semibold">
                        Update Blog
                    </h2>
                </motion.div>
                <motion.div
                    initial={{ y: 500 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 3, duration: 3 }}
                    className="h-fit mx-auto pt-4">
                    <form>
                        <div className="mb-6">
                            <label className="block mb-2 md:text-lg font-medium text-gray-900 dark:text-white">Title<span className="text-red-600">*</span></label>
                            <input defaultValue={title} {...register("title", { required: true })} name="title" type="text" placeholder="Title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {errors.title?.type === "required" && (
                                <p className="text-red-500" role="alert">Title is required</p>
                            )}
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an Category</label>
                            <select defaultValue={category} {...register("category", { required: true })} name="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a category</option>
                                <option value="Food">Food</option>
                                <option value="Health">Health</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Technology">Technology</option>
                                <option value="travel">Travel</option>
                            </select>
                            {errors.category?.type === "required" && (
                                <p className="text-red-500" role="alert">Category is required</p>
                            )}
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 md:text-lg font-medium text-gray-900 dark:text-white">Short Description<span className="text-red-600">*</span></label>
                            <textarea defaultValue={shortDesc} {...register("shortDesc", { required: true })} name="shortDesc" rows={3} type="text" placeholder="Short Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {errors.shortDesc?.type === "required" && (
                                <p className="text-red-500" role="alert">Short description is required</p>
                            )}
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 md:text-lg font-medium text-gray-900 dark:text-white">Full Description<span className="text-red-600">*</span></label>
                            <textarea defaultValue={fullDesc} {...register("fullDesc", { required: true })} name="fullDesc" rows={6} type="text" placeholder="Full Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {errors.fullDesc?.type === "required" && (
                                <p className="text-red-500" role="alert">Full description is required</p>
                            )}
                        </div>
                        <div className="space-y-5">
                            <div>
                                {
                                    fileUrl ? (
                                        <div>
                                            {fileUrl && (
                                                <div className="mt-2 h-80 rounded-lg overflow-hidden">
                                                    <img
                                                        src={fileUrl}
                                                        alt="Uploaded"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )
                                        :
                                        (
                                            <div>
                                                {image && (
                                                    <div className="mt-2 w-full rounded-lg overflow-hidden">
                                                        <img className="h-80 w-full"
                                                            src={image}
                                                            alt="Uploaded"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )
                                }
                            </div>
                            <input
                                type="file"
                                {...register("image", { required: true })}
                                name="image"
                                id="image"
                                accept="image/*"
                                onChange={handleFile} className="w-full rounded-lg bg-gray-300 outline text-gray-700 outline-white hover:outline-gray-500 outline-1" />
                            {errors.image && <span className="text-red-600">Image is required</span>}
                        </div>
                        <div className="pt-5">
                            <LoadingButton className={`w-full`} btnLabel={`Update Blog`} onClick={handleSubmit(onSubmit)} />
                        </div>
                    </form>
                </motion.div>
            </motion.div>
            <motion.div
                className="progress"
                style={{ scaleX: scrollYProgress }}
            />
        </div>
    );
};

export default UpdateBlog;