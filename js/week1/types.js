
// Open the browser console. Before running each, predict: typeof null, typeof [], typeof {}, typeof​
// ​ aN, typeof function(){}, 0 == false, '' == false, null == undefined, null === undefined, NaN === NaN,​
// N
// ​1 + '2', '3' - 1, true + true, [] + [], [] + {}
// ​ 98.​
// 2
// ​299.​
// ​For every wrong prediction, write a one-sentence explanation of why JS behaves that way​
// ​Create types.js and log the typeof of one value for each primitive type plus object and function​


console.log(typeof(null))
// prediction : object 

console.log(typeof(1))
// prediction : number

console.log(typeof(NaN))
// prediction :  NaN , output : number 
// reason : Nan stands for 'not a number' - its a special numberic data type

console.log(typeof('s'))
// prediction : string

console.log(typeof(true))
// pediction : boolean 

console.log(typeof(0.014))
// prediction : float

console.log(typeof(NaN==NaN))
//prediction : boolean

console.log(typeof(undefined))
//prediction : undefined

console.log(typeof(function(){}))
//prediction : function

console.log(typeof([]))
//prediction : object

console.log(typeof(11n))
// prediction : bigint