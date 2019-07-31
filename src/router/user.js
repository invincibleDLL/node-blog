const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModal');

// 设置cookies过期时间
const getCookiesExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'POST' && req.path === '/api/user/login'){
    return loginCheck(req.body).then(data => {
      if (data.username) {
        // 服务端设置cookie
        res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookiesExpires()}`)
        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}

module.exports = handleUserRouter;