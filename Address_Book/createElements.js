function showContact(usersObject, username, change) {
    var userDiv = "";
    var imgSrc = "";
    for(var user in usersObject) {
        var userID = usersObject[user].Username;
        if(userID == username){
            var fullName = usersObject[user].Full_name;
            var username = usersObject[user].Username;
            var mobile = usersObject[user].Mobile_number;
            var gender = usersObject[user].Gender;
            var email_address = usersObject[user].Email_address;
            var home_address = usersObject[user].Home_address;
            if (gender == "Male" || gender == "male") {
                imgSrc = "images/Blank-profile-picture-male.jpg";
            } else if (gender == "Female" || gender == "female") {
                imgSrc = "images/Blank-profile-picture-female.png";
            } else {
                imgSrc = "images/neutral-human.jpg";
            }
            userDiv += '\
            <div class="contact-show" id="'+ userID + '_______user">\
                <div class="del-save-edit span-100 flex-row-btw ">\
                    ';
                if(change == "edit") {
                    userDiv += '<button type="submit" class="pic-btn pic-save" id="' + userID + '_______save" form="edit-form" onclick="validateForm(\'edit\', this);">Save</button>';
                    userDiv += "<form action='' id='edit-form' name='form_edit' class='"+ userID +"' onsubmit='return false;'></form>"
                } else {
                    userDiv += '<button class="pic-btn pic-edit" id="' + userID + '_______edit" onclick="editUser(this)">Edit</button>';
                }

            userDiv +='\
                    <button class="pic-btn pic-del" id="'+ userID + '_______del" onclick="confirmDel(this)">Delete</button >\
                </div>\
                <div class="personal flex-row-start">\
                    <div class="contact-img-div">\
                        <img src="'+ imgSrc + '" class="contact-img" alt="' + fullName + '\'s image" width="100" height="100">\
                    </div>\
                    <div class="name-div">\
                        <span class="name">\
                         ';
                    if (change == "edit") {
                        userDiv += '<input type="text" name="Full_name" placeholder="Full name" value="' + fullName +'" class="editUser" form="edit-form" autofocus>';
                    } else {
                        userDiv += fullName;
                    }
            userDiv +='\
                        </span>\
                    </div>\
                </div>\
                <div class="contact-info">\
                    <div class="info">\
                        <span class="info-main">Mobile Number</span>\
                        ';
                    if (change == "edit") {
                        userDiv += '<input type="text" name="Mobile_number" placeholder="Mobile number" value="' + mobile +'" class="editUser" form="edit-form" />';
                    } else {
                        userDiv += '<p class="info-sub">'+ mobile + '</p>';
                    }
            userDiv +='\
                    </div>\
                    <div class="info">\
                        <span class="info-main">Username </span><span class="edit_error"></span>\
                         ';
                    if (change == "edit") {
                        userDiv += '<input type="text" name="Username" placeholder="Username" value="' + username + '" class="editUser" form="edit-form"/>';
                    } else {
                        userDiv += '<p class="info-sub">' + username + '</p>';
                    }
            userDiv +='\
                    </div>\
                    <div class="info">\
                        <span class="info-main">Gender</span>\
                         ';
                    if (change == "edit") {
                        userDiv += '\
                            <input type="radio" name="Gender" value="Male"\ class="radio editUser" form="edit-form" \
                            ';
                        if (gender == "Male") {
                            userDiv += 'checked';
                        }
                        userDiv += '> Male | \
                        <input type="radio" name="Gender" value="Female"\ class="radio editUser" form="edit-form" \
                        ';
                        if (gender == "Female") {
                            userDiv += 'checked';
                        }
                        userDiv += '> Female';
                    } else {
                        userDiv += '<p class="info-sub">' + gender + '</p>';
                    }
            
                    userDiv += '\
                    </div>\
                    <div class="info">\
                        <span class="info-main">Email Address</span>\
                          ';
                    if (change == "edit") {
                        userDiv += '<input type="text" name="Email_address" placeholder="Email address" value="' + email_address +'" class="editUser" form="edit-form" />';
                    } else {
                        userDiv += '<p class="info-sub">' + email_address + '</p>';
                    }
            userDiv +='\
                    </div>\ ';
            if (usersObject[user].Home_address != "") {
                userDiv += '\
                    <div class="info">\
                        <span class="info-main">Home Address</span>\
                         ';
                    if (change == "edit") {
                        userDiv += '<input type="text" name="Home_address" placeholder="Home address" value="' + home_address + '" class="editUser" form="edit-form" />';
                    } else {
                        userDiv += '<p class="info-sub">' + home_address + '</p>';
                    }
                userDiv +='\
                    </div>\
                    ';
            } else {
                if (change == "edit") {
                    userDiv += '\
                    <div class="info">\
                        <span class="info-main">Home Address</span>\
                        <input type="text" name="Home_address" placeholder="Home address" class="editUser" form="edit-form" />\
                    </div>\
                        ';
                }
            }
            userDiv += '</div>';
            break;
        }
    }
    userDiv += '</div>';
    return userDiv;
}

