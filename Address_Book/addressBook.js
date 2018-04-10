function displayStart() {
    var formContact = document.getElementsByClassName('form_contact')[0];
    var showContacts = document.getElementsByClassName('showContacts-sect')[0];
    var usersObject = userObjectDetails();
    var showAllContact = showAllContacts(usersObject);
    var username = "";
    for (var user in usersObject) {
        username = usersObject[user].Username;
        break;
    }
    var showFirstUser = showContact(usersObject, username, "show");
    if (objectLen(usersObject) > 0) {
        formContact.innerHTML = showAllContact;
        showContacts.innerHTML = showFirstUser;
    } else {
        formContact.innerHTML = createContactDiv();
        showContacts.innerHTML = noShowContacts();
    }
    monitorInput();
}

function changeContactColor(action) {
    if (typeof (Storage) !== undefined) {
        localStorage.oyelsonColor = JSON.stringify(colorObject(2, 255));
        console.log(localStorage.oyelsonColor);
    }
}

function monitorInput() {
    var any_input = document.getElementsByTagName('input');
    any_input[0].focus();
    for (var i = 0; i < any_input.length; i++) {
        any_input[i].onkeyup = function () {
            this.style.border = "2px solid rgb(0, 128, 255)";
            this.style.boxShadow = " 0px 4px 8px 0px rgba(0, 128, 255, 0.2)";
        };
        any_input[i].onfocus = function () {
            this.style.border = "2px solid rgb(0, 128, 255)";
            this.style.boxShadow = " 0px 4px 8px 0px rgba(0, 128, 255, 0.2)";
        };
        any_input[i].onblur = function () {
            this.style.border = "";
            this.style.boxShadow = "";
        }
    }
}

function editUser(editID) {
    var username = editID.id.split('_______')[0];
    var usersObject = userObjectDetails();
    var showUser = showContact(usersObject, username, "edit");
    var showContacts = document.getElementsByClassName("showContacts-sect")[0];
    showContacts.innerHTML = showUser;
    monitorInput();
}

function searchContacts(search_user) {
    var search_value = search_user.value;
    var search_no = document.getElementsByClassName("search-no")[0];
    var search_box = document.getElementsByClassName("search-box")[0];
    search_no.style.width = "100px";
    search_box.style.width = "250px";
    var search_div = document.getElementsByClassName("search-div")[0];
    search_div.className = search_div.className.split(" ")[0] + " flex-row-btw";
    if(search_value.trim() != ""){
        var count = countUser(search_value);
        search_no.innerHTML = count;
    } else {
        goBack();
        search_no.innerHTML = "";
        search_box.focus();
    }
    monitorInput();
    monitorSearch();
}

function getWidth(sections_width) {
    sections_width = sections_width.split('');
    sections_width.splice(sections_width.length - 2, sections_width.length);
    sections_width = Number(sections_width.join(''));
    return sections_width;
}

function dispContact(user) {
    var username = user.id;
    var usersObject = userObjectDetails();
    var showAllContact = showAllContacts(usersObject);
    var formContact = document.getElementsByClassName('form_contact')[0];
    formContact.innerHTML = showAllContact;
    var showUser = showContact(usersObject, username, "show");
    var showContacts = document.getElementsByClassName("showContacts-sect")[0];
    showContacts.innerHTML = showUser;
    monitorInput();
}

function renewContact() {
    var usersObject = userObjectDetails();
    var showAllContact = showAllContacts(usersObject);
    var formContact = document.getElementsByClassName('form_contact')[0];
    formContact.innerHTML = showAllContact;
}

function monitorSearch() {
    var search_box = document.getElementsByClassName('search-box')[0];
    search_box.onblur = function() {
        search_box.style.width = "100%";
        document.getElementsByClassName('search-no')[0].style.display = "none";
    }
}

function goBack(){
    var formContact = document.getElementsByClassName('form_contact')[0];
    formContact.innerHTML = "";
    var usersObject = userObjectDetails();
    var showAllContact = showAllContacts(usersObject);
    formContact.innerHTML = showAllContact;
    var search_box = document.getElementsByClassName("search-box")[0];
    search_box.focus();
    monitorInput();
}

function showContactForm() {
    var formContact = document.getElementsByClassName('form_contact')[0];
    formContact.innerHTML = "";
    formContact.innerHTML = createContactDiv(true);
    monitorInput();
}

function removeModal() {
    var modal = document.getElementsByClassName('del-modal')[0];
    modal.style.display = "none";
}

function delUser(user) {
    var user_id = user.id.split('_______')[0];
    var user_div = user_id + "_______user";
    localStorage.removeItem(user_id + "!_______oyelson");
    document.getElementById(user_div).style.display = "none";
    removeModal();
    displayStart();
}

