import Person from './person.js'
export default class Employee extends Person{
    constructor(data, functie, salar){
        super(data);
        this.functie = functie;
        this.salar = salar;
    }

    getAge(){
        return this.varsta;
    }

    getJob(){
        return this.job + " " + this.functie;
    }

    getNickname(){
        return "Ionelas";
    }

}