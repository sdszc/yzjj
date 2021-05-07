// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const $ = _.aggregate

async function getCountIndexUserId(data_base, thisid) {
  if (thisid){
    let length = await db.collection(data_base).where({ relateid: _.eq(thisid)}).count();
    return length;
  }
  else{
    let length = db.collection(data_base).count();
    return length;
  }
}

async function getListIndexUserId(data_base, thisid, skip) {
  if(thisid){
    let one_group = await db.collection(data_base).where({ relateid: _.eq(thisid)}).orderBy('id', 'asc').skip(skip).get();
    return one_group.data;
  }
  else{
    let one_group = await db.collection(data_base).orderBy('id', 'asc').skip(skip).get();
    return one_group.data;
  }
 
}

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    
    let all_num = await getCountIndexUserId(event.data_base, event.id);
    let length = all_num.total;
    let list = []
    for (let i = 0; i < length ; i += 100) {
      list = list.concat(await getListIndexUserId(event.data_base, event.id, i));
    }
    return list
   } catch (e) {
     console.error(e)
   } 
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