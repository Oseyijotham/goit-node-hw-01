const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");




async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const allData = JSON.parse(data);

    console.table(allData);
  } catch (error) {
    console.error("Error reading or parsing contacts:", error);
  }
}



async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const allData = JSON.parse(data);

    const bestMatch = allData.filter((contact) => contact.id === contactId);

    if (bestMatch.length === 0) {
      console.log(`No contact found with ID: ${contactId}`);
    } else {
      console.log(`Recovered contact with ID:${contactId}`)  
      console.table(bestMatch);
    }
  } catch (error) {
    console.error("Error reading or parsing contacts:", error);
  }
}



async function removeContact(contactId) {
    try {
    const data = await fs.readFile(contactsPath);
    const allData = JSON.parse(data);
    const myIndex = allData.findIndex((contact) => contact.id === contactId);
    allData.splice(myIndex, 1); 
      if (myIndex === -1) {
        console.log(`Contact with ID: ${contactId} not found.`);
        return;
        }  
      await fs.writeFile(contactsPath, JSON.stringify(allData, null, 2));
        console.log(`Contact with ID ${contactId} has been removed.`);  

         console.table(allData);
   }
   catch (error) {
    console.error("Error reading or parsing contacts:", error);
  }
    
}



async function addContact(name, email, phone) {
    try {
     const data = await fs.readFile(contactsPath);
     const allData = JSON.parse(data);  
        const newEntry = {
          id: JSON.stringify(parseInt(allData[allData.length - 1].id) + 1),
          name,
          email,
          phone,
        };  
        if (name === undefined || email === undefined || phone === undefined) {
            console.log("Enter all feilds!!!");
            return;
        }
        allData.push(newEntry); 
        console.log(`A new Contact with ID:${newEntry.id} has been added.` )
        console.table(allData);
     await fs.writeFile(contactsPath, JSON.stringify(allData, null, 2));   
    }
    catch (error) {
     console.error("Error reading or parsing contacts:", error);
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact };