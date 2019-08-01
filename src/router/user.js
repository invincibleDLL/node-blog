const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModal');

const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'GET' && req.path === '/api/user/login'){
    return loginCheck(req.query).then(data => {
      if (data.username) {
        // 服务端设置session
        req.session.username = data.username
        req.session.realname = data.realname
        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}

module.exports = handleUserRouter;