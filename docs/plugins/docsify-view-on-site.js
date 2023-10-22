;(function () {
  var css = `
/* Inserted by docsify-view-on-site */

.view-on-site-container {
  display: flex;
  justify-content: end;
  font-size: 0.9em;
}
`
  var htmlTemplate = `<div class="view-on-site-container"><a href="{{href}}">{{text}}</a></div>`

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

  var plugin = function (hook, vm) {
    // Invoked one time when docsify script is initialized
    hook.init(function () {
      if (!$docsify.viewOnSite.url) {
        $docsify.viewOnSite.url = $docsify.repo + '/blob/main/docs/'
      }
      addCss(css)
    })

    /*
    // Invoked one time when the docsify instance has mounted on the DOM
    hook.mounted(function () {})

    // Invoked on each page load before new markdown is transformed to HTML.
    // Supports asynchronous tasks (see beforeEach documentation for details).
    hook.beforeEach(function (markdown) {
      // ...
      return markdown
    })
    */
    // Invoked on each page load after new markdown has been transformed to HTML.
    // Supports asynchronous tasks (see afterEach documentation for details).
    hook.afterEach(function (html) {
      const title = $docsify.viewOnSite.title || 'View on GitHub'
      if (typeof title === 'function') {
        title = title(vm.route.file, vm)
      }
      let url = $docsify.viewOnSite.url || ''
      if (typeof url === 'function') {
        url = url(vm.route.file, vm)
      } else {
        url = url + vm.route.file
      }
      const header = htmlTemplate.replace('{{href}}', url).replace('{{text}}', title)
      return header + html
    })
    /*
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

  $docsify.viewOnSite = {
    title: 'View on GitHub',
    url: null,
  }
})()
