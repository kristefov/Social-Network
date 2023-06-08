const router = require('express').Router();

const {
getThoughts,
createThought,
addReaction
} = require('../../controllers/thoughControllers')

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId/reactions').post(addReaction)



module.exports = router