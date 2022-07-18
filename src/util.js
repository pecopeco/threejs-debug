import router from './router'
import fly from 'flyio'
import dayjs from 'dayjs'
import { Toast } from 'vant'

// api配置
export const config = { api:
  import.meta.env.MODE === 'development'
  ? '/api'
  : import.meta.env.MODE === 'test'
  ? 'https://test.baidu.com'
  : 'https://baidu.com'
}

// 日期处理函数
export const day = dayjs

// 跳转
export const go = (path) => {
  router.push(path)
}

// 返回
export const goBack = (key = -1) => {
  router.go(key)
}

// toast
export const toast = (text, delay = 1500) => {
  Toast({message: text, duration: delay})
}

// http配置
export const http = (url, form = {}, type, contentType = 'application/json') => {
  url = url.indexOf('http') !== -1 ? url : config.api + url
  if (contentType === 'multipart/form-data') {
    let formData = new FormData()
    for (let key in form) {
      formData.append(key, form[key])
    }
    form = formData
  }
  return fly.request(url, form, {
    method: type,
    'content-type': contentType,
    headers: {
      token: 'xxxxxxxxxxxx'
    },
    timeout: 60000
  }).then((res) => {
    if (res.status === 200) {
      return res.data
    } else {
      toast(`请求错误：${res.message}，状态码：${res.status}`)
    }
  }).catch((err) => {
    toast(`请求错误：${err.message}，状态码：${err.status}`)
  })
}
http.get = (url, form, contentType) => http(url, form, 'get', contentType)
http.post = (url, form, contentType) => http(url, form, 'post', contentType)
http.delete = (url, form, contentType) => http(url, form, 'delete', contentType)
http.put = (url, form, contentType) => http(url, form, 'put', contentType)

// 表单验证
export const validate = {
  // 验证手机号
  phone: (val) => {
    if (!val || val.match(/^[ ]+$/)) {
      return '请输入手机号'
    } else if (!/^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(val)) {
      return '请输入正确的手机号'
    } else {
      return true
    }
  },
  // 验证姓名
  name: (val) => {
    if (!val || val.match(/^[ ]+$/)) {
      return '请输入姓名'
    } else if (!/^[\u4e00-\u9fa5]+$/.test(val) || val.length < 2) {
      return '请输入正确的姓名'
    } else {
      return true
    }
  },
  // 验证邮箱
  email: (val) => {
    if (!val || val.match(/^[ ]+$/)) {
      return '请输入邮箱'
    } else if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(val)) {
      return '请输入正确的邮箱'
    } else {
      return true
    }
  },
  // 验证身份证号
  idCard: (val) => {
    if (!val || val.match(/^[ ]+$/)) {
      return '请输入身份证号'
    } else if (!/^\d{6}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(val)) {
      return '请输入正确的身份证号'
    } else {
      return true
    }
  },
  // 验证密码大于6位
  password: (val) => {
    if (!val || val.match(/^[ ]+$/)) {
      return '请输入密码'
    } else if (val.length < 6) {
      return '密码至少为6位'
    } else {
      return true
    }
  }
}

// 解析url参数为对象
export const getQuery = (url) => {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
    '"}'
  )
}

// 判断是否是ios系统
export const isIos = () => {
  let u = navigator.userAgent
  return !(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1)
}

// 判断是否是数字
export const isNum = (key) => {
  return typeof key === 'number' && isFinite(key)
}
