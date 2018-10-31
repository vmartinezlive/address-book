
//Objects within Objects
//Example to create relationshhips among objects. use properties whose valies are arraus pf the objects:
// var pdx = { name: "Portland" };
// var sfo = { name: "San Francisco" };
// var sea = { name: "Seattle" };
//
// var usa = { name: "United States of America", cities: [pdx, sfo, sea] };

// For consistency when using similar objects, use an empty array rather than not defining the property:
// var uruguay = { name: "Uruguay", cities: [] };
// Add more objects to the array property:
// var mlz = { name: "Melo" };
// uruguay.cities.push(mlz);

// Business Logic for AddressBook
function AddressBook() {
  this.contacts = [],
  this.currentID = 0  //code so each Contact is assigned an ID as soon as its created. it will have a currentId property that begins at 0.
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId(); // this creates an id property on a Contact object, and assisgns it a unique ID
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

// Notice it takes an id as an argument. This will contain the unique ID we assigned to each Contact in the previous lesson.
// The method then loops through the AddressBook object's contacts array, checking each entry's id against the id provided to the findContact() method as an argument.
// When a match is found, the method returns the Contact object with that specific id.

//Finding contacts
AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i].id === id) {
      return this.contacts[i];
    }
  };
  return false;
}
//This new method will increment the this.currentId property on the AddressBook object by 1 and return the updated value. This mimics a database by creating sequentially incrementing ID values which are never repeated (making them unique).
//Finally, we need to call this new assignId() method whenever we add a new Contact to the AddressBook. We already have a method called addContact() that handles this. We'll just add the following code to it:
  AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id === id) {
        delete this.contacts[i];
        return true;
    }
  }
};
return false;
}

//Business Logic for Contacts
// // above we creadt a constructor in js
//to test above type following to console var testContact = new Contact("Ada", "Lovelace", "503-555-1111");
//Contact {firstName: "Ada", lastName: "Lovelace", phoneNumber: "503-555-1111"}
// Business Logic for AddressBook ---------
function Contact(firstName, lastName, phoneNumber, emailAddress, physicalAddress) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
  this.emailAddress = emailAddress
  this.physicalAddress = physicalAddress
}
//creating prototype method on our constructor:
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

//User Interface Logic
var addressBook = new AddressBook();


//displaying dynamicc contact database
//This method will display Contact info in the DOM; hence its name. It takes an AddressBook object as an argument. Also, notice we're not plopping it directly into the block of code with our form submission listener.
function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    console.log("The if of this <li> is " + this.id + ".");
  });
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".physical-address").html(contact.physicalAddress);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
  buttons.hide("<button class='hideeButton' id=" +  + contact.id + ">Hide</button>");
}


$(document).ready(function() {
  attachContactListeners();
  //jQuery for an event listener would go here.
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("inputted#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputterPhysicalAddress = $("input#new-physical-address").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputterPhysicalAddress, inputtedEmailAddress);

    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
