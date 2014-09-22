# javascript
## js简介
我们都知道javascript是一种弱类型语言,但是现在的趋势让我们知道javascript是一种可变性很强的语言，
### js的基础
* 它包括几种类型：
    * 数字
    * 字符串
    * 布尔类型
    * 对象
    	* 函数
    	* 数组
    	* 日期
    	* 正则表达式
    * 空(NULL)
    * 未定义(UNDEFINED)

#### 数字
看下面的例子，猜猜得出的结果是什么：
```javascript
	0.1 + 0.2 = 0.3? //正确答案是：(0.30000000000000004)
```
数字的加(+)、减(-)、乘(*)、除(/)、取模(%)、高级数学(Math对象)
```javascript
	Math.sina(3.5);
	var d = Math.PI * r * r;
```
猜猜下面的结果是什么?
```javascript
	> parseInt("hello", 10);
	> NaN
```
检测是否为数字的函数：
```javascript
	> isNaN(notnum);
```
#### 布尔类型
布尔类型只有两个值： true 和 false，这两个都是关键字，以下规则任何值都可以被转换成布尔类型：
```javascript
	1、false, 0, 空字符串(''), NaN, null, undefined都会被转换成false,相反的都会转换成true
	2、其他的值都会被转换成true
```
#### 字符串
猜猜下面的输出结果是什么?
```javascript
	> '3' + 4 + 5
	> 3 + 4 + '5'
```
遇到小数点数字相加，最好用math函数或者用parseInt方法取整，可用最新的方法toFixed取一定长度的字符串
```javascript
	var num = 0.1 + 0.2;
	num.toFixed(2);	//指定输出小数点后两位
	> '0.30'
```
<!--
<div style="color: #f60">这是一个内嵌 HTML 标签</div>
```html
	<head>
		<title>javascript基础知识</title>
		<script type="text/javascript" src="http://cdn.baidu.com/jquery/1.11.0/jquery.min.js"></script>
	</head>
	<body>
		<h1>这是一个html页面代码展示效果</h1>
	</body>
```
```php
	<?php
		echo 'hello world!';
	?>
```
```java
	public void static main(String args[]) {
		system.out.println('hello wolrd!\n');
	}
```
-->