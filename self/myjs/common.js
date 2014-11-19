/**
 *	@author 	lenq
 *	@time 		2011-8-10
 *	@标题		获取DOM对象信息
 *	@参数		一个参数时(string:根据ID获取对象,object:直接获取对象)
 *			两个参数时(两个参数为string:第一个参数获取class对象,第二个参数获取第几个class) 
 *	@用法		getDom("id"),getDom(id),getDom("className",1)
**/
function getDom(){
	var arrays = [];
	//一个参数时
	if(arguments.length == 1){
		//字符串时
		if(typeof arguments[0] === "string"){
			return document.getElementById(arguments[0]);
		}
		//对象时
		else{
			return arguments[0];
		}
	}
	//两个参数时
	else if(arguments.length == 2){
		if(typeof arguments[0] === "string" && typeof arguments[1] === "number"){
			var elems = document.getElementsByTagName("*");
			for(var i = 0; i < elems.length; i++){
				if(elems[i].className == arguments[0]){
					arrays.push(elems[i]);
				}
			}
		}
		else{
			browser.isIE() ? alert("选择dom失败,请确认是否正确") : console.error("选择dom失败,请确认是否正确");
			return ;
		}
		return arrays[arguments[1]];
	}
	//其他情况下
	else{
		console.error("语法有错误,最多两个参数");
		return ;
	}
}
//设定css样式或添加className
//css("className") or css("color","red") or css({color : "red", fontSize : "12px"})
function css(objs,options){
	var obj = getDom(objs);
	if(typeof options === "object"){
		for(var i in options){
			obj.style[i] = options[i];
		}
	}
	else if(typeof options === "string"){
		obj.style.cssText = options;
	}
	else{
		browser.isIE() ? alert("css函数出错") : console.error("css函数出错");
		return;
	}
}

/**
 *	@标题	 判断浏览器
 * 
**/
var browser = {
	isIE : function(){
		return navigator.appName.indexOf("Microsoft Internet Explorer") != -1 ? true : false;
	},
	isFireFox : function(){
		return (navigator.appName.indexOf("Netscape") != -1 && !document.all) ? true : false;
	}
};

/**
 *	@标题 获取css的样式
 *	@用法 getStyle(obj)
 *	@参数	 obj 类型(string/object) 
**/
function getStyle(elem,attr){
	var obj = getDom(elem);
	return attr ? (browser.isIE() ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, null)[attr]) : (browser.isIE() ? obj.currentStyle : document.defaultView.getComputedStyle(obj, null));
}

/**
 *	@标题	 获取childnode 主要是为了兼容IE、FireFox获取子节点的时候不一致问题
 *  @用法	 child(obj)
 *  @参数 obj目标对象 
**/

function child(o){
	var obj = getDom(o);
	return obj.childNodes[0].nodeType == 1 ? obj.childNodes[0] : obj.childNodes[1];
}

/**
 *	@标题	 继承
 *	@用法 extend(destination,source),,extend(defaultOptions,options || {});
 *	@参数 destination继承的子类，source继承的父类
**/
function extend(destination,source){
	for(var property in source){
		destination[property] = source[property];
	}
	return destination;
}

/**
 *	@标题	 创建类
 *	@用法	 var example = Class.create();
 *	@参数 无 
**/
var Class = {
		create : function(){
			return function(){return this.initialize.apply(this,arguments);};
		}
};

/**
 *	@标题		获取ajax对象
 *	@参数		无参数
 *	@用法		var ajax = getAjax(); ajax就是获取的ajax对象
**/
function getAjax(){
	var ajax = function(){
		return these(
				function(){return new XMLHttpRequest();},
				function(){return new ActiveXObject("Msxml2.XMLHTTP");},
				function(){return new ActiveXObject("Microsoft.XMLHTTP");}
		);
	};
	var these = function(){
		var returnValue = null;
		for(var i = 0; i<arguments.length; i++){
			try{
				returnValue = arguments[i]();
				break;
			}
			catch(e){
				new Error("获取ajax失败"+e.message);
			}
		}
		return returnValue;
	};
	return ajax();
}


