import axios from "axios";

const payViaKhalti = async (data) => {
  console.log("data from orderService: ", data); //checkpoint
  const { returnUrl, websiteUrl, amount, orderId, orderName, customerInfo } =
    data;

  if (!returnUrl) throw { message: "Return url is required." };
  if (!websiteUrl) throw { message: "Website url is required." };
  if (!amount) throw { message: "Amount is required." };
  if (!orderId) throw { message: "Order id is required." };
  if (!orderName) throw { message: "Order name is required." };
  if (!customerInfo) throw { message: "Customer info is required." };

  const requestBody = {
    return_url: returnUrl,
    website_url: websiteUrl,
    amount: amount,
    purchase_order_id: orderId,
    purchase_order_name: orderName,
    customer_info: customerInfo,
  };
  console.log("requestBody : ", requestBody); //checkpoint
  console.log("KHALTI_URL:", process.env.KHALTI_URL); //checkpoint
  console.log("KHALTI_API_KEY:", process.env.KHALTI_API_KEY); //checkpoint

  const response = await axios.post(process.env.KHALTI_URL, requestBody, {
    headers: {
      Authorization: `Key ${process.env.KHALTI_API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  console.log("response from khalti: ", response); //checkpoint
  return response.data;
};

export default payViaKhalti;
