//CRUD 

//ALL POSTS

//GET ALL
exports.all = (req, res, next) => {
    res.json(
        [{ "_id": 1, "title": "Vacation" },
        { "_id": 2, "title": "Jogging" }]
    );
};

//CREATE POSTS
exports.create = (req, res, next) => {
    res.json({});
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