function showAllContacts(usersObject) {
    var no_of_users = '';
    var no_users = 0;
    if (objectLen(usersObject) > 0){
        no_users = objectLen(usersObject);
        no_of_users = (no_users > 1) ? no_users+" contacts" : no_users+" contact";
        
    }
    var showAll = '\
        <h1 class="header-see flex-row-btw">\
            <span>Contacts</span>\
            <button class="add" onclick="showContactForm();">Add</button>\
        </h1 >\
        <div class="search-div flex-row-center">\
             <input type="search" class="search-box" oninput="searchContacts(this)" placeholder="Search '+ no_of_users +'" autofocus>\
            <div class="search-no" style="font-size:16px;"></div>\
        </div>\
        <div id="add_show_contacts">\
             <div id="all-contacts">\
        ';
    if(typeof(Storage) !== undefined) {
        if(localStorage.oyelsonColor !== undefined) {
            var color = JSON.parse(localStorage.oyelsonColor);
        } else {
            localStorage.oyelsonColor = JSON.stringify(colorObject(2, 255));
            var color = colorObject(2, 255);
        }
    }
    for(var user in usersObject) {
        var fullName = usersObject[user].Full_name;
        var Username = usersObject[user].Username;
        var initial = fullName[0].toUpperCase();
        showAll += '\
                <div class="each-contact flex-row-start" id="'+ Username +'"  onclick="dispContact(this);">\
                    <div class="each-sub-name" style="background:'+ color[initial] +'"><div class="sub-name">'+ initial +'</div></div>\
                    <div class="each-full-name flex-col-center">\
                        <span id="'+ Username +'_______search">'+ fullName +'</span>\
                    </div>\
                </div>\
        ';
    }
    showAll += '</div >\
        </div >\
    ';
    return showAll;
}

function noShowContacts() {
    var no_show_contacts = '<div class="disp-contact">\
                                <div style="text-align:center; color: #fff">No contacts added</div>\
                            </div>\
    ';
    return no_show_contacts;
}

function createContactDiv(back=false) {

    var createCont = '\
        <h1 class="header-add flex-row-btw">\
        ';
        if(back){
            createCont += '<span class="back" onclick="goBack();">&#10094;</span>';
        }
        createCont += '\
            <span>Create Contact</span>\
        </h1>\
        <form action="" id="form-add" name="form_add" onsubmit="return false;">\
            <div class="create-info">\
                <label>Full name:</label>\
                <input type="text" name="Full_name" placeholder="Full name" autofocus>\
            </div>\
            <div class="create-info">\
                <label>Username:</label><span class="add_error"></span>\
                <input type="text" name="Username" placeholder="Username">\
            </div>\
            <div class="create-info">\
                <label>Gender:</label>\
                <div class="flex-row-start">\
                    <input type="radio" name="Gender" class="radio" value="Male" checked> Male |\
                    <input type="radio" name="Gender" class="radio" value="Female"> Female\
                </div>\
            </div>\
            <div class="create-info">\
                <label>Mobile number:</label>\
                <div class="nationality flex-row-btw">\
                    <input type="number" name="Mobile_number" placeholder="Mobile number" class="mobile-no">\
                </div>\
            </div>\
            <div class="create-info">\
                <label>Home Address:</label>\
                <input type="text" name="Home_address" placeholder="Address">\
            </div>\
            <div class="create-info">\
                <label>Email address:</label>\
                <input type="email" name="Email_address" placeholder="Email address">\
            </div>\
        </form>\
        <div class="flex-row-center">\
            <button type="submit" value="Add Contact" class="btn submit" form="form-add" onclick="validateForm(\'add\', \'new_user\');">Add Contact</button>\
        </div>\
    ';
    return createCont;
}
