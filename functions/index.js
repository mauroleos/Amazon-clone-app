const functions = require('firebase-functions');
const express = require("express")
const cors = require("cors");
// const { response } = require('express');
const stripe = require("stripe")("sk_test_51I3SOJKCJDPtSimotmaTXcLnDN4gd1JhAsaIVlzP4OnDGPh0OvX3VP5ydNRjGPYpIyiP6F5t6uf5CbXFzEpi7opK00m8g0hQaM")

//API

//API config
const app = express();

//Middlewares
app.use(cors({ origin: true }))
app.use(express.json());

//API routes
app.get("/", (request, response) => response.status(200).send("hello world"))

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Received BOOM!!! for this amount >>> ", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: "usd",
    });

    //OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//Listen command 
exports.api = functions.https.onRequest(app)
