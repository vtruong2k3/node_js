const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const multer=require('multer')// app load file
const app = express();
const db=require('./models/db')

const homeControllers=require('./controllers/homeControllers')

const authController=require('./controllers/authControllers')


const productControlers=require('./controllers/productController')
const port = 3000;


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ensure the 'uploads' directory exists
const fs = require('fs');

const uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// router 
app.get('/home',homeControllers.home);
app.get('/login',authController.Login)
app.post('/loginsave',authController.postLogin);
app.get('/register', authController.getRegister);
app.post('/saveregister', authController.postRegister);
app.get('/logout', authController.getLogout);
app.get('/productDetail/:id', productControlers.getProductDetail);
app.post('/productDetail/:id', productControlers.postProductDetail);
app.post('/searchsave',productControlers.search);




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});