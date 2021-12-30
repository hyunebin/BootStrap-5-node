const express = require('express');
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash');

global.loggedin = null;

const app = new express()
const logoutController = require('./controllers/logout')
const newPostController=require('./controllers/newPost')
const homeController=require('./controllers/home')
const storeController=require('./controllers/storePost')
const getPostController=require('./controllers/getPost')
const validationMiddleWare = require("./middleware/validationMiddleware")
const authMiddleware = require("./middleware/authMiddleware")
const newUserController=require('./controllers/newUser')
const storeUserController=require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser');
const redirectIfAuthenicateMiddleware = require('./middleware/redirectIfAuthenicateMiddleware');


app.set('view engine', 'ejs')


mongoose.connect('mongodb+srv://my_atlas_user:1234@cluster0.wfwy0.mongodb.net/my_blogposts_db',{useNewUrlParser:true})




app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extends:true}))
app.use(fileUpload())
app.use('/posts/store',validationMiddleWare)


app.use(expressSession({
    secret:'keyboard cat'
}))

app.use("*",(req,res,next)=>{
    loggedin = req.session.userId
    next()
});



let port = process.env.PORT;
if(port == null || port==""){
    port=4000;
}

app.listen(port,()=>{
    console.log('app listen')
})
app.use(flash())

app.get('/posts/new',authMiddleware,newPostController)
app.post('/posts/store', authMiddleware,storeController)
app.get('/', homeController)
// app.get('/posts/new', newPostController)
app.get('/post/:id', getPostController)
app.get('/auth/register', redirectIfAuthenicateMiddleware,newUserController)
app.post('/users/register',redirectIfAuthenicateMiddleware,storeUserController)
app.get('/auth/login', redirectIfAuthenicateMiddleware,loginController)
app.post('/users/login', redirectIfAuthenicateMiddleware,loginUserController)
app.get('/auth/logout',logoutController)


app.use((req,res)=>res.render('notFound'))


// app.get('/',async(req,res) =>{
//     const blogposts = await BlogPost.find({})
//     res.render('index',{
//         blogposts:blogposts
//     });
// })

// app.get('/about',(req,res) =>{
//     // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
//     res.render('about')
// })

// app.get('/contact',(req,res) =>{
//     // res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
//     res.render('contact')
// })




// app.get('/posts/new',(req,res) =>{
//     // res.sendFile(path.resolve(__dirname, 'pages/post.html'))
//     res.render('create')
    
// })

// app.post('/posts/store',async(req,res) =>{
//     await BlogPost.create(req.body,(error,blogpost)=>{
//         res.redirect('/')
//     })
// })

// app.post('/posts/store',(req,res) =>{
//     let image = req.files.image;
//     image.mv(path.resolve(__dirname,'public/img', image.name),async(error)=>{
        
//         await BlogPost.create({
//             ...req.body,
//             image:'/img/'+image.name

//         })
//         res.redirect('/')
//     })
// })


//2016250013 김현빈