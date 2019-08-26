let express = require('express');
let router = express.Router();
let controller = require('./controller');

/*
 * GET
 */
router.get('/', controller.get);

/*
 * GET
 */
router.get('/:id', controller.get);

/*
 * POST
 */
router.post('/', controller.post);

/*
 * PUT
 */
router.put('/:id', controller.put);

/*
 * DELETE
 */
router.delete('/:id', controller.delete);



module.exports = router;
