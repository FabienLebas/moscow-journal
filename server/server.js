const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadFile = require('./uploadFile.js');

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
})
const upload = multer({ storage: storage })

const port = process.env.PORT || 4000;

app.use(function(request, result, next) {
    const allowedOrigins = ['http://localhost:3000', 'https://localhost:3000', 'http://localhost:4000', 'https://localhost:4000'];
    const origin = request.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        result.setHeader('Access-Control-Allow-Origin', origin);
    };
    result.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    result.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, x-api-key, Accept"); // Needed by ExpressJS
    request.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, x-api-key, Accept");
    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

app.use("/static", express.static('build/static'));

app.get("/favicon.ico", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/favicon.ico"));
});

app.get("/robots.txt", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/robots.txt"));
});

app.post('/api/uploadFile', upload.single('file'), function(req, res) {
    uploadFile(req.file.path)
    .then(result => res.json(result))
    .catch(error => {
      console.warn(`Error in post /api/uploadFile : ${error}`);
    })
});

app.get("*", function (request, result) {
  result.sendFile(__dirname + "/build/index.html");
});
