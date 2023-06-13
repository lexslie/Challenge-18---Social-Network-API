const {User, Thought} = require("../models");
const { findOneAndUpdate } = require("../models/Thought");

const thoughtController = {

    // access all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // access one thought
    getThoughtById({ params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then(dbThoughtData=> {
            if (!dbThoughtData) {
                res.status(404).json({ message: "There were no thoughts found with that id."});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // create thought
    createThought({ body}, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "There were no users found with that id."});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err = res.json(err));
    },

    // update thoughts
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "There were no users found with that id."});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // delete thoughts
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "There were no users found with that id."});
                return;
            }
            return User.findOneAndUpdate(
                { _id: parmas.userId },
                { $pull: { thoughts: params.Id } },
                { new: true }
            )
            })
            .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "There were no users found with that id."});
                return;
            }
            res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // create reaction
    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .select("-__v")
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "There were no users found with that id."});
                return;
            }
            res,json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },

    // delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId}}},
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No."});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
};


module.exports = thoughtController;