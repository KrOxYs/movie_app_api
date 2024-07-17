import midtransClient from "midtrans-client";
import "dotenv/config";
import { proccesPaymentResponse } from "../helper/subscriptionHelper.js";

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const initiatePayment = async (order_id, amount, costomer_id, payment_type) => {
  const parameter = {
    payment_type: payment_type,
    transaction_details: {
      order_id,
      gross_amount: amount,
    },
    customer_details: {
      first_name: costomer_id,
      email: costomer_id,
    },
  };
  switch (payment_type) {
    case "qris":
      parameter.qris = {
        acquirer: "gopay",
      };
      break;
    case "cstore":
      parameter.cstore = {
        store: amount === 123 ? "indomaret" : "alfamart",
        message: "payment at convenience store",
      };
  }

  try {
    console.log("Initiating payment with parameters:", parameter);

    const response = await coreApi.charge(parameter);
    // console.log("Payment response from Midtrans:", response);

    return proccesPaymentResponse(response);
  } catch (error) {
    console.error(
      "Error initiating payment:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to initiate payment");
  }
};

export default { initiatePayment };
