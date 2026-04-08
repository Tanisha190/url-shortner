const router = require('express').Router();
const { createShortUrl, fetchShortURL } = require('../controllers/url');

router.post('/create', createShortUrl);
router.get('/:alias', fetchShortURL);

module.exports = router;