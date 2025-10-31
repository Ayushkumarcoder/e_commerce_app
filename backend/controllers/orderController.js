import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "inr";
const deliveryCharge = 10;

//gateway initialize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing order using cod

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: "false",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    //to clear the cart after saving
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//placing order using stripe

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: "false",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    //session for payment

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//verifying the payment of stripe

const verifyStripe = async(req, res) => {
    const {userId, success, orderId} = req.body;

    try {

        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}});
            const res = await orderModel.updateOne(
              { _id: orderId },
              { $push: { orders: orderId } }
            );
            res.json({success: true});
            console.log("Order verified and added to user's orders",res);
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false});
        }
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
        
    }
}

//placing order using Razorpay

// const placeOrderRazorpay = async (req, res) => {};

//all orders data for admin panel
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//user  orders data for frontend

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update order status from the admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  getUserOrders,
  userOrders,
  updateStatus,
  verifyStripe,
};
