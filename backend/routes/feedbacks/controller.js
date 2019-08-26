let controllerModel = require('../../Library/Models/feedbackModel');
const library = require('../../Library');
let modelName = 'Feedback';

/**
 * feedbackController.js
 *
 * @description :: Server-side logic for managing feedbacks.
 */
module.exports = {

    /**
     * feedbackController.get()
     */
    get: async (req, res) => {
        let date = new Date();
        date.setHours(0,0,0);
        date.setDate(date.getDate()-6)
        let type = req.query.type || '';
        let status = req.query.status || '';
        let startDate = req.query.startDate || date;
        let endDate = req.query.endDate || new Date();
        let filter = {};
        
        if (type) { filter.type = type; }
        if (status) { filter.status = status; } else { filter.status = {$ne: "Archived"} }
        if (startDate) { filter.createdAt = {$gte: req.query.startDate} }
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
                let items = await controllerModel.find({$and:[ filter , {createdAt: {$lt: endDate}}]}).sort({"createdAt":-1});
                res.status(200).send(items);
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    /**
     * feedbackController.post()
     */
    post: async (req, res) => {
        let item = new controllerModel(req.body);
        try {
            let newItem = await item.save();
            return res.status(201).json(newItem);
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).send(new library.Error('Duplicate key', [err.message]));
            }
            res.status(500).send(err);
        }
    },

    /**
     * feedbackController.put()
     */
    put: async (req, res) => {
        try {
            let item = await controllerModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            if (!item) {
                return res.status(404).send(new library.Error('Not Found Error', [modelName + ' with id ' + req.params.id + ' not found']));
            } else {
                res.status(200).send(item);
            }
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).send(new library.Error('Duplicate key', [err.message]));
            }
            res.status(500).send(new library.Error('Unknown Server Error', ['Unknow server error when updating ' + modelName + ' with id ' + req.params.userId]));
        }
    },

    /**
     * feedbackController.delete()
     */
    delete: async (req, res) => {
        try {
            let item = await controllerModel.findOneAndRemove({ _id: req.params.id });
            if (!item) {
                return res.status(404).send(new library.Error('Not Found Error', [modelName + ' with id ' + req.params.id + ' not found']));
            } else {
                res.status(204).send(modelName + ' successfully deleted');
            }
        } catch (err) {
            return res.status(500).send(new library.Error('Unknown server error', ['Unknown server error when trying to delete ' + modelName + ' with id ' + req.params.id]));
        }
    }
    
};
