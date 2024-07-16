import { Subscription, Package, User } from "../../Model/association.js";
import midtransService from "../../service/midtransService.js";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../Model/association.js";
import { GetOneMonthLater, getDate } from "../../utils/getDateTimezone.js";
import axios from "axios";

export const createSubscription = async (req, res) => {
  // get user
  const user = req.user;

  // find userId by email
  const findUserId = await User.findOne({ where: { email: user.email } });

  // get package_id and payment_type from req.body
  const { package_id, payment_type } = req.body;

  // find package by package_id
  const packageId = await Package.findByPk(package_id);

  try {
    // check if package_id not found
    if (!packageId) {
      return res.status(400).json({ message: "Package not found" });
    }

    // check if user already premium
    if (findUserId.premium === true) {
      return res.status(400).json({ message: "You already premium" });
    }

    // check if payment_type not valid
    if (!["qris", "gopay", "cstore"].includes(payment_type)) {
      return res.status(400).json({ message: "Payment type not valid" });
    }

    // create order_id
    const orderId = `order-${uuidv4()}`;

    // initiate payment to midtrans
    const initiatePaymentResponse = await midtransService.initiatePayment(
      orderId,
      packageId.price,
      findUserId.id,
      payment_type
    );

    // create subscription
    const result = await sequelize.transaction(async (t) => {
      const subscription = await Subscription.create(
        {
          order_id: orderId,
          amount: packageId.price,
          package_id: packageId.id,
          customer_id: findUserId.id,
          payment_type: payment_type,
          transaction_id: initiatePaymentResponse.transaction_id,
          transaction_status: "pending",
          qr_url: initiatePaymentResponse.qr_code,
          cstore_code: initiatePaymentResponse.cstore_code,
          created_at: await getDate(),
        },
        { transaction: t }
      );

      return subscription;
    });

    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getStatusSubcription = async (req, res) => {
  const user = req.user;

  try {
    const findSubcriptionOrderId = await Subscription.findOne({
      where: { order_id: req.params.order_id },
    });
    if (!findSubcriptionOrderId) {
      return res.status(400).json({ message: "Subcription not found" });
    }

    const fetchStatusTransaction = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${findSubcriptionOrderId.transaction_id}/status`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Basic U0ItTWlkLXNlcnZlci1QTEdSaURPdi1wbnkyX01XVjItanhNZVg6",
        },
      }
    );

    if (!fetchStatusTransaction)
      return res.status(400).json({ message: "Transaction not found" });

    // update status transaction

    if (fetchStatusTransaction.data.transaction_status === "settlement") {
      await Subscription.update(
        { transaction_status: fetchStatusTransaction.data.transaction_status },
        { where: { order_id: req.params.order_id } }
      );

      // update user premium
      const findUserId = await User.findOne({ where: { email: user.email } });
      await User.update(
        { premium: true, premium_expired: await GetOneMonthLater() },
        { where: { id: findUserId.id } }
      );

      // update premium_expired
    }

    return res.status(200).json({
      message: "Success get status transaction",
      data: fetchStatusTransaction.data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