//如何使用ajax函授,@参数 url,服务器地址
function doAjax(url,callback,failer){
	var ajax = getAjax();
		ajax.open("GET",url,true);
	
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			if(callback){
				callback(ajax.responseText);
			}
			//getDom("ajax").innerHTML = ajax.responseText + "请求状态" + ajax.statusText;
		}
		else{
			if(failer){
				failer(ajax.status);
			}
		}
	};
	ajax.send(null);
}

/**
 * @标题	事件组建对象
 * @子集	load(fn)	fn为函授,dom加载函授
 * 		event(obj,type,fn)	obj为触发事件的对象,type为事件类型,fn为事件处理的函授
 * @使用	load(function(){...})
 * 		event(window,"click",function(){...})
**/
var EventUtil = {
		load : function(fn){
			if(window.attachEvent){
				window.attachEvent("onload",fn);
			}
			else{
				window.addEventListener("load",fn,false);
			}
		},
		event: function(obj,type,fn){
			obj = getDom(obj);
			if(obj.attachEvent){
				obj.attachEvent("on"+type,fn);
			}
			else{
				obj.addEventListener(type,fn,false);
			}
		},
		deEvent : function(obj,type,fn){
			obj = getDom(obj);
			obj.detachEvent ? obj.detachEvent("on"+type,fn) : obj.removeEventListener(type,fn,false);
		}
};


//验证函数
var regs = {
	normal : function(val){		//中英文数字下划线连接线
		return /^([\u4E00-\u9FFF]|[a-zA-Z0-9_-])+$/gi.test(val);
	},
	isChn : function(val){		//中文
		return /^[\u4E00-\u9FFF]+$/gi.test(val);
	},
	isEng : function(val){		//英文
		return /^[a-zA-Z]+$/g.test(val);
	},
	isNum : function(val){		//数字
		return /^[\d]+$/g.test(val);
	},
	notNull : function(val){	//不为空
		return /^.+$/g.test(val);
	},
	decimal : function(val){	//小数精确到3位
		return /^\d+(?:\.\d{1,3}|)$/g.test(val);
	},
	tel : function(val){	//手机
		return /^[1]\d{10}$/g.test(val);
	},
	fax : function(val){	//座机,传真
		return /^(0(?:\d{2}|\d{3})(-)?)?(\d{7}|\d{8})(([\,|\s](0(?:\d{2}|\d{3})(-)?)?(\d{7}|\d{8}))+)?$/g.test(val);
	},
	email : function(val){	//邮箱
		return /^(\w+@\w+)(.com|.cn|.net|.com.cn?)$/g.test(val);
	},
	qq : function(val){	//QQ
		return /^[1-9]{1}\d{4,13}$/g.test(val);
	},
	site : function(val){	//网址	
		return /^((http\:\/\/www\.|www\.)?[0-9a-zA-Z]+)(.com|.cn|.net|.com.cn?)$/g.test(val);
	},
	identity : function(val){	//身份证号码
		return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/g.test(val);
	},
	letter : function(val){	//全字符
		return /^[^\~\!\@\$\%\^\&\*\+\=\?]+$/gi.test(val);
	}
};

