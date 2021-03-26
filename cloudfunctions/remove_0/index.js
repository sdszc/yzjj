// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const $ = _.aggregate

async function getCountIndexUserId(data_base) {
  let length = await db.collection(data_base).where(
    _.nor([{
      formula_flag: 0,
    }])
  ).count();
  return length;
}

async function getListIndexUserId(data_base, skip) {
  let one_group = await db.collection(data_base).where(
    _.nor([{
        formula_flag: 0,
      }]) 
  ).orderBy('id', 'asc').skip(skip).get();
  return one_group.data;
}

//云函数入口函数
exports.main = async (event, context) => {
  try {
    let all_num = await getCountIndexUserId(event.data_base);
    let length = all_num.total;
    let list = []
    for (let i = 0; i < length ; i += 100) {
      list = list.concat(await getListIndexUserId(event.data_base, i));
    }
    return list

  } catch (e) {
    console.error(e)
  }
}