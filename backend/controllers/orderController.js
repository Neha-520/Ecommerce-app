const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    })

    res.status(201).json({
        success: true,
        order
    })
})

//Get Single Order Details
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate(
        "user",
        //user id from order model will be searched in user model & we'll get name, email of user with user order id inside user field
        "name email"
    )

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    res.status(200).json({
        success: true,
        order,
    })
})


//Get logged in Users Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    })
})


//Get All Orders --Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });



    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })
})

// Update Order Status --Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.productId, o.quantity);
        });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false })
}

//Delete Orders --Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);
    if (!order)
        return next(new ErrorHandler("Order not found with this Id", 404));

    await order.remove()

    res.status(200).json({
        success: true,
    })
})