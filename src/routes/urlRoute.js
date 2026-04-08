const router = require('express').Router();
const { createShortUrl, fetchShortURL } = require('../controllers/url');
const limiter = require('../middlewares/rateLimitter');
const verifyJwt = require('../middlewares/jwt');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   - name: URL
 *     description: URL shorten and redirect endpoints
 */

/**
 * @swagger
 * /url/create:
 *   post:
 *     summary: Create a short URL
 *     tags: [URL]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - longUrl
 *             properties:
 *               longUrl:
 *                 type: string
 *                 example: https://example.com/some/very/long/path
 *               alias:
 *                 type: string
 *                 example: promo
 *     responses:
 *       201:
 *         description: Short URL created successfully
 *       400:
 *         description: Invalid request input
 *       429:
 *         description: Too many requests (rate limited)
 *       500:
 *         description: Server error
 */
router.post('/create', limiter, verifyJwt, createShortUrl);

/**
 * @swagger
 * /url/{alias}:
 *   get:
 *     summary: Redirect to original long URL
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         description: Short URL alias/token
 *         schema:
 *           type: string
 *           example: promo-A1b2C3
 *     responses:
 *       302:
 *         description: Redirect to long URL
 *       404:
 *         description: Alias not found
 *       500:
 *         description: Server error
 */
router.get('/:alias', fetchShortURL);

module.exports = router;