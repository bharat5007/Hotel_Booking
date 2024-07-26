// const Redis = require('ioredis');
// // const { default: Redlock } = require('redlock');
// const Redlock=require("redlock")

// const redis = new Redis();

// const redlock = new Redlock(
//   [redis], // array of Redis clients
//   {
//     driftFactor: 0.01, // time in ms
//     retryCount: 10,
//     retryDelay: 200, // time in ms
//     retryJitter: 200, // time in ms
//   }
// );

// redlock.on('clientError', function(err) {
//   console.error('A Redis error has occurred:', err);
// });

// module.exports = redlock;