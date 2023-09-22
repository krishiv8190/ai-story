import React from "react";
import Typed from "react-typed";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div className="text-white">
            <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
                <h1 className="md:text-5xl sm:text-3xl text-2xl font-bold md:py-6">
                    Fueling Imagination Through AI-Generated Stories
                </h1>
                <div className="flex flex-col items-center">
                    <p className="md:text-3xl sm:text-2xl text-xl font-bold py-2">
                        Where Imagination Meets Creation: Tailored Tales in
                    </p>
                    <span className="md:text-3xl sm:text-3xl text-xl font-bold typed-text pb-4">
                        <Typed
                            strings={[
                                "Drama",
                                "Poetry",
                                "Funny",
                                "Horror",
                                "Thriller",
                                "Sci-Fi",
                                "Mystery",
                                "Fantasy",
                            ]}
                            typeSpeed={120}
                            backSpeed={140}
                            loop
                        />
                    </span>
                </div>
                <div>
                    <p className="md:text-2xl text-xl font-bold text-gray-500">
                        Explore Infinite Realms of Creativity with AI-Powered Stories!
                    </p>
                    <Link to="/prompt">
                    <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
                        Get Started
                    </button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
};

export default Hero;
