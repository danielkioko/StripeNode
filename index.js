var express = require('express');
var stripe = require('stripe')('sk_test_x2AoPyyXA57iY9Kqu3f5pg0U');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.post('/ephemeral_keys', (req, res) => {
    var customer_id = req.body.customer_id;
    var api_version = req.body.api_version;

    stripe.ephemeralKeys.create(
        {customer: customer_id},
        {stripe_version: api_version}
    ).then((key) => {
        res.status(200).send(key)
    }).catch((err) => {
        res.status(500).end()
    });
    
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'))
});