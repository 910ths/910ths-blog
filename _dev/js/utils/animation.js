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

class Animation {

  constructor() {

    this._fReady    = true
    this._time      = null
    this._inLoop    = false
    this._animation = null
    this._easings   = {
      linear         : function(t) { return t },
      easeInQuad     : function(t) { return t*t },
      easeOutQuad    : function(t) { return t*(2-t) },
      easeInOutQuad  : function(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
      easeInCubic    : function(t) { return t*t*t },
      easeOutCubic   : function(t) { return (--t)*t*t+1 },
      easeInOutCubic : function(t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
      easeInQuart    : function(t) { return t*t*t*t },
      easeOutQuart   : function(t) { return 1-(--t)*t*t*t },
      easeInOutQuart : function(t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
      easeInQuint    : function(t) { return t*t*t*t*t },
      easeOutQuint   : function(t) { return 1+(--t)*t*t*t*t },
      easeInOutQuint : function(t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
    }

  }

  start(start, delta, duration, easing, action) {

    if (this._inLoop)
      return

    this._sTime    = window.performance.now()
    this._eTime    = this._sTime + duration
    this._duration = duration
    this._sValue   = start
    this._dValue   = delta
    this._easing   = this._easings[easing]
    this._action   = action

    this._startLoop()

  }

  stop() {

    this._stopLoop()

  }

  /* ---
    Loop
  --- */

    _startLoop() {

      this._inLoop    = true
      this._animation = requestAnimationFrame(() => { this._loop() })

    }

    _loop() {

      this._animation = requestAnimationFrame(() => { this._loop() })

      if (!this._fReady)
        return

      this._fReady = false
      this._time   = window.performance.now()
      this._update(this._time)
      this._fReady = true

    }

    _update(time) {

      if (time > this._eTime)
        this._stopLoop()

      let fract = (time - this._sTime) / this._duration
      fract     = this._easing(fract)
      let value = this._sValue + fract * this._dValue

      this._action(value)

    }

    _stopLoop() {

      cancelAnimationFrame(this._animation)
      this._animation = null
      this._inLoop    = false

    }

}