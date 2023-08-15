'use strict';

/**
 * config-data service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::config-data.config-data');
