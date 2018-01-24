class HideScroll {

  constructor() {

    if (this.setVars())
      this.setEvents()

  }

  setVars() {

    this._items = document.querySelectorAll('.hideScroll')

    if (!this._items.length)
      return

    this._headerHeight = 0
    this._bottomMargin = 0
    this._list         = []
    this._listUnique   = []

    return true

  }

  setEvents() {
    
    this.checkItems()
    this._showItems()

    window.addEventListener('scroll', () => {

      this.checkItems()

    })

  }

  checkItems() {

    let scroll = -(parseInt(document.body.style.top) || 0) + window.innerHeight - this._bottomMargin
    let length = this._items.length

    for (let i = 0; i < length; i++) {

      if (this._items[i].hasClass('hideScroll--active') || (this._listUnique.indexOf(i) > -1))
        continue

      let offset = this._items[i].getBoundingClientRect().top + (-parseInt(document.body.style.top) || 0)

      if (scroll >= offset) {

        this._list.push({
          index  : i,
          offset : offset
        })
        this._listUnique.push(i)

        this._items[i].addClass('hideScroll--hidden')

      }

    }

  }

  _showItems(time) {

    let timeout = (typeof time !== 'undefined') ? time : 300

    clearTimeout(this._timeout)
    this._timeout = setTimeout(() => { this._showItem() }, timeout)

  }

  _showItem() {

    let time = 300

    if (this._list.length != 0) {

      let index  = this._list[0].index
      let scroll = (-parseInt(document.body.style.top) || 0) + this._headerHeight

      if (this._list[0].offset < scroll)
        time = 0

      this._items[index].addClass('hideScroll--active')
      this._list.splice(0, 1)

    }

    this._showItems(time)

  }

}