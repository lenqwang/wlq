(function(global, factory) {

	if(typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = global.document ? factory(global, true) : function(w) {
			if(!w.window) {
				throw new Error('Sandbox requires a window with a document');
			}
			return factory(w);
		}
	}
	else {
		factory(global);
	}

})(typeof window !== 'undefined' ? window : this, function(window, noGlobal) {
	var hasOwnProperty = Object.prototype.hasOwnProperty,
		strundefined = typeof undefined;

	var Sandbox = function() {
		var args = Array.prototype.slice.call(arguments),
			callback = args.pop(),
			modules = (args[0] && typeof args[0] === 'string') ? args : args[0], i;

		if(!(this instanceof Sandbox)) {
			return new Sandbox(modules, callback);
		}

		if(!modules || modules === '*') {
			modules = [];
			var _modules = Sandbox.modules;

			for(i in _modules) {
				if(_modules.hasOwnProperty(i)) {
					modules.push(i);
				}
			}
		}

		for(i = 0; i < modules.length; i++) {
			Sandbox.modules[modules[i]](this);
		}

		callback(this);

	};

	/*
		公有函数
	*/
	Sandbox.prototype = {
		name: 'Sandbox',
		author: 'lenq',
		version: '1.0',
		getName: function() {
			return this.name;
		}
	};

	/*模块的定制*/
	Sandbox.modules = {};

	/*
		事件模块
	*/
	Sandbox.modules.event = function(box) {

	};

	/*
		工具模块
	*/
	Sandbox.modules.util = function(box) {
		var trim = '.'.trim;
		var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

		// 判断类型
		box.isType = function(type) {
			return function(obj) {
				return Object.prototype.toString.call(obj) === '[Object '+ type +']';
			};
		};

		// 是否为函数
		box.isFunction = box.isType('Function');

		// 是否为对象
		box.isObject = box.isType('Object');

		// 是否为数组
		box.isArray = Array.isArray || box.isType('Array');

		// 是否为字符串类型
		box.isString = box.isType('String');

		// 是否为数字类型
		box.isNumber = box.isType('Number');

		// 是否为undefined
		box.isUndefined = function(obj) {
			return obj === undefined && typeof obj === 'undefined';
		};

		// 是否为对象结构
		box.isPluginObject = function(obj) {
			var key;

			for(key in obj) {}
			return key === undefined || hasOwnProperty.call(obj, key);
		};

		// 是否为布尔类型
		box.isBoolean = box.isType('Boolean');

		// 是否为日期类型
		box.isDate = box.isType('Date');

		// 是否为DOM
		box.isDom = function(obj) {
			try {
				return obj && typeof obj === 'object' && isUndefined(obj.nodeType) && obj.nodeType == 1 && !isUndefined(obj.nodeName) && typeof obj.nodeName == 'string';
			}
			catch(e) {
				return false;
			}
		};

		// 将字符串转换为html能识别的内容
		box.escapeHTML = function(target) {
			return target.replace(/&/g, '&amp;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/"/g, '&quot;')
					.replace(/'/g, '&#39;');
		};

		// trim 仿jQuery
		box.trim = trim && !trim.call('\uFEFF\xA0') ? 
				function(target) {
					return target == null ? '': trim.call(target);
				} : 
				function(target) {
					return target == null ? '' : (target + '').replace(rtrim, '');
				};

		// 继承
		box.extend = function() {
			var target = arguments[0] || {}, options, name, src, copy, clone,
				length = arguments.length, i = 0, deep = false;
			
			if(typeof target === 'boolean') {
				deep = target;

				target = arguments[i] || {};
				i++;
			}

			if(typeof target !== 'object' && this.isFunction(target)) {
				target = {};
			}
			
			if(i == length) {
				target = this;
				i--;
			}

			for(; i < length; i++) {
				if( (options = arguments[i]) != null ) {
					for(name in options) {
						src = target[name];
						copy = options[name];

						if(target == copy) {
							continue;
						}

						if(deep && copy && (this.isPluginObject(copy) || (copyIsArray = this.isArray(copy)) )) {
							if(copyIsArray) {
								copyIsArray = false;
								clone = src && this.isArray(src) ? src: [];
							}
							else {
								clone = src && this.isPluginObject(src) ? src : {};
							}

							target[name] = this.extend(deep, clone, copy);
						}
						else if(copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}
			return target;
		}


	}

	if(typeof noGlobal === strundefined) {
		window.Sandbox = window.S = Sandbox;
	}

	return Sandbox;

});