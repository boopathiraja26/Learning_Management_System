import razorpay from "../config/razorpay.js";
import Course from "../models/Course.js";
import Payment from "../models/Payment.js";
import crypto from "crypto";

// ======================================
// Create Razorpay Order
// ======================================
export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const options = {
      amount: course.price * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      user: req.user._id,
      course: courseId,
      razorpay_order_id: order.id,
      amount: course.price,
      status: "created",
    });

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const payment = await Payment.findOne({
      razorpay_order_id,
    });

    payment.razorpay_payment_id = razorpay_payment_id;
    payment.razorpay_signature = razorpay_signature;
    payment.status = "paid";

    await payment.save();

    // ENROLL USER AFTER PAYMENT
    const course = await Course.findById(courseId);

    if (!course.students.includes(req.user._id)) {
      course.students.push(req.user._id);
      await course.save();
    }

    res.status(200).json({
      success: true,
      message: "Payment successful & enrolled",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};