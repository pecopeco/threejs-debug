const url = chrome.runtime.getURL('injected_scripts.js')
const s = document.createElement('script')
s.src = url
document.documentElement.appendChild(s)

// 监听injected_script获取threejs对象
let three
window.addEventListener('injected_event', function (params) {
  // 保存three
  three = params.detail
  // 传递给devtools
  devtoolsInit && chrome.runtime.sendMessage(three)
})

// 监听devtools传递的消息，传递three
let devtoolsInit = false
chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  devtoolsInit = request.isAutoRefresh
  chrome.runtime.sendMessage(three)
  getThree()
  sendResponse('get devtools message, callback')
})

// 通知injected_scripts更新three
function getThree () {
  let postEvent = new CustomEvent('content_event', { detail: {}})
  window.dispatchEvent(postEvent)
}