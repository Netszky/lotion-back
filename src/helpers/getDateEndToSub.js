
const getDateEndToSub = (createdDate) => {
    const unixTimestamp = createdDate

    const milliseconds = unixTimestamp * 1000
    
    const dateObject = new Date(milliseconds)
    
    const humanDateFormat = dateObject.toLocaleString()

    return humanDateFormat
}

module.exports = getDateEndToSub