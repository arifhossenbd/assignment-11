import { useState, useEffect } from 'react';
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);

    document.documentElement.classList.toggle('dark');
  };

  return (
      <button
        onClick={toggleDarkMode}
      >
        {darkMode ? <MdOutlineLightMode className='md:size-8 size-6 text-white animate-spin' /> : <MdDarkMode className='md:size-8 size-6' />}
      </button>
  );
};

export default DarkMode;