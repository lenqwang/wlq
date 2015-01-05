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

	/*配置*/
	var cfg = Sandbox.config = {
		basePath: 'http://localhost/work/res/',
		charset: 'utf-8'
	};

	/*var cfg = Sandbox.config = function(options) {
		return options || {
			basePath: 'http://localhost/work/res/',
			charset: 'utf-8'
		};
	};*/

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
		var AP = Array.prototype;


		/*-----------------------------------↓ md5加密所用---------------------------------------*/
		/*
			静态函数(不对外)
		*/
		// utf8Encode
		var uTF8Encode = function(string) {
			string = string.replace(/\x0d\x0a/g, "\x0a");
			var output = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					output += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					output += String.fromCharCode((c >> 6) | 192);
					output += String.fromCharCode((c & 63) | 128);
				} else {
					output += String.fromCharCode((c >> 12) | 224);
					output += String.fromCharCode(((c >> 6) & 63) | 128);
					output += String.fromCharCode((c & 63) | 128);
				}
			}
			return output;
		};

		/*
			convertToWordArray
		*/
		var convertToWordArray = function(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWordsTempOne = lMessageLength + 8;
			var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
			var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
			var lWordArray = Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while (lByteCount < lMessageLength) {
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			return lWordArray;
		};

		/*
			FF
		*/
		var FF = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		/*
			addUnsigned
		*/
		var addUnsigned = function(lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			if (lX4 | lY4) {
				if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		}

		/*
			F
		*/
		var F = function(x, y, z) {
			return (x & y) | ((~ x) & z);
		}

		var G = function(x, y, z) {
			return (x & z) | (y & (~ z));
		}
		
		var H = function(x, y, z) {
			return (x ^ y ^ z);
		}
		
		var I = function(x, y, z) {
			return (y ^ (x | (~ z)));
		}

		/*
			rotateLeft
		*/
		var rotateLeft = function(lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		}

		var FF = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var GG = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var HH = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		
		var II = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		var wordToHex = function(lValue) {
			var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
			for (lCount = 0; lCount <= 3; lCount++) {
				lByte = (lValue >>> (lCount * 8)) & 255;
				WordToHexValueTemp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
			}
			return WordToHexValue;
		};

		/*-----------------------------------------↑ md5加密所用------------------------------------------*/

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

		// IE6
		box.isIE6 = !('minWidth' in document.getElementsByTagName('html')[0].style);

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

		// 兼容indexOf
		//返回指定字符串在某个数组成员匹配中首次全文匹配的索引，如果没有匹配则返回 -1
		box.indexOf = AP.indexOf ? 
			function(arr, item) {
				return arr.indexOf(item);
			} : 
			function(arr, item) {
				for(var i = 0; i < arr.length; i++) {
					if(arr[i] == item) {
						return i;
					}
				}
				return -1;
			}

		// 兼容forEach
		//让数组成员全部执行一次一个指定的函数 , 对数组不做任何修改
		var forEach = box.forEach = AP.forEach ? 
			function(arr, fn) {
				arr.forEach(fn);
			} :
			function(arr, fn) {
				for(var i = 0; i < arr.length; i++) {
					fn(arr[i], i, arr);
					// arr[i].call(fn, i, arr);
				}
			}

		// 兼容map
		//让数据成员全部执行一次一个指定的函数，并返回一个新的数组，该数组为原数组成员执行回调后的结果
		box.map = AP.map ? 
			function(arr, fn) {
				arr.map(fn);
			} :
			function(arr, fn) {
				var ret = [];
				forEach(arr, function(item, i, arr) {
					ret.push(fn(item, i, arr));
				});
				return ret;
			}

		// 兼容filter
		//让数据成员全部执行一次一个指定的函数，并返回一个新的数组，该数组为原数组成员执行回调后返回为true的成员
		box.filter = AP.filter ?
			function(arr, fn) {
				return arr.filter(fn);
			} :
			function(arr, fn) {
				var ret = [];
				forEach(arr, function(item, i, arr) {
					if(fn(item, i, arr)) {
						ret.push(item);
					}
				});
				return ret;
			}

		// 数组去重
		box.unique = function(arr) {
			var ret = [],
				o = {};

			//将数组对象执行forEach方法，得到去重后的对象o ， 巧妙 XD
			forEach(arr, function(item) {
				o[item] = 1;
			});

			//对象以键值数组化
			// 兼容处理
			if(Object.keys) {
				ret = Object.keys(o);	// 返回数组
			}
			else {
				for(var p in o) {
					if(o.hasOwnProperty(p)) {
						ret.push(p);
					}
				}
			}

			return ret;
		};

		//以对象键值数组化
		box.keys = Object.keys;

		if(!box.keys) {
			box.keys = function(o) {
				var ret = [];

				for(var p in o) {
					if(o.hasOwnProperty(p)) {
						ret.push(p);
					}
				}
				return ret;
			};
		}

		// 当前时刻
		box.now = Date.now || function() {
			return new Date().getTime();
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
		};

		// md5加密
		box.md5 = function(string) {
			var x = Array();
			var k, AA, BB, CC, DD, a, b, c, d;
			var S11=7, S12=12, S13=17, S14=22;
			var S21=5, S22=9 , S23=14, S24=20;
			var S31=4, S32=11, S33=16, S34=23;
			var S41=6, S42=10, S43=15, S44=21;
			string = uTF8Encode(string);
			x = convertToWordArray(string);
			a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
			for (k = 0; k < x.length; k += 16) {
				AA = a; BB = b; CC = c; DD = d;
				a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
				d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
				c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
				b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
				a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
				d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
				c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
				b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
				a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
				d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
				c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
				b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
				a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
				d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
				c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
				b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
				a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
				d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
				c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
				b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
				a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
				d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
				c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
				b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
				a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
				d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
				c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
				b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
				a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
				d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
				c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
				b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
				a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
				d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
				c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
				b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
				a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
				d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
				c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
				b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
				a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
				d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
				c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
				b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
				a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
				d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
				c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
				b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
				a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
				d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
				c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
				b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
				a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
				d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
				c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
				b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
				a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
				d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
				c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
				b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
				a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
				d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
				c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
				b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
				a = addUnsigned(a, AA);
				b = addUnsigned(b, BB);
				c = addUnsigned(c, CC);
				d = addUnsigned(d, DD);
			}
			var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
			return tempValue.toLowerCase();
		};

		/*
			@param module 模块名 'jquery', ['jquery','seajs']
		*/
		box.use = function(module, callback) {
			var modules = box.isArray(module) ? module : [module.toString()], i, url = '';
				
			console.log('modules: ' + modules);

			for(i = 0; i < modules.length; i++) {
				url = cfg.basePath + modules[i] + '.js?cache=' + box.md5(modules[i]);

				loadScripts(url, cfg.charset, callback);
			}
		};

		function loadScripts(url, charset, callback) {
			var el = window.document.createElement('script');
			el.type = 'text/javascript';
			el.charset = charset;

			if(el.addEventListener) {	//w3c
				el.addEventListener('load', callback, false);
			}
			else {	//IE
				el.attachEvent('onreadystatechange', callback);
			}

			el.src = url;
			window.document.getElementsByTagName('head')[0].appendChild(el);
		}

	}

	if(typeof noGlobal === strundefined) {
		window.Sandbox = window.S = Sandbox;
	}

	return Sandbox;

});