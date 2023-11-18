const router = require('express').Router();
const {publicPosts, privatePosts} = require('../db');
const checkAdminRights = require('../middleware/checkAdminRights');
const checkAuth = require('../middleware/checkAuth');

router.get('/public', (req, res) => {
  res.json(publicPosts);
  console.log(req.user.email + " is logged in");
});

router.get('/private', checkAuth, (req, res) => {
    res.json(privatePosts);
    console.log(req.user.email + " is logged in");
});

router.get('/all', checkAuth, checkAdminRights, (req, res) => {
  let allPosts = [...privatePosts, ...publicPosts];
  res.json(allPosts);
   console.log(req.user.group + ": " + req.user.email + " is logged in");
});

module.exports = router;
