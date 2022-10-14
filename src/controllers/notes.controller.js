const Notes = require("../models/notes.model");
const Dossier = require("../models/dossier.model");
exports.create = (req, res) => {
    const note = new Notes({
        user: req.body.user,
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
exports.delete = async (req, res) => {
    await Notes.findByIdAndDelete(req.body.id).then((data) => {
        res.status(200).send({
            message: "Deleted"
        })
    }).catch((err) => {
        res.status(500).send({
            message: "Note Introuvable"
        })
    })
};
exports.getByStatus = (req, res) => {
    Notes.find({
        $and: [
            { user: { $eq: req.query.id } },
            { status: { $eq: req.query.status } },
        ]
    }).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send(err)
    })
};

exports.addToTrash = (req, res) => {
    console.log("ici", req.body.id);
    Notes.findByIdAndUpdate(req.body.id, {
        status: 4
    }, { omitUndefined: true })
        .then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(500).send(err)
        })
};
exports.addToDraft = (req, res) => {
    Notes.findByIdAndUpdate(req.body.id, {
        status: 3
    }, { omitUndefined: true })
        .then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(500).send(err)
        })
};
exports.addToArchive = (req, res) => {
    Notes.findByIdAndUpdate(req.body.id, {
        status: 2
    }, { omitUndefined: true })
        .then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(500).send(err)
        })
};