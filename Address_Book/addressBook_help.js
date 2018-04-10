window.onload = function() {
    displayStart();
    if (typeof (Storage) !== undefined) {
        var activate = document.getElementById("activate");
        if (localStorage.oyelsonColor == undefined) {
            activate.innerHTML = "Activate contact colors";
            localStorage.oyelsonColor = JSON.stringify(colorObject(2, 255));
        } else {
            activate.innerHTML = "Change contact colors";
        }
    }
    var icon = document.getElementById('oyegbite-toggle');
    var sideBar = document.getElementById('oyegbite');
    var sections = document.getElementsByClassName('sections')[0];

    var form_contact = document.getElementsByClassName('form_contact')[0];
    var site_head = document.getElementsByClassName('site-head')[0];
    site_h = getComputedStyle(site_head).getPropertyValue("height");
    
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var fh = getWidth(site_h);

    form_contact.style.maxHeight = h - fh + "px";
    sections.style.maxHeight = h - fh + "px";

    icon.onclick = function () {
        var icon_style = getComputedStyle(this).getPropertyValue("margin-left");
        var sideBar_style = getComputedStyle(sideBar).getPropertyValue("display");
        var sections_width = getComputedStyle(sections).getPropertyValue("width");
        if (sideBar_style == "none") {
            this.style.marginLeft = "300px";
            this.style.zIndex = "1000";
            sideBar.style.display = "block";
            sections.style.marginLeft = "300px";
            sections_width = getWidth(sections_width);
            sections.style.maxWidth = sections_width - 300 + "px";
        } else if (sideBar_style == "block") {
            this.style.marginLeft = "0px";
            this.style.zIndex = "300";
            sideBar.style.display = "none";
            sections.style.marginLeft = "0px";
            sections_width = getWidth(sections_width);
            sections.style.maxWidth = sections_width + 300 + "px";
        }
    };
}