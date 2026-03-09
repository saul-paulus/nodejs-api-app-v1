const {
    createContainer,
    InjectionMode
} = require('awilix');

// Registrasi masing-masing modul
const healthModule = require('./modules/health');

// Buat container secara global (InjectionMode.PROXY sangat disarankan untuk clean architecture)
const container = createContainer({
    injectionMode: InjectionMode.PROXY,
});

/**
 * Fungsi untuk melakukan registrasi seluruh dependency aplikasi
 */
const setupDIContainer = () => {

    // Registrasi Core Dependencies (Konfig DB, Logger, dsb bisa ditaruh di sini nantinya)

    // Registrasi Modul-modul fitur
    healthModule.register(container);

    // userModule.register(container); // Nanti untuk fitur user

    return container;
};

module.exports = {
    setupDIContainer,
};