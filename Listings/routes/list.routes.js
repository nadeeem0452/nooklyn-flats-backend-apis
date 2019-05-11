module.exports = (app) => {
    const lists = require('../controllers/list.controller.js');

    // Create a new List
    app.post('/lists', lists.create);

    // Retrieve all List
    app.get('/lists', lists.findAll);

    // Retrieve a single List with noteId
    app.get('/lists/:listId', lists.findOne);

    // Update a List with noteId
    app.put('/lists/:listId', lists.update);

    // Delete a List with noteId
    app.delete('/lists/:listId', lists.delete);
}