export default function isEmptyValidator(term) {
    if(term === null || term === '' || term === undefined) return true
    return false
}