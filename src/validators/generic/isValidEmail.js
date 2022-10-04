export default function isValidEmail(email) {
    const regexEmail = /\S+@\S+\.\S+/
    return regexEmail.test(email)
}