const router = require('express').Router();
// thought routes
const {
getThoughts,
getSingleThought,
createThought,
addReaction,
updateThough,
deleteThought,
deleteReaction
} = require('../../controllers/thoughControllers')

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId/reactions').post(addReaction)
router.route('/:thoughtId').put(updateThough).get(getSingleThought).delete(deleteThought)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);




module.exports = router