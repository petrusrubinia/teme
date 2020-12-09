export default class Person{
    constructor(data)
    {
        this.nume = data.nume;
        this.porecla = data.porecla;
        this.varsta = data.varsta;
        this.sex = data.sex;
        this.job = data.job;
    }

    getFullInfo(){ //generic method
        return this.nume + " Age: " + this.varsta + " Job: " + this.getJob();
    }

    getJob(){
        return this.job;
    }

    getNameAndNickname(){ //generic method
        return this.nume + " " + this.getNickname();
    }

    getNickname(){
        return this.porecla;
    }


}
