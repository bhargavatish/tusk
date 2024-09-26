const express = require('express')

const leaderboardController = require('../Controller/Leaderboard')

const authMiddleware = require('../Middleware/Auth');

const router = express.Router()

router.get('/getUsers',authMiddleware.authorize,leaderboardController.getUsers)

module.exports=router;