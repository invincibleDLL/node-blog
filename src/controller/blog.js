const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}'`
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`
  }
  sql += ` order by createtime desc;`
  return exec(sql)
}

const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`;
  return exec(sql);
}

/**
 * 新建博客
 */
const createBlog = (blogData = {}) => {
  const { title, content, author } = blogData;
  const createtime = Date.now();
  let sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}',${createtime},'${author}');`
  return exec(sql).then(insertData => {
    return {id: insertData.insertId }
  });
}

module.exports = {
  getList,
  getDetail,
  createBlog
}