###javascript基础知识
####变量
```javascript
var a = 1;	//应该浏览器解释引擎会解释成下面这样
var a;
a = 1;
// 下面这种情况
var a;
a //undefined
//因为只是申明了一个变量，未赋值，则变量的值就是undefined
```
>严格地说，var a = 1 与 a = 1，这两条语句的效果不完全一样，主要体现在delete命令无法删除前者。不过，绝大多数情况下，这种差异是可以忽略的。

**var是用来申明一个变量，也即在变量一旦申明就会存在环境中，如果再次申明这个变量就会覆盖前面的同名变量**

>变量提升

JavaScript引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。
```javascript
console.log(a);
var a = 1;

//这样不会报错，因为存在变量提升，真正运行的是下面的代码：

var a;
console.log(a);	//undefined
a = 1;
```
**请注意，变量提升只对var命令声明的变量有效，如果一个变量不是用var命令声明的，就不会发生变量提升。**
```javascript
console.log(b);
b = 1;
```
*上面的语句将会报错，提示“ReferenceError: b is not defined”，即变量b未声明，这是因为b不是用var命令声明的，JavaScript引擎不会将其提升，而只是视为对顶层对象的b属性的赋值。*
####标识符
标识符是用来识别具体对象的一个名称，最常见的标识符就是变量名，以及函数名

* 标识符的命名规则：
	* 第一个字符可以是任意Unicode字母，以及美元符号（$）和下划线（_）。
	* 第二个字符及后面的字符，还可以用数字。

```javascript
// 以下是合法的标识符：
arg0
_temp
$elem
π

// 以下是不合法的标识符：
1a
23
***
a+b
-d

// 中文是合法的标识符，可以作为变量名
var 临时变量 = 1;
```
>JavaScript有一些保留字，不能用作标识符：arguments、break、case、catch、class、const、continue、debugger、default、delete、do、else、enum、eval、export、extends、false、finally、for、function、if、implements、import、in、instanceof、interface、let、new、null、package、private、protected、public、return、static、super、switch、this、throw、true、try、typeof、var、void、while、with、yield。

>另外还有3个词虽然不是保留字，但是因为具有特别含义，也不应该用作标识符：Infinity、NaN、undefined。

####条件语句
javascript提供if结构和switch结构，完成条件判断.
>if结构

```javascript
if(expression)
	statement;

if(expression) {
	statement1;
	statement2;
}
```
>switch结构
```javscript
switch(1 + 3) {
    case 2 + 2:
        f();
        break;
    default:
        neverhappens();
}
```

####循环语句
```javascript
// while语句
while(expression)
    statement;
   
while(expression) {
    statement1;
    statemnet2;
}

// for语句

for(initialize; test; increment)
statement

// 或者

for(initialize; test; increment){
    statement
}
```
>初始化（initialize）：确定循环的初始值，只在循环开始时执行一次;
>测试（test）：检查循环条件，只要为真就进行后续操作;
>递增（increment）：完成后续操作，然后返回上一步，再一次检查循环条件。


