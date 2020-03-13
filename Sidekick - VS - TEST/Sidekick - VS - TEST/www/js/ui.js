function RemoveAllChildren(name) {
    var element = document.getElementById(name);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
}

function SetImageSrc(id, image) {
    $('#' + id).attr("src", image);
}

function SetImageOnElement(id, image) {
    var imageElement = document.getElementById(id);
    imageElement.style.backgroundImage = image;
}

function Hide(name) {
    $(name).addClass('ui-screen-hidden');
}

function Show(name) {
    $(name).removeClass('ui-screen-hidden');
}

function SetGameSection(value, element) {
    if (value) {
        document.getElementById(element).innerText = value;
        Show('#' + element);
    }
    else {
        document.getElementById(element).innerText = '';
        Hide('#' + element);
    }
}

function AlterControlHeights(array, idPrefix, idPostFix) {
    for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        var key = obj[0];

        GetHeights(idPrefix + key + idPostFix);
    }
}

function GetHeights(id) {
    var heights = new Array();

    $('li[name="' + id + '"]').each(function () {

        // Need to let sizes be whatever they want so no overflow on resize
        $(this).css('min-height', '0');
        $(this).css('max-height', 'none');
        $(this).css('height', 'auto');

        // Then add size (no units) to array
        heights.push($(this).height());
    });

    $('a[name="' + id + '"]').each(function () {

        // Need to let sizes be whatever they want so no overflow on resize
        $(this).css('min-height', '0');
        $(this).css('max-height', 'none');
        $(this).css('height', 'auto');

        // Then add size (no units) to array
        heights.push($(this).height());
    });

    // Find max height of all elements
    var max = Math.max.apply(Math, heights);

    if (max !== 0) {
        // Set all heights to max height
        $('li[name="' + id + '"]').each(function () {
            $(this).css('height', max + 'px');
        });
        $('a[name="' + id + '"]').each(function () {
            $(this).css('height', max + 'px');
        });
    }
}

function ResizeScreenImage() {
    var bezel = GetBezel(TransformedCurrentGameName());
    var imageElement = document.getElementById('gameimage');
    imageElement.style.top = bezel.topOffset + 'vw';
    imageElement.style.left = bezel.leftOffset + 'vw';
    imageElement.style.width = bezel.screenWidth + 'vw';
    imageElement.style.height = bezel.screenHeight + 'vw';

    var videoElement = document.getElementById('gamevideo');
    videoElement.style.top = bezel.topOffset + 'vw';
    videoElement.style.left = bezel.leftOffset + 'vw';
    videoElement.style.width = bezel.screenWidth + 'vw';
    videoElement.style.height = bezel.screenHeight + 'vw';
}

function preloadimages(arr) {
    newimages = [], loadedimages = 0;
    var postaction = function () {
    };

    var arr = (typeof arr !== "object") ? [arr] : arr;
    var index = 0;

    function imageLoadBanner() {
        Hide('#gamebannertitle');
        Hide('#gamebannertitlehs');
        var imageName = currentGameName.toLowerCase();
        if (parentGame) {
            imageName = parentGame.toLowerCase();
        }

        var imagesrc = websiteAddress + "/images/banners/" + currentGameCategoryId + "/" + imageName + ".png";
        SetImageSrc('gamebanner', imagesrc);
        SetImageSrc('gamebannerhs', imagesrc);
        imageloadpost();
    }

    function loadDefaultScreen() {
        SetImageOnElement('gameimage', "url('game_images/coming soon.gif')");
        imageloadpost();
    }

    function loadDefaultBanner() {
        $('#gamebanner').attr("src", null);
        $('#gamebannerhs').attr("src", null);

        var titleElement = document.getElementById('gamebannertitle');
        var titleElementHS = document.getElementById('gamebannertitlehs');

        titleElement.innerText = currentGameName.toLowerCase();
        titleElementHS.innerText = currentGameName.toLowerCase();

        Show('#gamebannertitle');
        Show('#gamebannertitlehs');

        imageloadpost();
    }

    function imageLoadScreen() {
        var imageName = currentGameName.toLowerCase();
        if (parentGame) {
            imageName = parentGame.toLowerCase();
        }

        SetImageOnElement('gameimage', "url('" + websiteAddress + "/images/screens/" + currentGameCategoryId + "/" + imageName + ".gif')");
        imageloadpost();
    }

    function loadDefaultBezel() {
        SetImageOnElement('bezelimage', "url('game_bezels/default.png')");
        imageloadpost();
    }

    function imageLoadBezel() {
        var bezel = GetBezel(TransformedCurrentGameName());
        if (bezel.id === 'default') {
            SetImageOnElement('bezelimage', "url('" + websiteAddress + "/images/bezels/" + bezel.image + "')");
        }
        else {
            SetImageOnElement('bezelimage', "url('" + websiteAddress + "/images/bezels/" + currentGameCategoryId + "/" + bezel.image + "')");
        }
        imageloadpost();
    }

    function imageloadpost() {
        loadedimages++;
        if (loadedimages === arr.length) {
            postaction(newimages); //call postaction and pass in newimages array as parameter
        }
    }

    for (var i = 0; i < arr.length; i++) {
        newimages[i] = new Image();

        if (i === 0) {
            newimages[i].onload = function () {
                imageLoadBanner();
            };
            newimages[i].onerror = function () {
                loadDefaultBanner();
            };
        }
        else if (i === 1) {
            newimages[i].onload = function () {
                imageLoadScreen();
            };
            newimages[i].onerror = function () {
                loadDefaultScreen();
            };
        }
        else {
            newimages[i].onload = function () {
                imageLoadBezel();
            };
            newimages[i].onerror = function () {
                loadDefaultBezel();
            };
        }

        newimages[i].src = arr[i];
    }
    return { //return blank object with done() method
        done: function (f) {
            postaction = f || postaction; //remember user defined callback functions to be called when images load
        }
    };
}
