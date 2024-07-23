const db = require('./db');

const Product = {
    findLimited: ( callback) => {
        db.query('SELECT * FROM sach LIMIT 4', callback);
    },
    findById: (id, callback) => {
        db.query(`SELECT sach.id, sach.tenSach, sach.tacGia, sach.image, theloai.tenTheLoai, sach.chiTietSach
                  FROM sach
                  INNER JOIN theloai ON sach.id_TheLoai = theloai.id
                  WHERE sach.id = ?`, [id], callback);
    },
    findSearch:(query,callback)=>{

        db.query('SELECT sach.* FROM sach JOIN theloai ON sach.id_TheLoai = theloai.id WHERE tenSach LIKE ? OR tacGia LIKE ? OR theloai.tenTheLoai LIKE ?', [`%${query}%`, `%${query}%`, `%${query}%`],callback)

    },
    findFree:(mienPhi,callback)=>{
        db.query(`SELECT * FROM sach WHERE mienPhi=${mienPhi} LIMIT 4`,callback)

    },

    findTheLoai:(callback)=>{

        db.query(`SELECT * FROM theloai`,callback)
    }
};
module.exports = Product;