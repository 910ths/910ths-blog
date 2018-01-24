/* ---
  Has class
--- */

  Element.prototype.hasClass = function(className) {

    if (this.classList)
      return this.classList.contains(className);
    else
      return !!this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));

  }


/* ---
  Add class
--- */

  Element.prototype.addClass = function(className) {

    if (this.hasClass(className))
      return;

    if (this.classList)
      this.classList.add(className);
    else
      this.className += ' ' + className;

  }

  NodeList.prototype.addClass = function(className) {

    var length = this.length;

    for (var i = 0; i < length; i++)
      this[i].addClass(className);

  };

  HTMLCollection.prototype.addClass = NodeList.prototype.addClass;


/* ---
  Remove class
--- */

  Element.prototype.removeClass = function(className) {

    if (!this.hasClass(className))
      return;

    if (this.classList)
      this.classList.remove(className);
    else {

      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      this.className = this.className.replace(reg, ' ');

    }

  }

  NodeList.prototype.removeClass = function(className) {

    var length = this.length;

    for (var i = 0; i < length; i++)
      this[i].removeClass(className);

  };

  HTMLCollection.prototype.removeClass = NodeList.prototype.removeClass;


/* ---
  Toggle class
--- */

  Element.prototype.toggleClass = function(className) {

    if (!this.hasClass(className))
      this.addClass(className);
    else
      this.removeClass(className);

  }

  NodeList.prototype.toggleClass = function(className) {

    var length = this.length;

    for (var i = 0; i < length; i++)
      this[i].toggleClass(className);

  };

  HTMLCollection.prototype.toggleClass = NodeList.prototype.toggleClass;