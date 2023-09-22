import React, { useState } from "react";
import axios from "axios";

const Prompt = () => {
    const [promptText, setPromptText] = useState("");
    const [genre, setGenre] = useState("thriller");
    const [maxWords, setMaxWords] = useState(100);
    const [generatedText, setGeneratedText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [savedStoryId, setSavedStoryId] = useState("");
    const [isUpvoted, setIsUpvoted] = useState(false);

    const handleInput = (e) => {
        setPromptText(e.target.value);
    };

    const handleMaxWords = (e) => {
        setMaxWords(parseInt(e.target.value));
    };

    const handleGenre = (e) => {
        setGenre(e.target.value);
    };

    const handleSave = async () => {
        if (isSaved) {
            alert("Already Saved");
            return;
        }

        try {
            const requestBody = {
                promptEntered: promptText,
                generatedStory: generatedText,
            };

            
            const serverUrl = process.env.REACT_APP_SERVER_URL; 
            const response = await axios.post(
                `${serverUrl}/story/saves`,
                requestBody
            );

            if (response.status === 200) {
                setIsSaved(true);
                const savedStoryId = response.data.story._id;
                setSavedStoryId(savedStoryId); 
            } else {
                console.error("Save API call failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSubmit = async () => {
        setIsSaved(false);
        if (promptText.length === 0) {
            return;
        }
        setIsLoading(true);

        try {
            const req = {
                attributes_as_list: false,
                response_as_dict: true,
                type: "application/json",
                providers: "openai",
                temperature: 0.2,
                max_tokens: maxWords,
                text: `Generate a story starting with the words : ${promptText}. The genre of the story should be ${genre}.`,
            };
            const apiKey = process.env.REACT_APP_API_KEY;
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            };
            const url = process.env.REACT_APP_API_URL;
            const res = await axios.post(url, req, { headers });

            if (res.status === 200) {
                console.log(res.data.openai);
                setGeneratedText(res.data.openai.generated_text);
            } else {
                console.error("Axios error occured");
            }
        } catch (err) {
            console.error("Error", err);
        } finally {
            setIsLoading(false);
        }
    };

    

    const handleUpvote = async () => {
        if (!isSaved) {
            alert("Story is not saved. Please save the story first");
            return;
        }
        try {
            if (!savedStoryId) {
                console.error("Story ID not found");
                return;
            }

            const serverUrl = process.env.REACT_APP_SERVER_URL; 
            const response = await axios.post(
                `${serverUrl}/story/upvoteInPrompt`,
                {
                    id: savedStoryId, 
                }
            );

            if (response.status === 200) {
                setIsUpvoted(true);
            } else {
                console.error("Upvote API call failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDownload = () => {
        window.print();
    };

    return (
        <section className="p-5 sm:p-20 items-center">
            <div className="container mx-auto p-4 ">
                <div className="p-6 rounded-lg ">
                    <h2 className="text-white font-semibold text-xl">
                        Enter Story Prompt :{" "}
                    </h2>

                    <textarea
                        type="text"
                        className="bg-[#323233] w-full border border-gray-300 rounded-xl p-4 mb-4 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-white"
                        placeholder="Once upon a time there was a crow..."
                        required
                        value={promptText}
                        onChange={handleInput}
                    />
                    <div className="flex flex-wrap -mx-2 mb-4">
                        <div className="w-full md:w-1/2 px-2">
                            <label
                                htmlFor="maxWords"
                                className="text-white font-semibold text-xl"
                            >
                                Max Words:
                            </label>
                            <input
                                type="number"
                                id="maxWords"
                                className="bg-[#323233] focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-white w-full border border-gray-300 rounded-md p-2 mt-1"
                                placeholder="Max Words"
                                value={maxWords}
                                onChange={handleMaxWords}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label
                                htmlFor="genre"
                                className="text-white font-semibold text-xl"
                            >
                                Genre:
                            </label>
                            <select
                                id="genre"
                                className="bg-[#323233] focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-white w-full border border-gray-300 rounded-md p-2"
                                value={genre}
                                onChange={handleGenre}
                            >
                                <option
                                    className="text-lg bg-white"
                                    value="horror"
                                >
                                    Horror
                                </option>
                                <option
                                    className="text-lg bg-white"
                                    value="funny"
                                >
                                    Funny
                                </option>
                                <option
                                    className="text-lg bg-white"
                                    value="thriller"
                                >
                                    Thriller
                                </option>
                                <option
                                    className="text-lg bg-white"
                                    value="mystery"
                                >
                                    Mystery
                                </option>
                                <option
                                    className="text-lg bg-white"
                                    value="drama"
                                >
                                    Drama
                                </option>
                                <option
                                    className="text-lg bg-white"
                                    value="poetry"
                                >
                                    Poetry
                                </option>
                                <option
                                    className="text-lg bg-white"
                                    value="fantasy"
                                >
                                    Fantasy
                                </option>
                                <option
                                    className="text-lg bg-white"
                                    value="sci-fi"
                                >
                                    Sci-Fi
                                </option>

                            </select>
                        </div>
                    </div>
                    <button
                        className={`bg-[#00df9a] text-black font-semibold uppercase px-4 py-2 rounded-lg hover:bg-blue-600 ${
                            isLoading ? "cursor-not-allowed" : ""
                        }`}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "GENERATING..." : "Generate Text"}
                    </button>
                
                    {generatedText && !isLoading && (
                        <div className="mt-4 ">
                            <div className="mt-4">
                                <h3 className="text-white text-center text-3xl font-semibold mb-6">
                                    Generated Story:
                                </h3>
                                <p
                                    className="text-xl text-[#E2DFD2] break-words"
                                    style={{ maxWidth: "100%" }}
                                >
                                    {generatedText}
                                </p>
                            </div>
                            <button
                                className="bg-[#00df9a] font-semibold text-black uppercase px-4 py-2 rounded-md hover:bg-gray-600 mr-3 mt-5"
                                onClick={handleSave}
                                disabled={isSaved}
                            >
                                {isSaved ? "Saved" : "Save"}
                            </button>

                            <button
                                className="bg-[#00df9a] text-black uppercase font-semibold px-4 py-2 rounded-md hover:bg-gray-600 mr-3 mt-5"
                                onClick={handleDownload}
                            >
                                Download
                            </button>

                            <button
                                className="bg-[#00df9a] font-semibold text-black uppercase px-4 py-2 rounded-md hover:bg-gray-600 mr-3 mt-5"
                                onClick={handleUpvote}
                            >
                                {isUpvoted ? "Upvoted" : "Upvote"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Prompt;
