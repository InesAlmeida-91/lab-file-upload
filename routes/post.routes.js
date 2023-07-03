const router = require("express").Router();
const mongoose = require("mongoose");

// Require the Post model in order to interact with the database
const Post = require("../models/Post.model");
const fileUploader = require("../config/cloudinary.config");


// require (import) middleware functions
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");


// .get() route ==> to display the post-form to users
router.get("/post/create", isLoggedIn, (req, res) => res.render("post/post-form"));

router.post("/post/create", fileUploader.single("post-image"), isLoggedIn, (req, res) => {
    const { creatorId, content, picName } = req.body;

    Post.create({ creatorId, content, picName, picPath: req.file.path})
        .then(newPost => {
            console.log(newPost);
            res.redirect("/")
        })
        .catch(error => console.log("Error"))
})

router.get("/post", isLoggedOut, (req, res) => {
    Post.find()
        .then(allPosts => {
            console.log(allPosts);
            res.render("index", { posts: allPosts})
        })
        .catch(err => console.log("Error"));
});

router.get("/post/post-details", isLoggedOut, (req, res) => res.render("post/post-details"));


module.exports = router;