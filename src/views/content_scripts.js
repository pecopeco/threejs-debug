const url = chrome.runtime.getURL('injected_scripts.js')
const s = document.createElement('script')
s.src = url
document.documentElement.appendChild(s)

// 监听injected_script获取three对象，并传递给devtools
let three
window.addEventListener('injected_event', function (params) {
  // 保存three
  three = params.detail
  // 发送到devtools
  devtoolsInit && chrome.runtime.sendMessage({
    message: three,
    responseCallback: (e) => {
      console.log(e)
    }
  })
})

// 监听devtools传递的消息，发送three对象
let devtoolsInit = false
chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  devtoolsInit = request.devtoolsInit
  const newThreeObj = request.newThreeObj
  if (newThreeObj) { // 通过输入框填写值更新threeObj
    let postEvent = new CustomEvent('content_event', { detail: newThreeObj })
    window.dispatchEvent(postEvent)
  } else { // devtools初始化或者点击刷新按钮
    three && devtoolsInit && chrome.runtime.sendMessage(three)
  }
  sendResponse('get devtools message, callback')
})