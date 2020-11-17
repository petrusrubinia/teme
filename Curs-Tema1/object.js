var animal={
    type: "cat",
    name: "Naruto",
    weight: 4,
    action: ()=> {
        console.log(this.type);
        console.log(this.name);
        console.log(this.weight);
    }
    
  
};
console.log(animal.type);
console.log(animal.weight);
console.log(animal.name);

function displayMyName(name){
    return "Buna, numele meu este " + name + "\n";
}
document.getElementById("myName").innerHTML = displayMyName("Rubinia");




