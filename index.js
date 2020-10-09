var clickedBefore = false;

$("#cbtn").click(function() {

  var validated1 = $(".names")[0].checkValidity();
  var validated2 = $(".names")[1].checkValidity();

    if (validated1 && validated2) {
      if (clickedBefore) {
        reset();
      }
      else {
        calculator();
      }
    }
  });

function calculator() {

  var percentageNumber = Math.floor(Math.random() * 101);

  var processingNumber = Math.floor(Math.random() * 10) + 1;

  var counter = 0;
  var processCounter = 0;

  $(".processing-image").attr("src", "images/processing-moving1.gif");

  var id = setInterval(processing, 10);

  function processing() {
    if (processCounter === ((processingNumber * 100) + processingNumber)) {
      clearInterval(id);
      counter = 0;
      processCounter = 0;
      result();
    } else {
      $(".percentage").text(counter + "%");
      counter++;

      if (counter === 101) {
        counter = 0;
      }

      processCounter++;
    }
  }

  function result() {
    $("#cbtn").prop('disabled', true);
    $(".processing-image").attr("src", "images/processing-still.gif");
    $(".percentage").text(percentageNumber + "%");

    console.log($(".percentage").width());

    $(".percentage").animate({
      fontSize: "+=200%",
    }, 2000, resultInterpretation);

    $(".processing-image").fadeOut(2000);

  }

  function resultInterpretation() {
    if (percentageNumber > 50) {
      $(".processing-image").attr("src", "images/heart-beat.gif");
    } else if (percentageNumber <= 50) {
      $(".processing-image").attr("src", "images/heart-break.gif");
    }

    $(".processing-image").attr("class", "result-image");
    $(".result-image").fadeIn(1000,step1);

    $(".floating-percentage").text(percentageNumber + "%");
    if (percentageNumber > 50) {
      $(".result-description").text(
      "In love, either it works out or it doesn't. There's no in between. And the " +
      "love between these two people will flourish. They are meant to be together. " +
      "Our professional advice is for these two to stick with what they have and to " +
      "fight through whatever problems they have to make this work. Good luck on " +
      "your journey together.");
    } else if (percentageNumber <= 50) {
      $(".result-description").text(
      "In love, either it works out or it doesn't. There's no in between. And the " +
      "love between these two people is not going to last. Or is there even love " +
      "in the first place? These two need to ask themselves that. Our professional " +
      "advice is for these two couples to go there separate ways and find their true " +
      "love. Don't worry, it's out there.");
    }

  }

  function step1() {
    $(".percentage").slideUp(1500,step2);
  }
  function step2() {

    $("#description").animate({opacity: 1},2000,step3);
  }

  function step3() {
    $('#cbtn').prop('disabled', false);
    step4();
  }

  function step4() {
    $("form")[0].reset();
  }

  clickedBefore = true;
}

function reset() {
  $(".percentage").text("0%");
  $("#description").slideUp(2000,reset1);

  function reset1() {
    $("#description").css("opacity","0");
    $("#description").slideDown(1000);
    $(".floating-percentage").text("");
    $(".result-description").text("");
    $(".percentage").slideDown(1000,reset2);
  }

  function reset2() {
    $(".result-image").fadeOut(1000,reset3);
  }

  function reset3() {
      $(".result-image").attr("class", "processing-image");
      $(".processing-image").attr("src", "images/processing-still.gif");
      $(".processing-image").fadeIn(1000,reset4);
  }

  function reset4() {
    $(".percentage").animate({
      fontSize: "-=200%",
    }, 1000,calculator);
  }
}
