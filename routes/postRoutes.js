const express = require('express')

const postController = require('../controllers/postController');
const router = express.Router();
const protect = require('../middleware/authMiddleware')

router.route("/")
.get(postController.getAllPosts)
.post(protect,postController.createPost)

router.route("/:id")
.get(postController.getPost)
.patch(protect,postController.UpdatePost)
.delete(protect,postController.DeletePost)

module.exports = router