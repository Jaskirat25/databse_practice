const express = require('express');
const app = express();
const path=require('path');
const user=require('./models/user');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine',"ejs");
app.get('/',(req,res)=>{
res.render('app');

})
app.get('/read', async (req,res)=>{

let users = await user.find();
res.render('read',{users});
})
app.post('/create', async (req,res)=>{
    let{name,email,image}=req.body;
  let created= await user.create({
        name,
        email,
        image
 })
res.redirect('read');
})
app.get('/delete/:id', async (req,res)=>{

    let users = await user.findOneAndDelete({_id:req.params.id});
    res.redirect('/read');
    })
app.get('/edit/:id', async (req,res)=>{

    let u = await user.findOne({_id:req.params.id});
    res.render('edit',{u});
    })
app.post('/update/:id', async (req,res)=>{
let{name,email,image}=req.body;
    let updated = await user.findOneAndUpdate({_id:req.params.id},{name:name,email:email,image:image},{new:true});
    res.redirect('/read');
    })

app.listen(3000);