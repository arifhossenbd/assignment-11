import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoadingButton from "../../Component/LoadingButton/LoadingButton";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import SocialLogin from "../../Component/SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import { motion } from "framer-motion";

const Login = () => {

    const { login, user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (data) => {
        try {
            const result = await login(data?.email, data?.password);
            const loggedUser = result?.user;
            if (loggedUser?.email === user?.email) {
                toast.error("You are already logged in.");
                return
            } else {
                toast.custom(
                    <div className="bg-gray-50 rounded-xl shadow-2xl p-4 space-y-2 text-gray-700">
                        <div className="flex justify-center mx-auto"><PulseLoader /></div>
                        <h2 className="md:text-2xl text-xl font-semibold">Welcome!</h2>
                        <h2 className="md:text-xl font-semibold text-pink-800">Dear {loggedUser?.displayName}</h2>
                        <p>You have logged in successfully!</p>
                    </div>
                );
                reset();
                navigate(from, { replace: true });
            }
        } catch (error) {
            toast.error("Apologies, it appears you haven't registered. Please sign up to continue. Thank you.", error.message);
            navigate("/login");
            
        }
    };

    return (
        <div className="dark:bg-gray-900">
            <Helmet>
                <title>Blog Haven | Login</title>
            </Helmet>
            <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="flex mx-auto h-screen items-center justify-center">
                <motion.form
                    initial={{ y: -1000 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                    onSubmit={handleSubmit(handleLogin)} className="space-y-1 bg-gray-300 dark:bg-gray-800 rounded-xl md:py-8 py-6 px-4 md:px-8 w-[320px] md:w-[480px] lg:w-[480px] xl:[520px]">
                    <div className="flex flex-col items-center gap-4">
                        <Link to="/"><button className="outline text-gray-700 outline-white hover:outline-gray-500 outline-1 shadow-lg hover:bg-gray-200 hover:animate-pulse hover:text-black rounded-lg flex items-center justify-center gap-2 px-4 py-1 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-800">Go Back Home</button></Link>
                        <h1 className="md:text-2xl text-xl md:font-bold font-semibold text-center text-gray-500 dark:text-gray-300">Login now!</h1>
                    </div>
                    <div className="space-y-6 pt-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Your email</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" type="email" placeholder="Type your email" {...register("email", {
                                required: "required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Entered value does not match email format",
                                },
                            })} id="email" required />
                            {errors.email && <span className="text-red-600" role="alert">{errors.email.message}</span>}
                        </div>
                        <div className=" relative">
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Your password</label>
                            <input type={showPassword ? "text" : "password"}
                                placeholder="Password" {...register("password", {
                                    required: "required",
                                    minLength: {
                                        value: 8,
                                        message: "Min length is 8",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: "Must contain at least one number, one uppercase letter, one lowercase letter and special characters not separated by spaces",
                                    }
                                })}
                                name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                            <span
                                className="text-2xl text-black absolute top-9 md:ml-96 md:-mr-36 xl:ml-96 xl:-mr-24 ml-64"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                            </span>
                            {errors.password && <span className="text-red-600" role="alert">{errors.password.message}</span>}
                        </div>
                        <div>
                            <LoadingButton onClick={handleSubmit(handleLogin)} className="md:text-lg font-medium text-gray-700 w-full"
                                btnLabel="Login"
                            />
                        </div>
                        <div className="text-gray-700 text-center w-full dark:text-white">
                            <div className="flex items-center justify-center gap-2">
                                <h2 className="text-sm md:text-base">Are you new here?</h2>
                                <div id="link"><Link className="link-hover hover:font-semibold hover:text-gray-600 dark:text-white dark:hover:text-blue-400 text-sm md:text-base" to="/registration">Go to Registration</Link></div>
                            </div>
                            <div className="flex items-center justify-center mx-auto pb-4 gap-2">
                                <hr className="flex-grow border-t-2 border-gray-500 mx-auto" />
                                Or sign in with
                                <hr className="flex-grow border-t-2 border-gray-500 mx-auto" />
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                    <SocialLogin />
                </motion.form>
            </motion.div>
        </div>
    );
};

export default Login;
