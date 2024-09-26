const Expense = require('../Model/Expense');
const jwt = require('jsonwebtoken');
const User = require('../Model/User')
const Fileurls = require('../Model/FileUrls')
const sequelize = require('../Util/Database')
// const Expense = require('../Model/Expense')

const UserService = require('../Services/UserService')
const S3Service = require('../Services/S3Service')

exports.downloadExpense = async (req, res, next) => {
    try {
        // console.log('In download expense controller')
        const expenses = await req.user.getExpenses();
        const stringifiedExpense = JSON.stringify(expenses);
        const userId = req.user.id
        const filename = `Expense${userId}/${new Date()}.html`
        // const filename = 'Expense.txt'
        const fileURL = await S3Service.uploadToS3(stringifiedExpense, filename);
        const downloadURLResponse = await UserService.saveUrlTable(req, fileURL);
        // Get rid of getUrlResponse
        // const getUrlResponse = await UserService.getUrlTable()

        res.status(200).json({ downloadURLResponse, fileDownloaded: fileURL,success: true })

    } catch (error) {
        console.log('download Expense error : ', error)
        res.status(500).json({ fileURL: '', success: false, err: error })
    }
}
exports.UrlTable= async (req,res,next) => {
    const getUrlResponse = await UserService.getUrlTable(req)
    res.status(200).json({getUrlResponse})
}


// To get the expense(s) of the user autenticated
const ITEMS_PER_PAGE=3
exports.getExpense = async (req, res, next) => {
    try {

        //using magic function
        ////////////////////////////////////////
        const page = + req.query.page || 1
        console.log('page si ****************************', page)
        let totalItems ;
        const total = await Expense.count()
        totalItems = total
        // console.log('////////////////////////////////////////',totalItems)
        ////////////////////////////////////////
        // const response = await UserService.getExpenses(req,page)//important so uncomment it 
        console.log('Everything is temporary',(page-1)*ITEMS_PER_PAGE)
        console.log('Everything is temporary',ITEMS_PER_PAGE)
        const response = await Expense.findAll({
            // ITEMS_PER_PAGE : 2,
            offset:(page-1)*ITEMS_PER_PAGE,
            limit:ITEMS_PER_PAGE
        })
        console.log('watch it here : ', response  )
        // console.log('watch it here : ', response.ITEMS_PER_PAGE * page < totalItems)
        res.status(201).json({
             response ,
             currentPage:page,
             hasNextPage:ITEMS_PER_PAGE * page < totalItems ,
             nextPage: page + 1,
             hasPreviousPage: page> 1,
             previousPage : page-1,
             lastPage: Math.ceil(totalItems/ITEMS_PER_PAGE)
            })
        // const response = await UserService.getExpenses(req)
        // res.status(201).json({ response })

        // Alternative way using normal syntax

        // const response = await Expense.findAll({where:{userId:req.user.id}});
        // res.status(201).json({response})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching data !', err: error })

    }
}

// To add new expense 
exports.saveExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {

        //using magic function

        await req.user.createExpense({
            amount: req.body.amount,
            category: req.body.category, description: req.body.description,
        },
            { transaction: t })

        current_total = await req.user.total_expense;
        new_total = Number(current_total) + Number(req.body.amount);

        const response = await req.user.update({ total_expense: new_total }, { transaction: t })
        await t.commit()
        res.status(201).json({ newExpense: response, success: true })

        // Alternative way using normal syntax

        // const response = await Expense.create({
        //     amount:req.body.amount,
        //     category:req.body.category,
        //     description:req.body.description,
        //     userId: req.user.id
        // });
        // res.status(201).json({newExpense:response,success:true})

    } catch (error) {

        await t.rollback();
        console.log('Error in saveExpense rollback is : ', error)
        res.status(500).json({ message: "Problem saving Expense detail !" })
    }
}

//To delete expense against given id
exports.deleteExpense = async (req, res, next) => {
    const t = await sequelize.transaction()
    try {

        // const fid = req.params.id;
        // console.log('Id in delete is : ', fid)
        // req.user.destroyExpense({where : {id:fid}}).then(() => {
        //     res.status(201).json({message:'Deleted'})
        // })

        //when an expense is delete from expense table, it is important to update the total_expense in the user's table
        const id = req.params.id;
        const expense = await Expense.findOne({ where: { id: id, userId: req.user.id }, transaction: t })
        const amount = expense.amount
        await Expense.destroy({ where: { id: id, userId: req.user.id }, transaction: t })

        total = req.user.total_expense
        total = Number(total) - Number(expense.amount)
        await req.user.update({ total_expense: total }, { transaction: t })
        t.commit()

        res.status(201).json({ message: 'Deleted' })

    } catch (error) {
        t.rollback();
        console.log(error)
        res.status(500).json({ message: "Problem deleting Expense detail !" })
    }
}
