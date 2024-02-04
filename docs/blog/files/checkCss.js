function checkCss(elmnt = null) {
  const logSet = (m, set) => console.log(m, Array.from(set).sort());

  const allExistingCssSelectors = new Set();
  const allExistingTagRules = new Set();
  const stylesheets = document.styleSheets;

  // debugger; // Uncomment to debug
  for (let s = 0; s < stylesheets.length; s++) {
    const rules = stylesheets[s].cssRules;
    for (let r = 0; r < rules.length; r++) {
      const selectors = rules[r].selectorText ? rules[r].selectorText.split(" ") : [];
      for (let l = 0; l < selectors.length; l++) {
        const le = selectors[l];
        if (le[0] != "#" && le[0] != ".") {
          allExistingTagRules.add(le);
        } else {
          allExistingCssSelectors.add(le);
        }
      }
    }
  }
  logSet("All existing css selectors in stylesheets", allExistingCssSelectors);

  const allSpecifiedDomCssSelectors = new Set();
  const allUsedTagNames = new Set();
  const elements = elmnt ? [elmnt] : document.querySelectorAll("*");
  for (let e = 0; e < elements.length; e++) {
    const element = elements[e];
    allUsedTagNames.add(element.tagName.toLowerCase());
    if (element.id) {
      allSpecifiedDomCssSelectors.add("#" + element.id);
    }
    if (element.className) {
      const classes =
        typeof element.className === "string"
          ? element.className.split(" ")
          : [...element.className.baseVal, ...element.className.animVal];
      for (let cl = 0; cl < classes.length; cl++) {
        allSpecifiedDomCssSelectors.add("." + classes[cl]);
      }
    }
  }
  logSet(
    `Specified css selectors on ${elements.length} ${
      elements.length === 1 ? "element" : "elements"
    }`,
    allSpecifiedDomCssSelectors
  );

  // Find those DOM css selectors that do not exist in the CSS selectors
  const nonExistingCssSelectors = Array.from(allSpecifiedDomCssSelectors).filter(
    (x) => !allExistingCssSelectors.has(x)
  );
  const existingCssSelectors = Array.from(allSpecifiedDomCssSelectors).filter((x) =>
    allExistingCssSelectors.has(x)
  );
  console.log("Used, non existing rules", nonExistingCssSelectors);
  console.log("Used, existing rules", existingCssSelectors);
}
