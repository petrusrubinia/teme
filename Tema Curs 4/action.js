import Employee from './models/employee.js'
import Person from './models/person.js'

var employee = new Employee({nume: "Ionel", porecla: "Messi", varsta: "33", sex: "M", job:"Programator"}, "Junior", "1000");
var employee2 = new Employee({nume: "Pop", porecla: "Maria", varsta: "27", sex: "F", job: "Programator"}, "Senior", "4000");

console.log(employee.getFullInfo());
console.log(employee2.getFullInfo());
console.log(employee.getNameAndNickname());
console.log(employee2.getNameAndNickname());

var arr =  [1 ,-2, 6, -7,10, 9, 14, true, false, null, undefined];

//Filtrati array-ul astfel incat sa obtineti doar valorile numerice
var justNumbers = (param) => typeof param === 'number';
var numbers = arr.filter(justNumbers);
console.log(numbers);

//Modificați array-ul rezultat înmulțind fiecare valoare cu 10.
var multiplication = (number) => number * 10;
var multipliedNumbers = numbers.map(multiplication);
console.log(multipliedNumbers);

//Afișați suma tuturor numerelor rezultate într-o variabila result
var result = multipliedNumbers.reduce((sum, val) => val+ sum, 0);
console.log(result);