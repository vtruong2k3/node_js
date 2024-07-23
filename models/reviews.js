const db = require('./db');
const Review = {
    findByBookId: (bookId, callback) => {
        db.query(`SELECT book_id, users.name,comment,  DATE_FORMAT(date_at, '%a %b %d %Y %H:%i:%s') AS formatted_date
                  FROM reviews
                  INNER JOIN users ON reviews.user_id = users.id
                  WHERE book_id = ? ORDER BY date_at DESC`, [bookId], callback);
    },
    findByrating:(bookId, callback) => {
        db.query(`SELECT  book_id, ROUND(AVG(rating), 1) AS average_rating
                  FROM reviews
                  WHERE book_id = ?
                  GROUP BY book_id`, [bookId], callback);
    },
    create: (bookId, userId, comment, rating, callback) => {
        db.query('INSERT INTO reviews (book_id, user_id, comment, rating) VALUES (?, ?, ?, ?)', [bookId, userId, comment, rating], callback);
    },
    created: (bookId, userId, comment, callback) => {
        db.query('INSERT INTO reviews (book_id, user_id, comment) VALUES (?, ?, ?)', [bookId, userId, comment], callback);
    },
    // rating: (bookId, userId, rating, callback) => {
    //     db.query('INSERT INTO reviews (book_id, user_id, rating) VALUES (?, ?, ?)', [bookId, userId, rating], callback);
    // }
};

module.exports = Review;