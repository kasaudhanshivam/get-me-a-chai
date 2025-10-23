"use client"

import React, { useEffect } from 'react'
import Script from 'next/script'
import { initiate, fetchpayments, fetchuser, fetchuser1 } from '@/actions/userActions'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {

    const { data: session } = useSession()
    let [paymentform, setPaymentForm] = useState({ name: '', message: '', amount: '' });


    const [currentUser, setCurrentUser] = useState({})

    const [payments, setPayments] = useState([])

    const searchParams = useSearchParams()

    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])


    
    useEffect(() => {
        if (!session) {
            router.push("/login")
        }
    }, [session, router])




    useEffect(() => {
        if(searchParams.get("paymentdone") == "true"){
            toast.success('Payment Successful! Thanks for your donation.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
            }
            router.push(`/${username}`)
    }, [])



    const getData = async () => {
        let u = await fetchuser(username)
        setCurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }



    const pay = async (amount) => {

        if(paymentform.name.trim() === ''){
            toast.error('Name is required to proceed with the payment.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            return;
        }

        if(amount === null || amount === undefined || isNaN(amount) || amount <= 0){
            toast.error('Invalid amount. Please enter a valid amount to proceed with the payment.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            return;
        }

        // get the order id from the server
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id;

        var options = {
            "key": currentUser.razorpayId,
            "amount": amount,
            "currency": "INR",
            "name": "Get me a Chai",
            "description": "Test Transaction",
            "image": process.env.NEXT_PUBLIC_LOGO,
            "order_id": orderId,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": "Shivam Kasaudhan",
                "email": "shivam@gmail.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };


        var rzp1 = new window.Razorpay(options);
        rzp1.open();


    }

    const handleChange = (e) => {
        setPaymentForm({ ...paymentform, [e.target.name]: e.target.value })
    }


    return (
        <>
            <Script src={process.env.NEXT_PUBLIC_CHECKOUT_URL}></Script>


            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />



            <div className='cover w-full bg-slate-100 relative'>
                <img className='object-cover w-full h-[350px]' src={currentUser.coverPicture?currentUser.coverPicture:'default'} alt="cover" />
                <div className="profile absolute mx-auto -bottom-20 right-[43.3%] border-white border-2 rounded-full h-[180px] w-[180px] overflow-hidden">
                    <img src={currentUser.profilePicture?currentUser.profilePicture:'default'} alt="profile" />
                </div>
            </div>
            <div className="info py-20 flex flex-col items-center justify-center gap-2 mx-auto text-center">
                <h1 className='font-bold pt-2'>@{username}</h1>
                <p>Lets help {currentUser.name?currentUser.name:'null'} to get a chai!</p>
                <p className='text-gray-400'>{payments.length} Payments . ₹{(payments.reduce((a, b) => a + b.amount, 0))/100} Raised</p>
            </div>

            <div className='payment flex gap-3 w-[80%] mx-auto pb-10'>
                <div className="supporters w-1/2 bg-slate-900 p-5 rounded-2xl">

                    <h3 className='font-bold text-lg'>Supporters</h3>
                    <ul className='pl-2 pt-2'>
                        {payments.length === 0 && <p className='my-3'>No payments yet.</p>}
                        {payments.map((payment, index) => {
                            return (<li key={index} className='my-2 flex items-center gap-2'>
                                <span><img width={28} height={28} src="./avatar.gif" alt="" /></span>
                                {payment.name} donated <span className='font-bold text-yellow-500'>₹{(payment.amount) * 0.01}</span> with message - {payment.message}
                            </li>
                            )
                        })
                        }
                    </ul>

                </div>

                <div className="make-payment w-1/2 bg-slate-900 p-5 rounded-2xl">
                    <h2 className='font-bold text-xl pb-2'>Make a Payment</h2>

                    <input onChange={handleChange} name='name' value={paymentform.name} type="text" className='my-2 h-9 w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                    <input onChange={handleChange} name='message' value={paymentform.message} type="text" className='my-2 h-9 w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                    <input onChange={handleChange} name='amount' value={paymentform.amount} type="text" className='my-2 h-9 w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                    <button onClick={() => pay(paymentform.amount * 100)} type="button" className="text-white w-full my-2 bg-gradient-to-br from-purple-700 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay</button>
                    <div className="flex gap-3 pt-3">
                        <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
                        <button className='bg-slate-800 p-2 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                        <button className='bg-slate-800 p-2 rounded-lg' onClick={() => pay(5000)}>Pay ₹50</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PaymentPage