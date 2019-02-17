// $(document).ready(function() {
    // variables
    var numCorrect;
    var numIncorrect;
    var numUnanswered;

    var userAnswer;
    
    var curQuestion;
    
    var time;
    var intervalId;

    var answered = false;

    var triviaQuestions = [
        {
            question: "Q1. WHERE IS WAKANDA LOCATED?",
            choices: ["A. South America", "B. Africa", "C. Antarctica", "D. Australia"],
            rightAns: 1,
            image: "assets/images/q1.jpg"
        },

        {
            question: "Q2. WHAT IS THE NAME OF THE MARVEL COMIC LEGEND WHO HAS MADE AN APPEARANCE IN ALL THE FILMS OF THE MARVEL CINEMATIC UNIVERS?",
            choices: ["A. Jack Kirby", "B. Stan Lee", "C. Walter Norris", "D. Steve Rogers"],
            rightAns: 1,
            image: "assets/images/q2.jpg"
        },

        {
            question: "Q3. THOR'S HAMMER MJOLNIR IS MADE OF METAL FROM THE HEART OF A DYING WHAT?",
            choices: ["A. Asteroid", "B. Comet", "C. Star", "D. Black Hole"],
            rightAns: 2,
            image: "assets/images/q3.jpg"
        },

        {
            question: "Q4. WHAT IS THE NAME OF THE VILLAIN IN ANT-MAN?",
            choices: ["A. Scorpion", "B. Yellowjacket", "C. Hornet", "D. Serpent"],
            rightAns: 1,
            image: "assets/images/q4.jpg"
        },

        {
            question: "Q5. WHAT IS THE NAME OF THE SET OF DOCUMENTS THAT REGULATE THE ACTIVITIES OF ENHANCED PERSONS?",
            choices: ["A. Sokovia Accords", "B. Wakanda Accords", "C. Stark Accords", "D. Paris Accords"],
            rightAns: 0,
            image: "assets/images/q5.png"
        },

        {
            question: "Q6. WHICH AVENGER DOES LOKI BRIEFLY TAKE THE FORM OF IN THOR: THE DARK WORLD?",
            choices: ["A. Hulk", "B. Captain America", "C. Iron Man", "D. Hawkeye"],
            rightAns: 1,
            image: "assets/images/q6.jpg"
        },

        {
            question: "Q7. WHAT IS THE NAME OF STAR-LORD/PETER QUILL'S MOTHER?",
            choices: ["A. Margaret", "B. Meredith", "C. Madeline", "D. Matilda"],
            rightAns: 1,
            image: "assets/images/q7.jpg"
        },

        {
            question: "Q8. WHICH OF THE FOLLOWING IS NOT ON CAPTAIN AMERICA'S TO-DO LIST IN CAPTAIN AMERICA: THE WINTER SOLDIER?",
            choices: ["A. Disco", "B. Thai Food", "C. Miracle on Ice", "D. Moon landing"],
            rightAns: 2,
            image: "assets/images/q8.jpg"
        },

        {
            question: "Q9. HOW DOES YONDU CONTROL THE YAKA ARROW",
            choices: ["A. By whistling", "B. By flicking his wrist", "C. With telepathy", "D. By winking"],
            rightAns: 0,
            image: "assets/images/q9.jpg"
        },

        {
            question: "Q10. IN ANT-MAN, SCOTT LANG IS FIRED FROM HIS JOB DOING WHAT?",
            choices: ["A. Making coffee", "B. Bagging groceries", "C. Selling T-shirts", "D. Scooping ice cream"],
            rightAns: 3,
            image: "assets/images/q10.jpg"
        }

    ];
    var gameMessage = [
        {
            correct: "Good Job! Your answer is correct!",
            incorrect: "Sorry :( Your answer is incorrect!",
            timeup: "Time is up!",
            lastMessage: "GOOD JOB! WELL DONE :)"
        }
    ]

    console.log(triviaQuestions[2].question);
    console.log(triviaQuestions[1].choices[2]);
    console.log(triviaQuestions[0].choices[triviaQuestions[0].rightAns]);
    

    $("#game").hide();                      // everything is hidden before game is started 
    $("#startBtn").on("click", function() { // when start button is clicked, questions and choices appear.
        $("#start").hide();
        gameReset();
    });

    function gameReset() { //game reset function.
        $("#game").show();
        $("#questions").show();
        $("#answers").hide();
        $("#results").hide();
        numCorrect = 0;
        numIncorrect = 0;
        numUnanswered = 0;
        curQuestion = 0;
        questions(); // go to question function.
    }
    function questions() { 
        $("#img").empty();
        $("#message").empty();
        $("#correctAnswer").empty();
        $("#question").show();
        $("#time").show();
        $("#question").text(triviaQuestions[curQuestion].question);
        //question is appeared
        for (var i = 0; i < 4; i++) { // creat 4 div for answer choices
            var list = $("<div>"); //grab new div for answer choices
            list.addClass("currentChoices") // add new div classes
            list.html(triviaQuestions[curQuestion].choices[i]);
            list.attr({
                "data-index" : i
            });
            $("#choices").append(list); // put  answer choices on questions area
            
        }
        timer(); // run timer

        $(".currentChoices").on("click", function() { //When one of answer choices is clicked, time is stopped.
            userAnswer = $(this).data("index");
            clearInterval(intervalId); // time stop
            showAnswers(); // show answer function.
        })
    }
    function timer() {
        time = 20; // time start from 20 sec
        $("#time").html("TIME REMAINING: " + time +" Seconds");
        intervalId = setInterval(count, 1000); // 1 sec
    }

    function count() {
        time --; // time decreases by 1 sec
        $("#time").html("TIME REMAINING: " + time +" Seconds");

        if (time < 1) { // when time is out go to timeisUp function to show answers.
            clearInterval(intervalId);
            timeisUp();
        }
    }
    function showAnswers() { // show answers after user clicked answer choices
        $(".currentChoices").empty();
        $("#time").hide();
        $("#question").hide();
        $("#chocies").hide();
        $("#answers").show();
        var rightAnswerText = triviaQuestions[curQuestion].choices[triviaQuestions[curQuestion].rightAns]; // to show correct answers
        var rightAnswerIndex = triviaQuestions[curQuestion].rightAns; // pick right answer index number

        var showImage = $("<img>"); // add new img to get right answer images
        var imageLink = triviaQuestions[curQuestion].image;
        showImage.addClass("answerImage");
        showImage.attr("src", imageLink);
        $("#img").html(showImage);

        if (userAnswer === rightAnswerIndex) {
            numCorrect ++;
            $("#message").html(gameMessage[0].correct);
            $("#correctAnswer").html("YES, THE CORRECT ANSWER IS    " + rightAnswerText);
        } else if (userAnswer !== rightAnswerIndex) {
            numIncorrect ++;
            $("#message").html(gameMessage[0].incorrect);
            $("#correctAnswer").html("NO, THE CORRECT ANSWER IS    " + rightAnswerText);
        }
        
        if (curQuestion === 9) { // when user clicked answer choices or time is up, stayed for 5sec to show answers and message
            setTimeout(endGame, 5000);
        } else {
            setTimeout(questions, 5000);
            curQuestion++;
        }
        

        
    }
    function timeisUp() { // time is up function. similar as showAnswers function
        $(".currentChoices").empty();
        $("#time").hide();
        $("#question").hide();
        $("#chocies").hide();
        $("#answers").show();
        $("#message").html(gameMessage[0].timeup);
        var rightAnswerText = triviaQuestions[curQuestion].choices[triviaQuestions[curQuestion].rightAns];
        $("#correctAnswer").html("THE CORRECT ANSWER IS    " + rightAnswerText);
        numUnanswered++;
        if (curQuestion === 9) {
            setTimeout(endGame, 5000);
        } else {
            setTimeout(questions, 5000);
            curQuestion++;
        }

        var showImage = $("<img>");
        var imageLink = triviaQuestions[curQuestion].image;
        showImage.addClass("answerImage");
        showImage.attr("src", imageLink);
        $("#img").html(showImage);

    }
    
    function endGame() {  // when no questions exists, endGame function is run.
        $(".currentChoices").empty();
        $("#game").show();
        $("#questions").hide();
        $("#answers").hide();
        $("#results").show();
        $("#lastMessage").html(gameMessage[0].lastMessage);
        $("#numCorAns").html("YOUR CORRECT ANSWERS : " + numCorrect);
        $("#numWroAns").html("YOUR INCORRECT ANSWERS : " + numIncorrect);
        $("#numUnAns").html("YOUR SKIPPED QUESTIONS : " + numUnanswered);
        
        $("#restartBtn").on("click", function() {
            gameReset();  // when user click start over button, go to start page
        });
    }










// }