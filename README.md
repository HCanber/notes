# My Notes

See https://notes.canberger.se for the rendered version.

## How to run locally

Built using [Docsify](https://docsify.js.org/).

### Prerequisites

Install [Docsify](https://docsify.js.org/#/quickstart) globally:

```sh
npm i docsify-cli -g
```

### Run

```sh
docsify serve docs
```

## Markdown

Written using normal markdown supported by [Marked](https://marked.js.org/#specifications) including [GitHub](https://github.github.com/gfm/) + these extensions:

- Marked text:

  ```md
  This will be <mark>marked</mark> with yellow background color
  ```

  Renders as: <mark>marked text</mark>
- Styled block quotes:
  ```md
  !> **Important** Rendered in red with ! in a circle.

  ?> **Tip** Rendered in blue with i in a circle.
  ```

  See https://jhildenbiddle.github.io/docsify-themeable/#/markdown?id=notices

- Tabs:

  ``` md
  <!-- tabs:start -->

  #### **Tab 1**

  This is tab 1

  #### **Tab 2**

  This is tab 2

  <!-- tabs:end -->
  ```

  See https://jhildenbiddle.github.io/docsify-tabs

- Emojies:

  ```md
  :stuck_out_tongue_winking_eye:
  ```
  
  Renders as: 😜
  Unicode emojis works as well
  See https://www.webfx.com/tools/emoji-cheat-sheet/
  
Theming: https://jhildenbiddle.github.io/docsify-themeable/#/markdown
