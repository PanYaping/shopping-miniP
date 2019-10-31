// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var rp = require('request-promise');

// 云函数入口函数
exports.main = async (event, context) => {
  var options = {
    uri: 'http://mstest.le-yao.com/api/frontend/customer/commerce/categories?include=packages.categories,packages.groups.items.product.categories,products.categories',
    headers: {
      'Accept-Store': '1',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbXN0ZXN0LmxlLXlhby5jb20vd2VjaGF0L2xleWFvL2NhZmV0ZXJpYSIsImlhdCI6MTU3MTc5NTU2MiwiZXhwIjoxNTcxODYwMzYyLCJuYmYiOjE1NzE3OTU1NjIsImp0aSI6Img0NFdMVkVlQk5zaGRIbVkiLCJzdWIiOjEyLCJwcnYiOiJkYmJlZGVlZDA1MGY1ZTgwNDc5ZDBkOWY3NDQ2ZWIxZWZhMmM0Yzk5IiwiZ3VhcmQiOiJjb21tZXJjZV9tZW1iZXJfYXBpIiwicGxhdGZvcm0iOiJ3ZWNoYXQiLCJwbGF0Zm9ybV91aWQiOiJvRG00OHdGU2VIMkkwTzY5ZTZFY1ZhVzFZR2ZBIn0.pV83ZP9RlM-Ro7Py1lFfpwvZOe3HwXLwWPcV756ULOk'
    },
    json: true // Automatically parses the JSON string in the response
  };
  return rp(options)
    .then(function (res) {
      console.log(res);
      return res;
    })
    .catch(function (err) {
      console.error(err);
    });
}