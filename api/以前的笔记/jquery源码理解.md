##jquery源码解析
jquery源码一直是运行在一个沙箱模式中：
```javascript
(function(window, undefined) {
	...
})(window);
```
* 这里undefined的好处是：
	* undefined值不会更改
	* 有利于文件的压缩

###jQuery核心的工具方法
>核心工具、方法: (core.js)

* $.trim() 去除字符串两端的空格。（内部调用7次）
* $.each() 遍历数组或对象，这个方法在jQuery内部中被使用很多次，有几个不错的用法，之后剖析再举例吧。（内部调用59次）
* $.inArray() 返回一个值在数组中的索引位置。如果该值不在数组中，则返回-1。（内部调用9次）
* $.grep() 返回数组中符合某种标准的元素。（内部调用6次） $.merge() 合并两个数组。（内部调用11次）
* $.map() 将一个数组中的元素转换到另一个数组中。（内部调用12次）
* $.makeArray() 将对象转化为数组。（内部调用6次）
* $.globalEval() 在全局作用域下执行一段js脚本。（内部调用2次）
* $.proxy() 接受一个函数，然后返回一个新函数，并且这个新函数始终保持了特定的上下文(context)语境。（内部调用0次）
* $.nodeName() 返回DOM节点的节点名字，或者判断DOM节点名是否为某某名字。（内部调用51次）
* $.extend() 将多个对象，合并到第一个对象。（内部调用42次）

>类型判断：

* $.type() 判断对象的类别（函数对象、日期对象、数组对象、正则对象等等）。这个方法的实现就是用$.each辅助的。（内部调用65次）
* $.isArray() 判断某个参数是否为数组。（内部调用12次）
* $.isEmptyObject() 判断某个对象是否为空（不含有任何属性）。（内部调用4次）
* $.isFunction() 判断某个参数是否为函数。（内部调用32次）
* $.isPlainObject() 判断某个参数是否为用"{}"或"new Object"建立的对象。（内部调用4次）
* $.isWindow() 判断是否为window对象。（内部调用6次）

>辅助工具函数：

* $.noop() 一个空函数，个人觉得是用来作为一个默认的回调函数，无需每次去定义一个空的function消耗资源。（内部调用2次）
* $.now() 获取当前时间戳，代码很简单：return (new Date()).getTime();。（内部调用4次）
* $.error() 报错，对外抛出一个异常，代码很简单：throw new Error(msg);。（内部调用2次）

>ajax工具函数：

* $.parseHTML() 解析HTML，之后再单独一节写。（内部调用2次）
* $.parseJSON() 解析JSON，之后再单独一节写。（内部调用2次）
* $.parseXML() 解析XML，之后再单独一节写。（内部调用1次）

>内部辅助函数：

* $.access() 这个函数我更认为是jQuery内部的辅助函数，没必要暴漏出来，在内部用于去一些对象的属性值等，在之后剖析到DOM操作等再细细探讨一下。（内部调用9次）
* $.camelCase() 转化成骆驼峰命名。（内部调用12次）
```javascript
class2type = {},
core_deletedIds = [],
core_version = "1.9.0",

// Save a reference to some core methods
core_concat = core_deletedIds.concat,
core_push = core_deletedIds.push,
core_slice = core_deletedIds.slice,
core_indexOf = core_deletedIds.indexOf,
core_toString = class2type.toString,
core_hasOwn = class2type.hasOwnProperty,
core_trim = core_version.trim,

//等同以下代码：
core_concat = Array.prototype.concat, 
//文章一开始的介绍有稍微提到prototype
//core_deletedIds是一个数组实例
//core_deletedIds.concat方法就相当于调了Array类中的成员方法concat。
```
**通过上面的代码我们思考一个问题：**
```javascript
var concat = Array.prototype.concat;
var arr = [];
// 可以有以下方式实现同样功能：
// 1、arr.concat();
// 2、concat.call(arr);
// 3、concat.apply(arr);
```
>调用实例arr的方法concat时，首先需要辨别当前实例arr的类型是Array，在内存空间中寻找Array的concat内存入口，把当前对象arr的指针和其他参数压入栈，跳转到concat地址开始执行。 当保存了concat方法的入口core_concat时，完全就可以省去前面两个步骤，从而提升一些性能。 nodejser在评论中也给出了另一种答案： var obj = {}; 此时调用obj.concat是非法的，但是如果jQuery采用上边方式二或者三的话，能够解决这个问题。 也即是让类数组也能用到数组的方法（这就是call跟apply带来的另一种用法），尤其在jQuery里边引用一些DOM对象时，也能完美的用这个方法去解决，妙！
[摘自w3ctech](http://www.w3ctech.com/topic/256)
