// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const $ = _.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection(event.datasets).where(
      _.or([
        { 
          formula_name:db.RegExp({
            regexp:'.*'+ event.search,
            options: 'i'
          })
        },
        {
          composition:db.RegExp({
            regexp:'.*'+ event.search,
            options: 'i'
          })
        },
        {
          fy_note:db.RegExp({
            regexp:'.*'+ event.search,  
            options: 'i'
          })
        },
        {
          usage:db.RegExp({
            regexp:'.*'+ event.search,
            options: 'i'
          })
        }
      ])
    ).get()
   } catch (e) {
     console.error(e)
   } 
}   