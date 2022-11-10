
const getDateEndToSub = (createdDate) => {
    console.log("Je le params createdDate = ",createdDate);
    const dateCreated = new Date(createdDate);

    console.log("Je suis dateCreated = ",dateCreated);

    const date = new Date();

    console.log("Je suis today = ",today);
    
    const month = dateCreated.getMonth();
    
    let day = date.getDate();
    
    const newDate = new Date(`${month + 2}-${day}`)
    
    console.log("Je suis newDate = ",newDate)
}

module.exports = getDateEndToSub