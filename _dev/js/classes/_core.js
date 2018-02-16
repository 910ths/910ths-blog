class Core {

  constructor() {

    document.cftn             = {};
    document.cftn.hideScroll  = new HideScroll();
    document.cftn.menu        = new Menu();
    document.cftn.masonryGrid = new MasonryGrid();
    // document.cftn.stats       = new Stats();

  }

}

let domReady = callback => {

  if ((document.readyState === 'interactive') || (document.readyState === 'complete'))
    callback();
  else
    document.addEventListener('DOMContentLoaded', callback);

};

domReady(() => new Core());