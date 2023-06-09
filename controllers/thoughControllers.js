const { User, Thought } = require('../models')

module.exports = {
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (error) {
        res.status(500).json(error);
      }
    },
    async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId })
          res.json(thought);
        } catch (error) {
          res.status(500).json(error);
        }
      },
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body)
        await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { runValidators: true, new: true }
        );
        res.json(thought);
      } catch (error) {
        res.status(500).json(error);
      }
    },
    async updateThough(req, res) {
try {
    const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true })
        res.json( thought);
} catch (error) {
    res.status(500).json(error);
    
}
    },
    async addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
    
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res
              .status(404)
              .json({ message: 'No thought found :(' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
          console.error(err)
        }
      },
  };