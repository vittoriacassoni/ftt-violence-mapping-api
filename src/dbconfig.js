const config = {
  server: 'ftt-violence-mapping.database.windows.net', // Use your SQL server name
  database: 'ftt_violence_mapping', // Database to connect to
  user: 'azureuser', // Use your username
  password: '&@9!Y!Rq6u*L', // Use your password
  port: 1433,
  // Since we're on Windows Azure, we need to set the following options
  options: {
    encrypt: true,
  },
};
module.exports = config;
