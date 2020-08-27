function eventListeners() {
  const showBtn = document.getElementById("show-btn");
  const questionCard = document.querySelector(".question-card");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("question-form");
  const feedback = document.querySelector(".feedback");
  const questionInput = document.getElementById("question-input");
  const answerInput = document.getElementById("answer-input");
  const questionList = document.getElementById("questions-list");
  let data = [];
  let id = 1;

  //new ui instance

  const ui = new UI();
  //Show question form
  showBtn.addEventListener("click", function () {
    ui.showQuestion(questionCard);
  });
  //hide question form
  closeBtn.addEventListener("click", function () {
    ui.hideQuestion(questionCard);
  });
  //add question
  form.addEventListener("submit", function (event) {
    event.preventDefault(); //prevent reloading page
    const questionValue = questionInput.value;
    const answerValue = answerInput.value;
    // if there is no value display error, 4 second timeout
    if (questionValue === "" || answerValue === "") {
      feedback.classList.add("showItem", "alert-danger");
      feedback.textContent = "Cannot add empy values";

      setTimeout(() => {
        feedback.classList.remove("showItem", "alert-danger");
      }, 4000);
    } else {
      const question = new Question(id, questionValue, answerValue);
      data.push(question);
      id++;
      ui.addQuestion(questionList, question);

      ui.clearFields(questionInput, answerInput);
    }
  });
  // work with a question(edit/delete)
  questionList.addEventListener("click", function (event) {
    event.preventDefault(); //to not go at the top of the page
    if (event.target.classList.contains("delete-flashcard")) {
      let id = event.target.dataset.id;
      questionList.removeChild(
        event.target.parentElement.parentElement.parentElement
      );

      let tempData = data.filter(function (item) {
        return item.id !== parseInt(id);
      });
      data = tempData;
    } else if (event.target.classList.contains("show-answer")) {
      event.target.nextElementSibling.classList.toggle("showItem");
    } else if (event.target.classList.contains("edit-flashcard")) {
      //delete question
      let id = event.target.dataset.id;
      questionList.removeChild(
        event.target.parentElement.parentElement.parentElement
      );
      //edit and show the question in the card
      ui.showQuestion(questionCard);
      //find specific question in the data array
      const tempQuestion = data.filter(function (item) {
        return item.id === parseInt(id);
      });
      //rest of the data
      let tempData = data.filter(function (item) {
        return item.id !== parseInt(id);
      });
      data = tempData;
      questionInput.value = tempQuestion[0].title;
      answerInput.value = tempQuestion[0].answer;
    }
  });
}
//ui constructor function
function UI() {}

//Show question card
UI.prototype.showQuestion = function (element) {
  element.classList.add("showItem");
};

//Hide question card
UI.prototype.hideQuestion = function (element) {
  element.classList.remove("showItem");
};
//clear fields
UI.prototype.clearFields = function (question, answer) {
  question.value = "";
  answer.value = "";
};
// add question
UI.prototype.addQuestion = function (element, question) {
  const div = document.createElement("div");
  div.classList.add("col-md-4");
  div.innerHTML = `<div class="card card-body flashcard my-3">
     <h4 class="text-capitalize">${question.title}</h4>
     <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
     <h5 class="answer mb-3">${question.answer}</h5>
     <div class="flashcard-btn d-flex justify-content-between">

      <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${question.id}">edit</a>
      <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase data-id="${question.id}">delete</a>
     </div>
    </div>`;
  element.appendChild(div);
};
//question constructor

function Question(id, title, answer) {
  this.id = id;
  this.title = title;
  this.answer = answer;
}

// dom event listener

document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});
