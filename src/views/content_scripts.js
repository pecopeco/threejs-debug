const url = chrome.runtime.getURL('injected_scripts.js')
const s = document.createElement('script')
s.src = url
document.documentElement.appendChild(s)

// 监听injected_script获取threejs对象
let threeObj
window.addEventListener('injected_event', function (params) {
  // 向devtools发送消息
  threeObj = params.detail
})

// 监听devtools传递的消息，传递threeObj
chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  chrome.runtime.sendMessage(threeObj)
  getThreeObj()
  sendResponse('get devtools message, callback')
})

// 通知injected_scripts更新threeObj
function getThreeObj () {
  let postEvent = new CustomEvent('content_event', { detail: {}})
  window.dispatchEvent(postEvent)
}