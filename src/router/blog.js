const { getList, getDetail } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModal');

const handleBlogRouter = (req, res) => {
  const method = req.method;

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
    const id = req.query.id;
    const detailData = getDetail(id);
    return detailData.then(data => {
      return new SuccessModel(data[0] || {})
    })
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new'){
    return {
      msg: '这是新建博客的接口'
    }
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update'){
    return {
      msg: '这是更新博客的接口'
    }
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/delete'){
    return {
      msg: '这是删除博客的接口'
    }
  }
}

module.exports = handleBlogRouter;