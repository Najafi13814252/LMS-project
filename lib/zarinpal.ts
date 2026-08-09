import axios from "axios"

const ZARINPAL_BASE_URL = process.env.ZARINPAL_BASE_URL!
const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID!

type RequestPaymentParams = {
    amount: number
    description: string
    callbackUrl: string
    email?: string
}

export async function requestPayment({
    amount,
    description,
    callbackUrl,
    email
}: RequestPaymentParams) {

    // ارسال اطلاعات به زرین پال 
    const response = await axios.post(
        `${ZARINPAL_BASE_URL}/pg/v4/payment/request.json`,
        {
            merchant_id: ZARINPAL_MERCHANT_ID,
            amount,
            currency: "IRT",
            description,
            callback_url: callbackUrl,

            metadata: {
                email
            },
        },
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    )

    return response.data
}


type VerifyPaymentParams = {
    amount: number
    authority: string
}

// اعتبار سنجی پرداخت 
export async function verifyPayment({
    amount,
    authority,
}: VerifyPaymentParams) {

    const response = await axios.post(
        `${ZARINPAL_BASE_URL}/pg/v4/payment/verify.json`,
        {
            merchant_id: ZARINPAL_MERCHANT_ID,
            amount,
            authority,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    )

    return response.data
}