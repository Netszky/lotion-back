const Dossier = require("../models/dossier.model");

exports.create = (req, res) => {
    const dossier = new Dossier({
        notes: [],
        sousdossier: [],
        user: req.body.id,
        level: req.body.level || 1,
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

exports.getSub = (req, res) => {
    Dossier.find({
        parent: { $eq: req.query.parent }
    }).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send(err)
    })
}
exports.delete = async (req, res) => {
    const exist = await Dossier.exists({ _id: req.query.id })
    if (exist) {
        await Dossier.findByIdAndDelete(req.query.id).then((data) => {
            res.status(200).send({
                data
            })
        }).catch((err) => {
            res.status(500).send({
                message: "Note Introuvable"
            })
        })
    } else {
        res.status(500).send({
            message: "Objet Introuvable"
        })
    }
}