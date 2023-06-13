const router = require("express").Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require("../../controllers/thought-controller");


router
    .router("/")
    .get(getAllThought)
    .post(createThought);

router
    .router("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route("/:thoughtId/reactions")
    .post(createReaction);

router
    .route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);


module.exports = router;