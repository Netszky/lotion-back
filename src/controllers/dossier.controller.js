const Dossier = require("../models/dossier.model");

exports.create = (req, res) => {
    const dossier = new Dossier({
        notes: null,
        sousdossier: null,
        // user: req.user._id,
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