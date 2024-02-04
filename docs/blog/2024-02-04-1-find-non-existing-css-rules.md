<div class="blog-date">2024-02-04</div>

# Find all non existing css classes

This is a script that given an element, finds all non existing css classes, i.e. all classes that are not defined in any stylesheets.
Based on code from [this stackoverflow answer](https://stackoverflow.com/a/24887988).

[filename](files/checkCss.js ':include :type=code')

## Usage

1. [Open the Browser's dev tools](https://balsamiq.com/support/faqs/browserconsole/)
2. Paste the script into the console
3. Select the element you want to check
4. Run the script:

   ```javascript
   checkCss($0)
   ```

5. The result will be printed in the console

If no element is specified, the script will check all elements in the document.

## Find unused css classes

To find unsed css, and javascript, in Chrome & Edge (and other chromium based broweser) use the [coverage tab](https://developer.chrome.com/docs/devtools/coverage) in the dev tools.
In Safari, see https://devtoolstips.org/tips/en/detect-unused-code/
