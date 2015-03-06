var _ = require("underscore");

function CartProductComponent(product) {
  var html = [
    '<div class="row product">',
      '<img class="col-md-3" src="<%= product.img %>" alt="<%= product.title %>">',
      '<div class="col-md-5">',
        '<h3><%= product.title %></h3>',
        '<p>',
          '<%= product.description %>',
        '</p>',
      '</div>',

      '<div class="price col-md-2">$<%= product.price %></div>',
      '<div class="col-md-1">',
        '<input data-product="<%= product.id %>" type="number" min="1" class="form-control" value="<%= product.quantity %>" />',
      '</div>',
      '<a data-product="<%= product.id %>" href="#" class="delete fui-cross"></a>',
    '</div>'
  ].join('\n');

  return _.template(html)({
    product: product
  });
}

module.exports = CartProductComponent;
