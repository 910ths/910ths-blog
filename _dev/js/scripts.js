"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ---
 
  How to use?

    • include this file
    • use functions in your JS code:

      • run animation:

        this._animation = new Animation()
        this._animation.start(
          start,
          delta,
          duration,
          'easeOutCubic',
          (value) => { this.callback(value) }
        )

      • stop animation:

        this._animation.stop()

--- */

var Animation = function () {
    function Animation() {
        _classCallCheck(this, Animation);

        this._fReady = true;
        this._time = null;
        this._inLoop = false;
        this._animation = null;
        this._easings = {
            linear: function linear(t) {
                return t;
            },
            easeInQuad: function easeInQuad(t) {
                return t * t;
            },
            easeOutQuad: function easeOutQuad(t) {
                return t * (2 - t);
            },
            easeInOutQuad: function easeInOutQuad(t) {
                return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            },
            easeInCubic: function easeInCubic(t) {
                return t * t * t;
            },
            easeOutCubic: function easeOutCubic(t) {
                return --t * t * t + 1;
            },
            easeInOutCubic: function easeInOutCubic(t) {
                return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            },
            easeInQuart: function easeInQuart(t) {
                return t * t * t * t;
            },
            easeOutQuart: function easeOutQuart(t) {
                return 1 - --t * t * t * t;
            },
            easeInOutQuart: function easeInOutQuart(t) {
                return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
            },
            easeInQuint: function easeInQuint(t) {
                return t * t * t * t * t;
            },
            easeOutQuint: function easeOutQuint(t) {
                return 1 + --t * t * t * t * t;
            },
            easeInOutQuint: function easeInOutQuint(t) {
                return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
            }
        };
    }

    _createClass(Animation, [{
        key: "start",
        value: function start(_start, delta, duration, easing, action) {

            if (this._inLoop) return;

            this._sTime = window.performance.now();
            this._eTime = this._sTime + duration;
            this._duration = duration;
            this._sValue = _start;
            this._dValue = delta;
            this._easing = this._easings[easing];
            this._action = action;

            this._startLoop();
        }
    }, {
        key: "stop",
        value: function stop() {

            this._stopLoop();
        }

        /* ---
          Loop
        --- */

    }, {
        key: "_startLoop",
        value: function _startLoop() {
            var _this = this;

            this._inLoop = true;
            this._animation = requestAnimationFrame(function () {
                _this._loop();
            });
        }
    }, {
        key: "_loop",
        value: function _loop() {
            var _this2 = this;

            this._animation = requestAnimationFrame(function () {
                _this2._loop();
            });

            if (!this._fReady) return;

            this._fReady = false;
            this._time = window.performance.now();
            this._update(this._time);
            this._fReady = true;
        }
    }, {
        key: "_update",
        value: function _update(time) {

            if (time > this._eTime) this._stopLoop();

            var fract = (time - this._sTime) / this._duration;
            fract = this._easing(fract);
            var value = this._sValue + fract * this._dValue;

            this._action(value);
        }
    }, {
        key: "_stopLoop",
        value: function _stopLoop() {

            cancelAnimationFrame(this._animation);
            this._animation = null;
            this._inLoop = false;
        }
    }]);

    return Animation;
}();
'use strict';

/* ---
  Has class
--- */

