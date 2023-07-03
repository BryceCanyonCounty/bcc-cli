const Configstore = require('configstore');
const pkg = require('../../package.json');

// Initialize the store
const store = new Configstore(pkg.name);

// Getters
const getters = {
  getName: () => {
    return store.get('name')
  }
}

// Setters
const setters = {
  setName: (fn, ln) => {
    store.set('name', {
      fn: fn,
      ln: ln
    });
  }
}

module.exports = {
  ...getters, ...setters
}