"use strict";

var save = document.getElementById("save");

var videoInput = document.getElementById("videoUrl");
var imageInput = document.getElementById("imageUrl");
var continueBtnInput = document.getElementById("continueBtn");

var videoPreview = document.getElementById("videoPreview");
var imagePreview = document.getElementById("imagePreview");
var continueButton = document.getElementsByClassName("continue-button")[0];

var saving = false;

// ----------------------------------------------------------------------
// Saving Settings to Backend
// ----------------------------------------------------------------------
save.addEventListener("click", function (e) {
    e.preventDefault();

    if (!saving) {
        save.setAttribute("class", "btn btn-cancel pull-right");
        saving = true;

        var data = [].reduce.call(document.getElementsByTagName("input"), function (data, element) {
            if (element.name == "videoUrl") {
                element.value = dropExtension(element.value);
            }
            data[element.name] = element.value;
            return data;
        }, {});

        postData(data);
    }
});

var postData = function postData(data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "settings.php", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log("success!");
            save.setAttribute("class", "btn btn-success pull-right");
            saving = false;
        }
    };

    xhr.send(JSON.stringify(data));
};

// ----------------------------------------------------------------------
// Previewing Changes
// ----------------------------------------------------------------------

// Updating preview upon updating input fields
// Video
var updateVideo = function updateVideo(e) {
    var url = videoInput.value;
    url = dropExtension(url);
    videoPreview.innerHTML = "<video loop muted><source src=\"" + url + ".mp4\"><source src=\"" + url + ".webm\"><source src=\"" + url + ".ogg\"></video>";
};

// Background Image
var updateImage = function updateImage(e) {
    var url = imageInput.value;
    imagePreview.style.backgroundImage = "url(" + url + ")";
};

// Continue Button
var updateButton = function updateButton(e) {
    var text = continueBtnInput.value;
    continueButton.innerHTML = text;
};

videoInput.addEventListener("blur", updateVideo);
imageInput.addEventListener("blur", updateImage);
continueBtnInput.addEventListener("blur", updateButton);

// Helper function to drop extensions from the video url to allow for multiple extensions
// Multiple extensions of the same video allow greater cross-device compatibility
var dropExtension = function dropExtension(string) {
    var length = string.length;
    var index = string.substring(length - 5, length - 1).indexOf(".");
    if (index != -1) {
        return string.substring(0, length - 5 + index);
    } else {
        return string;
    }
};

// Loads the previews upon loading the page
window.addEventListener('load', function () {
    updateButton();
    updateImage();
    updateVideo();
});

// Add the on click listener to the poster for play/pause
// and showing/hiding the image upon play/pause
var posterwrapper = document.getElementsByTagName("posterwrapper")[0];
posterwrapper.addEventListener("click", function (e) {
    var poster = document.getElementsByTagName("poster")[0];
    var video = document.getElementsByTagName("video")[0];
    if (poster.style.visibility == "visible") {
        poster.style.visibility = "hidden";
        if (video) {
            video.play();
        }
    } else {
        poster.style.visibility = "visible";
        if (video) {
            video.pause();
        }
    }
});