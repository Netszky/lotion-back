
const getDateEndToSub = (createdDate) => {
    const dateCreated = new Date(createdDate);

    const date = new Date();
    
    const month = dateCreated.getMonth();
    
    let day = date.getDate();
    
    const newDate = new Date(`${month + 2}-${day }`)
    
    console.log(newDate)
}

module.exports = getDateEndToSub