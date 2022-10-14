export default class User{
    constructor(user = null){
        if(user == null) return
        this.name = user.name
        this.email = user.email
        this.dob = user.dob
        this.isMale = user.isMale
        this.image = user.image
    }
}