const postModel = require("./model");
const logger = require('winston');
const config = require('./../../../config');
const { pagination } = config;
const parsePaginationParams = require("../../../utils/index");


//CRUD 

//ALL POSTS

//GET ALL
exports.all = (req, res, next) => {

  const { query = {} } = req;
  const { limit, page, skip } = parsePaginationParams(query);

  const all = postModel.find().limit(limit).skip(skip);
  const count = postModel.count();
  
    Promise.all([all.exec(), count.exec()])
      .then((data) => {
        logger.info('Retreiving all posts from database!!!');
        const [docs, total] = data;
        const pages = Math.ceil(total / limit);
  
        res.json({
          success: true,
          items: docs,
          meta: {
            limit,
            skip,
            total,
            page,
            pages,
          },
        });
      })
      .catch((err) => {
        logger.info('Error getting all the posts from the database!!! --> ' + err);
        next(new Error(err));
      });
  };

//CREATE POSTS
exports.create = (req, res, next) => {
    const { body } = req;

    const document = new postModel(body);

    document.save()
    .then((doc) => {
        res.status(201);
        res.json({
            success: true,
            item: doc,
        });
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
    res.json({
        success: true,
        item: doc,
    });
};

//UPDATE ONE POST
exports.update = (req, res, next) => {
    const { doc, body } = req;

    //Actualizamos los parametros de doc con los de body (correspondencia)
    Object.assign(doc, body);

    doc.save()
    .then((updated) => {
        res.json({
            success: true,
            item: updated,
        });
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
        res.json({
            success: true,
            item: removed,
        });
    })
    .catch((err) => {
        next(new Error(err));
    });
};

//Id function
exports.id = (req, res, next, id) => {
    postModel.findById(id).exec()
      .then((doc) => {
        if (doc) {
          req.doc = doc;
          //Pasamos el control al siguiente middleware (en routes)
          next();
        } else {
          const message = `${postModel.modelName} not found`;
          logger.info(message);
          res.json({
            success: false,
            message,
          });
        }
      })
      .catch((err) => {
        next(new Error(err));
      });
  };