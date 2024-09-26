const Razorpay = require('razorpay');
const Order = require('../Model/Orders')

exports.purchasePremium = (req, res, next) => {

    try {
        //implies that it's is atish's company trying to create an order.INSTANTIATING ORDER

        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        const amount = 2500;
        const currency = 'INR';
        rzp.orders.create({ amount, currency }, (err, order) => { //order created
            if (err) {
                throw new Error(err);
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING' })
            res.status(201).json({ order, key_id: rzp.key_id })

        })
    } catch (error) {
        console.log('purchasePremium error', error)
    }
}

exports.updateTransactionStatus = async (req, res, next) => {

    try {
        const { payment_id, order_id, success } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } })

        if (success != true) {
            order.update({ status: 'FAILED' });
            res.status(401).json({ message: 'Transaction failed' })
        }

        else {
            const promise1 = order.update({ paymentid: payment_id, status: 'SUCCESSFUL' })
            const promise2 = req.user.update({ isPremiumUser: 'true' })

            Promise.all[{ promise1, promise2 }]
            return res.status(202).json({ subscription: 'subscribed', success: true, message: 'Transaction successful!' })

        }

    } catch (error) {
        console.log('Something went wrong', error)
    }
}
