let controllerModel = require('../../Library/Models/RestaurantModel/restaurants.model');
const library = require('../../Library');
let modelName = 'Restaurant';
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');


/**
 * restaurantController.js
 *
 * @description :: Server-side logic for managing restaurants.
 */
module.exports = {

    /**
     * restaurantController.get()
     */
    get: async (req, res) => {
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
                let items = await controllerModel.find({});
                return res.status(200).json(items);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    /**
     * restaurantController.post()
     */
    post: async (req, res) => {
        try {
            var newpath1 = "";
            var newpath2 = "";
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8';
            var formfields = await new Promise(function (resolve, reject) {
                form.parse(req, function (err, fields, files) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    var oldpath = files.rest_image1.path;
                    var currentpath = path.join(__dirname, '../../uploads');
                    newpath1 = currentpath + files.rest_image1.name;
                    var dataread = fs.readFileSync(oldpath);
                    fs.writeFileSync(newpath1, dataread);
                    fields.rest_image1 = files.rest_image1.name;
                    oldpath = files.rest_image2.path;
                    currentpath = path.join(__dirname, '../../uploads');
                    newpath2 = currentpath + files.rest_image2.name;
                    var dataread = fs.readFileSync(oldpath);
                    fs.writeFileSync(newpath2, dataread);
                    fields.rest_image2 = files.rest_image2.name;
                    resolve(fields);
                });
            });
            console.log('FORMS FIELD::',formfields);
            // const restaurant = await restaurantController.insert(formfields);
            // const restaurants = await restaurantController.getAll();
            let item = new controllerModel(formfields);
            let newItem = await item.save();
            return res.status(201).json(newItem);
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(409).json(new library.Error('Duplicate key', [err.message]));
            }
            return res.status(500).json(err);
        }
    },

    /**
     * restaurantController.put()
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
     * restaurantController.delete()
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
