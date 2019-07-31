const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if(req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (postData === '') {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    })
  })
  return promise;
}


const serverHandle = (req, res) => {
  // 返回格式设置
  res.setHeader('Content-type', 'application/json');

  // 处理 path
  req.path = req.url.split('?')[0];

  // 解析query
  req.query = querystring.parse(req.url.split('?')[1]);

  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(val => {
    const key = val.split('=')[0].trim()
    const value = val.split('=')[1].trim()
    req.cookie[key] = value
  })

  getPostData(req).then(postData => {
    req.body = postData;

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData));
        return;
      });
      return;
    }
    
    // 处理user路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        res.end(
          JSON.stringify(userData)
        );
        return;
      })
      return;
    }

    res.writeHead(404, {'Content-type': 'text/plain'});
    res.write('404 Not Found');
    res.end();
  }).catch(err => {
    console.log(err);
  })
}

module.exports = serverHandle;