class MasonryGrid {

  constructor() {

    if (this._setVars())
      this._setEvents()

  }

  _setVars() {

    this._section = document.querySelector('.articlesList')
    this._list    = document.querySelector('.articlesList__list')

    if (!this._section || !this._list)
      return

    this._items = this._list.querySelectorAll('.article')

    if (!this._items.length)
      return

    this._length   = this._items.length - 1
    this._moreWrap = this._section.querySelector('.articlesList__moreWrap')
    this._more     = this._moreWrap.querySelector('.articlesList__more')
    this._config   = {
      classes : {
        articleLeft : 'article--left',
        articleRight : 'article--right'
      },
      items : {
        margin : {
          default : 60,
          first  : 20
        },
        distance : 70
      },
      arabicVersion : (this._list.getAttribute('data-dir') == 'rtl'),
      limit : parseInt(this._list.getAttribute('data-limit')) - 1,
      more_count : parseInt(this._list.getAttribute('data-more-count')),
      last : this._length,
      duration : parseInt(this._list.getAttribute('data-animation-duration'))
    }
    this._heights     = []
    this._animation   = new Animation()
    this._inAnimation = false
    this._isMobile    = (Math.round(this._list.offsetWidth / this._items[0].offsetWidth) == 1)

    if (this._config.limit >= this._length) {

      this._config.limit = this._length
      this._list.addClass('articlesList__list--loaded')
      this._moreWrap.addClass('articlesList__moreWrap--hide')

    }

    return true

  }

  _setEvents() {

    this._initMasonry()

    this._more.addEventListener('click', (e) => {

      e.preventDefault()
      this._loadMore()

    })

    window.addEventListener('resize', (e) => {

      this._isMobile = (Math.round(this._list.offsetWidth / this._items[0].offsetWidth) == 1)
      this._initMasonry()

    })

  }

  _initMasonry() {

    let leftColTop = 0, leftColHeight = 0, rightColTop = 0, rightTopHeight = 0, mobileHeight = 0, prev
    this._heights  = []

    for (let i = 0; i <= this._length; i++) {

      let top          = 0
      let isFirst      = (i == 0)
      let isLeftColumn = ((isFirst && this._config.arabicVersion) || (leftColHeight < rightTopHeight))
      let height       = this._items[i].offsetHeight
      let offset       = isFirst ? this._config.items.margin.first : this._config.items.margin.default

      this._items[i].removeClass(this._config.classes.articleRight)
      this._items[i].removeClass(this._config.classes.articleLeft)

      this._items[i].style.position = '';
      this._items[i].style.top      = '';
      this._items[i].style.left     = '';
      this._items[i].style.right    = '';

      if (!this._isMobile) {

        if (isLeftColumn) {

          top = offset + leftColHeight
          let diffCol = top - rightColTop

          if (!isFirst && (diffCol < this._config.items.distance))
            top = top + (this._config.items.distance - diffCol)

          this._items[i].style.position = 'absolute'
          this._items[i].style.top      = top + 'px'
          this._items[i].style.left     = '0px'

          this._items[i].addClass(this._config.classes.articleLeft)

          leftColTop    = top
          leftColHeight = top + height

        } else {

          top = offset + rightTopHeight
          let diffCol = top - leftColTop

          if (!isFirst && diffCol < this._config.items.distance)
            top = top + (this._config.items.distance - diffCol)

          this._items[i].style.position = 'absolute'
          this._items[i].style.top      = top + 'px'
          this._items[i].style.right    = '0px'

          this._items[i].addClass(this._config.classes.articleRight)

          rightColTop    = top
          rightTopHeight = top + height

        }

      } else {

        top           = mobileHeight
        mobileHeight += height

      }

      if (i < this._length)
        this._heights.push(top + (height - this._items[i].querySelector('.article__footer').offsetHeight))
      else
        this._heights.push(top + height)

    }

    this._list.style.height = this._heights[this._config.limit] + 'px'

  }

  _loadMore() {

    if (this._inAnimation)
      return

    this._inAnimation   = true
    this._config.limit += this._config.more_count

    if (this._config.limit > this._config.last)
      this._config.limit = this._config.last

    if (this._config.limit == this._config.last) {

      this._list.addClass('articlesList__list--loaded')
      this._moreWrap.addClass('articlesList__moreWrap--hide')

    }

    let start = parseInt(this._list.style.height)
    let delta = this._heights[this._config.limit] - start

    this._more.addClass('articlesList__more--animation')

    this._animation.start(
      start,
      delta,
      this._config.duration,
      'easeOutCubic',
      (value) => { this.animationHeight(value) }
    )

    setTimeout(() => {

      this._inAnimation = false
      this._more.removeClass('articlesList__more--animation')

    }, this._config.duration)

  }

  animationHeight(value) {

    this._list.style.height = value + 'px'

  }

}