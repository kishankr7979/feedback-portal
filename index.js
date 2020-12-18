const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const User = require('./models/User');
const authenticateUser = require('./middlewares/authenticateUser');
const app = express();

//mongodb connection
mongoose
  .connect("mongodb+srv://KishanKumar:kishankr@firstproject.sgz9l.mongodb.net/UserProject?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to mongodb cloud! :)");
  })
  .catch((err) => {
    console.log(err);
  });


app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set("view engine", 'ejs');
//cookie session
app.use(
    cookieSession({
        keys : ['randomStringAsyouliwfshk'],
    })
);
// route for serving front-end part

app
.get('/',(req,res)=>{
    res.render('index');
})
.get('/feedback',(req,res)=>{
    res.render('feedback');
})

//route for handling post request
app
.post('/feedback',(req,res)=>{
    const {email,fullname,feedback} = req.body;
    if(!email || !fullname || !feedback){
        res.send("please enter all the fields");
        return;
    }
const latestfeedback = new User({email,fullname,feedback});
latestfeedback
.save()
.then(()=>{
    res.send('Sent!');
    return;
})
.catch((err)=>console.log(err));
});

//server config
const port = 1100;
app.listen(port, () =>{
    console.log('Server is listening on port -> ',port);
});

