var React = require('react');

var ProductComponent = React.createClass({
  render: function() {
    return (
      <a className="col-md-4">
        <img src={this.props.product.img} alt={this.props.product.title} />
      </a>
    );
  }
})

module.exports = ProductComponent;
