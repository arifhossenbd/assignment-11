/* eslint-disable react/prop-types */
import { useState } from "react";
import { PropagateLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const LoadingButton = ({ onClick, btnLabel, className, type, to, ...props }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        try {
            setLoading(true);
            if (typeof onClick === 'function') {
                await onClick();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center item-center" {...props}>
            {loading ? (
                <PropagateLoader
                    color={'#A9A9A9'}
                    loading={loading}
                />
            ) : (
                <Link className={className} to={to}>
                    <button type={type} className="outline text-gray-700 outline-white hover:outline-gray-500 outline-1 shadow hover:bg-gray-300 hover:animate-pulse hover:text-black rounded-lg flex items-center justify-center gap-2 px-4 py-1 w-full dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-gray-200 dark:hover:text-white" onClick={handleClick} disabled={loading}>
                        {btnLabel}
                    </button>
                </Link>
            )}
        </div>
    );
};

export default LoadingButton;
