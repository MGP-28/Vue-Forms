export default class UserError{
    constructor(){
        this.name = []
        this.email = []
        this.dob = []
        this.isMale = []
    }
    addErrorToName(error){
        this.name.push(error)
    }
    addErrorToEmail(error){
        this.email.push(error)
    }
    addErrorToDob(error){
        this.dob.push(error)
    }
    addErrorToIsMale(error){
        this.isMale.push(error)
    }
    hasErrors(){
        if( this.name.length == 0 
            && this.email.length == 0 
            && this.dob.length == 0 
            && this.isMale.length == 0)
        {
            return false
        }
        return true
    }
}