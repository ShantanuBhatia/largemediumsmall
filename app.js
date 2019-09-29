const rp = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.set('view engine', 'ejs'); // for rendering templates
app.use(bodyParser.urlencoded());

const options = {
	// uri: `https://onezero.medium.com/heres-how-amazon-alexa-will-recognize-when-you-re-frustrated-a9e31751daf7`,
  uri: `https://medium.com/@cogdog/medium-your-rss-feeds-are-mess-ebfe6f731c22`,
	transform: function(body){
		return cheerio.load(body);
	}
}; // for debugging

// For generating the HTML of the article
const wrappedTag = (dom_ele) => {
  return `<${cheerio(dom_ele).prop("tagName")}>${cheerio(dom_ele).html()}</${cheerio(dom_ele).prop("tagName")}>`;
}


/*
#############################################
                VIEEEEEEEEEWS                
#############################################
*/

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/tester', (req, res) => {
  
  rp(options)
  .then(($) => {
    article_content = "";
    $('article').find('p, h1, h2').each((e,v)=> {article_content += wrappedTag(v);});
    res.render('article', {art_content: article_content});
  })
  .catch((err) => {
    return(err);
  });
});

app.post('/getarticle', (req, res) => {
  rp({
    // uri: `https://onezero.medium.com/heres-how-amazon-alexa-will-recognize-when-you-re-frustrated-a9e31751daf7`,
    uri: req.body.art_url,
    pool: false,
    agent: false,
    transform: function(body){
      return cheerio.load(body);
    }
  }).then(($) => {
    article_content = "";
    $('article').find('p, h1, h2').each((e,v)=> {article_content += wrappedTag(v);});
    res.render('article', {art_content: article_content});
  })
  .catch((err) => {
    return(err);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});