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
* 初始化（initialize）：确定循环的初始值，只在循环开始时执行一次;
* 测试（test）：检查循环条件，只要为真就进行后续操作;
* 递增（increment）：完成后续操作，然后返回上一步，再一次检查循环条件。

>do...while循环

do...while循环与while循环类似，唯一的区别就是先运行一次循环体，然后判断循环条件。
```javascript
do 
statement
while(expression);

// 或者

do { 
    statement
} while(expression);
```
不管条件是否为真，do..while循环至少运行一次，这是这种结构最大的特点。另外，while语句后面的分号不能省略。

>break语句和continue语句

break语句和continue语句都具有跳转作用，可以让代码不按既有的顺序执行。
*break语句用于跳出代码块或循环。*
```javascript
var i = 0;

while (i<100){
    console.log('i当前为：' + i);
    i++;
    if (i === 10) break;
}

//上面代码只会执行10次循环，一旦i等于10，就会跳出循环。
```
*continue语句用于立即终止本次循环，返回循环结构的头部，开始下一次循环。*
```javascript
var i = 0;

while (i<100){
    i++;
    if (i%2===0) continue;
    console.log('i当前为：' + i);
}

// 上面代码只有在i为奇数时，才会输出i的值。如果i为偶数，则直接进入下一轮循环。
```
**如果存在多重循环，不带参数的break语句和continue语句都只针对最内层循环。**

###数据类型
数据类型共分为两组：原始类型 和 合成类型。(共 6 种数据类型)

* 原始类型
    * 数值 (number)
    * 字符串 (string)
    * 布尔值 (boolean)
* 合成类型
    * 对象 (object)
    * 数组 (array)
    * 函数 (function)
* 特殊值
    * NULL (null)
    * UNDEFINED (undefined)

>JavaScript有三种方法，可以确定一个值到底是什么类型。

* typeof运算符
* instanceof运算符
* Object.prototype.toString方法

```javascript
// 原始类型
typeof 123; //'number'
typeof '123'; //'string'
typeof false; //'boolean'

// 函数
function f() {}
typeof f; //'function'

// undefined
typeof undefined; //'undefined'

// 可以使用typeof来检测一个没有被声明的变量，而不报错
v
typeof v; // 'undefined'

//错误的写法
if(v) {
    // ...
}

// 正确的写法
if(typeof v === 'undefined') {
    // ...
}

//除此之外，其他都返回object
typeof window;   // 'object'
typeof {};   // 'object'
typeof [];   // 'object'
typeof null; // 'object'
```
*从上面代码可以看到，空数组（[]）的类型也是object，这表示在JavaScript内部，数组本质上只是一种特殊的对象。另外，null的类型也是object，这是由于历史原因造成的，为了兼容以前的代码，后来就没法修改了，并不是说null就属于对象，本质上null是一个类似于undefined的特殊值。*

既然typeof对数组（array）和对象（object）的显示结果都是object，那么怎么区分它们呢？instanceof运算符可以做到。
```javascript
var o = {};
var a = [];

o instanceof Array // false
a instanceof Array // true
```
>null和undefined

(1)相似性
将一个变量赋值为undefined或null，老实说，几乎没区别。

```javascript
var a = undefined;

//或者 (等价于)

var a = null;
```

**null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。**

```javascript
Number(undefined)
// NaN

5 + undefined
// NaN
```

* null表示"没有对象"，即该处不应该有值。典型用法是：
    * 作为函数的参数，表示该函数的参数不是对象。
    * 作为对象原型链的终点。
* undefined表示"缺少值"，就是此处应该有一个值，但是还未定义。典型用法是：
    * 变量被声明了，但没有赋值时，就等于undefined。
    * 调用函数时，应该提供的参数没有提供，该参数等于undefined。
    * 对象没有赋值的属性，该属性的值为undefined。
    * 函数没有返回值时，默认返回undefined。

```javascript
var i;
i // undefined

function f(x){console.log(x)}
f() // undefined

var  o = new Object();
o.p // undefined

var x = f();
x // undefined
``` 

####布尔值

* 下列运算符会返回布尔值：
    * 两元逻辑运算符： && (And)，|| (Or)
    * 前置逻辑运算符： ! (Not)
    * 相等运算符：===，!==，==，!=
    * 比较运算符：>，>=，<，<=
*转换规则是除了下面六个值被转为false，其他值都视为true。
    * undefined
    * null
    * false
    * 0
    * NaN
    * '' (空字符串)

**需要特别注意的是，空数组（[]）和空对象（{}）对应的布尔值，都是true。**
```javascript
if([]) {console.log(true);}
if({}) {console.log(true);}
```

##数值

JavaScript内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。所以，1与1.0是相等的，而且1加上1.0得到的还是一个整数，不会像有些语言那样变成小数。

>number的最大值和最小值

```javascript
Number.MAX_VALUE // 1.7976931348623157e+308
Number.MIN_VALUE // 5e-324
```
>正零和负零

严格来说，JavaScript提供零的三种写法：0、+0、-0。它们是等价的。

