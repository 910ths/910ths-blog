class Stats {

  constructor() {

    if (this.setVars())
      this.setEvents()

  }

  setVars() {

    this._list = document.querySelector('.articlesList')

    if (!this._list || !fb910ths)
      return

    this._items  = this._list.querySelectorAll('.article')
    this._length = this._items.length
    this._token  = fb910ths.app_id + '|' + fb910ths.app_secret
    this._apiUrl = 'https://graph.facebook.com/?id={URL}&access_token=' + this._token + '&fields=engagement'

    return true

  }

  setEvents() {

    window.addEventListener('load', () => {

      this._getStats()

    })

  }

  _getStats() {

    for (let i = 0; i < this._length; i++) {

      let url = this._apiUrl.replace('{URL}', this._items[i].getAttribute('data-url'))
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';

      xhr.onload = () => {

        if (xhr.status !== 200)
          return

        // let likes    = xhr.response.engagement.reaction_count
        let comments = xhr.response.engagement.comment_plugin_count

        // this._items[i].querySelector('.article__stat--like').innerHTML    = likes
        this._items[i].querySelector('.article__stat--comment').innerHTML = comments

      };

      xhr.send();

    }

  }

}