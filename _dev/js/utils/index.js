/* ---
  Element index
--- */

var indexElement = function(element) {

  var siblings = element.parentNode.childNodes;
  var index    = 0;

  for (var i = 0; i < siblings.length; i++) {
  
    if (siblings[i].nodeType != 1)
      continue;

    if (siblings[i] == element)
      return index;

    index++;

  }

  return -1;

}