```javascript
-0 === +0 // true
0 === -0 // true
0 === +0 // true
```
但是，如果正零和负零分别当作分母，它们返回的值是不相等的。

```javascript
(1/+0) === (1/-0) // false
```

>NaN

```javascript
5 - 'x' > NaN

Math.acos(2) // NaN
Math.log(-1) // NaN
Math.sqrt(-1) // NaN

0 / 0 // NaN

typeof NaN // 'number'

// NaN不等于任何值，包括它本身。
NaN === NaN // false

// 由于数组的indexOf方法，内部使用的是严格相等运算符，所以该方法对NaN不成立。
[NaN].indexOf(NaN) // -1

// NaN在布尔运算时被当作false。
Boolean(NaN) // false

// NaN与任何数（包括它自己）的运算，得到的都是NaN。
NaN + 32 // NaN
NaN - 32 // NaN
NaN * 32 // NaN
NaN / 32 // NaN
```

>isNaN

isNaN方法可以用来判断一个值是否为NaN。

```javascript
isNaN(NaN) // true
isNaN(123) // false

//但是，isNaN只对数值有效，如果传入其他值，会被先转成数值。
//比如，传入字符串的时候，字符串会被先转成NaN，所以最后返回true，这一点要特别引起注意。
//也就是说，isNaN为true的值，有可能不是NaN，而是一个字符串。
isNaN("Hello") // true
// 相当于
isNaN(Number("Hello")) // true > NaN

// 出于同样的原因，对于数组和对象，isNaN也返回true。
isNaN({}) // true
isNaN(Number({})) // true

isNaN(["xzy"]) // true
isNaN(Number(["xzy"])) // true

// 因此，使用isNaN之前，最好判断一下数据类型。
function myIsNaN(value) {
    return typeof value === 'number' && isNaN(value);
}

// 判断NaN更可靠的方法是，利用NaN是JavaScript之中唯一不等于自身的值这个特点，进行判断。
function myIsNaN(value) {
    return value !== value;
}

//Infinity表示“无穷”。除了0除以0得到NaN，其他任意数除以0，得到Infinity。
1 / -0 // -Infinity
1 / +0 // Infinity
```

>parseInt方法

如果字符串的第一个字符不能转化为数字（正负号除外），返回NaN。

```javascript
parseInt("abc") // NaN
parseInt(".3") // NaN
parseInt("") // NaN

// 可以用parseInt方法进行进制的转换。
parseInt("1011", 2) // 11
```

>parseFloat方法

parseFloat方法用于将一个字符串转为浮点数。

```javascript
// 如果字符串包含不能转化为浮点数的字符，则不再进行转化，返回已经转好的部分。
parseFloat("3.14");
parseFloat("314e-2");
parseFloat("0.0314E+2");
parseFloat("3.14more non-digit characters");
>3.14

// parseFloat方法会自动过滤字符串前导的空格。
parseFloat("\t\v\r12.34\n ")
>12.34

// 如果第一个字符不能转化为浮点数，则返回NaN
parseFloat("FF2") // NaN
parseFloat("") // NaN

// 这使得parseFloat的转换结果不同于Number函数
parseFloat(true)  // NaN
Number(true) // 1

parseFloat(null) // NaN
Number(null) // 0

parseFloat('') // NaN
Number('') // 0

parseFloat('123.45#') // 123.45
Number('123.45#') // NaN

```

##字符串

如果长字符串必须分成多行，可以在每一行的尾部使用反斜杠。
一个字符串分成三行，JavaScript就会报错。

```javascript
var longString = "Long \
long \
long \
string";

>"Long long long string"

//这种写法有两个注意点，首先，它是ECMAScript 5新添加的，老式浏览器（如IE 8）不支持，
//其次，反斜杠的后面必须是换行符，而不能有其他字符（比如空格），否则会报错。

// 可以用连接符来连接字符串
var longString = "Long " + 
"long " +
"long " +
"string";

>"Long long long string"

// 如果非特殊字符前面使用反斜杠，则反斜杠会被省略。
"\a" 
// "a"

"Prev \\ Next"
// "Prev \ Next"
```

>字符串与数组

字符串可以被视为字符数组，因此可以使用数组的方括号运算符，用来返回某个位置的字符（从0开始）。

```javascript
var s = 'hello';

s[0] // "h"
s[1] // "e"
s[4] // "o"

'hello'[1] // "e"

// 如果方括号中的数字超过字符串的范围，或者方括号中根本不是数字，则返回undefined。
'abc'[3] // undefined
'abc'[-1] // undefined
'abc'["x"] // undefined
```

**字符串与数组的相似性仅此而已。实际上，字符串是类似数组的对象，且无法改变字符串之中的单个字符及字符串长度**

>Base64转码

Base64是一种将二进制数据转为可打印字符的编码方法。在浏览器环境中，JavaScript原生提供两个方法，用来处理Base64转码：btoa方法将字符串或二进制值转化为Base64编码，atob方法将Base64编码转化为原来的编码。

