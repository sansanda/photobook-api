const Model = require("./model");
const logger = require('winston');

//CRUD 

//ALL POSTS

//GET ALL
exports.all = (req, res, next) => {
    Model.find().exec()
    .then((docs) => {
        res.json(docs);
    })
    .catch((err) => {
        logger.info('Error getting all the posts from the database!!! --> ' + err);
        next(new Error(err));
    });
};

//CREATE POSTS
exports.create = (req, res, next) => {
    const { body } = req;

    const document = new Model(body);

    document.save()
    .then((doc) => {
        res.json(doc);
    })
    .catch((err) => {
        logger.info('Error saving the post in the database!!! --> ' + err);
        next(new Error(err));
    });
};



//ONE POST

//READ ONE POST
exports.read = (req, res, next) => {
    res.json({ "_id": req.params.id });
};

//UPDATE ONE POST
exports.update = (req, res, next) => {
    res.json({});
};

//DELETE ONE POST
exports.delete = (req, res, next) => {
    res.json({});
};