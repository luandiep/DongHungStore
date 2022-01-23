const express = require('express')
const router = express.Router()
const { category } = require('../models')
const { subcategory } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddlewares')

const Sequelize = require('sequelize')
const { parse } = require('../ModelMapper/categoryMapper')
const Op = Sequelize.Op

function test(categoryes,parentID=null){

}

function careatecategory(categoryes,parentID=null){
    const categorylist=[];
  
let category;
if(parentID==null){
    category=categoryes.filter(cat=>cat.parentID==0)
}else{
    category=categoryes.filter(cat=>cat.parentID==parentID)
}

for(let cate of category){
    categorylist.push({
        id_category:cate.id_category,
        name:cate.name,
        level:cate.level,
        parentID:cate.parentID,
        children:careatecategory(categoryes,cate.id_category)
    })
    
}


return categorylist;
}


  
router.get('/getall', async (req, res) => {
 
    const lisOfPosts = await category.findAll({
        raw: true,
        nest: true,
    })

    const List=careatecategory(lisOfPosts);
    
    List.forEach((element, index) => {
        if (element.level > 0) {
            List[index].space = ''
            for (let i = 0; i < element.level; i++) {
                List[index].space += '\u00A0 \u00A0 '
            }
        } else {
            List[index].space = ''
        }
    })
    res.json(List)
})
router.get('/getalls', async (req, res) => {
    const a = await category.findAll({
        where: {
            name: {
                [Op.like]: '%' + 'bo bit t' + '%',
            },
        },
    })
    res.json(a)
})



router.post('/add', validateToken, async (req, res) => {
    const categoryModel = parse(req.body)
    if (!categoryModel) return res.status(400).send('Bad Request')
    else {
        
        const lisOfPosts = null
        // await category.findOne({
        //     where: { id_category: categoryModel.id_category },
        // })

        if (lisOfPosts) {
            res.status(400).send('Danh mục đã tồn tại')
        } else {
            if (categoryModel.id_subcategory) {
                const itemCategori = await category.findOne({
                    where: { id_category: categoryModel.id_subcategory },
                })
                if (itemCategori) {
                    categoryModel.parentID = itemCategori.parentID + 1
                    await category.create(categoryModel)
                    subcategory.create({
                        id_category: categoryModel.id_subcategory,
                        id_subcategory: categoryModel.id_category,
                    })
                }
            } else {
                categoryModel.parentID = 0
                await category.create(categoryModel)
            }
            res.status(200).send('OK')
        }
        //   res.send("oke");
        // }

        // const categoryModel = await category.findOne({
        //   where: { name: categoryModel.name },
        // });
    }
})

module.exports = router
