//require('sqreen');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const app = express();

//Load routes
const posts = require('./routes/posts');
const users = require('./routes/users');

//Load model
const Post = mongoose.model('posts');

//passport config
require('./config/passport')(passport);

//DB Config
const db = require('./config/database');

//Map global promise - remove warning
mongoose.Promise = global.Promise;

//Connect to mongoose
mongoose.connect(db.mongoURI)
 .then(()=>console.log('MongoDB Connected...'))
 .catch(err => console.log(err));

const conn = mongoose.connection;

//Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use(express.static(path.join(__dirname, '/public')));

//method-override middleware
app.use(methodOverride('_method'));

//Express session middleware
app.use(session({
    secret: 'supersecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
//        secure: true,
        maxAge: 1 * 24 * 60 * 60 * 1000 //sets cookie for 1 day
    }
}));

app.use(cookieParser());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global Variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals._msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

//Index Route
app.get('/', (req, res)=>{
    const title = 'Kamusta';
    Post.find({private: false})
    .sort({date:'desc'})
    .then(posts =>{
        res.render('index', {
            title, posts, 
            user: req.user
        });
    })
});

//About Route
app.get('/about', (req,res)=>{
    res.render('about');
});

app.post('/search/:search', (req, res)=>{
    const search = req.params.search;
    
    Post.find({title: '/'+search+'/i'})
    .sort({date: 'desc'}).then(posts =>{
       res.render('index',{ title, posts, user: req.user})     
    });
});

//User routes
app.use('/posts', posts);
app.use('/users', users);
//for heroku add p.e.PORT
const port = process.env.PORT || 3000;

app.get('/*', function(req, res) {
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});