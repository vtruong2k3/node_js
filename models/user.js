const db = require('./db');

const User = {
    findByEmailAndPassword: (email, password, callback) => {
        db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], callback);
    },
    create: (name, email, password, callback) => {
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], callback);
    }
};




module.exports=User;