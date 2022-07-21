// 传递threejs对象到content
function postContent () {
  if (!scene || !camera) {
    return
  }
  // 将获取到的threejs对象传递给content_scripts
  let postEvent = new CustomEvent('injected_event', { detail: { scene: transObj(scene), camera: transObj(camera) }})
  window.dispatchEvent(postEvent)
}

// 监听camera属性变化
let camera
let timer
Object.defineProperty(window, 'camera', { 
  set: function (newValue) {
    camera = newValue
    let _camera = newValue
    let x = camera.position.x
    Object.defineProperty(_camera.position, 'x', {
      get () {
        return x
      },
      set (val) {
        x = val
        if (timer) return
        timer = setTimeout(() => {
          postContent()
          clearTimeout(timer)
          timer = null
        }, 20)
      }
    })
  }
})

// 监听scene属性变化
let scene
Object.defineProperty(window, 'scene', { 
  set: function (newValue) { 
    scene = newValue
  }
})

// 监听content_scripts的消息，更新threeObj
window.addEventListener('content_event', function (params) {
  postContent()
})

/**
 * @description: 转换特殊对象为普通对象
 * @param {*} obj 需转换的对象
 * @param {*} layer 转换层数限制
 * @return {*}
 */
function transObj (obj, layer = 0) {
  let newObj = {}
  Object.keys(obj).map(key => {
    if (
      (!(isFinite(obj[key]) && typeof obj[key] === 'number') && !obj[key]) ||
      typeof obj[key] === 'function' ||
      key === 'children'
    ) return
    if (typeof obj[key] === 'object' && layer < 1) {
      return newObj[key] = transObj(obj[key], 1)
    } else {
      newObj[key] = obj[key]
    }
  })
  return newObj
}