const router = require('express').Router();
const logger = require('winston');
const controller = require('./controller');

const bodyParser = require('body-parser');
router.use(bodyParser.json());

/*
 * /api/posts/     POST   - CREATE
 * /api/posts/     GET    - READ ALL
 * /api/posts/:id  GET    - READ ONE
 * /api/posts/:id  PUT    - UPDATE
 * /api/posts/:id  DELETE - DELETE
 */



router.route('/')
    .post(controller.create)
    .get(controller.all);

router.param('id',controller.id);

router.route('/:id')
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);



module.exports = router;