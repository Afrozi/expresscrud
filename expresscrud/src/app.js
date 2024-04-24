const express = require("express");
const app = express();
const port = 8000;
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const newmodel = require("./model/model");
const methodoverride = require("method-override");
require("./db/connect");
const path = require("path");
app.set("views",path.join(__dirname,"../views"))
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
// show router
app.get("/chats", async(req,res)=>{
    let chat = await newmodel.find();
    res.render("index",{chat});
})

//create router
app.get("/chats/new",(req,res)=>{
   res.render("new");
})
// create login router
// app.get("/sign",(req,res)=>{
//    res.render("new");
// })
// // create login data router
// app.post("/login", async(req,res)=>{
//     let email = req.body.email;
//     let password = req.body.password;
//    let getemail = await newmodel.findOne({
//      email:email,
//    });
//    const passwordreal = await bcrypt.compare(password,getemail.password);
//    if (passwordreal) {
//        res.redirect("/chats");
//    }else{
//     res.send("password are not matching......");
//    }
// })
// create insert router
app.post("/chats",(req,res)=>{
    let {name,email,password,cpassword} = req.body;
    if (password == cpassword) {
        let chatsnew = new newmodel({
            name:name,
            email:email,
            password:password,
            cpassword:cpassword,
         });
          chatsnew.save().then(()=>{
            console.log("saved data");
          }).catch((err)=>{
            console.log(err);
          })
        //   res.render("alert");
        res.redirect("/chats");
    }else{
        console.log("password are not match");
    }
})
// edit router
app.get("/chats/:id/edit", async(req,res)=>{
    let {id} = req.params;
    let kartar = await newmodel.findById(id);
    res.render("edit",{kartar});
})
// edit data router
app.put("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    let {name:newname,email:newemail,password:newpassword,cpassword:newcpassword} = req.body;
        let updatedata = await newmodel.findByIdAndUpdate(id,{
            name:newname,
            email:newemail,
            password:newpassword,
            cpassword:newcpassword,
        },{runValidators:true,new:true});
        console.log(updatedata);
        res.redirect("/chats");
})
//delete router
app.delete("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    let deletechat = await newmodel.findByIdAndDelete(id);
    console.log(deletechat);
    res.redirect("/chats");
})
app.get("/",(req,res)=>{
    res.send("hello world");
})
app.listen(port,(err)=>{
    console.log("connected");
})