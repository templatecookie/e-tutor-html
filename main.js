// import main scss file
import './src/scss/main.scss'


$(".accordion .accordion-head").click(function () {
    if ($(this).next("div").is(":visible")) {
        $(this).next("div").slideUp("normal");
		$(this).find('i').removeClass('arrow-open').addClass('arrow-close');
    } else if 
        ($(this).next("div").is(":hidden")) {
		$(this).next("div").slideDown("normal");
		$(this).find('i').removeClass('arrow-close').addClass('arrow-open');
    } else {
        $(".accordion-body").slideUp("normal");
        $(this).next("div").slideToggle("normal");
		$(this).find('i').removeClass('arrow-open').addClass('arrow-close');
    }
});


//this month form

$(".custom-select").each(function() {
  var classes = $(this).attr("class"),
    id = $(this).attr("id"),
    name = $(this).attr("name");
  var template = '<div class="' + classes + '">';
  template +=
    '<span class="custom-select-trigger">' +
    $(this).attr("placeholder") +
    "</span>";
  template += '<div class="custom-options">';
  $(this)
    .find("option")
    .each(function() {
      template +=
        '<span class="custom-option ' +
        $(this).attr("class") +
        '" data-value="' +
        $(this).attr("value") +
        '">' +
        $(this).html() +
        "</span>";
    });
  template += "</div></div>";

  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$(".custom-option:first-of-type").hover(
  function() {
    $(this)
      .parents(".custom-options")
      .addClass("option-hover");
  },
  function() {
    $(this)
      .parents(".custom-options")
      .removeClass("option-hover");
  }
);
$(".custom-select-trigger").on("click", function() {
  $("html").one("click", function() {
    $(".custom-select").removeClass("opened");
  });
  $(this)
    .parents(".custom-select")
    .toggleClass("opened");
  event.stopPropagation();
});
$(".custom-option").on("click", function() {
  $(this)
    .parents(".custom-select-wrapper")
    .find("select")
    .val($(this).data("value"));
  $(this)
    .parents(".custom-options")
    .find(".custom-option")
    .removeClass("selection");
  $(this).addClass("selection");
  $(this)
    .parents(".custom-select")
    .removeClass("opened");
  $(this)
    .parents(".custom-select")
    .find(".custom-select-trigger")
    .text($(this).text());
});


animateDisplay = function(target, animationClass, displayType, timeout) {
  // timeout should be longer than css transition
  var doneTimedDisplay = false,
    displaying = false;

  target.addEventListener('transitionend', function() {
    if (!target.classList.contains('show')) {
      target.style.display = 'none';
    }
    doneTimedDisplay = true;
  });
  if (!target.style.display || target.style.display === 'none') {
    displaying = true;
    target.style.display = displayType;
  } else {
    displaying = false;
  }

  setTimeout(function() {
    target.classList.toggle(animationClass);
    doneTimedDisplay = false;
  }, 10);

  if (!displaying) {
    setTimeout(function() {
      // failsafe for transitioned not firing
      if (!doneTimedDisplay) {
        target.style.display = 'none';
      }
      doneTimedDisplay = true;
    }, timeout);
  }
};




// range slider

var inputLeft = document.getElementById("input-left");
var inputRight = document.getElementById("input-right");

var thumbLeft = document.querySelector(".slider > .thumb.left");
var thumbRight = document.querySelector(".slider > .thumb.right");
var range = document.querySelector(".slider > .range");

function setLeftValue() {
	var _this = inputLeft,
		min = parseInt(_this.min),
		max = parseInt(_this.max);

	_this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

	var percent = ((_this.value - min) / (max - min)) * 100;

	thumbLeft.style.left = percent + "%";
	range.style.left = percent + "%";
}
setLeftValue();

function setRightValue() {
	var _this = inputRight,
		min = parseInt(_this.min),
		max = parseInt(_this.max);

	_this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

	var percent = ((_this.value - min) / (max - min)) * 100;

	thumbRight.style.right = (100 - percent) + "%";
	range.style.right = (100 - percent) + "%";
}
setRightValue();

inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);

inputLeft.addEventListener("mouseover", function() {
	thumbLeft.classList.add("hover");
});
inputLeft.addEventListener("mouseout", function() {
	thumbLeft.classList.remove("hover");
});
inputLeft.addEventListener("mousedown", function() {
	thumbLeft.classList.add("active");
});
inputLeft.addEventListener("mouseup", function() {
	thumbLeft.classList.remove("active");
});

inputRight.addEventListener("mouseover", function() {
	thumbRight.classList.add("hover");
});
inputRight.addEventListener("mouseout", function() {
	thumbRight.classList.remove("hover");
});
inputRight.addEventListener("mousedown", function() {
	thumbRight.classList.add("active");
});
inputRight.addEventListener("mouseup", function() {
	thumbRight.classList.remove("active");
});



/* 
    6. Menu 
======================== */





