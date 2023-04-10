// 传递threejs对象到content
let timer
function postContent () {
  if (!three || timer) {
    return
  }
  // 仅监听scene、controls和camera对象的属性，贴图等数据量较大，无法通过chrome.runtime发送
  const { scene, camera, controls } = transObj(three)
  let detail = { scene, camera, controls }
  detail.controls = { object: controls.object, target: controls.target }
  // 限制每20毫秒只更新一次
  timer = setTimeout(() => {
    // 将获取到的threejs对象传递给content_scripts
    let postEvent = new CustomEvent('injected_event', { detail: { ...detail } })
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
function listenerObj (obj, deep = 1) {
  if (!obj || deep > 3) return // 仅监听3层以内属性，深层属性性能消耗较大
  Object.keys(obj).map(key => {
    if (
      (!(isFinite(obj[key]) && typeof obj[key] === 'number') && !obj[key]) || // 为空
      typeof obj[key] === 'function' || // 函数类型
      key === 'children' // 多层嵌套
    ) return
    if (Object.prototype.toString.call(obj[key]).slice(8, -1) === 'Object') {
      // 对象的值仍然是对象
      listenerObj(obj[key], ++deep)
    } else if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
      // 对象的值不是对象，且是非特殊对象
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

// 转换特殊对象为普通对象
function transObj (obj) {
  if (!obj) return
  let newObj = {}
  Object.keys(obj).map(key => {
    if (
      (!(isFinite(obj[key]) && Object.prototype.toString.call(obj[key]).slice(8, -1) === 'Number') && !obj[key]) || // 为空
      Object.prototype.toString.call(obj[key]).slice(8, -1) === 'Function' || // 函数类型
      key === 'children' // 多层嵌套
    ) return
    if (Object.prototype.toString.call(obj[key]).slice(8, -1) === 'Object') {
      return newObj[key] = transObj(obj[key])
    } else {
      newObj[key] = obj[key]
    }
  })
  return newObj
}

// 监听content_scripts发送的消息，更新three对象
window.addEventListener('content_event', function (params) {
  const { objParent, val } = { ...params.detail }
  setThree(three, objParent, val)
})

// 给three对象赋值
function setThree (obj, parentArr, val) {
  if (parentArr.length > 1) {
    setThree(obj[parentArr[0]], parentArr.slice(1), val)
  } else {
    obj[parentArr[0]] = val
  }
}