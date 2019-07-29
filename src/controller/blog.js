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
  const updatetime = Date.now();
  let sql = `insert into blogs (title,content,createtime,author,updatetime) values ('${title}','${content}',${createtime},'${author}',${updatetime});`
  return exec(sql).then(insertData => {
    return {id: insertData.insertId }
  });
}

/**
 * 更新博客
 */
const updateBlog = (id, blogData) => {
  const { title , content } = blogData;
  const updatetime = Date.now();
  let sql = `update blogs set title='${title}',content='${content}',updatetime=${updatetime} where id=${id}`
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

 /**
  * 删除博客
  */
const deleteBlog = (id, author) => {
  let sql = `delete from blogs where id=${id} and author='${author}'`
  return exec(sql).then(deleteData => {
    if (deleteData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  deleteBlog
}