$(document).ready(function() {
    // variables
    var time;
    var intervalId;

    function timer() {
        time = 30;
        $("#time").html("TIME REMAINING: " + time +"Seconds");
        intervalId = setInterval(count,1000);
    }

    function count() {
        time --;
        if(time < 10) {
            $("#time").css({
                "color" : "red"
            });
        } else {
            $("#time").css({
                "color" : "black"
            });
        }

        if (time < 1) {
            clearInterval(intervalId);
            showAnswer();
        }
    }













};