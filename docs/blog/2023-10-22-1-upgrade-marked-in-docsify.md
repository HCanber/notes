<div class="blog-date">2023-10-22</div>

# Upgrade the markdown parser in Docsify

At the time of writing this, Docsify 4 uses [Marked](https://www.npmjs.com/package/marked) version 4. I want to use the latest version of Marked, which is 9 as it supports extensions.

Based on this issue https://github.com/docsifyjs/docsify/issues/1885 this is what you need to change.

Load the new version of Marked in `index.html` before configuring Docsify:

```html
<script src="//cdn.jsdelivr.net/npm/marked@9/marked.min.js"></script>

<script>
  window.$docsify = {
    // ...
  }
</script>
```

Then configure Docsify to use the new version of Marked:

```html
<script>
  let newMarked = marked
  window.$docsify = {
    // ...
    markdown: function (originMarked, renderer) {
      newMarked.use({
        renderer,
      })
      return newMarked.parse
    },
  }
</script>
```

That's it! Now Marked version 9 is used.
