import PaymentPage from '@/components/PaymentPage'
import React from 'react'

const userrname = async ({ params }) => {
    const { username } = await params;
    return (
        <>
           <PaymentPage username={username} />
        </>
    )
}

export default userrname

export async function generateMetadata({params}) {
  const { username } = await params;
 return {
    title: `Support ${username} - Get me a chai`,
  }   
}