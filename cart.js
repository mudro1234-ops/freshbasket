// Tiny shared cart helper (stored in the browser's localStorage).
var Cart = (function () {
  var KEY = 'shopCart';
  // Same two items that the report's cart page showed, so the cart is not empty on first visit.
  var DEFAULT = [
    { id: 'milton', name: 'MILTON BOTTLE', code: 'MILTON -S213', price: 200, img: 'image/milton', qty: 1 },
    { id: 'headphone', name: 'BOAT HEADPHONES', code: 'BOAT - Bat32', price: 160, img: 'image/headphone', qty: 1 }
  ];
  function read() {
    try { var v = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(v)) return v; } catch (e) {}
    return DEFAULT.map(function (i) { return Object.assign({}, i); });
  }
  function write(items) { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} }
  function count() { return read().reduce(function (n, i) { return n + i.qty; }, 0); }
  function add(item) {
    var items = read();
    var found = items.filter(function (i) { return i.id === item.id; })[0];
    if (found) found.qty += 1; else items.push(Object.assign({ qty: 1 }, item));
    write(items);
  }
  return { read: read, write: write, add: add, count: count };
})();
