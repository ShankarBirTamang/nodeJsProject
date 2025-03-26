import orderService from "../services/orderService.js"

const getAllOrders =async (req,res) => {
    const orders = await orderService.getAllOrders();

    res.json(orders);
}

const createOrder = async (req,res) => {
    const input = req.body;
    const user = req.user;
    try {
    if(!input.orderNumber)
        return res.status(422).send("Order number is required.");

    if(!input.orderNumber || input.orderItems?.length <= 0)
        return res.status(422).send("Order items are required.");

    if(!input.orderItems || !input.orderItems[0]?.product)
        return res.status(422).send("Product is required");

    if(!input.totalPrice)
        return res.status(422).send("Total Price is required");

    if(!input.user)
        input.user = user.id;

    if(!input.shippingAddress ) {
        if(!user.address) 
            return res.status(422).send("Shipping Address is required");
        input.shippingAddress = user.address;
    }

    
        const newOrder = await orderService.createOrder(input);
        res.json(newOrder);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
   
}

const getOrderByUser = async (req,res) => {
    const user = req.user;
    const orders = await orderService.getOrderByUser(user.id);
    res.json(orders);
}

const getOrderById = async (req,res) => {
    const id = req.param.id ;
    
    try {
    const orders = await orderService.getOrderById(id);
    res.json(orders);
  
    } catch (error) {
       return  res.status(404).send(error.message);
    }
}

export {getAllOrders,createOrder ,getOrderByUser , getOrderById};