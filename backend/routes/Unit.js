const express = require('express')
const router = express.Router()
const { unit } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddlewares')

router.get('/getall', async (req, res) => {
    const lisOfPosts = await unit.findAll()
    res.json(lisOfPosts)
})

router.post('/add', validateToken, async (req, res) => {
    const { name, description } = req.body
    if (!name) return res.status(400).send('Bad Request')
    else {
        const Getname = await unit.findOne({
            where: { name: name },
        })
        if (Getname) {
            res.status(400).send('Đơn vị tính đã tồn tại')
        } else {
            await unit.create({ name: name, description: description })
            res.send('oke')
        }
    }
})
module.exports = router
