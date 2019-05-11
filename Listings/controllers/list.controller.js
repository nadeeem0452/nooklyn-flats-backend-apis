const List = require('../models/list.model.js');

// Create and Save a new List
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "List Title can not be empty"
        });
    }

    // Create a List
    const list = new List({
        title: req.body.title || "Untitled List", 
        description: req.body.description,
		address: req.body.address,
		ListImage: req.body.ListImage,
		agentId: req.user.sub
    });

    // Save List in the database
    list.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the List."
        });
    });
};


// Retrieve and return all lists from the database.
exports.findAll = (req, res) => {
    List.find()
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving lists."
        });
    });
};


// Find a single list with a listId
exports.findOne = (req, res) => {
    List.findById(req.params.listId)
    .then(list => {
        if(!list) {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });            
        }
        res.send(list);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving list with id " + req.params.listId
        });
    });
};


// Update a list identified by the listId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "List Title can not be empty"
        });
    }

    // Find list and update it with the request body
    List.findByIdAndUpdate(req.params.listId, {
        title: req.body.title || "Untitled List",
        description: req.body.description,
		address: req.body.address,
		ListImage: req.body.ListImage
    }, {new: true})
    .then(list => {
        if(!list) {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });
        }
        res.send(list);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error updating list with id " + req.params.listId
        });
    });
};



// Delete a list with the specified listId in the request
exports.delete = (req, res) => {
    List.findByIdAndRemove(req.params.listId)
    .then(list => {
        if(!list) {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });
        }
        res.send({message: "List deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Could not delete list with id " + req.params.listId
        });
    });
};