let client = require('scp2')

let server = {
  default: {
    port: 22,
    host: "110.110.110.110",
    username: "root",
    password: "xxx",
    path: "/xxx/aaa/"
  },
  test: {
    port: 22,
    host: "110.110.110.110",
    username: "root",
    password: "xxx",
    path: "/xxx/aaa/"
  }
}

let serverConfig = process.env.NODE_ENV ? server[process.env.NODE_ENV] : server.default
console.log('uploading...')
client.scp("./dist/", serverConfig, (err) => {
  console.log(err || 'upload success')
})