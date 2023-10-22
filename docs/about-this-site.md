# This site's setup

## Docsify

This site has been built using [Docsify](https://docsify.js.org/). It generates a static site from markdown files.

You can see the repo for this site at [github.com/hcanber/notes](https://github.com/hcanber/notes).

## Deploying

The site is deployed automatically on every push to the `main` branch using [GitHub Pages](https://pages.github.com/). The site is deployed from the `docs` folder in the repo, and hosted by GitHub Pages. I have then configured a [custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for the site by creating a `CNAME` file in the `docs` folder and a `CNAME` entry for my domain at my DNS provider. All according to [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Plugins

A few plugins have been installed as well:

- [docsify-themable](https://jhildenbiddle.github.io/docsify-themeable)
  Makes it possible to have themes. I'm using the `theme-simple` and `theme-simple-dark` themes.

- [docsify-tabs](https://jhildenbiddle.github.io/docsify-tabs/)
  Makes it possible to have tabs in the markdown.
  Example:
  <!-- tabs:start -->

  #### **Tab 1**

  This is Tab 1

  #### **Tab 2**

  This is Tab 2

  #### **Markdown code**

  ```md
  <!-- tabs:start -->

  #### **Tab 1**

  This is Tab 1

  #### **Tab 2**

  This is Tab 2

  <!-- tabs:end -->
  ```

  <!-- tabs:end -->

- [full text search](https://docsify.js.org/#/plugins?id=full-text-search)
  The full text search up in the top left corner.

- [zoom image](https://docsify.js.org/#/plugins?id=zoom-image)
  Opens images in a image viewer when clicked.

- [docsify-copy-code](https://github.com/jperasmus/docsify-copy-code)
  Shows a copy button when hovering code blocks. Example:

  ```text
  Demo text
  ```

- [Custom: Theme switcher](https://github.com/hcanber/notes/docs/plugins/docsify-plugin-theme-switcher.js)
  Shows a button at the bottom of the menu to be able to switch between the light and dark theme.
  It does this by enabling and disabling the `theme-simple` and `theme-simple-dark` css files.
  See [index.html](https://github.com/hcanber/notes/docs/index.html)

- [Custom: View on GitHub](https://github.com/hcanber/notes/docs/plugins/docsify-plugin-theme-switcher.js)
  Shows a link at the top of the page to view the current page on GitHub. Like [docsify-edit-on-github](https://github.com/njleonzhang/docsify-edit-on-github) but with easier initialization, and css stylable.

## Other changes

- The markdown parser [Marked](https://marked.js.org/) has been upgraded to version 9. See [this blog post](blog/2023-10-22-1-upgrade-marked-in-docsify.md) for more info.

## Custom styling

The themes have been modified slightly, and a few css variables have been tweaked. See the style tag with `id=custom-theme` in [index.html](https://github.com/hcanber/notes/docs/index.html)
