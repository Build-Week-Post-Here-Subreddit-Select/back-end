
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'Cat-Boy',
          password: 'password',
          email: 'catboy@gmail.com',
          name: 'Calvin'
      }

      ]);
    });
};
