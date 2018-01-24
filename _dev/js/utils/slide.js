/* ---
  Slide down
--- */

  var slideDown = function(element, duration) {

    var currentHeight      = element.clientHeight;
    var currentDisplay     = window.getComputedStyle(element).getPropertyValue('position');
    element.style.position = 'absolute';
    element.style.display  = 'block';
    element.style.position = '';
    element.style.display  = currentDisplay;

    if (currentHeight > 0) {
      
      slideUp(element, 300);
      return;

    }

    TweenLite.set(element, {
      display   : 'block',
      height    : 'auto',
      overflow  : 'hidden'
    });

    TweenLite.from(element, (duration / 1000), {
      height : 0,
      onComplete: function() {

        element.style.overflow = '';

      }
    });

  };

/* ---
  Slide up
--- */

  var slideUp = function(element, duration) {

    TweenLite.set(element, {
      overflow : 'hidden'
    });

    TweenLite.to(element, (duration / 1000), {
      height : 0,
      onComplete: function() {

        element.style.display  = 'none';
        element.style.overflow = '';

      }
    });

  };