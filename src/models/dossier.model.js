const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dossierSchema = new Schema({

    notes: [{
        type: Schema.Types.ObjectId, ref: "Notes"
    }],
    sousdossier: [{
        type: Schema.Types.ObjectId, ref: "Dossier"
    }],
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    level: {
        type: Number,
        default: 0
    },
    parent: {
        type: Schema.Types.ObjectId, ref: "Dossier"
    }
});
module.exports = mongoose.model("Dossier", dossierSchema);
