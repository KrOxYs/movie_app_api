export const proccesPaymentResponse = async (response) => {
  const {
    transaction_id,
    transaction_status,
    payment_type,
    status_code,
    status_message,
  } = response;

  if (!transaction_id || !transaction_status || !payment_type) {
    throw new Error("Invalid payment response");
  }

  const commonResponse = {
    transaction_id,
    transaction_status,
    payment_type,
    status_code,
    status_message,
  };

  switch (payment_type) {
    case "qris":
      if (
        Array.isArray(response.actions) &&
        response.actions[0] &&
        response.actions[0].url
      ) {
        return {
          ...commonResponse,
          qr_code: response.actions[0].url,
        };
      }
    case "gopay":
      return {
        ...commonResponse,
        qr_code: response.actions[0].url,
      };
    case "cstore":
      return {
        ...commonResponse,
        cstore_code: response.payment_code,
      };
    default:
      throw new Error("Unknown payment type");
  }
};
