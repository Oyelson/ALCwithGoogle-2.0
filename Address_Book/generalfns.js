function randRange(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function colorObject(min, max) {
    var alphabet_arr = [];
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i in alphabets) { 
        alphabet_arr.push(alphabets[i]); 
    }
    var alpha_color_object = {};
    for(var alph in alphabet_arr) {
        var r = randRange(min, max);
        var g = randRange(min, max);
        var b = randRange(min, max);
        var rgbColor = "rgb("+r+","+g+","+b+")";
        alpha_color_object[alphabet_arr[alph]] = rgbColor;
        alpha_color_object[alphabet_arr[alph].toLowerCase()] = rgbColor;
    }
    return alpha_color_object;
}

function usersObjectOrdered(usersObject) {
    var usersObjectOrd = {};
    var usersArr = [];
    for(var user in usersObject) {
        usersArr.push(usersObject[user].Full_name);
    }
    usersArr = selSort(usersArr);
    for(var i in usersArr) {
        var curr_user = usersArr[i];
        for(var user in usersObject) {
            if(usersObject[user].Full_name == curr_user) {
                usersObjectOrd[user] = usersObject[user];
            }
        }
    }
    return usersObjectOrd;
}

function getUserObject(userDetailString) {
    var userStringArr = userDetailString.split('|');
    var userDetailObject = {};
    for(var detail in userStringArr){
        var details = userStringArr[detail].split(':');
        userDetailObject[details[0]] = details[1];
    }
    return userDetailObject;
}

function userObjectDetails() {
    var isUser = false;
    var usersObject = {};
    for (var user in localStorage) {
        if (user.indexOf('!_______oyelson') > -1) {
            isUser = true;
            trackUser = user.split('_______')[0];
            var userObject = getUserObject(localStorage[user]);
            usersObject[trackUser] = userObject;
        }
    }
    var usersObjectOrd = usersObjectOrdered(usersObject);
    return usersObjectOrd;
}

function objectLen(object) {
    var len = 0;
    for (var i in object) {
        len++;
    }
    return len;
}

function selSort(arr) {
    var curr = 0;
    while (curr != arr.length) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[curr].toLowerCase() < arr[i].toLowerCase()) {
                var x = arr[curr];
                var y = arr[i];
                arr[i] = x;
                arr[curr] = y;
            }
        }
        curr += 1;
    }
    return arr;
}