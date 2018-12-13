const router = require('express').Router();
const logger = require('winston');

router.route('/posts')
 .get((req, res, next) => {
    logger.info('GET all posts');
    res.json({
      message: 'GET all posts'
    });
});


module.exports = router;