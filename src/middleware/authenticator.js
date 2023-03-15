const jwt = require('jsonwebtoken');
const { makeRequest } = require('../utils/makeRequest');
const BACKEND_URL = 'http://redis:8080';
const apiEndPoint = { url: '/users/validateToken', method: 'get' };
async function authenticator(req, res, next) {
  //   const jwtToken = localStorage.getItem('jwt');
  //   console.log('jwtToken',jwtToken);
  //   assign token in header part of request to token variable
  //   console.log('equal', req.headers.authorization === jwtToken);
  let token = req.headers['authorization'];
  //   console.log(j);
  //   console.log('token',token);
  const TokenArray = token.split(' ');
  const tokenHeader = TokenArray[1];
  token = tokenHeader;

  console.log('token', token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, 'SECRET', async (err, tokenHeader) => {
    if (err) return res.sendStatus(403);
    // console.log('tokenHeader',tokenHeader);
    const redisUserName = await makeRequest(BACKEND_URL, apiEndPoint, {
      headers: {
        authorization: `Bearer ${token}`,
      },

    });
    // console.log('redisEmailId',redisEmailId);
    if (toString(redisUserName) === toString(tokenHeader.userName))
      req.body.emailId = tokenHeader.emailId;
    next();
  });
}
module.exports = { authenticator };