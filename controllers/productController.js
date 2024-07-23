const { render } = require('ejs');
const Product = require('../models/product');
const Review = require('../models/reviews');

exports.getProductDetail = (req, res) => {
    const id = req.params.id;

    Product.findById(id, (err, productData) => {
        if (err) throw err;

        Review.findByBookId(id, (err, commentsData) => {
            if (err) throw err;
            
            Review.findByrating(id, (err, ratingData)=>{
                if (err) throw err;
               
               Product.findTheLoai((err,dataTheLoai)=>{
                if (err) throw err;
                res.render('productDetail', {
                    rating: ratingData[0],
                    product: productData[0],
                    dataTheLoai:dataTheLoai,
                    comments: commentsData ,
                    user: req.session.user || null
                });
               })

            })
            
        });
    });
};

exports.postProductDetail = (req, res) => {
    const bookId = req.params.id;
    const userId = req.session.user.id;
    const content = req.body.comment;
    const rating =parseFloat(req.body.rating);

    

    if (isNaN(rating) || rating == '' || rating <= 0 || rating > 5) {
        Review.created(bookId, userId, content, (err) => {
            if (err) {
                console.error(err);
                return res.redirect(`/productDetail/${bookId}`);
            }
            res.redirect(`/productDetail/${bookId}`);
        });
    } else {
        Review.create(bookId, userId, content, rating, (err) => {
            if (err) {
                console.error(err);
                return res.redirect(`/productDetail/${bookId}`);
            }
            res.redirect(`/productDetail/${bookId}`);
        });
    }
   
    
    
};

exports.search=(req,res)=>{
    const  query=req.body.query;
    Product.findSearch(query, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.render('search',{data,user: req.session.user || null})
    });
}