/* ---
 
  How to use?

    • include this file
    • use functions in your JS code:

      • lock scrolling:
        Scroll.lock();

      • unlock scrolling:
        Scroll.unlock();

--- */

class ScrollCore {

  constructor() {

    this._touchStart = 0;
    this._scrollY    = 0;

    this._actionTouch      = (e) => { this._touchStart = e.touches[0].pageY; }
    this._actionScroll     = (e) => { this.findScrollableElementInside(e); }
    this._actionLockScroll = (e) => { window.scroll(0, this._scrollY); }

  }

  /* ---
    Lock scroll
  --- */

    lock() {

      this._scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

      window.addEventListener('mousewheel', this._actionScroll, { passive: false });
      window.addEventListener('touchmove',  this._actionScroll, { passive: false });
      window.addEventListener('touchstart', this._actionTouch);
      window.addEventListener('scroll',     this._actionLockScroll);

    }

  /* ---
    Unlock scroll
  --- */

    unlock() {

      window.removeEventListener('mousewheel', this._actionScroll);
      window.removeEventListener('touchmove',  this._actionScroll);
      window.removeEventListener('touchstart', this._actionTouch);
      window.removeEventListener('scroll',     this._actionLockScroll);

    }

  /* ---
    Find scrollable element inside
  --- */

    findScrollableElementInside(e) {

      var element    = e.target;
      var touchStart = this._touchStart;

      if (element === document) {

        e.preventDefault();
        return true;

      }

      while (element.nodeName.toLowerCase() != 'body') {

        var overflowY   = window.getComputedStyle(element, null).getPropertyValue('overflow-y');
        var scrollingUp = e.wheelDelta ? (-e.wheelDelta < 0) : (e.touches[0].pageY > touchStart);

        if ((overflowY == 'scroll') || (overflowY == 'auto')) {

          if (!scrollingUp && (element.scrollTop < (element.scrollHeight - element.clientHeight)))
            return true;
          else if (scrollingUp && (element.scrollTop > 0))
            return true;

        }

        element = element.parentNode;

      }

      e.preventDefault();
      return true;

    }

}

var Scroll = new ScrollCore();