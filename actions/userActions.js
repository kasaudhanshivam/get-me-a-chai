"use server"

import Razorpay from "razorpay"
import Payment from "@/models/payment"
import User from "@/models/user"
import mongoose from "mongoose"



export const initiate = async (amount, to_username, paymentform) => {
    let client = await mongoose.connect(process.env.MONGODB_URI);

    // fetch the secret and id of the user who is getting paid
    let user = await User.findOne({ username: to_username });
    const secret = user.razorpaySecret;


    var instance = new Razorpay({ key_id: user.razorpayId, key_secret: secret })


    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    await Payment.create({
        amount: amount,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message,
        oid: x.id,
    })
    return x
}


export const fetchuser = async (username) => {
    let client = await mongoose.connect(process.env.MONGODB_URI);

    let u = await User.findOne({ username: username })
    let user = JSON.parse(JSON.stringify(u))
    return user
}


export const fetchuser1 = async (email) => {
    let client = await mongoose.connect(process.env.MONGODB_URI);

    let u = await User.findOne({ email: email })
    let user = JSON.parse(JSON.stringify(u))
    return user
}

export const fetchname = async (email) => {
    let client = await mongoose.connect(process.env.MONGODB_URI);

    let u = await User.findOne({ email: email })
    let user = JSON.parse(JSON.stringify(u))
    return user.name
}

export const fetchusername = async (email) => {
    let client = await mongoose.connect(process.env.MONGODB_URI);
    let u = await User.findOne({ email: email })
    let user = JSON.parse(JSON.stringify(u))
    return user.username
}

export const fetchpayments = async (username) => {
    let client = await mongoose.connect(process.env.MONGODB_URI);

    //find all payments sorted by decreasing order of amount and flatten the object ids
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
    let payments = JSON.parse(JSON.stringify(p))
    console.log("Payements: ", payments)
    return payments 
}


export const updateProfile = async (data, oldUsername) => {
    let client = await mongoose.connect(process.env.MONGODB_URI);

    let ndata = Object.fromEntries(data)

    if(oldUsername !== ndata.username){
        let u = await User.findOne({ username: ndata.username })
        if(u){
            return { error: "Username already exists" }
        }
    }


    await User.updateOne({ email: ndata.email }, ndata);
}