import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="space-y-1 md:space-y-2 md:text-lg text-base dark:text-white">
            <div className="md:text-5xl text-2xl">Welcome to our Blog Haven!</div>
            <div className="md:pt-5 pt-3 md:text-xl">We are passionate about sharing our knowledge and insights on various topics related to <Link className="underline hover:font-semibold hover:text-blue-800" to="/blogs">Blogs</Link>.</div>
            <div>Our team consists of [mention the number of team members or key contributors] dedicated individuals who are experts in their respective fields.</div>
            <div>Feel free to explore our blog and discover helpful articles, tips, and resources to [mention the main goal or benefit for the readers].</div>
            <div>If you have any questions, suggestions, or collaboration opportunities, do not hesitate to <a href="/contact">contact us</a>.</div>
            <div className="text-lg">Thank you for visiting!</div>
        </div>
    );
};

export default About;
