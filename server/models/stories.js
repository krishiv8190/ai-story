const mongoose = require("mongoose");

const storiesSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            // required: true,
        },
        prompt: {
            type: String,
            // required: true,
        },
        story: {
            type: String,
        },
        upvotes: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Stories", storiesSchema);
