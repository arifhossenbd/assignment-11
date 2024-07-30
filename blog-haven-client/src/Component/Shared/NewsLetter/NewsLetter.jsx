import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const NewsLetter = () => {
  const { register, formState: { errors }, handleSubmit, reset, } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const newsletterData = {
        email: data?.email,
        date: new Date(),
      };
      const { data: newsletters } = await axiosSecure.get('/api/v1/newsletters');

      if (newsletters?.some(newsletter => newsletter?.email === data?.email)) {
        toast.error('You are already subscribed');
      } else {
        const newsletterRes = await axiosSecure.post('/api/v1/create-newsletter', newsletterData);
        if (newsletterRes.data.insertedId) {
          toast.custom(
            <div className="bg-gray-50 rounded-xl shadow-2xl p-4 space-y-2 text-gray-800">
                <div className="flex justify-center mx-auto"><PulseLoader /></div>
                <h2 className="md:text-2xl text-xl font-semibold">Good job!</h2>
                <p className="font-semibold">Thanks for subscribe our newsletters!</p>
            </div>
        );
        reset();
        }
      }
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  return (
    <div>
      <div className="">
        <section className="bg-white dark:bg-gray-800 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10">
            <Link to={`/blogs`} className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800">
              <span className="text-xs bg-gray-600 rounded-full text-white px-4 py-1.5 me-3">New</span> <span className="text-sm md:font-medium">Explore Diverse Perspectives with Our Blogs</span>
              <svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
            </Link>
            <h1 className="mb-4 text-sm md:text-xl font-semibold md:font-extrabold tracking-tight leading-none text-gray-700 lg:text-6xl dark:text-white">We invest in the world’s potential</h1>
            <p className="mb-8 text-sm md:text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">Dive into a world of diverse topics, ranging from technology and innovation to lifestyle, travel, and more. Join us on a journey of exploration and discovery through our blog posts.</p>
            <div className="w-full max-w-md md:max-w-lg mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="relative flex items-center justify-center">
                <div className="relative inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg className="w-5 absolute left-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input type="email" {...register("email", { required: "required", pattern: { value: /\S+@\S+\.\S+/, message: "Entered value does not match email format", }, })} name="email" className="block pl-10 py-2 md:py-4 w-full text-sm text-gray-700 border border-gray-300 rounded-lg bg-white focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Enter email..." required />
                {errors.email && <span className="text-red-600" role="alert">{errors.email.message}</span>}
                <div className="pt-1 md:pt-0">
                  <button type="submit" className="absolute text-white top-1 md:top-2 right-2 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm md:px-4 px-2 py-1 md:py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-900 w-full h-full top-0 left-0 z-0"></div>
        </section>
      </div>
    </div>
  );
};

export default NewsLetter;
