const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModal');

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list'){
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    return getList(author, keyword).then(data => {
      return new SuccessModel(data)
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail'){
    const detailData = getDetail(id);
    return detailData.then(data => {
      return new SuccessModel(data[0] || {})
    })
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new'){
    const author = 'dinglili' // TODO:
    req.body.author = author
    return createBlog(req.body).then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update'){
    return updateBlog(id, req.body).then(data => {
      if (!!data) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/delete'){
    const author = 'dinglili' // TODO:
    return deleteBlog(id, author).then(data => {
      if (!!data) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除博客失败')
      }
    })
  }
}

module.exports = handleBlogRouter;