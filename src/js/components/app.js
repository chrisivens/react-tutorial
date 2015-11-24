var React = require('react');
var Catalog = require('../components/app-catalog');
var Cart = require('../components/app-cart');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>My React App Store</h1>
        <Catalog />
        <h1>Cart</h1>
        <Cart />
      </div>
    );
  }
});

module.exports = App;
