const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/db').mongoConnect;
const playerRoute = require('./routes/player');
const app = express();

// enabling body-parser
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.use(playerRoute);
// default
app.use("/", (req, res) => { 
    res.status(200).send("<h4> Welcome to cric API !!!! </h4>");
});

mongoConnect(()=> {
    app.listen(process.env.PORT || 8080);
})
