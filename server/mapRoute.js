exports.mapRoute = function (app, prefix) {

    const controller = require(`./controllers/${prefix}`);
    
    // Get
    app.get(`/${prefix}`, controller.get);

    // Create
    app.post(`/${prefix}`, controller.create);
    
    // Destroy
    app.delete(`/${prefix}/:id`, controller.destroy);

    // edit
    app.put(`/${prefix}/:id`, controller.edit);
    
};
