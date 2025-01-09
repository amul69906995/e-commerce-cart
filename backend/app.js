const express = require('express')
const app = express();
const crypto = require('crypto');
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const mongoose = require('mongoose');



async function main() {
  await mongoose.connect(process.env.MONGO_URI);

}


main()
  .then(() => { console.log("database connected") })
  .catch(err => {
    console.log(err)
    console.log(process.env.MONGO_URI)
  }
  );


//cors  
//NOTE::::: add withCredentials when u set cookies in response
var cors = require('cors')
app.use(cors({
  origin: process.env.FRONTEND_URL
}))
app.get('/', (req, res) => {
  res.send('hello world')
})
//stripe coupan code and id matching
const coupon = [
  { discountCoupon: "10OFF", couponId: "10" },
  { discountCoupon: "20OFF", couponId: "gSEiFQ46" },
  { discountCoupon: "30OFF", couponId: "GLYjerLy" },
  { discountCoupon: "40OFF", couponId: "rJuFG6m8" },
  // { discountCoupon: "50OFF", couponId:"pN9y5cyj"}
]
//stri50
//start
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
app.post('/checkout', async (req, res) => {
  const { cartItems, discountCoupan } = req.body;
  console.log(cartItems, "discountcoupan", discountCoupan);
  try {
    let line_items = cartItems.map(item => (
      {
        price_data: {
          currency: 'inr',// Stripe predefined field 
          product_data: {
            name: item.title,// Stripe predefined field  
            description: item.description,
            images: [item.image]
          },
          unit_amount: item.price * 100
        },
        quantity: item.qty,
      }
    ))
    //console.log(`${process.env.FRONTEND_URL}/checkout?success=true`)
    //console.log('Line Items:', JSON.stringify(line_items, null, 2));
    //find coupon based on discountCoupan from frontend if discount is there
    let couponMatch;
    if (discountCoupan) {
      couponMatch = coupon.find(item => item.discountCoupon === discountCoupan);
      if (!couponMatch) {
        return res.status(400).json({ error: 'Invalid Coupon' })
      }
    }
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      ...(discountCoupan ? { discounts: [{ coupon: couponMatch.couponId }] } : {}),
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/checkout?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout?success=false`,
    })

    // console.log(session.id)
    res.json({ sessionId: session.id, sessionUrl: session.url })
  } catch (error) {
    console.log(error)
  }
})

//pay with crypto
app.post('/crypto-checkout',async(req, res) => {
  const { cartItems, discountCoupan } = req.body;
  console.log(cartItems, "discountcoupan", discountCoupan);
  try {
    let totalPrice = cartItems.reduce((acc, curr) => acc + (curr.qty) * (curr.price), 0).toFixed(2);
    let couponMatch;
    if (discountCoupan) {
      couponMatch = coupon.find(item => item.discountCoupon === discountCoupan);
      if (!couponMatch) {
        return res.status(400).json({ error: 'Invalid Coupon' })
      }
      const discountString = couponMatch.discountCoupon.slice(0, -3); // Remove the last 3 characters (e.g., "OFF")
      const discountPercentage = parseInt(discountString, 10); // Convert the string to an integer

      // Apply the discount to the total price
      const discountAmount = (totalPrice * discountPercentage) / 100;
      totalPrice = totalPrice - discountAmount;

      console.log(`Applied ${discountPercentage}% discount: -${discountAmount}`);
    }
    console.log("total price after discount", totalPrice)
    const coinbaseCheckoutUrl = "https://api.commerce.coinbase.com/charges"
    const headers = {
      "Content-Type": "application/json",
      "X-CC-Api-Key": `${process.env.COINBASE_API_SECRET}`,
    };
    const body = {
      "local_price": {
        "amount": totalPrice,
        "currency": "INR"
      },
      "pricing_type": "fixed"
    }
    const response = await fetch(coinbaseCheckoutUrl, {
      method:"POST",
      headers: headers,
      body: JSON.stringify(body)
      })
      const paymentRequest = await response.json();
      console.log(paymentRequest.data.hosted_url)
      res.json({url:paymentRequest.data.hosted_url});
  } catch (error) {
    console.log("error in crypto checkout controller")
  }
})

//verify the charge status using coinbase webhook
app.post('/crypto-checkout-verify', async (req, res) => {
  const signature = req.headers['x-cc-webhook-signature'];
  const payload = JSON.stringify(req.body);

  try {
    // Verify the webhook signature
    const hmac = crypto.createHmac('sha256', process.env.COINBASE_WEBHOOK_SECRET);
    hmac.update(payload, 'utf8');
    const computedSignature = hmac.digest('hex');

    if (computedSignature !== signature) {
      console.error('Invalid webhook signature');
      return res.status(400).send('Invalid signature');
    }

    console.log('Webhook verified successfully',signature,req.body);

    // Process the webhook event
    const event = req.body;

    if (event.type === 'charge:confirmed') {
      console.log(`Charge confirmed: ${event.data.id}`);
      
      // // Fetch the charge details (optional, but recommended for extra verification)
      // const chargeDetails = await getChargeDetails(event.data.id);
      // console.log('Charge details:', chargeDetails);

      // Update your database or system with successful payment status
      res.status(200).send('Payment confirmed');
    } else if (event.type === 'charge:failed') {
      console.log(`Charge failed: ${event.data.id}`);
      res.status(200).send('Payment failed');
    } else {
      res.status(200).send('Event received');
    }
  } catch (error) {
    console.error('Error processing webhook:', error.message);
    res.status(500).send('Internal server error');
  }
  //u can also use  socket or long polling to notify frontend about payment status
});


//end
app.use((err, req, res, next) => {
  const { message = "something went wrong/default message to debug u have to dig dipper", statusCode = 500 } = err
  console.log("**********error**************")
  console.log("**********error**************")
  console.log(message, statusCode)//helps in deployment to see error 
  console.log("**********error**************")
  console.log("**********error**************")
  res.status(statusCode).json({ message })
})


app.listen(process.env.PORT || 5008, () => { console.log(`server started on port ${process.env.port}`) })
