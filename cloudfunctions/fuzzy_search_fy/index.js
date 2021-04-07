// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const $ = _.aggregate

async function getCountIndexUserId(data_base,search) {
  let length = await db.collection(data_base).where(
    _.or([
      { 
        formula_name:db.RegExp({
          regexp:'.*'+ search,
          options: 'i'
        })
      },
      { 
        introduction:db.RegExp({
          regexp:'.*'+ search,
          options: 'i'
        })
      },
      {
        composition:db.RegExp({
          regexp:'.*'+ search,
          options: 'i'
        })
      },
      {
        usage:db.RegExp({
          regexp:'.*'+ search,  
          options: 'i'
        })
      },
      {
        fy_note:db.RegExp({
          regexp:'.*'+ search,
          options: 'i'
        })
      },
      {
        rhyme:db.RegExp({
          regexp:'.*'+ search,
          options: 'i'
        })
      }
    ])
  ).count();
   return length;
}

async function getListIndexUserId(data_base, search, skip) {
  let one_group = await db.collection(data_base).where(
    _.or([
      { 
        formula_name:db.RegExp({
          regexp:'.*'+ search,
          options: 'i'
        })
      },
      { 
        introduction:db.RegExp({
          regexp:'.*'+ search,
          options: 'i'
        })
      },
      {
        composition:db.RegExp({
          regexp:'.*'+ search,
          options: 'i'
        })
      },
      {
        usage:db.RegExp({
          regexp:'.*'+ search,  
          options: 'i'
        })
      },
      {
        fy_note:db.RegExp({
          regexp:'.*'+ search,
          options: 'i'
        })
      },
      {
        rhyme:db.RegExp({
          regexp:'.*'+ search,
          options: 'i'
        })
      }
    ])
  ).orderBy('id', 'asc').skip(skip).get();
  return one_group.data;
}

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let all_num = await getCountIndexUserId(event.datasets,event.search);
    let length = all_num.total;
    // return length
    let list = []
    for (let i = 0; i < length ; i += 100) {
      list = list.concat(await getListIndexUserId(event.datasets,event.search, i));
    }
    return list
   } catch (e) {
     console.error(e)
   } 
}