/**
 * @标题	表单验证
 * @参数	form为表单对象
 * 		options为数组，里面是一系列的对象组成
 * 		默认控件
 * 		{
 * 			field : 要验证的控件对象	(对象/字符串)
 * 			require : 该控件对象是否必须填 (布尔类型)
 * 			reg : 要验证的规则名称 (字符串)
 * 			isReg : 是否需要验证,如果控件的值可以为空的话直接通过，但如果是填写的话就必须验证 (布尔类型)
 * 			defaults : 控件后面的提示语 (字符串类型)
 * 		}
 * 		下拉控件
 * 		{
 * 			field : 要验证的控件对象 (对象/字符串)
 * 			select : 控件对象的下拉对象 (对象/字符串)
 * 			hidden : 控件对象对应的影藏域对象 (对象/字符串)
 * 		}
 *		日期控件
 *		{
 *			field : 要验证的控件对象 (对象/字符串)
 *			type : "date" 标记为日期控件验证对象类型
 *			required : true 是否为必填
 *		}
 * @使用	valieForm("form",[{...},{...}])
**/
var validForm = function(form,options){
	var objs = [];
	var rules = [];
	var flag = true;
	var errors = [];
	form = getDom(form);
	for(var i in regs){
		rules[i] = regs[i];
	}
	for(var i = 0; i < options.length; i++){
		objs[options[i].field] = options[i];
		//将defaults的值附加到页面中去
		if(options[i].defaults){
			var nextNode = getDom(options[i].field).parentNode.nextSibling.nodeType == 1 ? getDom(options[i].field).parentNode.nextSibling : getDom(options[i].field).parentNode.nextSibling.nextSibling;
			css(nextNode,{color : "gray", fontSize : "12px"});
			nextNode.innerHTML = options[i].defaults;
		}
		
		//下拉框控件验证
		if(options[i].select){
			var child = getDom(options[i].select);
			child.parent = getDom(options[i].field);
			child.hidden = getDom(options[i].hidden);
			
			child.parent.value = child.options[0].text;
			child.hidden.value = child.options[0].value;
			child.onchange = function(){
				doSetParent(this,this.parent,this.hidden);
			};
			/*EventUtil.event(child, "change", function(){
				doSetParent(child,parent,hidden);
			});*/
		}
	}
	
	//当表单控件改变时
	for(var j = 0; j < options.length; j++){
		
		if(options[j].tag && options[j].defaults){
			var brother , next;
			getDom(options[j].field).onchange = function(){
				brother = ( next = this.parentNode.nextSibling ) && next.nodeType === 1 ? next : next.nextSibling;
				if(options[j].tag == "*万元"){
					brother.innerHTML = parseInt(this.value)/10000 + " " + options[j].tag.replace( /\*/, "");
				}
				else if(options[j].tag == "*元"){
					brother.innerHTML = this.value + " " + options[j].tag.replace( /\*/, "");
				}
				else{
					throw new Error("数字控件未含有tag属性或请增加tag属性及值");
				}
			};
		}
	
		if(options[j].fn){
			EventUtil.event(getDom(options[j].field) , "change" , options[j].fn);
		}
		//type="select" 表单值改变判断是否符合要求
		if(options[j].type == "select"){
			getDom(options[j].field).onchange = function(){
				var selectedValue = this.options[this.options.selectedIndex].value;
				//alert(selectedValue + "???");
				if((selectedValue != "") && (selectedValue != "0") ){
					if(browser.isIE()){
						css(this.parentNode.previousSibling,{color : "black"});
					}
					else{
						css(this.parentNode.previousSibling.previousSibling,("color : black"));
					}
					
				}
				else{
					if(browser.isIE()){
						css(this.parentNode.previousSibling,{color : "red"});
					}
					else{
						css(this.parentNode.previousSibling.previousSibling,("color : red"));
					}

				}
			};
		}

		if(options[j].reg){//inlcude change1
		//表单控件触发onchange事件时
		EventUtil.event(getDom(options[j].field), "change", function(e){
			//事件对象支持不一样
			//ie浏览器对event事件不支持直接获取对像,需要通过在函数传递事件对象e来获取触发对象
			if(document.all){
				var event = window.event || e;
				var that = event.target || event.srcElement;
				
				if(!rules[objs[that.id].reg](that.value)){
					if(browser.isIE()){
						css(that.parentNode.previousSibling,{color : "red"});
					}
					else{
						css(that.parentNode.previousSibling.previousSibling,("color : red"));
					}
				}
				else{
					if(browser.isIE()){
						css(that.parentNode.previousSibling,{color : "black"});
					}
					else{
						css(that.parentNode.previousSibling.previousSibling,("color : black"));
					}
				}
			}
			//其他浏览器下
			else{
				if(!rules[objs[this.id].reg](this.value)){
					css(this.parentNode.previousSibling.previousSibling,{color : "red"});
				}
				else{
					css(this.parentNode.previousSibling.previousSibling,{color : "black"});
				}
			}
		});	
		}//inlcude change1
	}
	
	//表单提交的时候
	EventUtil.event(form, "submit", function(){
		errors.length = 0;
		for(var k = 0; k < options.length; k++){
			//含有require时,或require = true
			if(options[k].require){
				//含有属性fn,用于判断输入的值是否和服务器端的数据重复,如果重复会提示重复
				if(options[k].fn){
					if(getDom(options[k].field).data == "1"){
						flag = false; errors.push(flag);
						alert(getDom(options[k].field).parentNode.previousSibling.innerHTML + "名称重复,请重新填写");
					}
				}
				
				if(options[k].Rn){
					var callbackValue = options[k].Rn();
					if(callbackValue){
						if(browser.isIE()){
							css(getDom(options[k].field).parentNode.previousSibling,{color : "black"});
						}
						else{
							css(getDom(options[k].field).parentNode.previousSibling.previousSibling,("color : black"));
						}
						flag = true;
					}
					else{
						if(browser.isIE()){
							css(getDom(options[k].field).parentNode.previousSibling,{color : "red"});
						}
						else{
							css(getDom(options[k].field).parentNode.previousSibling.previousSibling,("color : red"));
						}
						flag = false;
						errors.push(flag);
					}
				}
				
				if(options[k].reg){
					//判断是否通过
					if(rules[objs[options[k].field].reg](getDom(options[k].field).value) && getDom(options[k].field).value != ""){
						if(browser.isIE()){
							css(getDom(options[k].field).parentNode.previousSibling,{color : "black"});
						}
						else{
							css(getDom(options[k].field).parentNode.previousSibling.previousSibling,("color : black"));
						}
						flag = true;
					}
					else{
						if(browser.isIE()){
							css(getDom(options[k].field).parentNode.previousSibling,{color : "red"});
						}
						else{
							css(getDom(options[k].field).parentNode.previousSibling.previousSibling,("color : red"));
						}
						flag = false;
						errors.push(flag);
					}
				}
			}
			//不含require时,可填可不填
			else{
				//需要验证
				/*
					验证input控件,含有
					{
						field : "a",		//input控件id
						require : true,		//是否必填
						reg : "b",			//验证的规则名称,可以自定义如: regs.规则名称 = function(val){return true|false}
						isReg : true,		//是否需要验证
						defaults : "默认显示的文字"	//默认显示的提示文字
					}
				*/
				if(options[k].isReg){
					//如果值为空
					if(getDom(options[k].field).value == ""){
						if(browser.isIE()){
							css(getDom(options[k].field).parentNode.previousSibling,{color : "black"});
						}
						else{
							css(getDom(options[k].field).parentNode.previousSibling.previousSibling,("color : black"));
						}
						flag = true;
					}
					//值不为空时
					else{
						if(rules[options[k].reg](getDom(options[k].field).value)){
							if(browser.isIE()){
								css(getDom(options[k].field).parentNode.previousSibling,{color : "black"});
							}
							else{
								css(getDom(options[k].field).parentNode.previousSibling.previousSibling,("color : black"));
							}
							flag = true;
						}
						else{
							if(browser.isIE()){
								css(getDom(options[k].field).parentNode.previousSibling,{color : "red"});
							}
							else{
								css(getDom(options[k].field).parentNode.previousSibling.previousSibling,("color : red"));
							}
							flag = false;
							errors.push(flag);
						}
					}
				}
				//验证下拉框控件时
				/*
					验证下拉框控件，如果下拉框对应的input控件值不为空，且下拉框对应的隐藏域不为空或不为0则通过验证，否则验证失败
					{
						field : "a",		//input控件id
						select : "b",		//select控件id
						hidden : "c"		//select对应的hidden控件id
					}
				*/
				else if(options[k].select){
					var parent = getDom(options[k].field),
						hidden = getDom(options[k].hidden);
					if(parent.value != "" && (hidden.value != "" && hidden.value != "0")){
						flag = true;
					}
					else{
						if(browser.isIE()){
							css(parent.parentNode.previousSibling,{color : "red"});
						}
						else{
							css(parent.parentNode.previousSibling.previousSibling,("color : red"));
						}
						flag = false;
						errors.push(flag);
					}
				}
				//验证日期控件时
				/*
					验证日期控件，required参数表示是否必填(true:必填, 无|false: 可填可不填)
					{
						field : "a",
						type : "date",
						//required : true
					}
				*/
				else if(options[k].type == "date"){
					var me = getDom(options[k].field);
					if(options[k].required && me.value != ""){
						flag = true;
						if(browser.isIE()){
							css(me.parentNode.previousSibling,{color : "black"});
						}
						else{
							css(me.parentNode.previousSibling.previousSibling,("color : black"));
						}
					}
						else if(!options[k].required)
						{
							continue;
						}
					else{
						if(browser.isIE()){
							css(me.parentNode.previousSibling,{color : "red"});
						}
						else{
							css(me.parentNode.previousSibling.previousSibling,("color : red"));
						}
						flag = false;
						errors.push(flag);
					}
				}
				//验证下拉框
				/*
					本身控件就是下拉框，即field就是下拉框的id
					判断下拉框是否选择，默认选择第一项，提交时会报错,如果选择的那项option的value值为空或为0,都将报错
					{
						field : "a",
						type : "select"
					}
				*/
				else if(options[k].type == "select"){
					var me = getDom(options[k].field);
					var selectValue = me.options[me.options.selectedIndex].value;
					//alert(selectValue);
					if(selectValue != "" && selectValue != "0"){
						flag = true;
						if(browser.isIE()){
							css(me.parentNode.previousSibling,{color : "black"});
						}
						else{
							css(me.parentNode.previousSibling.previousSibling,("color : black"));
						}
					}
					else{
						if(browser.isIE()){
							css(me.parentNode.previousSibling,{color : "red"});
						}
						else{
							css(me.parentNode.previousSibling.previousSibling,("color : red"));
						}
						flag = false;
						errors.push(flag);
					}
				}
				//验证ajax获取的数据
				//验证下拉框
				/*
					判断隐藏域是否是通过ajax获取的数据传来的id，空则错，
					存在属性: isNotNull: true 则可以自己填写内容，无需判断隐藏域,控件本身内容不能为空
					{
						field : "a",
						type : "ajax",
						hidden : "b",
						//isNotNull : true
					}
				*/
				else if(options[k].type == "ajax"){
					var me = getDom(options[k].field);
					var hidden = getDom(options[k].hidden);
					
					//isNotNull "false" 可以为空，如果填写就按照要求进行选择输入
					if(options[k].isNotNull == "false"){
						if(me.value == "" || hidden.value == ""){
							flag = true;
							css(me.parentNode.previousElementSibling ? 
								me.parentNode.previousElementSibling : me.parentNode.previousSibling , {color : "black"});
						}
						else if(me.value != "" && hidden.value == ""){
							flag = false;
							errors.push(flag);
							try{
							css(me.parentNode.previousElementSibling ? 
								me.parentNode.previousElementSibling : me.parentNode.previousSibling , {color : "red"});
							}catch(e){}
						}
					}
					
					//isNotNull true 可以自行填写，false 或者不写，则必须从列表中选择
					if(options[k].isNotNull == true){
						if(me.value !== ""){
							flag = true;
							css(me.parentNode.previousElementSibling ? 
								me.parentNode.previousElementSibling : me.parentNode.previousSibling , {color : "black"});
						}
						else{
							flag = false;
							errors.push(flag);
							try{
							css(me.parentNode.previousElementSibling ? 
								me.parentNode.previousElementSibling : me.parentNode.previousSibling , {color : "red"});
							}catch(e){}
						}
						continue;
					}
					//---------------------------------------------------------------
					if(hidden.value !== ""){
						flag = true;
						if(browser.isIE()){
							css(me.parentNode.previousSibling,{color : "black"});
						}
						else{
							css(me.parentNode.previousSibling.previousSibling,("color : black"));
						}
					}
					else{
						if(browser.isIE()){
							css(me.parentNode.previousSibling,{color : "red"});
						}
						else{
							css(me.parentNode.previousSibling.previousSibling,("color : red"));
						}
						flag = false;
						errors.push(flag);
					}
				}
				//不需要验证
				else{
					continue;
				}
			}
			
		}
		if(errors.length > 0) return false;
		else return true;
	});
	
};


