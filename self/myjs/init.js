// seajs config
seajs.config({
	alias: {
		'$': 'jquery/jquery/1.10.1/jquery.js',
		'backbone': 'gallery/backbone/1.0.0/backbone.js',
		'underscore': 'gallery/underscore/1.4.1/underscore.js'
	},
	base: '/self/sea-modules/'
});

define(function(require){
	var $ = require('$');
	var Backbone = require('backbone');

	$('body').on('click', 'input', function(){
		alert($(this).val());
	});


	function log(msg){
		if(window.console) {
			console.log(msg);
		}
		else {
			alert('浏览器不支持console.log');	
		}
	}
	//Backbone.Events:
	/*var object = {};
	
	$.extend(object, Backbone.Events);

	object.bind('alert', function(msg){
		alert('Triggered '+ msg);
	});

	object.trigger('alert', 'wlq.csc86.com');

	//bind
	object.bind('all', function(eventName){
		object.trigger(eventName);
	});

	var Sidebar = Backbone.Model.extend({
	  promptColor: function() {
	  var cssColor = prompt("请输入一个CSS颜色值：");
	  this.set({color: cssColor});
	  }
	});

	window.sidebar = new Sidebar;

	sidebar.bind('change:color', function(model, color) {
	  $('body').css({background: color});
	});

	sidebar.set({color: 'white'});

	sidebar.promptColor();
	*/

	var Note = Backbone.Model.extend({
		init: function(){
			return 'init...';
		},
		author: function(){
			return 'author is wlq';
		},
		allowedToEdit: function(account){
			return true;
		}
	});

	var PrivateNote = Note.extend({
		allowedToEdit: function(account){
			return account.owns(this);
		}
	});

	var csserCom = Backbone.Model.extend({
		set: function(attribute, options){
			Backbone.Model.prototype.set.call(this, attribute, options);
		}
	});


	var csser = new csserCom({
		title: 'my title',
		author: 'wlq'
	});

	csser.set({
		title: 'update title',
		author: 'xq'
	});

	var hacker = new Backbone.Model({
		name: '<script>alert("name")</script>'
	});

	var _default = Backbone.Model.extend({
		defaults: {
			'name': 'wlq',
			'age': 24,
			'addr': 'raofeng china'
		}
	});

	log((new _default).get('addr'));
});