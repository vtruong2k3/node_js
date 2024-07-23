const Product = require('../models/product');

exports.home = (req, res) => {
    Product.findLimited((err, data) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).send('Lỗi');
        }

        Product.findFree([1],(err,dataFree)=>{
            
            Product.findTheLoai((err,dataTheLoai)=>{

                if(err)throw err
                res.render('index', { data,dataFree,dataTheLoai, user: req.session.user || null });
            })
        })
    });
};

