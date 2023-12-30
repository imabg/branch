export default () => ({
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/branch',
  jwtService: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY,
  },
  util: {
    saltRound: 8,
  },
});
