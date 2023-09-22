const express = require("express");
const router = express.Router();
const {
    saves,
    getStories,
    deleteUpvotedStories,
    getStoriesByUpvotes,
    upvoteLeaderboard,
    upvoteInPrompt
} = require("../controllers/storiesController");
router.route("/saves").post(saves);
router.route("/getUpvotedStories").post(getStories);
router.route("/deleteUpvotedStories").post(deleteUpvotedStories);
router.route("/getStoriesByUpvotes").post(getStoriesByUpvotes);
router.route("/upvoteLeaderboard").post(upvoteLeaderboard);
router.route("/upvoteInPrompt").post(upvoteInPrompt);

module.exports = router;
