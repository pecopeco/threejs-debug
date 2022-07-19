const url = chrome.runtime.getURL('injected_scripts.js')
const s = document.createElement('script')
s.src = url
document.documentElement.appendChild(s)

// 监听injected_scripts
window.addEventListener('injected_event', function (params) {
  // 向devtools发送消息
  chrome.runtime.sendMessage(params.detail)
})

// 监听来自devtools的消息（不生效）
chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  console.log('收到来自devtools的消息：')
})

// 通知injected_script获取threejs对象
// setInterval(() => {
//   let getEvent = new CustomEvent('get_event', { detail: {}})
//   window.dispatchEvent(getEvent)
// }, 1000)