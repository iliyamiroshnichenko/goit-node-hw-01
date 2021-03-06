/* eslint-disable semi */
/* eslint-disable quotes */
const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (e) {
    console.error(e);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const contact = contacts.filter(({ id }) => id === Number(contactId));
    console.table(contact);
  } catch (e) {
    console.error(e);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(
      ({ id }) => id !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    console.log(`Contact #${contactId} was removed`);
    console.table(updatedContacts);
  } catch (e) {
    console.error(e);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: uid(),
    name,
    email,
    phone,
  };
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    console.log(
      `New contact with name ${name}, email ${email}, phone ${phone} was added`
    );
    console.table(updatedContacts);
  } catch (e) {
    console.error(e);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
