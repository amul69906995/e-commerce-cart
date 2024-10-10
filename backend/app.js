const express = require('express')
const app = express()
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
  { discountCoupon: "40OFF", couponId: "pN9y5cyj" },
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
    if (discountCoupan) {
      const couponMatch = coupon.find(item => item.discountCoupon === discountCoupan);
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