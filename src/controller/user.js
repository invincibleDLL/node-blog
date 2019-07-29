const { exec } = require('../db/mysql')

const loginCheck = (loginData) => {
  const { username, password } = loginData
  let sql = `select username, realname from users where username='${username}' and \`password\`='${password}';`
  return exec(sql).then(rows => {
    return rows.length
  })
}

module.exports = {
  loginCheck
}