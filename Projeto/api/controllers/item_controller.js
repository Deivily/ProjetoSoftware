module.exports = function(app){
    var itemModel = app.models.item_model;
    var Item = require('../models/item_model.js');
    var item = new Item(1, null, null, null);
    
};