//下拉框改变时将值赋给父级输入框
/*
	child: 下拉框对象
	parent: input控件对象
	hidden : 下拉框对应的隐藏域对象
*/
function doSetParent(child,parent,hidden){
	parent = getDom(parent);
	if(browser.isIE()){
		css(parent.parentNode.previousSibling,{color : "black"});
	}
	else{
		css(parent.parentNode.previousSibling.previousSibling,("color : black"));
	}
	parent.value = child.options[child.options.selectedIndex].text;
	hidden.value = child.options[child.options.selectedIndex].value;
}



/**
 *	@标题	 对象拖拽
 *	@参数 obj要操控的对象
 *	@用法 Drag.init("mover",{			//mover是拖放的对象
				box : "container",	//要拖动的盒子
				html : "content",	//盒子里的文本内容
				replay : "replay",  //拖拽回放的按钮
				limit : true		//拖动对象的边界大小限制
			}); 
**/
var Drag = {};
Drag.init = function(obj,options){
	var obj = getDom(obj), box = getDom(options.box), html = getDom(options.html), replay = getDom(options.replay),
		drag = false,
		oX,oY,
		oPos = [];
	css(obj,{cursor : "move"});
	//对象得到鼠标按下事件并获取鼠标在对象上 x,y的位置
	EventUtil.event(obj, "mousedown", function(e){
		drag = true;
		var event = e || window.event;
		oX = event.clientX - parseInt(box.offsetLeft),
		oY = event.clientY - parseInt(box.offsetTop);
		oPos.push({x : box.offsetLeft, y : box.offsetTop});
		html.innerHTML = "x : " + oX + "<br /> y : " + oY;
	});
	EventUtil.event(document, "mousemove", function(e){
		var event = e || window.event;
		if(drag){
			if(options.limit){
				var winX = browser.isIE() ? (document.documentElement.offsetWidth-22-box.offsetWidth) : (window["innerWidth"] - box.offsetWidth),
					winY = browser.isIE() ? (document.documentElement.offsetHeight - box.offsetHeight - 4) : (window["innerHeight"] - box.offsetHeight),
					left = event.clientX - oX,
					top = event.clientY - oY;
					left = left < 0 ? 0 : left,
					left = left > winX ? winX : left;
					
					top = top < 0 ? 0 : top;
					top = top > winY ? winY : top;
					
					//alert(winX + "***********" + winY);
					box.style["left"] = left + "px";
					box.style["top"] = top + "px";
					oPos.push({x : box.offsetLeft, y : box.offsetTop});
					html.innerHTML = "x : " + box.offsetLeft + "<br /> y : " + box.offsetTop;
			}
			else{
				box.style["left"] = event.clientX - oX;
				box.style["top"] = event.clientY - oY;
				oPos.push({x : box.offsetLeft, y : box.offsetTop});
				html.innerHTML = "x : " + box.offsetLeft + "<br /> y : " + box.offsetTop;
			}
		}
		else{
			return ;
		}
	});
	EventUtil.event(document, "mouseup", function(){
		drag = false;
	});
	EventUtil.event(replay, "click", function(){
		if(oPos.length > 1){
			var timer = setInterval(function(){
				var aPos = oPos.pop();
				aPos ? (box.style["left"] = aPos.x + "px", box.style["top"] = aPos.y + "px" , html.innerHTML = "x : " + box.offsetLeft + "<br /> y : " + box.offsetTop) : clearInterval(timer);
			},30);
		}
		else{
			return ;
		}
	});
};


