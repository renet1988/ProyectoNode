let express = require('express');
let router = express.Router();
let Controller = require('./controller');

/*
 * GET
 */
router.get('/', Controller.get);

/*
 * GET
 */
router.get('/:id', Controller.get);

/*
 * POST
 */
router.post('/', Controller.post);

/*
 * PUT
 */
router.put('/:id', Controller.put);

/*
 * DELETE
 */
router.delete('/:id', Controller.delete);



module.exports = router;
