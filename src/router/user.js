const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModal');

const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'POST' && req.path === '/api/user/login'){
    return loginCheck(req.body).then(res => {
      if (res === 1) {
        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}

module.exports = handleUserRouter;