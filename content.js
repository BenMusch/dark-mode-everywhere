const OVERLAY_ID = 'dark-mode-overlay'
const OVERLAY_CSS = 'z-index:100000000000000000;pointer-events: none;width: 100vw;height: 100vh;position: fixed;top: 0;left: 0;background: white;mix-blend-mode: difference;'
const BG_ID = 'dark-mode-bg'

function getOverlayElem() {
  return document.getElementById(OVERLAY_ID)
}

function getBgElem() {
  return document.getElementById(BG_ID)
}

function rgba2rgb(RGB_background, RGBA_color)
{
    var alpha = RGBA_color.a;

    return new Color(
        (1 - alpha) * RGB_background.r + alpha * RGBA_color.r,
        (1 - alpha) * RGB_background.g + alpha * RGBA_color.g,
        (1 - alpha) * RGB_background.b + alpha * RGBA_color.b
    );
}

function getOverlayColor(computedBgColor) {
  if (!computedBgColor.startsWith('rgba(')) {
    if (!computedBgColor.startsWith('rgb(')) {
      console.error('Unrecognized bg color format ' + computedBgColor)
    }
    return computedBgColor
  }

  if (computedBgColor.endsWith(', 0)')) {
    // if it's completely transparent, it's effectively white
    return 'rgb(255, 255, 255)'
  } else {
    // else, calculate what it essentially looks like
    let rgbaString = computedBgColor.slice(4, -1) // remove rgb( and trailing paren
    let rgbaComponents = rgbaString.split(', ')
    let r = Number(rgbaComponents[0])
    let g = Number(rgbaComponents[1])
    let b = Number(rgbaComponents[2])
    let a = Number(rgbaComponents[3])

    // formula copied from http://marcodiiga.github.io/rgba-to-rgb-conversion
    let rStr = toString((1 - a) * 255 + a * r)
    let gStr = toString((1 - a) * 255 + a * g)
    let bStr = toString((1 - a) * 255 + a * b)
    return `rgb(${rStr}, ${gStr}, ${bStr})`
  }
}

function generateBackground() {
  let computedStyle = getComputedStyle(document.body)
  let computedBgColor = computedStyle.backgroundColor
  let bgElem = document.createElement('div')
  bgElem.style.cssText = `background:${getOverlayColor(computedBgColor)};z-index:-100000000000000000;pointer-events: none;width: 100vw;height: 100vh;position: fixed;top: 0;left: 0;`
  bgElem.id = BG_ID
  document.body.appendChild(bgElem)
}

function removeBackground() {
  getBgElem.remove()
}

chrome.runtime.onMessage.addListener(function(request) {
    if(request.action === 'toggle') {
      let elem = document.getElementById('dark-mode-overlay')
      if (elem.style.cssText === '') {
        elem.style.cssText = OVERLAY_CSS
        generateBackground()
      } else {
        elem.style.cssText = ''
        removeBackground()
      }
    }
});


var darkModeElem = document.createElement('div');
darkModeElem.style.cssText = ''
darkModeElem.id = OVERLAY_ID
document.body.appendChild(darkModeElem);
