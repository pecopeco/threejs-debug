// 传递threejs对象到content
function postContent () {
  if (!window._scene || !window._camera) {
    return
  }
  const scene = transObj(window._scene)
  const camera = transObj(window._camera)
  // 将获取到的threejs对象传递给content_scripts
  let postEvent = new CustomEvent('injected_event', { detail: { scene: scene, camera: camera }})
  window.dispatchEvent(postEvent)
}

// 监听camera属性变化
Object.defineProperty(window, 'camera', { 
  set: function (newValue) {
    window._camera = newValue
    postContent()
  }
})

// 监听scene属性变化
Object.defineProperty(window, 'scene', { 
  set: function (newValue) { 
    window._scene = newValue
    postContent()
  }
})

// 监听content_scripts的消息，更新threeObj
let threeObj
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
    } else if (isFinite(obj[key]) && typeof obj[key] === 'number') {
      newObj[key] = obj[key].toFixed(6)
    } else {
      newObj[key] = obj[key]
    }
  })
  return newObj
}