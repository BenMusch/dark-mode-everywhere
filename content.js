chrome.runtime.onMessage.addListener(function(request) {
    if(request.action === 'toggle') {
      var elem = document.getElementById('dark-mode-overlay')
      if (elem.style.cssText === '') {
        elem.style.cssText = 'z-index:100000000000000000;pointer-events: none;width: 100vw;height: 100vh;position: fixed;top: 0;left: 0;background: white;mix-blend-mode: difference;'
        var darkModeBg = document.createElement('div');
        darkModeBg.style.cssText = 'z-index:-100000000000000000;pointer-events: none;width: 100vw;height: 100vh;position: fixed;top: 0;left: 0;background:' + getComputedStyle(document.body).background + ';'
        darkModeBg.id = 'dark-mode-bg'
        document.body.appendChild(darkModeBg)
      } else {
        elem.style.cssText = ''
        document.getElementById('dark-mode-bg').remove()
      }
    }
});


var darkModeElem = document.createElement('div');
darkModeElem.style.cssText = ''
darkModeElem.id = 'dark-mode-overlay'
document.body.appendChild(darkModeElem);
