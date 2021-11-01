/*      
    
     =====   Table Content ====

*/

'use strict';

//menu js

$('.menu-bar').on('click', function () {
  $('.offcanves-menu, .offcanvas-overlay').addClass('active');
});
$('.close, .offcanvas-overlay').on('click', function () {
  $('.offcanves-menu, .offcanvas-overlay').removeClass('active');
});

// End menu

$('.accordion .accordion-head').click(function () {
  if ($(this).next('div').is(':visible')) {
    $(this).next('div').slideUp('normal');
    $(this).find('i').removeClass('arrow-open').addClass('arrow-close');
  } else if ($(this).next('div').is(':hidden')) {
    $(this).next('div').slideDown('normal');
    $(this).find('i').removeClass('arrow-close').addClass('arrow-open');
  } else {
    $('.accordion-body').slideUp('normal');
    $(this).next('div').slideToggle('normal');
    $(this).find('i').removeClass('arrow-open').addClass('arrow-close');
  }
});

//this month form

$('.custom-select').each(function () {
  var classes = $(this).attr('class'),
    id = $(this).attr('id'),
    name = $(this).attr('name');
  var template = '<div class="' + classes + '">';
  template +=
    '<span class="custom-select-trigger">' + $(this).attr('placeholder') + '</span>';
  template += '<div class="custom-options">';
  $(this)
    .find('option')
    .each(function () {
      template +=
        '<span class="custom-option ' +
        $(this).attr('class') +
        '" data-value="' +
        $(this).attr('value') +
        '">' +
        $(this).html() +
        '</span>';
    });
  template += '</div></div>';

  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$('.custom-option:first-of-type').hover(
  function () {
    $(this).parents('.custom-options').addClass('option-hover');
  },
  function () {
    $(this).parents('.custom-options').removeClass('option-hover');
  },
);
$('.custom-select-trigger').on('click', function () {
  $('html').one('click', function () {
    $('.custom-select').removeClass('opened');
  });
  $(this).parents('.custom-select').toggleClass('opened');
  event.stopPropagation();
});
$('.custom-option').on('click', function () {
  $(this).parents('.custom-select-wrapper').find('select').val($(this).data('value'));
  $(this).parents('.custom-options').find('.custom-option').removeClass('selection');
  $(this).addClass('selection');
  $(this).parents('.custom-select').removeClass('opened');
  $(this).parents('.custom-select').find('.custom-select-trigger').text($(this).text());
});

// animateDisplay = function(target, animationClass, displayType, timeout) {
//   // timeout should be longer than css transition
//   var doneTimedDisplay = false,
//     displaying = false;

//   target.addEventListener('transitionend', function() {
//     if (!target.classList.contains('show')) {
//       target.style.display = 'none';
//     }
//     doneTimedDisplay = true;
//   });
//   if (!target.style.display || target.style.display === 'none') {
//     displaying = true;
//     target.style.display = displayType;
//   } else {
//     displaying = false;
//   }

//   setTimeout(function() {
//     target.classList.toggle(animationClass);
//     doneTimedDisplay = false;
//   }, 10);

//   if (!displaying) {
//     setTimeout(function() {
//       // failsafe for transitioned not firing
//       if (!doneTimedDisplay) {
//         target.style.display = 'none';
//       }
//       doneTimedDisplay = true;
//     }, timeout);
//   }
// };

// range slider

var inputLeft = document.getElementById('input-left');
var inputRight = document.getElementById('input-right');

var thumbLeft = document.querySelector('.slider > .thumb.left');
var thumbRight = document.querySelector('.slider > .thumb.right');
var range = document.querySelector('.slider > .range');

function setLeftValue() {
  var _this = inputLeft,
    min = parseInt(_this.min),
    max = parseInt(_this.max);

  _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

  var percent = ((_this.value - min) / (max - min)) * 100;

  thumbLeft.style.left = percent + '%';
  range.style.left = percent + '%';
}
setLeftValue();

function setRightValue() {
  var _this = inputRight,
    min = parseInt(_this.min),
    max = parseInt(_this.max);

  _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

  var percent = ((_this.value - min) / (max - min)) * 100;

  thumbRight.style.right = 100 - percent + '%';
  range.style.right = 100 - percent + '%';
}
setRightValue();

inputLeft.addEventListener('input', setLeftValue);
inputRight.addEventListener('input', setRightValue);

inputLeft.addEventListener('mouseover', function () {
  thumbLeft.classList.add('hover');
});
inputLeft.addEventListener('mouseout', function () {
  thumbLeft.classList.remove('hover');
});
inputLeft.addEventListener('mousedown', function () {
  thumbLeft.classList.add('active');
});
inputLeft.addEventListener('mouseup', function () {
  thumbLeft.classList.remove('active');
});

inputRight.addEventListener('mouseover', function () {
  thumbRight.classList.add('hover');
});
inputRight.addEventListener('mouseout', function () {
  thumbRight.classList.remove('hover');
});
inputRight.addEventListener('mousedown', function () {
  thumbRight.classList.add('active');
});
inputRight.addEventListener('mouseup', function () {
  thumbRight.classList.remove('active');
});

//chart.js

var areachartUserOption_2s = {
  chart: {
    height: 300,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    area: {
      fillTo: 'origin',
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: { curve: 'smooth', width: 3 },
  series: [
    {
      data: [100, 99, 98, 90, 100, 90, 100, 90, 100, 90, 100, 90],
    },
  ],
  colors: ['#23BD33'],

  tooltip: {
    theme: 'dark',
  },
  grid: {
    show: false,
  },

  fill: {
    type: 'gradient',
    colors: '#23BD33',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.1,
      opacityTo: 0.9,
      stops: [0, 100, 0],
    },
  },
  xaxis: {
    categories: ['Aug 01', 'Aug 10', 'Aug 20', 'Aug 31'],
  },
  padding: {
    top: 100,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

if (document.getElementById('area-chart-user2')) {
  var chart_area_2 = new ApexCharts(
    document.querySelector('#area-chart-user2'),
    areachartUserOption_2s,
  );

  chart_area_2.render();
}

//image uploade

const filterToggle = document.querySelector('.actions-filter');

if (filterToggle) {
  filterToggle.addEventListener('click', function () {
    const sidebar = document.querySelector('.shop-content .col-xl-3');
    const productGallery = document.querySelector('.shop-content .col-xl-9');
    const productContent = document.querySelectorAll('.shop__product-items .col-xl-4');
    sidebar.classList.toggle('d-none');
    productGallery.classList.toggle('col-xl-12');
    filterToggle.classList.toggle('active');
  });
}
