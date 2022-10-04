export default function isDateBeforeToday(dateInput) {
    const date = new Date(dateInput)
    if(date.getTime() <= Date.now()) return true
    return false
}