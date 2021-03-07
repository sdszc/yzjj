// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const $ = _.aggregate

//云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('01part').where({
      relateid: _.eq(event.data)
    })
    .get()
  } catch (e) {
    console.error(e)
  }

  // return await db.collection('02part').aggregate()
  // .lookup({
  //   from: '01part',
  //   localField: 'id',
  //   foreignField: 'formula_flag',
  //   as: 'fangyao'
  // })
  // .match({
  //   id: 3
  // })
  // .project({
  //   _id: 0,
  //   relateid: 0,
  //   tips: 0,
  //   fangyao: 0,
  //   related_formula: 0
  // })
  // .end()
}