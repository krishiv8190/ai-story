const Stories = require("../models/stories");
const uuid = require("uuid");

exports.saves = (req, res) => {
    console.log("Upvote API called");

    const uniqueId = uuid.v4();
    const { promptEntered, generatedStory } = req.body;

    const newStories = new Stories({
        id: uniqueId,
        prompt: promptEntered,
        story: generatedStory,
    });

    newStories.save().then((savedStory) => {
        console.log("Story saved successfully", savedStory);
        res.status(200).json({
            message: "Story saved successfully",
            story: savedStory,
        });
    });
};

exports.upvoteLeaderboard = async (req, res) => {
    try {
        console.log('Received upvote request:', req.body);
        const { id } = req.body; // Assuming you send the story ID in the request body

        // Find the story by ID and increment the upvotes field
        const story = await Stories.findOneAndUpdate(
            { id: id },
            { $inc: { upvotes: 1 } },
            { new: true }
        );

        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        res.status(200).json({ message: "Upvoted successfully", story });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.upvoteInPrompt = async (req, res) => {
    try {
        console.log('Received upvote request:', req.body);
        const { id } = req.body; // Assuming you send the story ID in the request body

        // Find the story by ID and increment the upvotes field
        const story = await Stories.findOneAndUpdate(
            { _id: id },
            { $inc: { upvotes: 1 } },
            { new: true }
        );

        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        res.status(200).json({ message: "Upvoted successfully", story });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getStories = (req, res) => {
    Stories.find().then((stories) => {
        res.status(200).json(stories);
    });
};

exports.getStoriesByUpvotes = (req, res) => {
    Stories.find()
        .sort({ upvotes: -1 }) // Sort stories by upvotes in descending order
        .then((stories) => {
            res.status(200).json(stories);
        })
        .catch((err) => {
            console.error("Error retrieving and sorting stories", err);
            res.status(500).json({
                message: "Error retrieving and sorting stories",
                error: err,
            });
        });
};

exports.deleteUpvotedStories = (req, res) => {
    console.log("Delete Upvoted Stories API called");
    const { storyId } = req.body;

    Stories.findOneAndDelete({ id: storyId })
        .then((storyDeleted) => {
            if (storyDeleted) {
                console.log("Story deleted successfully", storyDeleted);
                res.status(200).json({
                    message: "Story deleted successfully",
                    story: storyDeleted,
                });
            } else {
                res.status(404).json({
                    message: "Story not found",
                });
            }
        })
        .catch((err) => {
            console.error("Error deleting story", err);
            res.status(500).json({
                message: "Error deleting story",
                error: err,
            });
        });
};
