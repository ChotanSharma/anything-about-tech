const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/comments
router.get('/', (req, res) => {
  // Access our Comment model and run .findAll() method){
  Comment.findAll({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// POST /api/comments
router.post('/', (req, res) => {
    // check session
    if(req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.session.post_id,
            // user_id from the session
            user_id: req.body.user_id
        })
   
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    }
});

// DELETE /api/comments/1
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;