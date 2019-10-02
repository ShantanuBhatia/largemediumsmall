/*
################################################
                DEPENDENCIEEEEES
################################################
*/
const rp = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.set('view engine', 'ejs'); // for rendering templates
app.use(bodyParser.urlencoded());


/*
################################################
                BUSINESS LOGIIIC
################################################
*/

// For generating the HTML of the article
const wrappedTag = (dom_ele) => {

  // cheerio(dom_ele).each(() => {
  //   cheerio(this).removeClass();
  // });

  return `<${cheerio(dom_ele).prop("tagName")}>${cheerio(dom_ele).html()}</${cheerio(dom_ele).prop("tagName")}>`;
}

/*
################################################
                VIEEEEEEEEEEEEWS
################################################
*/

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/getarticle', (req, res) => {
  rp({
    // uri: `https://onezero.medium.com/heres-how-amazon-alexa-will-recognize-when-you-re-frustrated-a9e31751daf7`, - testing
    uri: req.body.art_url,
    pool: false,
    agent: false,
    transform: function(body){
      return cheerio.load(body);
    }
  }).then(($) => {
    article_content = "";
    $('article').find('p, h1, h2, pre').each((e,v)=> {article_content += wrappedTag(v);});
    res.render('article', {art_content: article_content});
  })
  .catch((err) => {
    return(err);
  });
});


/*
################################################
                SERVEEEEEEEEEEER
################################################
*/


app.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});