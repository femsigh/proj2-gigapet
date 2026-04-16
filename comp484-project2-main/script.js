$(function () {
  // Makes sure that your function is called once all the DOM elements of the page are ready to be used.

  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);
  $(".sleep-button").click(clickedSleepButton); //one handler
});

// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = { name: "Ez", weight: 150, happiness: 100 };

function clickedTreatButton() {
  // Increase pet happiness
  pet_info.happiness += 2;
  // Increase pet weight
  pet_info.weight += 1; //so it doesn't go into the negatives when we decrease it in the play and exercise buttons
  checkWeightAndHappinessBeforeUpdating(); // Use the shared clamping function.
  checkAndUpdatePetInfoInHtml();
  showPetMessage("Yummy! Thank you!");
}

function clickedPlayButton() {
  // Increase pet happiness
  pet_info.happiness += 1;
  pet_info.weight -= 1; // Decrease pet weight
  checkWeightAndHappinessBeforeUpdating();
  showPetMessage("Wheeeee! *chirp*");
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  // Decrease pet happiness
  // Decrease pet weight
  pet_info.happiness -= 1;
  pet_info.weight -= 1;
  checkWeightAndHappinessBeforeUpdating();
  checkAndUpdatePetInfoInHtml();
  showPetMessage("Phew! That was a good workout! *chirp*");
}
function clickedSleepButton() {
  //sleep will increase happiness, but not weight
  pet_info.happiness += 3;
  checkWeightAndHappinessBeforeUpdating();
  checkAndUpdatePetInfoInHtml();
  showPetMessage("..Zzz...");
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  // Add conditional so if weight is lower than zero.
  if (pet_info.weight < 0) pet_info.weight = 0;
  if (pet_info.happiness < 0) pet_info.happiness = 0;
}
// Updates HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $(".name").text(pet_info["name"]);
  $(".weight").text(pet_info["weight"]);
  $(".happiness").text(pet_info["happiness"]);
}

function showPetMessage(msg) {
  $(".pet-message").remove(); // Remove any existing pet messages before showing a new one
  var $message = $('<div class="pet-message">' + msg + "</div>");
  $(".dashboard").append($message);
  // Use slideDown + delay + slideUp : two unique methods
  $message
    .hide()
    .slideDown(300)
    .delay(2000)
    .slideUp(500, function () {
      //.slideDown() - animates the height of the element from 0 to its full height. Parameters: duration (in milliseconds), callback function when done
      $(this).remove();
    });
}
