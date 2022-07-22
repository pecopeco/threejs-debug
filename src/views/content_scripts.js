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
  devtoolsInit && chrome.runtime.sendMessage(three)
})

// 监听devtools传递的消息，发送three对象
let devtoolsInit = false
chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  devtoolsInit = request.devtoolsInit
  three && devtoolsInit && chrome.runtime.sendMessage(three)
  sendResponse('get devtools message, callback')
})