function toggle() {
  console.log('Toggle!')
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (activeTabs) {
      activeTabs.map(function (tab) {
        chrome.tabs.sendMessage(activeTabs[0].id, { action: 'toggle' });
      })
    })
  })
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('button').addEventListener('click', toggle)
})
