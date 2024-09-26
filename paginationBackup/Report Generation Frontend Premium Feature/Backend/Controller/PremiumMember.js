const User = require('../Model/User');

exports.isPremiumMember = async (req,res,next) => {
    try {
        const userid = req.user.id
        const subscribed = await User.findAll({where:{isPremiumUser :true,id:userid}});
        console.log('subscription : ',subscribed.length)
        if(subscribed.length < 1){
            return res.status(203).json({code:'no'})
        }
        else{
            return res.status(202).json({subscription:subscribed,code:'yes'})
        }
        
    } catch (error) {
        console.log('Is premium throws error : ',error)
    }

}