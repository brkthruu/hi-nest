export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  ft: {
    client_id: process.env.FT_CLIENT_ID,
    client_secret: process.env.FT_CLIENT_SECRET,
    callback: process.env.FT_CLIENT_CALLBACK,
  },
});
