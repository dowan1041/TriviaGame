// $(document).ready(function() {
    // variables
    var numCorrect;
    var numIncorrect;
    var numUnanswered;

    var curQuestion;
    
    var time;
    var intervalId;

    var triviaQuestions = [
        {
            question: "Hello",
            choices: ["a", "b", "c", "d"],
            rightAns: 2,
            image: "assests/images/",
            ansDescribtion: "This is correct",
        },

        {
            question: "Good Morning",
            choices: ["a", "b", "c", "d"],
            rightAns: 3,
            image: "assests/images/",
            ansDescribtion: "This is correct",
        }
    ]
    console.log(triviaQuestions[0].question);
    console.log(triviaQuestions[0].choices[2]);

    $("#game").hide();
    $("#startBtn").on("click", function() {
        $("#start").hide();
        gameReset();
    });

    function gameReset() {
        $("#game").show();
        $("#questions").show();
        $("#answers").hide();
        $("#results").hide();
        numCorrect = 0;
        numIncorrect = 0;
        numUnanswered = 0;
        curQuestion = 0;
        questions();
    }
    function questions() {
        $("#question").html(triviaQuestions[curQuestion].question);
        //question is appeared
        for (var i = 0; i < 4; i++) {
            var list = $("<div>"); //grab new div for answer choices
            list.addClass("currentChoices")
            list.html(triviaQuestions[curQuestion].choices[i]);
            list.attr({
                "data-index" : i
            });
            $("#choices").append(list);
            
        }
        timer();
    }
    function timer() {
        time = 30;
        $("#time").html("TIME REMAINING: " + time +" Seconds");
        intervalId = setInterval(count, 1000);
    }

    function count() {
        time = time - 1;
        $("#time").html("TIME REMAINING: " + time +" Seconds");
        // if(time < 10) {
        //     $("#time").css({
        //         "color" : "red"
        //     });
        // } else {
        //     $("#time").css({
        //         "color" : "black"
        //     });
        // }

        if (time < 1) {
            clearInterval(intervalId);
            timeisUp();
        }
    }
    function timeisUp() {
        $("#game").show();
        $("#questions").hide();
        $("#answers").show();
        $("#results").hide();
    }













// }