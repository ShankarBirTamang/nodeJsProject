import orderService from "../services/orderService.js"

const getAllOrders =async (req,res) => {
    const orders = await orderService.getAllOrders(req.query);

    res.json(orders);
}

const createOrder = async (req,res) => {
    const input = req.body;
    const user = req.user;
    try {
        console.log("createOrder : ",input.orderItems);
    if(!input.orderItems || input.orderItems?.length == 0)
        return res.status(422).send("Order items are required.");

    if(!input.orderItems[0]?.product)
        return res.status(422).send("Order's Product is required");

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
        res.status(error.statusCode || 500).send(error.message);
    }
   
}

const getOrdersByUser = async (req,res) => {
    const user = req.user;
    const orders = await orderService.getOrdersByUser(user.id,req.query);
    res.json(orders);
}

const getOrderById = async (req, res) => {
    const id = req.params.id;
  
    try {
      const order = await orderService.getOrderById(id);
  
      res.json(order);
    } catch (error) {
      res.status(error.statusCode || 500).send(error.message);
    }
  };

  const updateOrderStatus = async (req, res) => {
    const id = req.params.id;
    const input = req.body;
  
    try {
      await orderService.getOrderById(id);
  
      if (!input.status) return res.status(422).send("Order status is required.");
  
      const order = await orderService.updateOrderStatus(id, input.status);
  
      res.json(order);
    } catch (error) {
      res.status(error.statusCode || 500).send(error.message);
    }
  };

export {getAllOrders,createOrder ,getOrdersByUser ,updateOrderStatus, getOrderById};