//鼠标划过移出背景变色，各行变色,elem是哪个table
	function TrHover(elem){
		var oTb = typeof elem === "string" ? document.getElementById(elem) : elem; 
		var rows = oTb.tBodies[0].rows , i , curColor;
		
		for( i = 0 ; i < rows.length ; i++){
			//各行变色
			if( i%2 ){
				rows[i].style.background = "#f2f2f2";
			}
			//鼠标移入
			rows[i].onmouseover = function(){
				curColor = this.style.background;
				this.style.background = "#C6DBFC";
			};
			//鼠标移出
			rows[i].onmouseout = function(){
				this.style.background = curColor;
			};
		}
	}
//弹出模态窗口，根据情况确定是否刷新父窗口
function doModal(mUrl,winHeight,winWidth,winScroll)
{
 	var nhw = window.showModalDialog(mUrl,window,"dialogHeight=" + winHeight + "px;dialogWidth=" +  winWidth +"px;center=yes;help=no;resizable=no;status=no;scroll=" + winScroll);
	if (nhw == 1)
	{
		//alert("OK!");	
		window.location.reload();
	}
	else
	{
		//alert("Re");	
	}
}

//将数字字符串转换成带有面值或转换成大写面值
/*
	digital:(string)
	upper: 为空或不为空(任意类型)
	例如:
	var str = "123456.45642"
	transformDigital(str , "大写");	//壹拾贰萬叁仟肆佰伍拾陆点肆伍陆肆贰
	或
	transformDigital(str);	//转换成小写	123456.45	
	
	小写数字:	 ["O" , "一" , "二" , "三" , "四" , "五" , "六" , "七" , "八" , "九" , "十"]
	大写数字:	 ["零" , "壹" , "贰" , "叁" , "肆" , "伍" , "陆" , "柒" , "捌" , "玖" , "拾"]
	小写面值:	 ["" , "十" , "百" , "千" , "万" , "十" , "百" , "千" , "亿" , "十" , "百" , "千"]
	大写面值:	 ["" , "拾" , "佰" , "仟" , "萬" , "拾" , "佰" , "仟" , "億" , "拾" , "佰" , "仟"]
*/


