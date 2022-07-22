// 传递threejs对象到content
let timer
function postContent () {
  if (!three || timer) {
    return
  }
  // 限制每20毫秒只更新一次
  timer = setTimeout(() => {
    // 将获取到的threejs对象传递给content_scripts
    let postEvent = new CustomEvent('injected_event', { detail: { scene: transObj(three.scene), camera: transObj(three.camera) }})
    window.dispatchEvent(postEvent)
    clearTimeout(timer)
    timer = null
  }, 20)
}

// 监听threeObj赋值
let three
Object.defineProperty(window, 'threeObj', { 
  set: function (newValue) {
    three = newValue
    Object.keys(three).map(key => {
      listenerObj(three[key])
    })
  }
})

// 递归监听所有属性
function listenerObj (obj) {
  Object.keys(obj).map(key => {
    if (
      (!(isFinite(obj[key]) && typeof obj[key] === 'number') && !obj[key]) || // 为空
      typeof obj[key] === 'function' || // 函数类型
      key === 'children' // 多层嵌套
    ) return

    if (typeof obj[key] === 'object') {
      listenerObj(obj[key])
    } else {
      let temValue = obj[key]
      Object.defineProperty(obj, key, {
        get () {
          return temValue
        },
        set (val) {
          temValue = val
          postContent()
        }
      })
    }
  })
}

/**
 * @description: 转换特殊对象为普通对象
 * @param {*} obj 需转换的对象
 * @return {*}
 */
function transObj (obj) {
  let newObj = {}
  Object.keys(obj).map(key => {
    if (
      (!(isFinite(obj[key]) && typeof obj[key] === 'number') && !obj[key]) || // 为空
      typeof obj[key] === 'function' || // 函数类型
      key === 'children' // 多层嵌套
    ) return
    if (typeof obj[key] === 'object') {
      return newObj[key] = transObj(obj[key])
    } else {
      newObj[key] = obj[key]
    }
  })
  return newObj
}