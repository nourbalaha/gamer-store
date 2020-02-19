const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path"); // alredy exists in node so we do not need to install it

// require .env only when we are not in production
if (process.env.NODE_ENV !== "production") require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

// this converts responses into json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this allows requests to backend server ie. localhost:5000
app.use(cors());

// serve all our static files into our build
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "client/build")));
    // for all get requests from client from any route, do this as a response
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    })
}

app.listen(port, error => {
    if (error) throw error;
    console.log("Server running on port " + port);
})

app.post("/payment", (req, res) => {
     const body = {
         source: req.body.token.id,
         amount: req.body.amount,
         currency: "usd",
     }

     stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr) {
            // failure status
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes});
        }
     })
})