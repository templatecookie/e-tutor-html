(function ($) {
  'use strict';

  /*------------------------------------------------------------------
  [Table of contents]

  
  -------------------------------------------------------------------*/

  /*--------------------------------------------------------------
  1.CUSTOM PRE DEFINE FUNCTION
  ------------------------------------------------------------*/
  /* is_exist() */
  jQuery.fn.is_exist = function () {
    return this.length;
  };

  $(function () {

    $('.menu-bar').on('click', function () {
      $('.offcanves-menu, .offcanvas-overlay').addClass('active');
    });
    $('.close, .offcanvas-overlay').on('click', function () {
      $('.offcanves-menu, .offcanvas-overlay').removeClass('active');
    });

    // End menu

    //notification

      var button = document.querySelector('.notification-icon');
      var box = document.querySelector('.card-activity');
      button.addEventListener('click', function(event) {
        event.preventDefault();
      box.classList.toggle('notification-visiable');
  
    });
    //end notification

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
        '<span class="custom-select-trigger">' + $(this).attr('title') + '</span>';
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
      $(this)
        .parents('.custom-select')
        .find('.custom-select-trigger')
        .text($(this).text());
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

    function setRightValue() {
      var _this = inputRight,
        min = parseInt(_this.min),
        max = parseInt(_this.max);

      _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

      var percent = ((_this.value - min) / (max - min)) * 100;

      thumbRight.style.right = 100 - percent + '%';
      range.style.right = 100 - percent + '%';
    }

    if (inputLeft) {
      inputLeft.addEventListener('input', setLeftValue);

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

      setLeftValue();
    }

    if (inputRight) {
      inputRight.addEventListener('input', setRightValue);
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
      setRightValue();
    }

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
        const productContent = document.querySelectorAll(
          '.shop__product-items .col-xl-4',
        );
        sidebar.classList.toggle('d-none');
        productGallery.classList.toggle('col-xl-12');
        filterToggle.classList.toggle('active');
      });
    }

    // Modals Rating
    const ratingStar = document.querySelector('.my-rating');
    if (ratingStar) {
      $('.my-rating').starRating({
        starSize: 40,
        activeColor: '#FD8E1F',
        hoverColor: '#FD8E1F',
        ratedColors: ['#FD8E1F', '#FD8E1F', '#FD8E1F', '#FD8E1F', '#FD8E1F'],
        starShape: 'rounded',
      });
    }

    //counter js
    var etutor_counter = $('#etutor-counter');
    if (etutor_counter.is_exist()) {
      var a = 0;
      $(window).scroll(function () {
        var oTop = $(etutor_counter).offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
          $('.etutor-counter').each(function () {
            var $this = $(this),
              countTo = $this.attr('data-percentage');
            $({
              countNum: $this.text(),
            }).animate(
              {
                countNum: countTo,
              },
              {
                duration: 4000,
                easing: 'swing',
                step: function () {
                  $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                  $this.text(this.countNum);
                },
              },
            );
          });
          a = 1;
        }
      });
    }

    // testimonial owl carousel
    var testimonial_slider = $('.testimonial-slider');
    if (testimonial_slider.is_exist()) {
      testimonial_slider.owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: false,
        autoplay: true,
        items: 3,
        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          600: {
            items: 1,
          },
          755: {
            items: 2,
          },
          1000: {
            items: 3,
          },
        },
      });
    }

    // category page tools slider js
    var tools_slider = $('.tools-slider');
    if (tools_slider.is_exist()) {
      tools_slider.owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        items: 6,
        navText: [
          '<img src="src/images/svg-icon/arrowleft-orange.svg"/>',
          '<img src="src/images/svg-icon/arrowright-orange.svg"/>',
        ],
        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          500: {
            items: 2,
          },
          756: {
            items: 3,
          },
          1000: {
            items: 4,
          },
          1380: {
            items: 6,
          },
        },
      });
    }

    // bvSelectbox
    // if(document.getElementById()) { }

    if (document.getElementById('activitySelect')) {
      var activity = new BVSelect({
        selector: '#activitySelect',
      });
    }
    if (document.getElementById('revenueSelect')) {
      var revenue = new BVSelect({
        selector: '#revenueSelect',
      });
    }
    if (document.getElementById('viewSelect')) {
      var view = new BVSelect({
        selector: '#viewSelect',
      });
    }
    if (document.getElementById('ratingSelect')) {
      var rating = new BVSelect({
        selector: '#ratingSelect',
      });
    }
    if (document.getElementById('overviewSelect')) {
      var overview = new BVSelect({
        selector: '#overviewSelect',
      });
    }
    if (document.getElementById('categorySelect')) {
      var category = new BVSelect({
        selector: '#categorySelect',
        placeholder: 'Select...',
      });
    }

    if (document.getElementById('subCategorySelect')) {
      var subcategory = new BVSelect({
        selector: '#subCategorySelect',
        placeholder: 'Select...',
      });
    }
    if (document.getElementById('languageSelect')) {
      var language = new BVSelect({
        selector: '#languageSelect',
        placeholder: 'Select...',
      });
    }
    if (document.getElementById('sublanguageSelect')) {
      var sublanguage = new BVSelect({
        selector: '#sublanguageSelect',
        placeholder: 'Select...',
      });
    }
    if (document.getElementById('levelSelect')) {
      var level = new BVSelect({
        selector: '#levelSelect',
        placeholder: 'Select...',
      });
    }
    if (document.getElementById('durationSelect')) {
      var duration = new BVSelect({
        selector: '#durationSelect',
        placeholder: 'Select...',
      });
    }

    // Apex Chart
    if (document.getElementById('revenueChart')) {
      var revenueChart = new ApexCharts(document.querySelector('#revenueChart'), {
        chart: {
          width: '100%',
          height: 350,
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
          enabled: false,
        },
        stroke: { curve: 'smooth', width: 3 },
        series: [
          {
            data: [80, 105, 90, 98, 60, 120, 150, 90, 60, 30, 20, 10, 75],
          },
        ],
        colors: ['#564FFD'],

        tooltip: {
          theme: 'dark',
        },
        grid: {
          show: false,
        },

        fill: {
          type: 'gradient',
          colors: '#564FFD',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.1,
            opacityTo: 0.9,
            stops: [0, 100, 0],
          },
        },
        xaxis: {
          labels: {
            style: {
              colors: '#A1A5B3',
              fontSize: '12px',
            },
          },
          categories: [
            'Su',
            'Mo',
            'Tu',
            'We',
            'Th',
            'Fr',
            'Sa',
            'Su',
            'Mo',
            'Tu',
            'We',
            'Th',
            'Fr',
          ],
        },
        yaxis: {
          labels: {
            style: {
              colors: '#A1A5B3',
              fontSize: '12px',
            },
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      });

      revenueChart.render();
    }

    if (document.getElementById('ratingChart')) {
      var ratingChart = new ApexCharts(document.querySelector('#ratingChart'), {
        chart: {
          height: '100%',
          type: 'area',
          toolbar: {
            autoSelected: 'pan',
            show: false,
          },
          offsetX: 0,
          offsetY: 0,
          zoom: {
            enabled: false,
          },
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          area: {
            fillTo: 'origin',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: { curve: 'smooth', width: 3 },
        series: [
          {
            data: [70, 100, 50, 80, 70, 100, 70],
          },
        ],
        colors: ['#FD8E1F'],

        tooltip: {
          theme: 'light',
        },
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0,
          },
        },
        yaxis: {
          show: false,
        },
        fill: {
          type: 'solid',
          opacity: [0.2, 1],
        },
        xaxis: {
          low: 0,
          offsetX: 0,
          offsetY: 0,
          show: false,
          labels: {
            low: 0,
            offsetX: 0,
            show: false,
          },
          axisBorder: {
            low: 0,
            offsetX: 0,
            show: false,
          },
        },
        legend: {
          show: false,
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      });

      ratingChart.render();
    }

    if (document.getElementById('viewChart')) {
      var viewChart = new ApexCharts(document.querySelector('#viewChart'), {
        chart: {
          height: '100%',
          type: 'bar',
          stacked: true,
          stackType: '100%',
          toolbar: {
            autoSelected: 'pan',
            show: false,
          },
          offsetX: 0,
          offsetY: 0,
          zoom: {
            enabled: true,
          },
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: '50px',
            barHeight: '100%',
            borderRadius: 0,
            distributed: false,
            rangeBarOverlap: true,
            rangeBarGroupRows: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: { curve: 'smooth', width: 1 },
        series: [
          {
            data: [1000, 400, 1000, 600, 700, 400, 800, 600, 800],
          },
          {
            data: [900, 600, 150, 400, 450, 700, 400, 100, 300],
          },
        ],
        colors: ['#23BD33', 'rgba(35, 189, 51, 0.1)'],

        tooltip: {
          theme: 'dark',
        },
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0,
          },
        },
        yaxis: {
          show: false,
        },
        fill: {
          type: 'solid',
          opacity: [1, 1],
        },
        xaxis: {
          low: 0,
          offsetX: 0,
          offsetY: 0,
          show: false,
          labels: {
            low: 0,
            offsetX: 0,
            show: false,
          },
          axisBorder: {
            low: 0,
            offsetX: 0,
            show: false,
          },
        },
      });

      viewChart.render();
    }
    if (document.getElementById('overviewChart')) {
      var overviewChart = new ApexCharts(document.querySelector('#overviewChart'), {
        chart: {
          height: 450,
          type: 'area',
          toolbar: {
            autoSelected: 'pan',
            show: false,
          },
          offsetX: 0,
          offsetY: 0,
          zoom: {
            enabled: false,
          },
          sparkline: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: { curve: 'smooth', width: 3 },
        series: [
          {
            type: 'area',

            data: [400, 600, 1000, 800, 600, 1000, 800],
          },
          {
            type: 'line',
            data: [1000, 800, 600, 900, 1200, 1000, 400],
          },
        ],
        colors: ['#564FFD', '#FF6636'],
        tooltip: {
          theme: 'dark',
        },
        grid: {
          padding: {
            left: 20,
            right: 20,
            bottom: 0,
          },
        },
        yaxis: {
          show: false,
          labels: {
            show: false,
          },
        },
        fill: {
          colors: '#564FFD',
          type: 'gradient',
        },
        xaxis: {
          categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
          low: 0,
          offsetX: 0,
          offsetY: 0,
          show: false,
          labels: {
            low: 0,
            offsetX: 0,
            show: false,
          },
          axisBorder: {
            low: 0,
            offsetX: 0,
            show: false,
          },
        },
        legend: {
          show: false,
        },
      });

      overviewChart.render();
    }

    // Tabs
    // const totalTabs = $('.nav-pills li').length;
    // let currentTab = 1;

    // // Next Action
    // $('.button-next').click(function (e) {
    //   e.preventDefault();
    //   currentTab += 1;
    //   showHideControls();
    //   let nextTab = $('.nav-pills li').next('li').find('button');
    //   if (nextTab.length > 0) {
    //     nextTab.trigger('click');
    //   }
    //   // console.log(currentTab);
    //   // console.log(totalTabs);
    // });
    // // PrevAction
    // $('.button-prev').click(function (e) {
    //   e.preventDefault();
    //   currentTab -= 1;
    //   let prevTab = $('.nav-pills li').next('li').find('button');
    //   console.log(prevTab);
    //   if (prevTab.length > 0) {
    //     prevTab.trigger('click');
    //   }
    //   console.log('click');
    //   // console.log(currentTab);
    //   // console.log(totalTabs);
    // });

    // // HideControls
    // function showHideControls() {
    //   if (currentTab === 1) {
    //     $('.button-prev').hide();
    //   } else if (currentTab === totalTabs) {
    //     $('.button-next').hide();
    //   } else {
    //     $('.button-prev').show();
    //     $('.button-next').show();
    //   }
    // }
    // let prevTab = $('.nav-pills .active').next('li').find('button');
  }); /*End document ready*/
})(jQuery);
