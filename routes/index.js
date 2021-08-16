var express = require('express');
var router = express.Router();
var { estaciones, collectTimes } = require('./data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', estaciones: estaciones.map(e => ({ name: e })) });
});

router.get("/times", function (req, res, next) {
    const origin = req.query["origin"]
    const destination = req.query["destination"]
    if (!origin) {
        throw Error("origin is required")
    }
    if (!destination) {
        throw Error("destination is required")
    }
    res.send(collectTimes(origin, destination, false))
})

module.exports = router;
