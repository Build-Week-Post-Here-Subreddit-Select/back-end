
exports.up = function(knex) {
  return knex.schema.createTable('users-accounts', tbl => {
      tbl.increments()
      tbl.string('username', 128).notNullable().unique()
      tbl.string('password', 256).notNullable()
      tbl.string('email', 256).notNullable().unique()
      tbl.string('name')
  })
  .createTable('posts', tbl => {
      tbl.increments()
      tbl.integer('user_id').unsigned().references('users.id').onDelete('RESTRICT').onUpdate('CASCADE')
      tbl.string('post_title', 256)
      tbl.text('post_text')
      tbl.dateTime('post_created').notNullable().defaultTo(knex.fn.now())
      tbl.dateTime('post_updated').notNullable().defaultTo(knex.fn.now())
      // tbl.timestamps([useTimestamps], [defaultToNow])
  })
  .createTable('predictions', tbl => {
      tbl.increments()
      tbl.integer('user_id').unsigned().references('users.id').onDelete('RESTRICT').onUpdate('CASCADE')
      tbl.integer('post_id').unsigned().references('posts.id').onDelete('RESTRICT').onUpdate('CASCADE')
      tbl.text('prediction')
  })
};

exports.down = function(knex) {
  return knex.dropTableIfExists('predictions')
  .dropTableIfExists('posts')
  .dropTableIfExists('users')
};
