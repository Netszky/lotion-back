const Notes = require("../models/notes.model");
const Dossier = require("../models/dossier.model");
exports.create = (req, res) => {
    console.log(req.body.folder);
    const note = new Notes({
        name: req.body.name,
        status: 4,
        url: null,
        elements: null
    })
    note.save()
        .then((data) => {
            Dossier.findByIdAndUpdate(req.body.folder, {
                $addToSet: {
                    notes: data._id
                }
            }, { omitUndefined: true }).then((update) => {
                console.log(update);
                res.status(201).send(data)
            }).catch((error) => {
                console.log(error);
                res.status(500).send(err)
            })
        })
        .catch((err) => {
            res.status(500).send(err)
        })
};

exports.update = (req, res) => {

}