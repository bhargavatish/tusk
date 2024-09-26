const FileUrls = require('../Model/FileUrls')
const Expense = require('../Model/Expense')
const ITEMS_PER_PAGE =2
const getExpenses = (req,page) => {
    try {
        
        return Expense.findAll({
            ITEMS_PER_PAGE : 2,
            offset:(page-1)*ITEMS_PER_PAGE,
            limit:ITEMS_PER_PAGE
        })
    } catch (error) {
        console.log('user service get expenses',error)
    }
    // return req.user.getExpenses()
}

const saveUrlTable = (req,url) => {
    
    return FileUrls.create({
        DownloadDate: new Date(),
        Urls:url,
        userId:req.user.id
    })
}

const getUrlTable = (req) => {
    var id=req.user.id
    return FileUrls.findAll({where:{userId:id}})
}

module.exports = {
    getExpenses,saveUrlTable,getUrlTable
}