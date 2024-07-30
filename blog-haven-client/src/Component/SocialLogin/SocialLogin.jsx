import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";

const SocialLogin = () => {

    const { googleLogin, user } = useAuth();
    const userEmail = user?.email;
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogin();
            const isExistsUser = (result.user?.email === userEmail);
            if (isExistsUser) {
                toast.error("You have already logged!")
                return navigate(from, { replace: true });
            } else {
                toast.custom(
                    <div className="bg-gray-50 rounded-xl shadow-2xl p-4 flex flex-col items-center justify-center space-y-2 text-gray-700">
                        <PulseLoader />
                        <img className="rounded-full" src={result.user?.photoURL} alt="user" />
                        <h2 className="md:text-2xl text-xl font-semibold">Welcome!</h2>
                        <h2 className="md-text-xl font-semibold text-pink-800">Mr/Ms, {result.user?.displayName}!</h2>
                        <p>You have logged in successfully!</p>
                    </div>
                );
                navigate(from, { replace: true });
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error(error.message);
                navigate(from, { replace: true });
            }
        }
    };
    return (

        <div>
            <button
                onClick={handleGoogleLogin}
                className="outline text-gray-700 outline-white hover:outline-gray-500 outline-1 shadow-lg hover:bg-gray-200 hover:animate-pulse hover:text-black rounded-lg flex items-center justify-center gap-2 px-4 py-1 w-full dark:text-white  dark:bg-gray-700 dark:hover:bg-gray-800"><FcGoogle className="w-7 h-7"></FcGoogle>
                <p>Connect with Google</p>
            </button>
        </div>
    );
};

export default SocialLogin;