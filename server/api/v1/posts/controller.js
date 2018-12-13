const Model = require("./model");
const logger = require('winston');

//CRUD 

//ALL POSTS

//GET ALL
exports.all = (req, res, next) => {
    Model.find().exec()
    .then((docs) => {
        logger.info('Retreiving all posts from database!!!');
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



//ONE POST, with id parameter

//READ ONE POST
//No es magia. Para las operaciones con id, se ejecuta el middleware anterior,
//ubicado en routes, que a su vez invoca a la funcion --> controller.id
exports.read = (req, res, next) => {
    const { doc } = req;
    res.json(doc);
};

//UPDATE ONE POST
exports.update = (req, res, next) => {
    const { doc, body } = req;

    //Actualizamos los parametros de doc con los de body (correspondencia)
    Object.assign(doc, body);

    doc.save()
    .then((updated) => {
        res.json(updated);
    })
    .catch((err) => {
        next(new Error(err));
    });
};

//DELETE ONE POST
exports.delete = (req, res, next) => {
    const { doc } = req;

    doc.remove()
    .then((removed) => {
        res.json(removed);
    })
    .catch((err) => {
        next(new Error(err));
    });
};

//Id function
exports.id = (req, res, next, id) => {
    Model.findById(id).exec()
      .then((doc) => {
        if (doc) {
          req.doc = doc;
          //Pasamos el control al siguiente middleware (en routes)
          next();
        } else {
          const message = `${Model.modelName} not found`;
          logger.info(message);
          res.json({
            message,
          });
        }
      })
      .catch((err) => {
        next(new Error(err));
      });
  };