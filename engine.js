$(function introPage() {
    $(document).ready(function(){
        $('.quiz-questions').hide();
        $("#nextQuestion").hide();
        $("#quiz-results").hide();
    });
});

$(function startQuiz() {
    $("#start").on("click", function (){
        event.preventDefault();
        $("#start-page").hide();
        $(".quiz-questions").show();
        makeQuestion();
    });
});

function makeQuestion() { 
    let question = questionStore.questions[questionStore.currentQuestionIndex];
    $(".questionProblem").text(question.problem);
    $(".choices").html("");
    
    question.choices.forEach(function(choice) {
        $(".choices").append(`<div class="answer-choices">
                            <form id="js-form">
                            <fieldset>
                            <label>
                            <input type="radio" name="radio" value="${choice}"/>
                            <span>${choice}</span>
                            </label>
                            </fieldset>
                            </form>
                            </div>`);
    }); 
};


$(function submitAnswer() {
    $("#submitUserGuess").on("click",function() {
        let answerCheck = $('input[name = radio]:checked').val();

        if (answerCheck) {
            if (answerCheck === (questionStore.questions[questionStore.currentQuestionIndex].solution)) {
                $(".response").text("Good job on getting it correct!");
                $("#submitUserGuess").hide();
                questionStore.correctAnswers++;
                $(".answerCorrect").html(" You answered " + questionStore.correctAnswers + " correctly!");
                $(".questionNumber").html(" This is question " + questionStore.questions[questionStore.currentQuestionIndex].questNmb + " out of 10");
                $("#nextQuestion").show();
                $(".answerCorrect").show();
                $(".questionNumber").show();
                $(".response").show();
            }
            else {
                $(".response").text("Sorry, but the right answer is" + " " +(questionStore.questions[questionStore.currentQuestionIndex].solution));
                $("#submitUserGuess").hide();
                $(".answerCorrect").html(" You answered " + questionStore.correctAnswers + " correctly");
                $(".questionNumber").html(" This is question " + questionStore.questions[questionStore.currentQuestionIndex].questNmb + " out of 10");
                $("#nextQuestion").show();
                $(".answerCorrect").show();
                $(".questionNumber").show();
                $(".response").show();
            }
        }
        else {
            alert("Stop! Choose an answer first! No skipping!");
        }   
    });
});

$(function nextQuestionOrFinish() {
    $("#nextQuestion").on("click", function() {
        $("#submitUserGuess").show();
        $(".response").hide();
        $(".answerCorrect").hide();
        $(".questionNumber").hide();
        $("#nextQuestion").hide();
        
        questionStore.currentQuestionIndex;
        questionStore.currentQuestionIndex++;
        if (questionStore.currentQuestionIndex < 10) {
            makeQuestion();
        }
        else {
            $('.quiz-questions').hide();
            $("#nextQuestion").hide();
            $("#quiz-results").append(`<div id="quiz-results">
                                    <h1> Quiz Results</h1>
                                    <h2> You Got </h2>
                                    ${questionStore.correctAnswers}
                                    <h2> Correct! </h2>
                                    </div>`)
       if (questionStore.correctAnswers > 8) {
           alert("So you studied for this quiz huh? Keep it up!")
       }
       else {
           alert ("FAIL! Stay after school so we can discuss your bad grade!")
       }
        $("#quiz-results").show();

        $(function resetQuiz() {
            $("#startOver").on("click", function() {
                questionStore.currentQuestionIndex = 0;
                questionStore.correctAnswers = 0;
                $("#quiz-results").hide();
                $("#start-page").show();
            });
        });
        };
    });
});