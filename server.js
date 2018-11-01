// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;
const path = require('path');

const chrome = require('selenium-webdriver/chrome');
var fs = require('fs');

var data = fs.readFileSync('./recorder.crx');

var options = new chrome.Options();
options.addArguments( `--no-sandbox` );
options.addExtensions(data.toString('base64'));


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// http://expressjs.com/en/starter/basic-routing.html
// app.get('/', function(request, response) {
  //   response.send('Hello EXPRESSS')
  // });
  
  app.get('/', function(request, response) {
    try {
      if(request){
        let driver = new webdriver.Builder()
          .forBrowser('chrome')
          .setChromeOptions(options)
          .build();
        // var webdriver = require("selenium-webdriver");
        // var { Options } = require("selenium-webdriver/chrome");
        // var pathToExtension = "https://chrome.google.com/webstore/detail/autonomiq-dev-release-sma/cdmedbnojkdahhdbjnemegblhbaalkbc";
        // var driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(new Options().addArguments("load-extension=" + pathToExtension)).build();
        // driver.get('https://dev.autonomiq.ai').then(_ => {});  
        // driver.get("https://dev.autonomiq.ai").then(() => {
        //   response.send("hello world!!!");
        // })
        driver.get("https://en.wikipedia.org/wiki/JavaScript");
        driver.findElement(By.xpath("//div[@class='mw-parser-output']/div[1]/a[1]")).click().then(() =>
        driver.findElement(By.xpath("//div[@class='mw-parser-output']/p[2]/a[9]")).click()).then(() =>
        driver.findElement(By.xpath("//div[@class='mw-parser-output']/p[3]/a[2]")).click()).then(() =>
        driver.findElement(By.xpath("//div[@class='mw-parser-output']/p[2]/a[5]")).click());
        response.end();
    }
  }catch (err) {
    console.log(err);
  }
  // if (!request.body) return response.sendStatus(400);

  // response.send("Hello World");
});

// listen for requests :)
const listener = app.listen(2000, function() {
  console.log('Your app is listening on port ' + 2000);
});
