import api from "./axios";

// Create Razorpay Order
export const createOrder = async (courseId) => {
  const { data } = await api.post(
    `/payment/create-order/${courseId}`
  );

  return data;
};

// Verify Payment
export const verifyPayment = async (paymentData) => {
  const { data } = await api.post(
    "/payment/verify",
    paymentData
  );

  return data;
};