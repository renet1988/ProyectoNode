let controllerModel = require('../../Library/Models/UserModel/users.model');
const library = require('../../Library');
let modelName = 'User';

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.get()
     */
    get: async (req, res) => {
        let user = req.query.user;
        let email = req.query.email;
        let filter ={
            "user": user,
            "email": email
        }
        try {
            if (req.params.id) {
                let item = await controllerModel.findOne({ _id: req.params.id });
                if (!item) {
                    return res.status(404).json({
                        message: 'No such ' + modelName
                    });
                }
                return res.status(200).json(item);
            } else {
                if (req.query) {
                    let item = await controllerModel.find({$and:[ filter ]});
                    return res.status(200).json(item);
                } else {
                    let items = await controllerModel.find({});
                    return res.status(200).json(items);
                }
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    /**
     * userController.post()
     */
    post: async (req, res) => {
        let item = new controllerModel(req.body);
        try {
            let newItem = await item.save();
            return res.status(201).json(newItem);
        } catch (err) {
            console.log(err);
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(409).json(new library.Error('Duplicate key', [err.message]));
            }
            return res.status(500).json(err);
        }
    },

    /**
     * userController.put()
     */
    put: async (req, res) => {
        try {
            let item = await controllerModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            if (!item) {
                return res.status(404).json(new library.Error('Not Found Error', [modelName + ' with id ' + req.params.id + ' not found']));
            } else {
                return res.status(200).json(item);
            }
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(409).json(new library.Error('Duplicate key', [err.message]));
            }
            return res.status(500).json(new library.Error('Unknown Server Error', ['Unknow server error when updating ' + modelName + ' with id ' + req.params.userId]));
        }
    },

    /**
     * userController.delete()
     */
    delete: async (req, res) => {
        try {
            let item = await controllerModel.findOneAndRemove({ _id: req.params.id });
            if (!item) {
                return res.status(404).json(new library.Error('Not Found Error', [modelName + ' with id ' + req.params.id + ' not found']));
            } else {
                return res.status(204).json(modelName + ' successfully deleted');
            }
        } catch (err) {
            return res.status(500).json(new library.Error('Unknown server error', ['Unknown server error when trying to delete ' + modelName + ' with id ' + req.params.id]));
        }
    }
    
};
