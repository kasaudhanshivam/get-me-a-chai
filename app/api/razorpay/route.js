import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/payment";
import Razorpay from "razorpay";
import mongoose from "mongoose";
import User from "@/models/user";


export const POST = async (req) => {
    const client = await mongoose.connect(process.env.MONGODB_URI); 
    let body = await req.formData();
    body = Object.fromEntries(body);


    // check if razorpay id is present on the server
    let p = await Payment.findOne({ oid: body.razorpay_order_id });

    if (!p) {
        return NextResponse.json({success: false , message: "Order id not found"});
    }


    // fetch the secret and id of the user who is getting paid
    let user = await User.findOne({ username: p.to_user });
    const secret = user.razorpaySecret;






    let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, secret);


    if (xx) {
        const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: "true" }, { new: true });
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
    }

    else{
        return NextResponse.json({success: false , message: "Payment verification failed"});
    }
}