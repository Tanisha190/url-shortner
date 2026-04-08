const router = require('express').Router();
const { createShortUrl, fetchShortURL } = require('../controllers/url');
const limiter = require('../middlewares/rateLimitter');
router.post('/create',limiter, createShortUrl);
router.get('/:alias', fetchShortURL);

module.exports = router;