var Backbone = require('../node_modules/backbone/backbone');
var $ = require('../node_modules/jquery/dist/jquery');
var _ = require('../node_modules/underscore/underscore');

//=============================================
// ModelとViewの連携でItemを作っていくぅ
//=============================================

var Item = Backbone.model.extend({
  default: {
    text: '',
    isDone: false,
    editMode: false
  }
});
var item1 = new Item({text: 'sample todo1'});
