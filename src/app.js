var Backbone = require('../node_modules/backbone/backbone');
var $ = require('../node_modules/jquery/dist/jquery');
var _ = require('../node_modules/underscore/underscore');

//=============================================
// ModelとViewの連携でItemを作っていくぅ
//=============================================

var Item = Backbone.Model.extend({
  defaults: {
    text: '',
    isDone: false,
    editMode: false
  }
});

var ItemView = Backbone.View.extend({
  template: _.template($('#template-list-item').html()),
  events: {
    'click .js-toggle-done': 'toggleDone',
    'click .js-click-trash': 'remove',
    'click .js-todo_list-text': 'showEdit',
    'keyup .js-todo_list-editForm': 'closeEdit'
  },
  initialize: function (options) {
    _.bindAll(this, 'toggleDone', 'render', 'remove', 'showEdit', 'closeEdit');
    //オブザーバーパターン（設計方法）
    this.model.bind('change', this.render);
    this.model.bind('destroy', this.remove);
  },
  update: function (text) {
    this.model.set({text: text});
  },
  toggleDone: function () {
    this.model.set({isDone: !this.model.get('isDone')});

  },
  remove: function (){
    this.$el.remove();
    return this;
  },
  showEdit: function (){
    this.model.set({editMode: true});
  },
  closeEdit: function (e) {
    if(e.keyCode === 13 && e.shiftKey === true){
      this.model.set({text: e.currentTarget.value, editMode: false});
    }
  },
  render: function () {
    console.log('render item');
    var template = this.template(this.model.attributes);
    this.$el.html(template);
    return this;
  }
});


//=============================================
// Collectionの使い方
//=============================================
// BackboneにはControllerはない
// CollectionはModelを複数扱うためのオブジェクト

var LIST = Backbone.Collection.extend({
  model: Item
});

var item1  = new Item({text: 'sample 001'});
var item2  = new Item({text: 'sample 002'});
var list = new LIST([item1, item2]);

list.each(function(e, i) {
  console.log('[' + i + '] ' + e.get('text'));
});

//=============================================
// CollectionとModelとViewの連携
//=============================================
var ListView = Backbone.View.extend({
  el: $('.js-todo_list'),
  collection: list,
  initialize: function (){
    _.bindAll(this, 'render', 'addItem', 'appendItem');
    this.collection.bind('add', this.appendItem);
    this.render();
  },
  addItem: function (text) {
    var model = new Item({text: text});
    this.collection.add(model);
  },
  appendItem: function (model) {
    var itemView = new ItemView({model: model});
    this.$el.append(itemView.render().el);
  },
  render: function () {
    console.log('render list');
    var that = this;
    this.collection.each(function(model, i) {
      that.appendItem(model);
    });
    return this;
  }
});

var listView = new ListView({collection: list});
itemView.addItem('sample02');
listView.addItem('sample03');