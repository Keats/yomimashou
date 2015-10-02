// Grabs the text content of the first node matching the
// selector, otherwise returns ""
export function getTextContent(selector) {
  const nodes = document.querySelectorAll(selector);
  if (nodes) {
    return nodes[0].textContent;
  }

  return "";
}

export function getHref(selector) {
  const nodes = document.querySelectorAll(selector);
  if (nodes) {
    return nodes[0].href;
  }

  return "";
}

// We fetch from a given dom, not document, hence the first arg
export function getImageSource(doc, selector) {
  const nodes = doc.querySelectorAll(selector);
  if (nodes) {
    return nodes[0].src;
  }

  return "";
}

// Grabs a (value, text) tuple of each option in the first select
// matching the selector, otherwise returns []
export function getSelectContent(selector) {
  const options = [];
  const nodes = document.querySelectorAll(selector);
  let currentlySelected = -1;

  if (nodes) {
    // It's a NodeList object, not an array
    const children = Array.prototype.slice.call(nodes[0].children);

    children.map((option, index) => {
      if (option.selected) {
        currentlySelected = index;
      }
      options.push({
        text: option.textContent,
        value: option.value,
      });
    });
  }

  return {
    currentlySelected,
    options,
  };
}
