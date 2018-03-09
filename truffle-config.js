// See <http://truffleframework.com/docs/advanced/configuration>
module.exports = {
  networks: {
    development: {
      host: ':localhost',
      port: 7545,
      network_id: '*', // Match any network id
    },
  }
};
