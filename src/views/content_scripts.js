const url = chrome.runtime.getURL('injected_scripts.js')
const s = document.createElement('script')
s.src = url
document.documentElement.appendChild(s)

// 监听injected_script获取threejs对象
let threeObj
window.addEventListener('injected_event', function (params) {
  // 保存threeObj
  threeObj = params.detail
  // 传递给devtools
  devtoolsInit && chrome.runtime.sendMessage(threeObj)
})

// 监听devtools传递的消息，传递threeObj
let devtoolsInit = false
chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  devtoolsInit = request.isAutoRefresh
  chrome.runtime.sendMessage(threeObj)
  getThreeObj()
  sendResponse('get devtools message, callback')
})

// 通知injected_scripts更新threeObj
function getThreeObj () {
  let postEvent = new CustomEvent('content_event', { detail: {}})
  window.dispatchEvent(postEvent)
}