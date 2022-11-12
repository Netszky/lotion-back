const Notes = require("../models/notes.model");
const Dossier = require("../models/dossier.model");
const key = require("../configs/mailjet.config");

exports.create = (req, res) => {
    const note = new Notes({
        user: req.body.user,
        name: req.body.name,
        status: 1,
        url: null,
        elements: null,
        dossier: req.body.dossier,
    });
    note
        .save()
        .then((data) => {
            Dossier.findByIdAndUpdate(
                req.body.dossier,
                {
                    $push: {
                        notes: data._id,
                    },
                },
                { omitUndefined: true }
            )
                .then((update) => {
                    res.status(201).send(data);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send(err);
                });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.update = (req, res) => {
    Notes.findByIdAndUpdate(
        req.body.id,
        {
            elements: req.body.elements,
        },
        {
            new: true,
            omitUndefined: true
        },
    )
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.delete = async (req, res) => {
    const exist = await Notes.exists({ _id: req.query.id });
    if (exist) {
        await Notes.findByIdAndDelete(req.query.id)
            .then((data) => {
                Dossier.findByIdAndUpdate(data.dossier, {
                    $pull: {
                        notes: req.query.id,
                    },
                }).then((dossier) => {
                    res.status(200).send({
                        data,
                    });
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Note Introuvable",
                });
            });
    } else {
        res.status(500).send({
            message: "Note Introuvable",
        });
    }
};
exports.getByStatus = (req, res) => {
    Notes.find({
        $and: [
            { user: { $eq: req.query.id } },
            { status: { $eq: req.query.status } },
        ],
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.addToTrash = (req, res) => {
    Notes.findByIdAndUpdate(
        req.body.id,
        {
            status: 4,
        },
        { omitUndefined: true }
    )
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};
exports.addToDraft = (req, res) => {
    Notes.findByIdAndUpdate(
        req.body.id,
        {
            status: 3,
        },
        { omitUndefined: true }
    )
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};
exports.addToArchive = (req, res) => {
    Notes.findByIdAndUpdate(
        req.body.id,
        {
            status: 2,
        },
        { omitUndefined: true }
    )
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};
exports.getNoteByFolder = (req, res) => {
    Notes.find({
        $and: [{ dossier: { $eq: req.query.dossier } }, { status: { $eq: 1 } }],
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.activate = (req, res) => {
    Notes.findByIdAndUpdate(
        req.body.id,
        {
            status: 1,
        },
        { omitUndefined: true }
    )
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.shareNote = (req, res) => {
    Notes.findById(req.query.id)
        .then((data) => {
            Notes.findByIdAndUpdate(
                data._id,
                {
                    $set: {
                        isShared: !data.isShared,
                    },
                },
                { new: true, omitUndefined: true }
            ).then((data) => {
                res.status(200).send(data);
            });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.getNoteById = (req, res) => {
    Notes.findById(req.query.id)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.search = (req, res) => {
    Notes.find({
        name: { $regex: req.query.name.toLowerCase() }, user: { $eq: req.user.user.userId },
    })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};
exports.addColab = (req, res) => {
    Notes.findByIdAndUpdate(req.body.id, {
        $push: {
            collaborators: req.body.collaborators
        }
    }, { new: true, omitUndefined: true })
        .then((data) => {
            res.status(200).send(data)
            try {
                const Mailjet = require("node-mailjet");
                const mailjet = new Mailjet({
                    apiKey: key.publicKey,
                    apiSecret: key.privateKey,
                });

                const request = mailjet.post("send", { version: "v3.1" }).request({
                    Messages: [
                        {
                            From: {
                                Email: "julien.chigot@ynov.com",
                                Name: "Notee",
                            },
                            To: [
                                {
                                    Email: req.body.email,
                                    // Name: req.body.firstname,
                                },
                            ],
                            TemplateID: 4348497,
                            TemplateLanguage: true,
                            Subject: "Collaboration",
                            Variables: {
                                firstname: req.user.user.userName,
                                email: req.body.email,
                                title: req.body.title,
                                url: req.body.url,
                            },
                        },
                    ],
                });
                return { message: "Email Send" };
            } catch (error) {
                return { message: error };
            }
        })
        .catch((err) => {
            res.status(500).send("nok")
        })
}
exports.removeColab = (req, res) => {
    Notes.findByIdAndUpdate(req.body.id, {
        $pull: {
            collaborators: req.body.collaborators
        }
    }, { new: true, omitUndefined: true })
        .then((data) => {
            res.status(200).send(data)

        })
        .catch((err) => {
            res.status(500).send("nok")
        })
}

exports.getShared = (req, res) => {
    Notes.find({ collaborators: req.user.user.userId })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}



