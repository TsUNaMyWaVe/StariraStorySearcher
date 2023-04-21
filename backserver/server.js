const init = require('./app/start/init');

(async () => {
    await init();
    require('./app/route/route');
})();