function confirmDel(user) {
    var user_id = user.id.split('_______')[0];
    var user_modal = user_id + '_______modal';
    var del_cont = '\
    <div class="del-modal "'+ user_modal +' id="'+ user_modal +'">\
        <div class="del-cont" >\
            Are you sure you want to delete this contact?\
            <div class="flex-row-btw confirm-div">\
                <button class="confirm no" onclick="removeModal()">NO</button>\
                <button class="confirm yes" id="'+ user_id +'_______delete" onclick="delUser(this)">YES</button>\
            </div>\
        </div >\
    </div >\
    ';
    var showContacts = document.getElementsByClassName('showContacts-sect')[0];
    var previousHTML = showContacts.innerHTML;
    showContacts.innerHTML = del_cont + previousHTML;
    var modal = document.getElementsByClassName('del-modal')[0];
    modal.onclick = function(e) {
        if(e.target == this) {
            this.style.display = "none";
        }
    };
}

function countUser(search_value) {
    var usersObject = userObjectDetails();
    var count = 0;
    var search_pos = -1;
    for (var user in usersObject) {
        var fullName = usersObject[user].Full_name;
        var username = usersObject[user].Username;
        var regX = new RegExp(search_value.trim(), "ig");
        var search_pos = fullName.search(regX);
        if (search_pos > -1) {
            var regX_value = fullName.substr(search_pos, search_value.trim().length);
            document.getElementById(username).style.display = "block";
            fullName = fullName.replace(regX, "<span class='regX'>" + regX_value + "</span>");
            document.getElementById(username + "_______search").innerHTML = fullName;
            count++;
        } else {
            document.getElementById(username).style.display = "none";
        }
    }
    if (count > 0) {
        return count + " found";
    } else {
        return "No contacts";
    }
}

function validateForm(change, usertype) {
    var submit = true;
    if(change == "add") {
        var contact_form = document.forms["form_add"];
    } else {
        var contact_form = document.forms["form_edit"];
    }
    var fullName = contact_form["Full_name"];
    var username = contact_form["Username"];
    var home_address = contact_form["Home_address"];
    var mobile_number = contact_form["Mobile_number"];
    var email_address = contact_form["Email_address"];
    var gender = contact_form["Gender"];
    var required_arr = [fullName, username, mobile_number, email_address, gender];
    monitorInput();
    for(var detail in required_arr) {
        if(required_arr[detail].value.trim() == null || required_arr[detail].value.trim() == "") {
            required_arr[detail].focus();
            required_arr[detail].style.fontSize = "15px";
            var name = required_arr[detail].name;
            name = name.split('_');
            var output = "";
            for(var i in name) {
                output += name[i];
                if(i < name.length - 1) output += " ";
            }
            required_arr[detail].placeholder = output + " cannot be empty";
            required_arr[detail].style.border = "2px solid rgb(255, 128, 128)";
            required_arr[detail].style.boxShadow = "0px 0px 4px 2px rgba(255, 128, 128, 0.8)";
            submit = false;
            break;
        }
    }
    var userExist = false;
    if(submit) {
        userExist = addEditContact(contact_form, change, usertype);
        if(userExist) {
            if(change == "add") {
                var add_error = document.getElementsByClassName('add_error')[0];
                add_error.style.display = "block";
                add_error.innerHTML = " Sorry, this user exist!!!";
            } else {
                var edit_error = document.getElementsByClassName('edit_error')[0];
                edit_error.style.display = "block";
                edit_error.innerHTML = " Sorry, "+username.value.trim()+ " already exist!!!";
            }
        }
        else {
            if(change == "add") {
                displayStart();
            } else if(change == "edit") {
                var user = {id: username.value.trim()};
                dispContact(user);
                renewContact();
            }
        }
    }
    return submit;
}

function addEditContact(contact_form, change, usertype) {
    var userExist = false;
    if (typeof(Storage) !== undefined) {
        var fullName = contact_form["Full_name"].value.trim();
        var username = contact_form["Username"].value.trim();
        var mobile_number = contact_form["Mobile_number"].value.trim();
        var email_address = contact_form["Email_address"].value.trim();
        var home_address = contact_form["Home_address"].value.trim();
        var gender = contact_form["Gender"].value.trim();
        var usersObject = userObjectDetails();
        if (change == "add" && usertype == "new_user") {
            for(var user in usersObject) {
                if(usersObject[user].Username == username) {
                    userExist = true;
                    break;
                }
            }
            if(!userExist) {
                localStorage.setItem(username + "!_______oyelson", "Full_name:" + fullName + "|Username:" + username + "|Gender:" + gender + "|Mobile_number:" + mobile_number + "|Home_address:" + home_address + "|Email_address:" + email_address);
            }
        } 
        else if(change == "edit") {
            var usertype = usertype.id.split('_______')[0];
            for(var user in usersObject) {
                if (usersObject[user].Username == usertype && username == usertype) {
                    userExist = false;
                }
                if (usersObject[user].Username == username && username != usertype) {
                    userExist = true;
                    break;
                }
            }
            if(!userExist) {
                localStorage.removeItem(usertype + "!_______oyelson");
                localStorage.setItem(username + "!_______oyelson", "Full_name:" + fullName + "|Username:" + username + "|Gender:" + gender + "|Mobile_number:" + mobile_number + "|Home_address:" + home_address + "|Email_address:" + email_address);
            }
        }
    } else {
        alert("sorry, this app cannot function because your browser does not have LOCALSTORAGE!!!");
    }
    return userExist;
}