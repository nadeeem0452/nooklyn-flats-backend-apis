const RoomsList = require('../models/roomsList.model.js');
const Role = require('../utils/role.js');

 
// Create and Save a new List
exports.create = (req, res) => {
	
	//Validate User Role who create Apartment Listing

	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
	
    if(!req.body.title ) {
        return res.status(400).send({
            message: "RoomsList Title can not be empty"
        });
    }
	
	
    // Create a List
    const roomlist = new RoomsList({
        title: req.body.title || "Untitled List", 
        description: req.body.description,
		address: req.body.address,
		ListImage: req.body.ListImage,
		agentId: req.user.sub
    });

	  // Save List in the database
	  
	 
	
    roomlist.save()
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
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
	
    RoomsList.find()
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving lists."
        });
    });
};


// Retrieve and return all Room lists from the database for Users.
exports.findAllByUser = (req, res) => {
	
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
	
    RoomsList.find()
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
    RoomsList.findById(req.params.listId)
    .then(roomlist => {
        if(!roomlist) {
            return res.status(404).send({
                message: "RoomsList not found with id " + req.params.listId
            });            
        }
        res.send(roomlist);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "RoomsList not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving roomlist with id " + req.params.listId
        });
    });
};


// Update a list identified by the listId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "RoomsList Title can not be empty"
        });
    }

    // Find list and update it with the request body
    RoomsList.findByIdAndUpdate(req.params.listId, {
        title: req.body.title || "Untitled List",
        description: req.body.description,
		address: req.body.address,
		ListImage: req.body.ListImage
    }, {new: true})
    .then(roomlist => {
        if(!roomlist) {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });
        }
        res.send(roomlist);
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
    RoomsList.findByIdAndRemove(req.params.listId)
    .then(roomlist => {
        if(!roomlist) {
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