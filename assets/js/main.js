var PRODUCTS = [
  {
    code: 'xbox',
    title: 'Xbox One',
    description: 'Be first to experience Xbox One. The Day One Edition features a commemorative controller and an exclusive achievement.',
    price: 499,
    img: '/assets/images/consoles/xbox.png'
  },
  {
    code: 'ps',
    title: 'PlayStation®4',
    description: 'The PlayStation®4 system redefines rich and immersive gameplay with powerful graphics and speed.',
    price: 399,
    img: '/assets/images/consoles/ps.png'
  },
  {
    code: 'wii',
    title: 'Wii U',
    description: "It's the console that will singlehandedly change the way people play games for years to come.",
    price: 300,
    img: '/assets/images/consoles/wii.png'
  }
];

var CartStore = Stuff('shopping_cart');

CartStore.on('change', renderApp);

function renderApp() {
  var cart = CartStore.map(function (id) {
    var product = CartStore.get(id);
    product.id = id;
    return product;
  });

  $('#app').html(AppComponent({
    products: PRODUCTS,
    cart: cart
  }));
}


/* App Components */

function AppComponent(state) {
  var html = [
    '<div class="shop">',
      '<% print(ShopComponent(products)) %>',
    '</div>',

    '<div class="cart">',
      '<% print(CartComponent(cart)) %>',
    '</div>',
  ].join("\n");

  return _.template(html)(state);
}


function ShopComponent(products) {
  var html = [
    '<h1>Shop</h1>',

    '<div class="row">',
      '<% products.forEach(function(product) {',
        'print(ProductComponent(product))',
      '}) %>',
    '</div>'
  ].join('\n');

  return _.template(html)({
    products: products,
    ProductComponent: ProductComponent
  });
}


function ProductComponent(product) {
  var html = [
    '<a href="#" class="col-md-4 add-to-cart" data-product="<%= code %>">',
      '<img src="<%= img %>" alt="<%= title %>">',
    '</a>'
  ].join("\n");

  return _.template(html)(product);
}


function CartComponent(cart) {
  var html = [
    '<h1>Your order</h1>',

    '<% cart.forEach(function(product) {',
      'print(CartProductComponent(product))',
    '}) %>',

    '<div class="row">',
      '<div class="total col-md-3">',
        'Total: <span class="total-amount">$<%= total %></span>',
      '</div>',
    '</div>'
  ].join("\n");

  var total = cart.reduce(function(s, product) {
    return s += product.price * product.quantity;
  }, 0);

  return _.template(html)({
    cart: cart,
    total: total,
    CartProductComponent: CartProductComponent
  });
}


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


$(function() {
  renderApp();

  /* Shop handlers */

  $('#app').on('click', '.add-to-cart', function(e) {
    e.preventDefault();

    var cartProduct;
    var code = $(e.currentTarget).data('product');
    var product = PRODUCTS.filter(function(product) {
      return product.code === code;
    })[0];

    var cartProductId = CartStore.find(function(id) {
      return CartStore.get(id).code === code;
    });

    if(cartProductId) {
      cartProduct = CartStore.get(cartProductId);
      cartProduct.quantity++;
      CartStore.update(cartProductId, cartProduct);
    } else {
      // Should clone this object
      product.quantity = 1;
      CartStore.add(product);
    }
  });


  /* Cart handlers */

  $('#app').on('click', '.delete', function(e) {
    e.preventDefault();
    var id = $(e.target).data('product');
    CartStore.remove(id);
  });

  $('#app').on('change', 'input', function(e) {
    var id = $(e.target).data('product');
    var value = $(e.target).val();
    var product = CartStore.get(id);

    product.quantity = parseInt(value);
    CartStore.update(id, product);
  });
});
