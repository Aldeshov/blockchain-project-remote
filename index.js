const cool = require('cool-ascii-faces');
const express = require('express');
const url = require("url");
const path = require('path');
const PORT = process.env.PORT || 5000;
const statuses = ['pending', 'picking', 'on-way', 'delivered']

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => {
        res.writeHead(200);
        const queryObject = url.parse(req.url, true).query;
        let status = queryObject['status'];
        if (status && statuses.indexOf(status) >= 0 && statuses.indexOf(status) < 4) {
            let answer = statuses[Math.floor(Math.random() * (4 - statuses.indexOf(status)) + statuses.indexOf(status))]
            console.log("> " + status + " --> " + answer);
            res.end(answer);
        } else
            res.end(statuses[0]);
    })
    .get('/cool', (req, res) => res.send(cool()))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
