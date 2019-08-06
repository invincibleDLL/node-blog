const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModal');
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'POST' && req.path === '/api/user/login'){
    return loginCheck(req.body).then(data => {
      if (data.username) {
        // 服务端设置session
        req.session.username = data.username
        req.session.realname = data.realname
        // 同步到redis
        set(req.sessionId, req.session)
        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}

module.exports = handleUserRouter;