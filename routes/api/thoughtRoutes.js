const router = require('express').Router();

const {
getThoughts,
getSingleThought,
createThought,
addReaction,
updateThough
} = require('../../controllers/thoughControllers')

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId/reactions').post(addReaction)
router.route('/:thoughtId').put(updateThough).get(getSingleThought)




module.exports = router