import React, { useState, useEffect } from "react";
import axios from "axios";

const Upvoted = () => {
    const [likedStories, setLikedStories] = useState([]);
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (id) => {
        if (id === activeAccordion) {
            setActiveAccordion(null);
        } else {
            setActiveAccordion(id);
        }
    };

    const removeFromUpvoted = (storyId) => {
        const url = process.env.REACT_APP_SERVER_URL
        axios
            .post(`${url}/story/deleteUpvotedStories`, {
                storyId,
            })
            .then(() => {
                setLikedStories((prevStories) =>
                    prevStories.filter((story) => story.id !== storyId)
                );
            })
            .catch((error) => {
                console.error("Error removing story:", error);
            });
    };

    const upvoteStory = (id) => {
        console.log(id);
        const url = process.env.REACT_APP_SERVER_URL

        axios
            .post(`${url}/story/upvoteLeaderboard`, { id })
            .then(() => {
                console.log(id);
                // Update the upvotes count in the likedStories state
                setLikedStories((prevStories) =>
                    prevStories.map((story) =>
                        story.id === id
                            ? { ...story, upvotes: story.upvotes + 1 }
                            : story
                    )
                );
            })
            .catch((error) => {
                console.error("Error upvoting story:", error);
            });
    };

    useEffect(() => {
        const url = process.env.REACT_APP_SERVER_URL
        axios
            .post(`${url}/story/getUpvotedStories`)
            .then((response) => {
                setLikedStories(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <section className="p-5 sm:p-20 items-center relative text-white">
            <div className="p-8 container">
                <h2 className="text-4xl text-center font-semibold mb-10">
                    Upvoted Stories
                </h2>
                <div className="space-y-6 ">
                    {likedStories
                        .sort((a, b) => b.upvotes - a.upvotes) // Sort by upvotes in decreasing order
                        .map((story) => (
                            <div
                                key={story.id}
                                className="bg-[#323233] rounded-lg border-zinc-100 relative"
                            >
                                <button
                                    type="button"
                                    className="absolute right-14 top-2 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    onClick={() => removeFromUpvoted(story.id)}
                                >
                                    Remove
                                </button>

                                <button
                                    type="button"
                                    className="absolute right-44 top-2 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                    onClick={() => upvoteStory(story.id)}
                                >
                                    Upvote{" "}
                                    <span className="text-white  mr-2">
                                        [ {story.upvotes} ]
                                    </span>
                                </button>

                                <div
                                    className="flex justify-between items-center p-4 cursor-pointer"
                                    onClick={() => toggleAccordion(story.id)}
                                >
                                    <h2 className="text-2xl font-semibold">
                                        {story.prompt}
                                    </h2>
                                    <div className="flex items-center">
                                      
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 transition-transform ${
                                                activeAccordion === story.id
                                                    ? "transform rotate-180"
                                                    : ""
                                            }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {activeAccordion === story.id && (
                                    <div className="p-4 border-t">
                                        <p className="text-[#E2DFD2] text-lg">
                                            {story.story}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Upvoted;
