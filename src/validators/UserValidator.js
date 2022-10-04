import UserError from "../models/UserError";
import isDateBeforeToday from "./generic/isDateBeforeToday";
import isEmptyValidator from "./generic/isEmpty";
import isValidEmail from "./generic/isValidEmail";

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
    else if(!isValidEmail(user.email)) errors.addErrorToEmail('Email is invalid')

    //dob
    if(isEmptyValidator(user.dob)) errors.addErrorToDob('Date of birth is empty')
    if(!isDateBeforeToday(user.dob)) errors.addErrorToDob('Date of birth is in the future. How does that work?')  

    //sex
    if(isEmptyValidator(user.isMale)) errors.addErrorToIsMale('Sex is empty')

    return errors
}