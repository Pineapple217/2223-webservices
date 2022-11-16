module.exports = {
  log: {
    level: 'silly',
    disabled: false,
  },
  cors: {
    origins: ['http://localhost:9000'],
    maxAge: 3 * 60 * 60 // 3 uur (in seconden)
  },
  // database: {
  //   client: 'mysql2',
  //   host: 'localhost',
  //   port: 3306,
  //   name: 'budget',
  //   username: 'root',
  //   password: 'toor',
  // }
};