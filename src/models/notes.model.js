const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    elements: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 3
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
    },
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    dossier: {
        type: Schema.Types.ObjectId, ref: "Dossier"
    }
});
module.exports = mongoose.model("Notes", notesSchema);
