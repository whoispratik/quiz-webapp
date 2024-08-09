let quizobject;
  //  quizobject.results[0].incorrect_answers;
  //one way to think about it will be
  //quizobject.response_code or quizobject.results[0].question  quizobject.results[0].incorrect_answers to get the array and .correct_answers

  let historyTopic = document.querySelector(".history");
  let geographyTopic=document.querySelector(".geography");
  let mathematicsTopic=document.querySelector('.mathematics');
  let entertainmentTopic=document.querySelector('.entertainment');
  let mainContainer = document.querySelector(".main-container");

  let timeScore = document.querySelector(".timescore");
  let obtaineMarks=0;

  //event listener in case the user presses on history
  historyTopic.addEventListener("click", function (e) {
    $.ajax({
      url: "https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple",
  method:"get",
  beforeSend:function (param) {  
    mainContainer.innerHTML="";
    mainContainer.innerHTML="<span class='loader'></span>";
  },
  success:function(response,textStatus){
    if(textStatus=='success')
    quizobject=response;
  startQuiz();
  
  },
  error:function(error){
    mainContainer.innerHTML="unable to fetch questions for you sir/mam";
  }
    });
    
  });

  geographyTopic.addEventListener("click",function(e){
    $.ajax({
      url: "https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple",
  method:"get",
  beforeSend:function (param) {  
    mainContainer.innerHTML="";
    mainContainer.innerHTML="<span class='loader'></span>";
  },
  success:function(response,textStatus){
    if(textStatus=='success')
    quizobject=response;
  startQuiz();
  
  },
  error:function(error){
    mainContainer.innerHTML="unable to fetch questions for you sir/mam";
  }
    });
  })

  mathematicsTopic.addEventListener("click",function(e){
    $.ajax({
      url: "https://opentdb.com/api.php?amount=5&category=19&difficulty=easy&type=multiple",
  method:"get",
  beforeSend:function (param) {  
    mainContainer.innerHTML="";
    mainContainer.innerHTML="<span class='loader'></span>";
  },
  success:function(response,textStatus){
    if(textStatus=='success')
    quizobject=response;
  startQuiz();
  
  },
  error:function(error){
    mainContainer.innerHTML="unable to fetch questions for you sir/mam";
  }
    });

  })
  entertainmentTopic.addEventListener("click",function(e){
    $.ajax({
      url: "https://opentdb.com/api.php?amount=5&category=10&difficulty=easy&type=multiple",
  method:"get",
  beforeSend:function (param) {  
    mainContainer.innerHTML="";
    mainContainer.innerHTML="<span class='loader'></span>";
  },
  success:function(response,textStatus){
    if(textStatus=='success')
    quizobject=response;
  startQuiz();
  
  },
  error:function(error){
    mainContainer.innerHTML="unable to fetch questions for you sir/mam";
  }
    });
  });
  let perQuestionTimeCount = 0;
let totaltimekeeper=0;
let questionIndex=-1;
let intervalid;
let clickCount=-1;
  function startQuiz() { //modification at night.
document.querySelector(".topic").classList.add('none');
    timeScore.classList.remove("none");
     intervalid=setInterval(()=>{ 
        totaltimekeeper++;
        perQuestionTimeCount++;
        timeScore.firstElementChild.innerHTML=perQuestionTimeCount;
        if(perQuestionTimeCount==21){ // after every 20 seconds i have added 1 for the delay we will reset the perquestiontimecount , clear the interval and start the quiz again.
            perQuestionTimeCount=0;
            timeScore.firstElementChild.innerHTML=perQuestionTimeCount;
            clearInterval(intervalid);
         startQuiz(23);
        }
        else if(totaltimekeeper==100 || questionIndex==5){ // if we have reached 100seconds or 5 questions have been displayed we will do this 
            clearInterval(intervalid);
            marksheetShower();
            questionIndex=0;
        }
    },1000);
if(questionIndex!=5){  // we will continue to display the next question if 5 questions havent been displayed
    questionIndex++;
    questionReload(questionIndex);
} 
  
}

  



  function questionReload(questionIndex) {
let selectedValue;
let options = [
  quizobject.results[questionIndex].correct_answer,
  quizobject.results[questionIndex].incorrect_answers[0],
  quizobject.results[questionIndex].incorrect_answers[1],
  quizobject.results[questionIndex].incorrect_answers[2]
];

// Use Fisher-Yates shuffle algorithm
for (let i = options.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [options[i], options[j]] = [options[j], options[i]];
}
    mainContainer.innerHTML = "";
    mainContainer.innerHTML = `
                <form>
                 
                    <p class="question-text">${quizobject.results[questionIndex].question}</p>
                    

                    <div class="option1">
                      <span id="option1-text">${options[0]}</span>
                      <input type="radio" name="radio" value='${options[0]}' />
                      </div>

                      <div class="option2">
                        <span id="option2-text">${options[1]}</span>
                        <input type="radio" name='radio' value='${options[1]}' />
                        </div>

                        <div class="option3">
                          <span id="option3-text">${options[2]}</span>
                  <input type="radio" name="radio" value='${options[2]}'/>
                </div>

                <div class="option4">
                  <span id="opition4-text">${options[3]}</span>
                  <input type="radio" name="radio" value='${options[3]}'/>
                  </div>

                 
                    <input type="button" value="submit" class="submit" id="next" />
                    <input type="reset" value="reset" class="reset" />
                  
                    </form>
                    `;

  
    document.getElementById('next').addEventListener('click',(e)=>{ 
      clickCount++;
      console.log(clickCount);
      if(clickCount==5){ // if the next button has been clicked for 5 times we cleartheinterval and show the marksheet.
      clearInterval(intervalid);
    marksheetShower();
  }
      
    else{ // if it hasnt been clicked for 5 times we will rest the perquestiontimecount cleartheinterval and start the quiz again
   //iterating through the radio buttons and seeing which was checked
   console.log(quizobject.results[questionIndex].correct_answer)
      for (const iterator of document.forms[0].elements.radio) {
        if(iterator.checked==true)
        selectedValue=iterator.value;
      }
//seeing if the user has hit the right option;
      if(selectedValue==quizobject.results[questionIndex].correct_answer.trim()){
      
++obtaineMarks;
      }
      perQuestionTimeCount=0;
      clearInterval(intervalid);
      startQuiz();
    }
  }
    )
}
  
   
  function marksheetShower(){
    timeScore.classList.add("none");
    mainContainer.innerHTML="";
    mainContainer.innerHTML=`<h1>You obtained ${obtaineMarks} out of 5 </h1> <button> <a href='qz.html'>Restart</a></button>`;
document.querySelector('.topic').classList.add('none');
  }