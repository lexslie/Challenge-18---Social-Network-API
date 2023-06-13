const {User, Thought} = require("../models");

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
    

}