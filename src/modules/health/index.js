const {
    asClass,
    asFunction
} = require('awilix');
const HealthController = require('./health.controller');
const healthRoutes = require('./health.routes');

/**
 * Mendaftarkan controller dan router dari modul health ke container utama
 */
const register = (container) => {
    container.register({
        healthController: asClass(HealthController).scoped(),
        healthRouter: asFunction(healthRoutes).singleton(),
    });
};

module.exports = {
    register,
};