function RemoveAllChildren(name)
{
    var element = document.getElementById(name);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
}

function SetImageSrc(id, image) {
    $('#' + id).attr("src", image);        
}

function SetImageOnElement(id, image)
{
    var imageElement = document.getElementById(id);
    imageElement.style.backgroundImage = image;
}

function Hide(name)
{
    $(name).addClass('ui-screen-hidden');
}

function Show(name)
{
    $(name).removeClass('ui-screen-hidden');
}

function SetGameSection(value, element)
{
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

    if (max != 0) {
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
}

function preloadimages(arr) {
    newimages = [], loadedimages = 0;
    var postaction = function () {        
    };

    var arr = (typeof arr !== "object") ? [arr] : arr;
   var index = 0;

   function imageLoadBanner()
   {
       var imagesrc = "game_banners/" + currentCategoryId + "/" + currentGameName.toLowerCase() + ".png";
       SetImageSrc('gamebanner', imagesrc);
       imageloadpost();
   }

   function imageLoadScreen()
   {   
       SetImageOnElement('gameimage', "url('game_images/" + currentCategoryId + "/" + currentGameName.toLowerCase() + ".gif')");
       imageloadpost();
   }

   function imageLoadBezel()
   {
       var bezel = GetBezel(TransformedCurrentGameName());
       if (bezel.id === 'default')
       {
           SetImageOnElement('bezelimage', "url('game_bezels/" + bezel.image + "')");
       }
       else
       {
           SetImageOnElement('bezelimage', "url('game_bezels/" + currentCategoryId + "/" + bezel.image + "')");
       }          
       imageloadpost();
   }

   function imageloadpost() {
       loadedimages++;            
     if (loadedimages === arr.length) {
         postaction(newimages); //call postaction and pass in newimages array as parameter
     }
   }

   for (var i = 0; i < arr.length; i++)
   {
       newimages[i] = new Image();
     newimages[i].src = arr[i];
     if (i === 0)
     {
         newimages[i].onload = function () {
             imageLoadBanner();
         };
     }
     else if (i === 1)
     {
         newimages[i].onload = function () {
             imageLoadScreen();
         };
     }
     else
     {
         newimages[i].onload = function () {
             imageLoadBezel();
         };
     }
     newimages[i].onerror = function () {
         imageloadpost();
     };
   }
   return { //return blank object with done() method
       done: function (f) {
           postaction = f || postaction; //remember user defined callback functions to be called when images load
       }
   };
}
