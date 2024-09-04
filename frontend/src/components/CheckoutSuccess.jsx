import React from 'react'
import { useSearchParams } from 'react-router-dom'
const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success')
    console.log("success", success)
    return (
        <>
            <div style={{ marginTop: '100px' }}>
                {success === "true" ? "payment success" : " payment failed"}
            </div>
        </>
    )
}

export default CheckoutSuccess;
