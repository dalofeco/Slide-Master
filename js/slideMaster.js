$(document).ready(function() {

    var debugModeOn = true;
    /* Prints the string out to the console depending on debug mode */
    var debugOut = function(str) {
        if (debugModeOn) {
            console.log(str);
        }
    };

    //Gets iframe contents if any control variables are null
    var checkContents = function() {
        if (slideController.noteInput == undefined)
            slideController.noteInput = slideController.getNoteInput();
        if (slideController.addBtn == undefined)
            slideController.addBtn = slideController.getAddNoteBtn();
        if (slideController.noteArea == undefined)
            slideController.noteArea = slideController.getNoteArea();
        if (slideController.slideInfo == undefined)
            slideController.slideInfo = slideController.getSlideFrame();
    };

    /* Page header object that contains the course title, lecture title, and current slide number */
    var pageHeader = {
        courseTitle: $("#course-title"),
        lecTitle: $("#lecture-title"),
        slideNumber: $("#slide-number")
    };

    /* Changes the header info for the user */
    var changeHeaderInfo = function(lecObj, slideNum) {
        /* Sets the headers back to the default when slide player is turned off */
        if (lecObj == null && slideNum == null) {
            pageHeader.courseTitle.text("Welcome to Slide Master!");
            pageHeader.lecTitle.text("Slide Player");
            pageHeader.slideNumber.text(" Slide Number");
            slideController.getSlideFrame().css('background-color', 'black');
            slideController.getNoteArea().text("");
        }
        else {
            pageHeader.courseTitle.text(lecObj.courseTitle);
            pageHeader.lecTitle.text(lecObj.lectureTitle + " ");
            pageHeader.slideNumber.text("Slide " + lecObj.pages[slideNum].pageID);
        }
    };

    /* Creates the slide by creating the elements and appending it to the slide iframe */
    var createSlide = function(lecObj, slideNum) {
        changeHeaderInfo(lecObj, slideNum);
    };

    /* Changes the current slide */
    var changeSlide = function(command) {
        (command == "prev") && (slideController.curSlideNum < slideController.SLIDEMAX - 1) ? slideController.curSlideNum++: null;
        (command == "next") && (slideController.curSlideNum > slideController.SLIDEMIN) ? slideController.curSlideNum--: null;
        createSlide(slideController.lecture, slideController.curSlideNum);
    };

    /* Loads the notes and appends it to the notes section */
    var loadNotes = function() {
        $.get("/loadLecture", function(lecture) {
            slideController.lecture = lecture;
            var noteArea = slideController.getNoteArea();
            var usrNote = slideController.getNoteInput();
            var curSlide = slideController.curSlideNum;
            var notes = slideController.lecture.pages[curSlide].notes;
            noteArea.text(notes);
        });
    };

    /* Adds the handler for the add note button */
    var addNoteBtnHandler = function() {
        var noteBtn = slideController.getAddNoteBtn();
        noteBtn.on("click", function() {
            var noteArea = slideController.getNoteArea();
            var usrNote = slideController.getNoteInput();
            /* Gets the Lecture JSON object */
            $.get("/loadLecture", function(lecture) {
                slideController.lecture = lecture;
            });

            /* Updates the lecture object with the users notes */
            slideController.lecture.pages[slideController.curSlideNum].notes = usrNote.val();

            /* Updated lecture object that is sent over to the server */
            var updatedLecObj = slideController.lecture;
            
            /* Sending the newly update lecture object back to the server */
            $.ajax({
                url: "/saveNote",
                type: "POST",
                data: JSON.stringify(updatedLecObj),
                contentType: "application/json",
                complete: function(res) {
                    debugOut(res);
                }
            });

            /* Updates the note area with users text and emptys the input textfield for new notes */
            noteArea.append(usrNote.val() + "<br/>");
            usrNote.val('');
        });
    };

    /* Icons object that contains all the icons on the page */
    var icons = {
        play: $("i")[0],
        up: $("i")[1],
        down: $("i")[2],
        stop: $("i")[3],
        audio: $("i")[4],
        save: $("i")[5]
    };

    /* Icons click handlers for all the icons */
    $(icons.play).click(function() {
        checkContents();
        /*Opens presentation file from /resources/xxx.json*/
        $.get("/loadLecture", function(lecture) {
            /* Initializes the lecture object with the data that is sent back from the server */
            slideController.lecture = lecture;

            /* Creates the first slide */
            createSlide(lecture, 0);

            /* Obtains the note area from the previous notes */
            slideController.getNoteArea().text(slideController.lecture.pages[0].notes);

            /*Registers the Add Notes button handler */
            addNoteBtnHandler();
        });

        /* Turns ON the slide show */
        slideController.SLIDESHOW_ON = true;
        
        /* Changes the background color */
        slideController.getSlideFrame().css("background-color", "grey");
        
        /* Disables the Add note button */
        slideController.getAddNoteBtn().prop('disabled', false);
    });

    /* Proceeds to the next slide */
    $(icons.up).click(function() {
        checkContents();
        if (slideController.SLIDESHOW_ON) {
            changeSlide("prev");
            loadNotes();
        }
    });

    /* Moves back a slide */
    $(icons.down).click(function() {
        checkContents();
        if (slideController.SLIDESHOW_ON) {
            changeSlide("next");
            loadNotes();
        }
    });

    /* Closes the presentation */
    $(icons.stop).click(function() {
        checkContents();
        if (slideController.SLIDESHOW_ON) {
            slideController.SLIDESHOW_ON = false;
            slideController.slide = null;
            changeHeaderInfo(null, null);
            slideController.getAddNoteBtn().prop('disabled', true);
        }
    });

    /* Plays audio during the presentation */
    $(icons.audio).click(function() {
        checkContents();
        if (slideController.SLIDESHOW_ON) {
            // trigger audio
        }
    });

    /* Saves the notes */
    $(icons.save).click(function() {
        if (slideController.SLIDESHOW_ON) {
            // save the notes 
        }
    });
});
