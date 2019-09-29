const rp = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');

let app = express();

const options = {
	uri: `https://onezero.medium.com/heres-how-amazon-alexa-will-recognize-when-you-re-frustrated-a9e31751daf7`,
	transform: function(body){
		return cheerio.load(body);
	}
};


const getArticle = () => {
  // rp(options)
  // .then(($) => {
  //   console.log($);
  //   return JSON.stringify($);
  // })
  // .catch((err) => {
  //   return(err);
  // });
  return "Fuck, gimme SOMETHING";
}

app.get('/', function (req, res) {
  console.log("GET on index");
  res.send(getArticle());
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});