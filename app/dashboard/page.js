"use client"

import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { updateProfile, fetchuser } from '@/actions/userActions'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'



const page = () => {

    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        profilePicture: '',
        coverPicture: '',
        razorpayId: '',
        razorpaySecret: ''
    })

    useEffect(() => {
        if (session) {
            getData()
        }
    }, [session])

    useEffect(() => {
        if (!session) {
            router.push("/login")
        }
    }, [session, router])


    const getData = async () => {
        let u = await fetchuser(session.user?.name)
        console.log(u)
        setForm({
            name: u.name || '',
            email: u.email || '',
            username: u.username || '',
            profilePicture: u.profilePicture || '',
            coverPicture: u.coverPicture || '',
            razorpayId: u.razorpayId || '',
            razorpaySecret: u.razorpaySecret || '',
        })
    }


    const handleSubmit = async (e) => {
        // update()
        let a = await updateProfile(e, session.user.name)
        toast.success('Profile Updated!', {
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
        router.push(`/${form.username}`);
    }


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <div className='dashboard pb-14'>
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
            <h1 className='font-bold text-3xl pb-3 text-center py-10'>Welcome to your Dashboard</h1>
            <form className='mx-auto flex-col flex w-[45%] gap-2 text-center' action={handleSubmit}>


                <input onChange={handleChange} name='name' value={form.name} type="text" className='my-2 h-9 p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                <input onChange={handleChange} name='email' value={form.email} type="text" className='my-2 h-9 p-3 rounded-lg bg-slate-800' placeholder='Enter Email' />
                <input onChange={handleChange} name='username' value={form.username} type="text" className='my-2 h-9 p-3 rounded-lg bg-slate-800' placeholder='Enter Username' />
                <input onChange={handleChange} name='profilePicture' value={form.profilePicture} type="text" className='my-2 h-9 p-3 rounded-lg bg-slate-800' placeholder='Enter Profile Picture URL' />
                <input onChange={handleChange} name='coverPicture' value={form.coverPicture} type="text" className='my-2 h-9 p-3 rounded-lg bg-slate-800' placeholder='Enter Cover Picture URL' />
                <input onChange={handleChange} required name='razorpayId' value={form.razorpayId} type="text" className='my-2 h-9 p-3 rounded-lg bg-slate-800' placeholder='Enter RazorPay Id' />
                <input onChange={handleChange} required name='razorpaySecret' value={form.razorpaySecret} type="text" className='my-2 h-9 p-3 rounded-lg bg-slate-800' placeholder='Enter RazorPay Secret' />
                <button type="submit" className="text-white w-full my-2 bg-gradient-to-br from-purple-700 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>


            </form>
        </div>
    )
}

export default page