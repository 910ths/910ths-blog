class Menu {

  constructor() {

    if (this._setVars())
      this._setEvents()

  }

  _setVars() {

    this._menu = document.querySelector('.menu')

    if (!this._menu)
      return

    return true

  }

  _setEvents() {

  }

}