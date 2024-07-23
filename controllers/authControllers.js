const { render } = require('ejs');
const User = require('../models/user');
exports.Login=(req,res)=>{
   res.render('login')
}
exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin = (req, res) => {
    const { email, password } = req.body;

    User.findByEmailAndPassword(email, password, (err, results) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send('Server Error');
            return;
        }

        if (results.length > 0) {
            req.session.user = results[0];
            res.redirect('/home');
        } else {
            res.status(401).send('Sai mật khẩu hoặc email');
        }
    });
};

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.postRegister = (req, res) => {
    const { user, email, password } = req.body;

    User.create(user, email, password, (err) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Server Error');
            return;
        }

        res.redirect('/home');
    });
};

exports.getLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error:', err.stack);
            return res.redirect('/');
        }
        res.redirect('/home');
    });
};