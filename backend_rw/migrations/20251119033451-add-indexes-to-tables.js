'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('Users', ['email'], {
      name: 'users_email_index',
      unique: true
    });
    
    await queryInterface.addIndex('Users', ['role'], {
      name: 'users_role_index'
    });

    await queryInterface.addIndex('Products', ['categoryId'], {
      name: 'products_category_id_index'
    });
    
    await queryInterface.addIndex('Products', ['isActive'], {
      name: 'products_is_active_index'
    });
    
    await queryInterface.addIndex('Products', ['price'], {
      name: 'products_price_index'
    });
    
    await queryInterface.addIndex('Products', ['categoryId', 'isActive'], {
      name: 'products_category_active_index'
    });

    await queryInterface.addIndex('Orders', ['userId'], {
      name: 'orders_user_id_index'
    });
    
    await queryInterface.addIndex('Orders', ['status'], {
      name: 'orders_status_index'
    });
    
    await queryInterface.addIndex('Orders', ['createdAt'], {
      name: 'orders_created_at_index'
    });

    await queryInterface.addIndex('Carts', ['userId'], {
      name: 'carts_user_id_index',
      unique: true
    });

    await queryInterface.addIndex('OrderItems', ['orderId'], {
      name: 'order_items_order_id_index'
    });
    
    await queryInterface.addIndex('OrderItems', ['productId'], {
      name: 'order_items_product_id_index'
    });

    await queryInterface.addIndex('CartItems', ['cartId'], {
      name: 'cart_items_cart_id_index'
    });
    
    await queryInterface.addIndex('CartItems', ['productId'], {
      name: 'cart_items_product_id_index'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Users', 'users_email_index');
    await queryInterface.removeIndex('Users', 'users_role_index');
    await queryInterface.removeIndex('Products', 'products_category_id_index');
    await queryInterface.removeIndex('Products', 'products_is_active_index');
    await queryInterface.removeIndex('Products', 'products_price_index');
    await queryInterface.removeIndex('Products', 'products_category_active_index');
    await queryInterface.removeIndex('Orders', 'orders_user_id_index');
    await queryInterface.removeIndex('Orders', 'orders_status_index');
    await queryInterface.removeIndex('Orders', 'orders_created_at_index');
    await queryInterface.removeIndex('Carts', 'carts_user_id_index');
    await queryInterface.removeIndex('OrderItems', 'order_items_order_id_index');
    await queryInterface.removeIndex('OrderItems', 'order_items_product_id_index');
    await queryInterface.removeIndex('CartItems', 'cart_items_cart_id_index');
    await queryInterface.removeIndex('CartItems', 'cart_items_product_id_index');
  }
};
