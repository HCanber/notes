[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/HCanber/notes)

# My Notes

See https://notes.canberger.se for the rendered version.

## How to run locally

Built using [Docsify](https://docsify.js.org/).

### Prerequisites

- VSCode
- Docker

### Open in VS Code

Clone, and open this repository in VSCode in Dev Containers, or use this link: [Open in Dev Containers](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/HCanber/notes) to get started. Clicking the link will cause VS Code to automatically install the Dev Containers extension if needed, clone the source code into a container volume, and spin up a dev container for use.

### Run

Either hit F5 to start the server in the container, or run the following command in the terminal:

```sh
docsify serve docs
```

Open http://localhost:3000 in your browser.

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

  ```md
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
