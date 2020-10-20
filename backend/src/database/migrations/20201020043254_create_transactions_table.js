
exports.up = knex => knex.schema.createTable('transactions', table => {
    table.increments('id');
    table.text('user_id').notNullable();
    table.text('transaction_id').notNullable();
    table.text('amount').notNullable();
    table.text('payment_method').notNullable();
    table.text('status').notNullable();
    table.specificType('items', 'string ARRAY').notNullable();

    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('update_at').default(knex.fn.now());
  });
;

exports.down = knex => knex.schema.dropTable('transactions');
