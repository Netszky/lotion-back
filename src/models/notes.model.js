const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    elements: [{
        type: Schema.Types.ObjectId, ref: "Element"
    }],
    status: {
        type: Number,
        default: 4
    },
    url: {
        type: String,
        default: null
    },
    created: {
        type: Date,
        default: Date.now()
    },
    modified: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model("Notes", notesSchema);
