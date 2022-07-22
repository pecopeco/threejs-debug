// 传递threejs对象到content
function postContent () {
  if (!three) {
    return
  }
  // 将获取到的threejs对象传递给content_scripts
  let postEvent = new CustomEvent('injected_event', { detail: { scene: transObj(three.scene), camera: transObj(three.camera) }})
  window.dispatchEvent(postEvent)
}

// 监听camera属性变化
let three
Object.defineProperty(window, 'threeObj', { 
  set: function (newValue) {
    three = newValue
    // Object.keys(three).map(key => {
    //   listenerObj(three[key])
    // })
    let x = three.camera.position.x
    let timer
    Object.defineProperty(three.camera.position, 'x', {
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

// function listenerObj (obj) {
//   Object.keys(obj).map(key => {
//     let temValue = obj[key]
//     if (typeof temValue === 'object') {
//       listenerObj(obj[key])
//     } else {
//       Object.defineProperty(obj, key, {
//         get () {
//           return temValue
//         },
//         set (val) {
//           temValue = val
//           if (timer) return
//           timer = setTimeout(() => {
//             postContent()
//             clearTimeout(timer)
//             timer = null
//           }, 20)
//         }
//       })
//     }
//   })
// }

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