import { Helmet } from "react-helmet-async";
import Header from "../Header/Header";
import HeroSection from "../HeroSection/HeroSection";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{delay: 1.5, duration: 1.5}}
    >
      <Helmet>
        <title>Blog Haven | Home</title>
      </Helmet>
      <div className="space-y-12">
        <Header />
        <HeroSection />
      </div>
    </motion.div>
  );
};

export default Home;
