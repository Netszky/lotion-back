
const getDateEndToSub = (createdDate) => {
    console.log("Je suis dans la fonction");
    const dateCreated = new Date(createdDate);

    const date = new Date();
    
    const month = dateCreated.getMonth();
    
    let day = date.getDate();
    
    const newDate = new Date(`${month + 2}-${day }`)
    
    console.log("Je suis newDate = ",newDate)
}

module.exports = getDateEndToSub