const express = require('express');

/**
 * Route untuk health check module
 * @param {Object} opts - Container Awilix.
 */
module.exports = ({
    healthController
}) => {
    const router = express.Router();

    // Awilix akan secara otomatis men-inject 'healthController' ke sini
    router.get('/', (req, res, next) => healthController.check(req, res, next));

    return router;
};