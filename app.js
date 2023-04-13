// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
  .get((req, res) => {
    Article.find()
    .then((err, foundArticles) => {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  }).post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save()
      .then((err) => {
        if (!err) {
          res.send("Successfully added a new Article");
        } else {
          res.send(err);
        }
      });
  }).delete((req, res) => {
    Article.deleteMany({})
      .then((err) => {
        if (!err) {
          res.send("Successfully deleted Articles");
        } else {
          res.send(err);
        }
      });
  });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
