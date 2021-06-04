/* eslint-disable semi */
/* eslint-disable quotes */
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");
console.log(contactsPath);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);
    console.table(parsedData);
  } catch (e) {
    console.error(e);
  }
}
listContacts();
