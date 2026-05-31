'use strict';

const app           = require('./app');
const config        = require('./config/app.config');
const logger        = require('./utils/logger');
const { connectDB } = require('./config/db'); 

const { port, env } = config.server;
const prefix        = config.api.prefix;


connectDB().then(() => {
  app.listen(port, () => {
    logger.divider();
    logger.success(`Server running — ${env} mode`);
    logger.info   (`Local:    http://localhost:${port}`);
    logger.info   (`API Base: http://localhost:${port}${prefix}`);
    logger.divider();
  
  });
});