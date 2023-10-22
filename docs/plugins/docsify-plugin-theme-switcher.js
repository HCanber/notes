;(function () {
  var css = `
/* Inserted by docsify-plugin-theme-switcher */
:root {
  --theme-switcher-selector-btn-margin:     0.4em;
  --theme-switcher-selector-border-radius:  0.4em;
  --theme-switcher-selector-padding:        0.4em;
  --theme-switcher-selector-color:          var(--base-color);
  --theme-switcher-selector-background:     color-mix(in srgb,var(--base-background-color),#000 20%)
}

.theme-switcher-selector {
  order: 999999999;
  flex-grow: 1;
  display: flex;
  justify-content: end;
  flex-direction: column;
}

.sidebar .theme-switcher-selector {
  margin: var(--theme-switcher-selector-margin, 0);
}

.theme-switcher-selector-btn {
  background: var(--theme-switcher-selector-btn-background, inherit);
  border: none;
  display: flex;
  justify-content: center;
  padding: var(--theme-switcher-selector-padding);
  border-radius: var(--theme-switcher-selector-border-radius);
  cursor: pointer;
  color: var(--theme-switcher-selector-color);
}

.theme-switcher-selector-btn:hover,
.theme-switcher-selector-btn:has(input[type="checkbox"]:checked) {
  background: var(--theme-switcher-selector-background);
}
.theme-switcher-selector-btn:has(input[type="checkbox"]:checked) {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.theme-switcher-selector-btn input[type="checkbox"] {
  opacity: 0;
  position: absolute;
}

.theme-switcher-selector-content {
  display: flex;
  justify-content: center;
  width: 100%;
  visibility: hidden;
  background: var(--theme-switcher-selector-background);
  border-top-left-radius: var(--theme-switcher-selector-border-radius);
  border-top-right-radius: var(--theme-switcher-selector-border-radius);
}
.theme-switcher-selector-content ul {
  margin: 0;
  padding: 0;
  list-style: none;
  // border-top-right-radius: var(--theme-switcher-selector-border-radius);
}

.theme-switcher-selector-content:has(+ .theme-switcher-selector-btn input[type="checkbox"]:checked){
  visibility: visible;
}

.theme-switcher-selector-content li {
  padding: var(--theme-switcher-selector-padding);
  font-weight: 600;
  border-radius: var(--theme-switcher-selector-border-radius);
}

.theme-switcher-selector-content li:hover {
  background: var(--theme-switcher-selector-color);
}

.theme-switcher-selector-content li .icon {
  display: inline-block;
  width: 1.5em;
}
.theme-switcher-selector-content li span {
  display: block;
  color: var(--theme-switcher-selector-color);
}

.theme-switcher-selector-content li:hover span {
  color: var(--theme-switcher-selector-background);
}

.theme-switcher-notransition{
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
}
`
  var selectorHtml = `
<div class="theme-switcher-selector-content"><ul>{{items}}</ul></div>
<label class="theme-switcher-selector-btn" tabindex="0">
  <input type="checkbox"/>
  <span>{{label}}</span>
</label>
`
  function addCss(css) {
    var hd = document.head || document.getElementsByTagName('head')[0]
    var stl = document.createElement('style')
    if (stl.styleSheet) {
      stl.styleSheet.cssText = css
    } else {
      stl.appendChild(document.createTextNode(css))
    }
    var beforeChild = document.querySelector
      ? document.querySelector('style#custom-theme')
      : document.getElementById('custom-theme')
    hd.insertBefore(stl, beforeChild)
  }

  function detectColorScheme() {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
      return 'light'
    }
  }

  function getAutoDetectedTheme() {
    const scheme = detectColorScheme()
    return $docsify.themeSwitcher.osThemeMap[scheme] || 'light'
  }

  function getStoredOrAutoDetectTheme() {
    //local storage is used to override OS theme settings
    return localStorage.getItem('theme') || getAutoDetectedTheme()
  }

  var plugin = function (hook, vm) {
    let themesById

    function setTheme(theme) {
      const { node: newThemeNode } = themesById[theme] || {}
      if (newThemeNode) {
        var bodyNode = document.getElementsByTagName('body')[0]
        var noTransitionNodes = $docsify.themeSwitcher.noTransitionSelectors
          .map((s) => bodyNode.querySelector(s))
          .filter((n) => n)
        noTransitionNodes.forEach((n) => n.classList.add('theme-switcher-notransition'))
        newThemeNode.removeAttribute('disabled')

        for (const { node } of Object.values(themesById)) {
          if (node === newThemeNode) continue
          node.setAttribute('disabled', true)
        }
        document.documentElement.setAttribute('data-theme', theme)

        localStorage.setItem('theme', theme)

        noTransitionNodes.forEach((n) => {
          n.offsetHeight // Trigger a reflow, flushing the CSS changes
        })
        setTimeout(() => {
          noTransitionNodes.forEach((n) => n.classList.remove('theme-switcher-notransition'))
        }, 100)
        console.log('theme-switcher:', 'Set theme:', theme)
      }
    }
    // Invoked one time when docsify script is initialized
    hook.init(function () {
      themesById = Object.fromEntries(
        Object.keys($docsify.themeSwitcher.themes)
          .filter((t) => t !== 'auto')
          .map((t) => {
            const id = `theme-${t}`
            const node = document.getElementById(id)
            if (node) {
              return [t, { id, node }]
            }
            console.log('theme-switcher:', 'Warning: Could not find node with id:', id)
            return null
          })
          .filter((n) => n)
      )

      var theme = $docsify.themeSwitcher.theme || 'auto'
      if (theme === 'auto') {
        var detectedTheme = getStoredOrAutoDetectTheme()
        theme = $docsify.themeSwitcher.themeMap
          ? $docsify.themeSwitcher.themeMap[detectedTheme] || 'light'
          : detectedTheme
      }
      addCss(css)
      setTheme(theme)
    })

    // Invoked one time when the docsify instance has mounted on the DOM
    hook.mounted(function () {
      var themeItems = Object.entries($docsify.themeSwitcher.themes)
        .map(
          ([theme, label]) =>
            `<li><span data-theme="${theme}">${
              Array.isArray(label) ? '<span class="icon">' + label[0] + '</span>' + label[1] : label
            }</span></li>`
        )
        .join('')
      var switcher = document.createElement('div')
      switcher.className = 'theme-switcher-selector'
      switcher.innerHTML = selectorHtml
        .replace('{{label}}', $docsify.themeSwitcher.label)
        .replace('{{items}}', themeItems)
      var parentNode = document.querySelector('.sidebar') || document.body

      parentNode.appendChild(switcher)
      const checkboxNode = switcher.querySelector('input[type="checkbox"]')
      document.addEventListener('click', function (e) {
        if (switcher.contains(e.target)) {
          var theme = e.target.dataset.theme
          if (theme) {
            if (theme === 'auto') {
              theme = getAutoDetectedTheme()
            }
            setTheme(theme)
            checkboxNode.checked = false
          }
        } else {
          checkboxNode.checked = false
        }
      })
    })
    /*
    // Invoked on each page load before new markdown is transformed to HTML.
    // Supports asynchronous tasks (see beforeEach documentation for details).
    hook.beforeEach(function (markdown) {
      // ...
      return markdown
    })

    // Invoked on each page load after new markdown has been transformed to HTML.
    // Supports asynchronous tasks (see afterEach documentation for details).
    hook.afterEach(function (html) {
      // ...
      return html
    })

    // Invoked on each page load after new HTML has been appended to the DOM
    hook.doneEach(function () {
      // ...
    })

    // Invoked one time after rendering the initial page
    hook.ready(function () {})
    */
  }

  // Add plugin to docsify's plugin array
  $docsify = $docsify || {}
  $docsify.plugins = [].concat(plugin, $docsify.plugins || [])

  $docsify.themeSwitcher = {
    label: 'Theme',
    theme: 'auto',
    themes: {
      light: ['\u263C', 'Light'],
      dark: ['\u263E', 'Dark'],
      auto: ['\u25D0', 'OS Default'],
    },
    osThemeMap: {
      light: 'light',
      dark: 'dark',
    },
    noTransitionSelectors: ['.sidebar', 'main>aside+section', '.github-corner', '.sidebar-toggle'],
  }
})()
