const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSchema = new Schema({
    subName: { type: String },
    active: { type: Boolean, default: false },
    create_date: {
        type: Date,
        default: Date.now()
    },
    cancel_date: { type: Date, default: null },
})

module.exports = mongoose.model("Subscription", subSchema);