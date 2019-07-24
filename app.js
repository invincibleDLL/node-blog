const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if(req.Headers['content-type'] !== 'application/json') {
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

  getPostData(req).then(postData => {
    req.body = postData;

    // 处理blog路由
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
      blogData.then(data => {
        res.end(JSON.stringify(data));
        return;
      });
      return;
    }
    
    // 处理user路由
    const userData = handleUserRouter(req, res);
    if (userData) {
      res.end(
        JSON.stringify(userData)
      );
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