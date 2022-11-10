
const getDateEndToSub = (createdDate) => {
    const today = new Date()

    const unixTimestamp = 1668074443 
    
    const milliseconds = unixTimestamp * 1000
    
    const dateObject = new Date(milliseconds)
    
    const humanDateFormat = dateObject
    
    //mois actuel + 1
    var month = today.getUTCMonth() + 2; //months from 1-12
    //Jour de la creation de l'abonnement
    var day = humanDateFormat.getUTCDate();
    
    var year = today.getUTCFullYear();


    return new Date(year, month, day)
}

module.exports = getDateEndToSub