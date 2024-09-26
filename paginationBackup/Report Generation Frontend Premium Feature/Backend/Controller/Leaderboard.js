const sequelize = require('../Util/Database')
const User = require('../Model/User')
const Expense = require('../Model/Expense')

exports.getUsers = async (req, res, next) => {

    try {
        const Leaderboard = await User.findAll({
            attributes: ['names', 'id', 'total_expense'],
            order: [[sequelize.col('total_expense'), 'DESC']]
        });

        return res.status(202).json({ result: Leaderboard, success: true })
    } catch (error) {
        console.log('Leaderboard button api backend error', error)
    }

}