function transformDigital(digital , upper){
		var upper_par = ["" , "拾" , "佰" , "仟" , "萬" , "拾" , "佰" , "仟" , "億" , "拾" , "佰" , "仟"],
			upper_digital = ["零" , "壹" , "贰" , "叁" , "肆" , "伍" , "陆" , "柒" , "捌" , "玖" , "拾"],
			lower_par = ["" , "十" , "百" , "千" , "万" , "十" , "百" , "千" , "亿" , "十" , "百" , "千"],
			lower_digital = ["O" , "一" , "二" , "三" , "四" , "五" , "六" , "七" , "八" , "九" , "十"],
			strs = "" , reverseDigital , temStr = "";
			
		//存在小数
		if(digital.indexOf(".") !== -1){
			var dig_temp = digital.substring(digital.lastIndexOf(".") + 1),	//获取小数点尾数123132
				s = digital.substring(0 , digital.lastIndexOf(".")),	//获取整数部分
				j = 0;
				
			reverseDigital = upper ? s.split("").reverse().join("") : s ;	//整数部分翻转
			temStr = upper ? "点" : (dig_temp.length == 0 ? "" : ".");				//小数部分字符串拼接
			if(upper){
				for(; j < dig_temp.length ; j++){
					temStr += upper_digital[parseInt(dig_temp.charAt(j))];	//大写
				}
			}
			else{
				temStr += dig_temp.length >= 2 ? dig_temp.substr(0 , 2) : dig_temp.substr(0 , dig_temp.length);
			}
		}
		else{
			reverseDigital = upper ? digital.split("").reverse().join("") : digital;	//整数翻转156434153
		}
			
			
		if(upper){	
			for(var i = 0 ; i < reverseDigital.length ; i++){
				strs += upper_par[i] + upper_digital[parseInt(reverseDigital.charAt(i))];	//转成大写
			}
		}
		else{
			strs += reverseDigital;			//小写
		}
			
		return ((upper ? strs.split("").reverse().join("") : strs) + (temStr ? temStr : ""));
}