```javascript
window.btoa("Hello World")
// "SGVsbG8gV29ybGQ="

window.atob("SGVsbG8gV29ybGQ=")
// "Hello World"

// 这两个方法不适合非ASCII码的字符，浏览器会报错。
window.btoa('你好') //系统出错

// 要将非ASCII码字符转为Base64编码，必须中间插入一个浏览器转码的环节，再使用这两个方法。

function b64Encode( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}
 
function b64Decode( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}

// 使用方法
b64Encode('你好') // "5L2g5aW9"
b64Decode('5L2g5aW9') // "你好"

```

##对象

对象（object）是JavaScript的核心概念，也是最重要的数据类型。JavaScript的所有数据都可以被视为对象。

```javascript
// 创建对象的方法
var o1 = {};    // 采用大括号的写法比较简洁
var o2 = new Object();  // 采用构造函数的写法清晰地表示了意图
var o3 = Object.create(null);   // 写法一般用在需要对象继承的场合
```

```javascript
// 读取对象属性的方法：
var o = {
    p: function() {},
    1.7: 'hello world'
};

o.p();
o['p']
o.['1.7']
o[1.7]

// 如果读取一个不存在的键，会返回undefined，而不是报错。可以利用这一点，来检查一个变量是否被声明。

// 检查a变量是否被声明

if(a) {...} // 报错

(1).if(window.a) {...} // 不报错
(2).if(window['a']) {...} // 不报错
// (1)和(2)都存在漏洞，如果a属性是一个空字符串（或其他对应的布尔值为false的情况），则无法起到检查变量是否声明的作用。
// 正确的写法是使用in运算符。
if('a' in window) {
    //...
}

// 对象可以查看所有的属性
var o = {
    key1: 1,
    key2: 2
};

Object.keys(o); //方法Object.keys()可以查看对象的所有属性
// ["key1", "key2"]

// 删除对象的属性
var o = { p:1 };

Object.keys(o) // ["p"]

delete o.p // true

o.p // undefined

Object.keys(o) // []

//麻烦的是，如果删除一个不存在的属性，delete不报错，而且返回true。
var o = {};

delete o.p // true

// 上面代码表示，delete命令只能用来保证某个属性的值为undefined，而无法保证该属性是否真的存在。
// 只有一种情况，delete命令会返回false，那就是该属性存在，且不得删除。
var o = Object.defineProperty({}, "p", {
        value: 123,
        configurable: false
});

o.p // 123
delete o.p // false

```
**需要注意的是，delete命令只能删除对象本身的属性，不能删除继承的属性，delete命令也不能删除var命令声明的变量，只能用来删除属性。**

>in运算符

in运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值），如果包含就返回true。

```javascript
var o = { p: 1 };
'p' in o // true

// 该运算符对数组也适用。
var a = ["hello", "world"];

0 in a // true
1 in a // true
2 in a // false

'0' in a // true
'1' in a // true
'2' in a // false

// in运算符对继承的属性也有效。
var o = new Object();

o.hasOwnProperty('toString') 
// false

'toString' in o 
// true

//上面代码中，toString方法是对象o的继承属性，hasOwnProperty方法可以说明这一点，而in运算符对继承的属性也返回true。
```

>for...in循环

for...in循环遍历的是对象所有可enumberable的属性，其中不仅包括定义在对象本身的属性，还包括对象继承的属性。

```javascript
function Person(name) {
    this.name = name;
}
Person.prototype.describe = function () {
    return 'Name: '+this.name;
};

var person = new Person('Jane');
for (var key in person) {
    console.log(key);
}
// name
// describe

// 如果只想遍历对象本身的属性，可以使用hasOwnProperty方法，在循环内部做一个判断。
for (var key in person) {
    if (person.hasOwnProperty(key)) {
        console.log(key);
    }
}
// name

```

>类似数组的对象

在JavaScript中，有些对象被称为“类似数组的对象”（array-like object）。意思是，它们看上去很像数组，可以使用length属性，但是它们并不是数组，所以无法使用一些数组的方法。

```javascript
var a = {
    0:'a',
    1:'b',
    2:'c',
    length:3
};

a[0] // 'a'
a[2] // 'c'
a.length // 3

// 典型的类似数组的对象是函数的arguments对象，以及大多数DOM元素集，还有字符串。

// arguments对象
function args() { return arguments }
var arrayLike = args('a', 'b');

arrayLike[0] // 'a'
arrayLike.length // 2
arrayLike instanceof Array // false

// DOM元素集
var elts = document.getElementsByTagName('h3');
elts.length // 3
elts instanceof Array // false

// 字符串
'abc'[1] // 'b'
'abc'.length // 3
'abc' instanceof Array // false

// 通过函数的call方法，可以用slice方法将类似数组的对象，变成真正的数组。
var arr = Array.prototype.slice.call(arguments);

// for循环
function logArgs() {
    for (var i=0; i<arguments.length; i++) {
        console.log(i+'. '+arguments[i]);
    }
}

// forEach方法
function logArgs() {
    Array.prototype.forEach.call(arguments, function (elem, i) {
        console.log(i+'. '+elem);
    });
}

```