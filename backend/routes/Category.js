const express = require('express')
const router = express.Router()
const { category } = require('../models')
const { subcategory } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddlewares')

const Sequelize = require('sequelize')
const { parse } = require('../ModelMapper/categoryMapper')

// function formatCategory(categoryes,parentID=null){
//     const categorylist=[];

// let category;
// if(parentID==null){
//     category=categoryes.filter(cat=>cat.parentID==0)
// }else{
//     category=categoryes.filter(cat=>cat.parentID==parentID)
// }

// for(let cate of category){
//     categorylist.push({
//         id_category:cate.id_category,
//         name:cate.name,
//         level:cate.level,
//         parentID:cate.parentID,
//         children:formatCategory(categoryes,cate.id_category)
//     })

// }

// return categorylist;
// }

function formatCategory(categoryes) {
    const categorylist = []

    let category = categoryes.filter((cat) => cat.parentID == null)
    if (category.length > 0)
        for (let cate of category) {
            const sub = categoryes.filter(
                (cat) => cat.parentID == cate.id_category
            )
            categorylist.push({
                id_category: cate.id_category,
                name: cate.name,
                parentID: cate.parentID,
                space: '',
            })
            if (sub.length > 0) {
                for (let cate1 of sub) {
                    categorylist.push({
                        id_category: cate1.id_category,
                        name: cate1.name,
                        parentID: cate1.parentID,
                        space: '\u00A0 \u00A0 ',
                    })
                }
            }
        }

    return categorylist ? categorylist : []
}

router.get('/getall', async (req, res) => {
    const lisOfPosts = await category.findAll({
        raw: true,
        nest: true,
    })

    const List = formatCategory(lisOfPosts)
    res.json(List)
})

router.post('/add', validateToken, async (req, res) => {
    const categoryModel = parse(req.body)
    if (!categoryModel) return res.status(400).send('Bad Request')
    else {
        const lisOfPosts = await category.findOne({
            where: { id_category: categoryModel.id_category },
        })

        if (lisOfPosts) {
            res.status(400).send('Danh mục đã tồn tại')
        } else {
            await category.create(categoryModel)
            res.status(200).send('OK')
        }
    }
})

module.exports = router
