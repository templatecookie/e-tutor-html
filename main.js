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