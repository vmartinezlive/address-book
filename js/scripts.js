//BUSINESS LOGIC FOR THE ADDRESSBOOK

function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id === id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]){
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

AddressBook.prototype.updateContact = function(id, propertyToUpdate, valueToUpdate) {
  for ( var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id === id) {
        var contactToUpdate = this.contacts[i];
        contactToUpdate[propertyToUpdate] = valueToUpdate;
        return true;
      }
    }
  };
  return false;
}

// BUSINESS LOGIC FOR CONTACTS
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}

Contact.prototype.fullname = function() {
  return this.firstName + " " + this.lastName;
}





$(document).ready(function() {
  $("form#testForm").submit(function(event) {
    event.preventDefault();
    console.log("Hello, World.");

  });
});
