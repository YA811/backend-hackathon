const express = require('express');
const verifyToken = require('../middleware/verify-token');
const { User, Product, Region, Order } = require('../models/user');
const router = express.Router();

router.use(verifyToken);

router.get('/', async (req, res) => {
    try {
      const products = await Product.find({})
        .sort({ createdAt: 'desc' });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
}); 

router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/:productId/comments', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        product.comments.push(req.body)
        await product.save()
        const newComment = product.comments[product.comments.length - 1]
        newComment._doc.customer = req.user
        res.status(201).json(newComment)
    } catch (error) {
        res.status(500).json(error)
    }
});

router.put('/:productId/comments/:commentId', async (req, res) => {
    try {
      const product = await Superstore.findById(req.params.productId);
      const comment = product.comments.id(req.params.commentId);
      if (!product.customer.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
      comment.text = req.body.text;
      await product.save();
      res.status(200).json({ message: 'Ok' });
    } catch (error) {
      res.status(500).json(error);
    }
});


router.delete('/:productId/comments/:commentId', async (req, res)=>{
    try{
        const product = await Superstore.findById(req.params.productId);
        if (!product.customer.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }
        product.comments.remove({_id: req.params.commentId});
        await product.save();
        res.status(200).json({ message: 'Comment deleted' });
    }
    catch (error) {
        res.status(500).json(error)
    }
});

// Export the router
module.exports = router;