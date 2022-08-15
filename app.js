//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash")
const mongoose= require("mongoose")
//mongoose.connect("mongodb://localhost:27017/postsDB")
mongoose.connect("mongodb+srv://vineeth:vineethk%4096@cluster0.rvyzcfc.mongodb.net/postsDB")
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
//var posts=[];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const postSchema={
  title: String,
  content: String
}
const Post= mongoose.model("Post",postSchema)
app.get("/",function(req,res){
  Post.find(function(err,posts){

      res.render("home",{
          pageInfo:"Home",content1:homeStartingContent, newPosts:posts
      })
  })
})
app.get("/about",function(req,res){
  Post.find(function(err,posts){

      res.render("home",{
          pageInfo:"About",content1:aboutContent, newPosts:posts
      })
  })
})
  app.get("/contact",function(req,res){
    Post.find(function(err,posts){

        res.render("home",{
            pageInfo:"Contact",content1:contactContent, newPosts:posts
        })
    })
})
app.get("/compose",function(req,res){
  res.render("compose",{
    pageInfo:"Compose"
  })
})
app.get("/posts/:key",function(req,res){
  //console.log(req.params.key)
  Post.find(function(err,posts){
    posts.forEach(function(post)
    {
       // console.log(_.lowerCase(post.newTitle))
       // console.log(_.lowerCase(req.params.key))
      if(_.lowerCase(post.title)===_.lowerCase(req.params.key))
      {
        console.log("match found")
        res.render("post",{
          Title:post.title, Content: post.content
        })
      }
      else
      {
        console.log("match not found")
      }

    })
  })
})
app.post("/",function(req,res){
  // var newTitle= req.body.title
  // var newContent= req.body.content
  const newPost= new Post({
    title:req.body.title,
    content:req.body.content
  })
  newPost.save()
  // var post ={
  //   newTitle: req.body.title,
  //   newContent: req.body.content
  // }
  // posts.push(post)
  res.redirect("/")
  //console.log(posts)
  // console.log(newTitle)
  // console.log(newContent)
})












let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(){
  console.log("server started successfully")
})
