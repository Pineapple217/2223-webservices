module.exports = {
  port: 9000,
  log: {
    level: 'silly',
    disabled: false,
  },
  cors: {
    origins: ['http://localhost:9000'],
    maxAge: 3 * 60 * 60 // 3 uur (in seconden)
  },
};