Element.prototype.hasClass = function (className) {

  if (this.classList) return this.classList.contains(className);else return !!this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

/* ---
  Add class
--- */

Element.prototype.addClass = function (className) {

  if (this.hasClass(className)) return;

  if (this.classList) this.classList.add(className);else this.className += ' ' + className;
};

NodeList.prototype.addClass = function (className) {

  var length = this.length;

  for (var i = 0; i < length; i++) {
    this[i].addClass(className);
  }
};

HTMLCollection.prototype.addClass = NodeList.prototype.addClass;

/* ---
  Remove class
--- */

Element.prototype.removeClass = function (className) {

  if (!this.hasClass(className)) return;

  if (this.classList) this.classList.remove(className);else {

    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    this.className = this.className.replace(reg, ' ');
  }
};

NodeList.prototype.removeClass = function (className) {

  var length = this.length;

  for (var i = 0; i < length; i++) {
    this[i].removeClass(className);
  }
};

HTMLCollection.prototype.removeClass = NodeList.prototype.removeClass;

/* ---
  Toggle class
--- */

Element.prototype.toggleClass = function (className) {

  if (!this.hasClass(className)) this.addClass(className);else this.removeClass(className);
};

NodeList.prototype.toggleClass = function (className) {

  var length = this.length;

  for (var i = 0; i < length; i++) {
    this[i].toggleClass(className);
  }
};

HTMLCollection.prototype.toggleClass = NodeList.prototype.toggleClass;
'use strict';

var currentScroll = function currentScroll() {

  var scroll = window.scrollY || window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;

  if (document.body.style.position == 'fixed') scroll = -parseInt(document.body.style.top);

  return scroll;
};
"use strict";

/* ---
  Element index
--- */

var indexElement = function indexElement(element) {

  var siblings = element.parentNode.childNodes;
  var index = 0;

  for (var i = 0; i < siblings.length; i++) {

    if (siblings[i].nodeType != 1) continue;

    if (siblings[i] == element) return index;

    index++;
  }

  return -1;
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ---
 
  How to use?

    • include this file
    • use functions in your JS code:

      • lock scrolling:
        Scroll.lock();

      • unlock scrolling:
        Scroll.unlock();

--- */

var ScrollCore = function () {
  function ScrollCore() {
    var _this = this;

    _classCallCheck(this, ScrollCore);

    this._touchStart = 0;
    this._scrollY = 0;

    this._actionTouch = function (e) {
      _this._touchStart = e.touches[0].pageY;
    };
    this._actionScroll = function (e) {
      _this.findScrollableElementInside(e);
    };
    this._actionLockScroll = function (e) {
      window.scroll(0, _this._scrollY);
    };
  }

  /* ---
    Lock scroll
  --- */

  _createClass(ScrollCore, [{
    key: 'lock',
    value: function lock() {

      this._scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

      window.addEventListener('mousewheel', this._actionScroll, { passive: false });
      window.addEventListener('touchmove', this._actionScroll, { passive: false });
      window.addEventListener('touchstart', this._actionTouch);
      window.addEventListener('scroll', this._actionLockScroll);
    }

    /* ---
      Unlock scroll
    --- */

  }, {
    key: 'unlock',
    value: function unlock() {

      window.removeEventListener('mousewheel', this._actionScroll);
      window.removeEventListener('touchmove', this._actionScroll);
      window.removeEventListener('touchstart', this._actionTouch);
      window.removeEventListener('scroll', this._actionLockScroll);
    }

    /* ---
      Find scrollable element inside
    --- */

  }, {
    key: 'findScrollableElementInside',
    value: function findScrollableElementInside(e) {

      var element = e.target;
      var touchStart = this._touchStart;

      if (element === document) {

        e.preventDefault();
        return true;
      }

      while (element.nodeName.toLowerCase() != 'body') {

        var overflowY = window.getComputedStyle(element, null).getPropertyValue('overflow-y');
        var scrollingUp = e.wheelDelta ? -e.wheelDelta < 0 : e.touches[0].pageY > touchStart;

        if (overflowY == 'scroll' || overflowY == 'auto') {

          if (!scrollingUp && element.scrollTop < element.scrollHeight - element.clientHeight) return true;else if (scrollingUp && element.scrollTop > 0) return true;
        }

        element = element.parentNode;
      }

      e.preventDefault();
      return true;
    }
  }]);

  return ScrollCore;
}();

var Scroll = new ScrollCore();
'use strict';

/* ---
  Slide down
--- */

var slideDown = function slideDown(element, duration) {

  var currentHeight = element.clientHeight;
  var currentDisplay = window.getComputedStyle(element).getPropertyValue('position');
  element.style.position = 'absolute';
  element.style.display = 'block';
  element.style.position = '';
  element.style.display = currentDisplay;

  if (currentHeight > 0) {

    slideUp(element, 300);
    return;
  }

  TweenLite.set(element, {
    display: 'block',
    height: 'auto',
    overflow: 'hidden'
  });

  TweenLite.from(element, duration / 1000, {
    height: 0,
    onComplete: function onComplete() {

      element.style.overflow = '';
    }
  });
};

/* ---
  Slide up
--- */

var slideUp = function slideUp(element, duration) {

  TweenLite.set(element, {
    overflow: 'hidden'
  });

  TweenLite.to(element, duration / 1000, {
    height: 0,
    onComplete: function onComplete() {

      element.style.display = 'none';
      element.style.overflow = '';
    }
  });
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HideScroll = function () {
    function HideScroll() {
        _classCallCheck(this, HideScroll);

        if (this.setVars()) this.setEvents();
    }

    _createClass(HideScroll, [{
        key: 'setVars',
        value: function setVars() {

            this._items = document.querySelectorAll('.hideScroll');

            if (!this._items.length) return;

            this._headerHeight = 0;
            this._bottomMargin = 0;
            this._list = [];
            this._listUnique = [];

            return true;
        }
    }, {
        key: 'setEvents',
        value: function setEvents() {
            var _this = this;

            this.checkItems();
            this._showItems();

            window.addEventListener('scroll', function () {

                _this.checkItems();
            });
        }
    }, {
        key: 'checkItems',
        value: function checkItems() {

            var scroll = -(parseInt(document.body.style.top) || 0) + window.innerHeight - this._bottomMargin;
            var length = this._items.length;

            for (var i = 0; i < length; i++) {

                if (this._items[i].hasClass('hideScroll--active') || this._listUnique.indexOf(i) > -1) continue;

                var offset = this._items[i].getBoundingClientRect().top + (-parseInt(document.body.style.top) || 0);

                if (scroll >= offset) {

                    this._list.push({
                        index: i,
                        offset: offset
                    });
                    this._listUnique.push(i);

                    this._items[i].addClass('hideScroll--hidden');
                }
            }
        }
    }, {
        key: '_showItems',
        value: function _showItems(time) {
            var _this2 = this;

            var timeout = typeof time !== 'undefined' ? time : 300;

            clearTimeout(this._timeout);
            this._timeout = setTimeout(function () {
                _this2._showItem();
            }, timeout);
        }
    }, {
        key: '_showItem',
        value: function _showItem() {

            var time = 300;

            if (this._list.length != 0) {

                var index = this._list[0].index;
                var scroll = (-parseInt(document.body.style.top) || 0) + this._headerHeight;

                if (this._list[0].offset < scroll) time = 0;

                this._items[index].addClass('hideScroll--active');
                this._list.splice(0, 1);
            }

            this._showItems(time);
        }
    }]);

    return HideScroll;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MasonryGrid = function () {
    function MasonryGrid() {
        _classCallCheck(this, MasonryGrid);

        if (this._setVars()) this._setEvents();
    }

    _createClass(MasonryGrid, [{
        key: '_setVars',
        value: function _setVars() {

            this._section = document.querySelector('.articlesList');
            this._list = document.querySelector('.articlesList__list');

            if (!this._section || !this._list) return;

            this._items = this._list.querySelectorAll('.article');

            if (!this._items.length) return;

            this._length = this._items.length - 1;
            this._moreWrap = this._section.querySelector('.articlesList__moreWrap');
            this._more = this._moreWrap.querySelector('.articlesList__more');
            this._config = {
                classes: {
                    articleLeft: 'article--left',
                    articleRight: 'article--right'
                },
                items: {
                    margin: {
                        default: 60,
                        first: 20
                    },
                    distance: 70
                },
                arabicVersion: this._list.getAttribute('data-dir') == 'rtl',
                limit: parseInt(this._list.getAttribute('data-limit')) - 1,
                more_count: parseInt(this._list.getAttribute('data-more-count')),
                last: this._length,
                duration: parseInt(this._list.getAttribute('data-animation-duration'))
            };
            this._heights = [];
            this._animation = new Animation();
            this._inAnimation = false;
            this._isMobile = Math.round(this._list.offsetWidth / this._items[0].offsetWidth) == 1;

            if (this._config.limit >= this._length) {

                this._config.limit = this._length;
                this._list.addClass('articlesList__list--loaded');
                this._moreWrap.addClass('articlesList__moreWrap--hide');
            }

            return true;
        }
    }, {
        key: '_setEvents',
        value: function _setEvents() {
            var _this = this;

            this._initMasonry();

            this._more.addEventListener('click', function (e) {

                e.preventDefault();
                _this._loadMore();
            });

            window.addEventListener('resize', function (e) {

                _this._isMobile = Math.round(_this._list.offsetWidth / _this._items[0].offsetWidth) == 1;
                _this._initMasonry();
            });
        }
    }, {
        key: '_initMasonry',
        value: function _initMasonry() {

            var leftColTop = 0,
                leftColHeight = 0,
                rightColTop = 0,
                rightTopHeight = 0,
                mobileHeight = 0,
                prev = void 0;
            this._heights = [];

            for (var i = 0; i <= this._length; i++) {

                var top = 0;
                var isFirst = i == 0;
                var isLeftColumn = isFirst && this._config.arabicVersion || leftColHeight < rightTopHeight;
                var height = this._items[i].offsetHeight;
                var offset = isFirst ? this._config.items.margin.first : this._config.items.margin.default;

                this._items[i].removeClass(this._config.classes.articleRight);
                this._items[i].removeClass(this._config.classes.articleLeft);

                this._items[i].style.position = '';
                this._items[i].style.top = '';
                this._items[i].style.left = '';
                this._items[i].style.right = '';

                if (!this._isMobile) {

                    if (isLeftColumn) {

                        top = offset + leftColHeight;
                        var diffCol = top - rightColTop;

                        if (!isFirst && diffCol < this._config.items.distance) top = top + (this._config.items.distance - diffCol);

                        this._items[i].style.position = 'absolute';
                        this._items[i].style.top = top + 'px';
                        this._items[i].style.left = '0px';

                        this._items[i].addClass(this._config.classes.articleLeft);

                        leftColTop = top;
                        leftColHeight = top + height;
                    } else {

                        top = offset + rightTopHeight;
                        var _diffCol = top - leftColTop;

                        if (!isFirst && _diffCol < this._config.items.distance) top = top + (this._config.items.distance - _diffCol);

                        this._items[i].style.position = 'absolute';
                        this._items[i].style.top = top + 'px';
                        this._items[i].style.right = '0px';

                        this._items[i].addClass(this._config.classes.articleRight);

                        rightColTop = top;
                        rightTopHeight = top + height;
                    }
                } else {

                    top = mobileHeight;
                    mobileHeight += height;
                }

                if (i < this._length) this._heights.push(top + (height - this._items[i].querySelector('.article__footer').offsetHeight));else this._heights.push(top + height);
            }

            this._list.style.height = this._heights[this._config.limit] + 'px';
        }
    }, {
        key: '_loadMore',
        value: function _loadMore() {
            var _this2 = this;

            if (this._inAnimation) return;

            this._inAnimation = true;
            this._config.limit += this._config.more_count;

            if (this._config.limit > this._config.last) this._config.limit = this._config.last;

            if (this._config.limit == this._config.last) {

                this._list.addClass('articlesList__list--loaded');
                this._moreWrap.addClass('articlesList__moreWrap--hide');
            }

            var start = parseInt(this._list.style.height);
            var delta = this._heights[this._config.limit] - start;

            this._more.addClass('articlesList__more--animation');

            this._animation.start(start, delta, this._config.duration, 'easeOutCubic', function (value) {
                _this2.animationHeight(value);
            });

            setTimeout(function () {

                _this2._inAnimation = false;
                _this2._more.removeClass('articlesList__more--animation');
            }, this._config.duration);
        }
    }, {
        key: 'animationHeight',
        value: function animationHeight(value) {

            this._list.style.height = value + 'px';
        }
    }]);

    return MasonryGrid;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
  function Menu() {
    _classCallCheck(this, Menu);

    if (this._setVars()) this._setEvents();
  }

  _createClass(Menu, [{
    key: '_setVars',
    value: function _setVars() {

      this._menu = document.querySelector('.menu');

      if (!this._menu) return;

      return true;
    }
  }, {
    key: '_setEvents',
    value: function _setEvents() {}
  }]);

  return Menu;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stats = function () {
  function Stats() {
    _classCallCheck(this, Stats);

    if (this.setVars()) this.setEvents();
  }

  _createClass(Stats, [{
    key: 'setVars',
    value: function setVars() {

      this._list = document.querySelector('.articlesList');

      if (!this._list || !fb910ths) return;

      this._items = this._list.querySelectorAll('.article');
      this._length = this._items.length;
      this._token = fb910ths.app_id + '|' + fb910ths.app_secret;
      this._apiUrl = 'https://graph.facebook.com/?id={URL}&access_token=' + this._token + '&fields=engagement';

      return true;
    }
  }, {
    key: 'setEvents',
    value: function setEvents() {
      var _this = this;

      window.addEventListener('load', function () {

        _this._getStats();
      });
    }
  }, {
    key: '_getStats',
    value: function _getStats() {
      var _this2 = this;

      var _loop = function _loop(i) {

        var url = _this2._apiUrl.replace('{URL}', _this2._items[i].getAttribute('data-url'));
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';

        xhr.onload = function () {

          if (xhr.status !== 200) return;

          var likes = xhr.response.engagement.reaction_count;
          var comments = xhr.response.engagement.comment_plugin_count;

          _this2._items[i].querySelector('.article__stat--like').innerHTML = likes;
          _this2._items[i].querySelector('.article__stat--comment').innerHTML = comments;
        };

        xhr.send();
      };

      for (var i = 0; i < this._length; i++) {
        _loop(i);
      }
    }
  }]);

  return Stats;
}();
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = function Core() {
  _classCallCheck(this, Core);

  document.cftn = {};
  document.cftn.hideScroll = new HideScroll();
  document.cftn.menu = new Menu();
  document.cftn.masonryGrid = new MasonryGrid();
  document.cftn.stats = new Stats();
};

var domReady = function domReady(callback) {

  if (document.readyState === 'interactive' || document.readyState === 'complete') callback();else document.addEventListener('DOMContentLoaded', callback);
};

domReady(function () {
  return new Core();
});