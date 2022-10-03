export default class UserError{
    constructor(){
        this.name = []
        this.email = []
        this.dob = []
        this.isMale = []
    }
    addErrorToName(error){
        this.name.append(error)
    }
    addErrorToEmail(error){
        console.log(error)
        this.email.append(error)
    }
    addErrorToDob(error){
        this.dob.append(error)
    }
    addErrorToIsMale(error){
        this.isMale.append(error)
    }
}