/*jshint esversion: 8 */

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let reviews = JSON.parse(fs.readFileSync("data/reviews.json", "utf8")).reviews;
let dealerships = JSON.parse(fs.readFileSync("data/dealerships.json", "utf8")).dealerships;

app.get('/', async (req, res) => {
  res.send("Welcome to the Dealerships API");
});

app.get('/fetchReviews', async (req, res) => {
  res.json(reviews);
});

app.get('/fetchReviews/dealer/:id', async (req, res) => {
  const dealerReviews = reviews.filter(
    (review) => String(review.dealership) === String(req.params.id)
  );
  res.json(dealerReviews);
});

app.get('/fetchDealers', async (req, res) => {
  res.json(dealerships);
});

app.get('/fetchDealers/:state', async (req, res) => {
  const stateDealers = dealerships.filter(
    (dealer) => dealer.state.toLowerCase() === req.params.state.toLowerCase()
  );
  res.json(stateDealers);
});

app.get('/fetchDealer/:id', async (req, res) => {
  const dealer = dealerships.filter(
    (dealer) => String(dealer.id) === String(req.params.id)
  );
  res.json(dealer);
});

app.post('/insert_review', async (req, res) => {
  const data = req.body;
  const newId = reviews.length ? Math.max(...reviews.map((review) => review.id)) + 1 : 1;
  const review = {
    id: newId,
    name: data.name,
    dealership: data.dealership,
    review: data.review,
    purchase: data.purchase,
    purchase_date: data.purchase_date,
    car_make: data.car_make,
    car_model: data.car_model,
    car_year: data.car_year,
  };

  reviews.push(review);
  res.json(review);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
