const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/posts
router.get('/', (req, res) => {
  // Access our Post model including comments frm users
  Post.findAll({
    attributes: ['id', 
        'title',
        'post_text',
        'created_at'
        ],
    order: [["created_at", "DESC"]],
    include: [
        {
            model: Comment,
            attributes: ["id", "comment_text", "created_at"],
            include: {
              model: User,
              attributes: ["username"],
         },
        },
        {
            model: User,
            attributes: ["username"],
        },
        ],
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// GET /api/posts/1
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 
            'title',
            'post_text',
            'created_at'
            ],
        order: [["created_at", "DESC"]],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "created_at"],
                include: {
                  model: User,
                  attributes: ["username"],
            },
            },
            {
                model: User,
                attributes: ["username"],
            },
        ],
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/posts
router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    user_id: req.session.user_id
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/posts/1
router.put('/:id', (req, res) => {
  Post.update(req.body, {
    title: req.body.title,
    post_text: req.body.post_text
    },
    {
        where: {
          id: req.params.id
        }
    })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/posts/1
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No post found with this id' });
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