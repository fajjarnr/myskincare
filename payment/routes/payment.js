var express = require('express');
var router = express.Router();
require('dotenv').config();

const front = process.env.FRONT_PAGE;

const Stripe = require('stripe');

const stripe = Stripe(
  'sk_test_51KPoSxHrB7XJ14VnL0yelP2e45aZwOGvmYHDviQC8JIrU7aE3ud67EIlxQVjJiTOHTboaClf9xi0GVZqaAP5iGQu00A9P73Loo'
);

router.get('/', function (req, res, next) {
  res.status(200).json({ message: 'health' });
});

router.post('/checkout', async (req, res) => {
  try {
    const { name, description, imageUrl, price } = req.body.product;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          name: name,
          description: description,
          amount: 1500,
          currency: 'usd',
          quantity: 1,
          images: [imageUrl],
        },
      ],
      success_url: `${front}/success`,
      cancel_url: `${front}`,
    });

    res.send({ url: session.url });
  } catch (err) {
    res.send({ error: err.message });
  }
});

module.exports = router;
