const router = require('express').Router();
const postsRoutes = require('./posts/routes');

router.use('/posts', postsRoutes);

module.exports = router;