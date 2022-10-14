const Dossier = require("../models/dossier.model");

exports.create = (req, res) => {
    const dossier = new Dossier({
        notes: null,
        sousdossier: null,
        user: req.body.id,
        level: req.body.level,
        parent: req.body.parent,
        name: req.body.name
    })
    dossier.save()
        .then((data) => {
            res.status(201).send(data)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
};

exports.getAll = (req, res) => {
    Dossier.find().then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send(err)
    })
};
exports.getLevel1 = (req, res) => {
    Dossier.find({
        $and: [
            { user: { $eq: req.query.id } },
            { level: { $eq: 1 } },
        ]
    }).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send(err)
    })
};

exports.getFolder = (req, res) => {
    Dossier.findById(req.query.id).populate("notes")
        .then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            console.log(err);
            res.status(500).send(err)
        })
};