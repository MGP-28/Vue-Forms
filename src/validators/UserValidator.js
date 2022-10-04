import UserError from "../models/UserError";
import isEmptyValidator from "./generic/isEmpty";

/**
 * 
 * @param {User} user 
 */

export default function UserValidator(user) {
    let errors = new UserError()
    //Name
    if(isEmptyValidator(user.name)) errors.addErrorToName('Name is empty')

    //email
    if(isEmptyValidator(user.email)) errors.addErrorToEmail('Email is empty')

    //dob
    if(isEmptyValidator(user.dob)) errors.addErrorToDob('Date of birth is empty')  

    //sex
    if(isEmptyValidator(user.isMale)) errors.addErrorToIsMale('Sex is empty')

    return errors
}