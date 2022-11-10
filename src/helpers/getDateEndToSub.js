
const getDateEndToSub = (createdDate) => {
    console.log("Je le params createdDate = ",createdDate);
    const dateCreated = new Date(createdDate);

    console.log("Je suis dateCreated = ",dateCreated);

    const date = new Date();

    console.log("Je suis date = ",date);
    
    const month = dateCreated.getMonth();

    console.log("Je suis month = ",month);
    
    let day = date.getDate();

    console.log("Je suis date = ",date);
    
    const newDate = new Date(`${month + 2}-${day}`)
    
    console.log("Je suis newDate = ",newDate)
}

module.exports = getDateEndToSub