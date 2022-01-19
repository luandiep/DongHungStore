const express = require('express')
const router = express.Router()
const { product } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddlewares')

router.post('/add', validateToken, async (req, res) => {
    const { name, category_id, price, content, image_link, unit_id, sku } =
        req.body
    if (!req.body) return res.status(400).send('Bad Request')
    else {
        await product
            .create({
                name: name,
                category_id: category_id,
                content: content,
                image_link: image_link,
                price: price,
                unit_id: unit_id,
                sku: sku,
            })
            .then(() => {
                return res.status(200).send('oke')
            })
            .catch((err) => {
                return res.status(400).send(err)
            })
    }
})

router.post('/edit', validateToken, async (req, res) => {
    const { name, category_id, price, content, image_link, unit_id, sku } =
        req.body
    if (!req.body) return res.status(400).send('Bad Request')
    else {
        await product
            .update(
                {
                    name: name,
                    category_id: category_id,
                    content: content,
                    image_link: image_link,
                    price: price,
                    unit_id: unit_id,
                    sku: sku,
                },
                { where: { id: req.user.id } }
            )
            .then(() => {
                return res.status(200).send('oke')
            })
            .catch((err) => {
                return res.status(400).send(err)
            })
    }
})

router.get('/getall', async (req, res) => {
    await product
        .findAll({
            raw: true,
            nest: true,
        })
        .then((response) => {
            if (response) {
                res.status(200).json(response)
            }
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})
router.get('/getbyid', async (req, res) => {
    await product
        .findById(req.query.id)
        .then((response) => {
            if (response) {
                res.status(200).json(response)
            }
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})

module.exports = router
