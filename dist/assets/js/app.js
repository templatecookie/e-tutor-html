"use strict";

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
    }); // End menu
    //notification

    var $menu = $('.notification-icon');
    $(document).mouseup(function (e) {
      if (!$menu.is(e.target) && // if the target of the click isn't the container...
      $menu.has(e.target).length === 0) {
        // ... nor a descendant of the container
        $menu.removeClass('notification-visiable');
      }
    });
    $('.notification-icon').on('click', function (event) {
      event.preventDefault();
      $menu.toggleClass('notification-visiable');
    }); //end notification

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
    }); //this month form

    $('.custom-select').each(function () {
      var classes = $(this).attr('class'),
          id = $(this).attr('id'),
          name = $(this).attr('name');
      var template = '<div class="' + classes + '">';
      template += '<span class="custom-select-trigger">' + $(this).attr('title') + '</span>';
      template += '<div class="custom-options">';
      $(this).find('option').each(function () {
        template += '<span class="custom-option ' + $(this).attr('class') + '" data-value="' + $(this).attr('value') + '">' + $(this).html() + '</span>';
      });
      template += '</div></div>';
      $(this).wrap('<div class="custom-select-wrapper"></div>');
      $(this).hide();
      $(this).after(template);
    });
    $('.custom-option:first-of-type').hover(function () {
      $(this).parents('.custom-options').addClass('option-hover');
    }, function () {
      $(this).parents('.custom-options').removeClass('option-hover');
    });
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
    }); // range slider

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
      var percent = (_this.value - min) / (max - min) * 100;
      thumbLeft.style.left = percent + '%';
      range.style.left = percent + '%';
    }

    function setRightValue() {
      var _this = inputRight,
          min = parseInt(_this.min),
          max = parseInt(_this.max);
      _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);
      var percent = (_this.value - min) / (max - min) * 100;
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
    } //chart.js


    var areachartUserOption_2s = {
      chart: {
        height: 300,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        area: {
          fillTo: 'origin'
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      series: [{
        data: [100, 99, 98, 90, 100, 90, 100, 90, 100, 90, 100, 90]
      }],
      colors: ['#23BD33'],
      tooltip: {
        theme: 'dark'
      },
      grid: {
        show: false
      },
      fill: {
        type: 'gradient',
        colors: '#23BD33',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.1,
          opacityTo: 0.9,
          stops: [0, 100, 0]
        }
      },
      xaxis: {
        categories: ['Aug 01', 'Aug 10', 'Aug 20', 'Aug 31']
      },
      padding: {
        top: 100,
        right: 0,
        bottom: 0,
        left: 0
      }
    };

    if (document.getElementById('area-chart-user2')) {
      var chart_area_2 = new ApexCharts(document.querySelector('#area-chart-user2'), areachartUserOption_2s);
      chart_area_2.render();
    } //image uploade


    var uploader = document.createElement('input'),
        image = document.getElementById('img-result');
    uploader.type = 'file';
    uploader.accept = 'image/*';

    if (image) {
      image.onclick = function () {
        uploader.click();
      };
    }

    uploader.onchange = function () {
      var reader = new FileReader();

      reader.onload = function (evt) {
        image.classList.remove('no-image');
        image.style.backgroundImage = 'url(' + evt.target.result + ')';
        var request = {
          itemtype: 'test 1',
          brand: 'test 2',
          images: [{
            data: evt.target.result
          }]
        };
        document.querySelector('.show-button').style.display = 'block';
        document.querySelector('.upload-result__content').innerHTML = JSON.stringify(request, null, '  ');
      };

      reader.readAsDataURL(uploader.files[0]);
    }; //actions filter


    var filterToggle = document.querySelector('.actions-filter');

    if (filterToggle) {
      filterToggle.addEventListener('click', function () {
        var sidebar = document.querySelector('.shop-content .col-xl-3');
        var productGallery = document.querySelector('.shop-content .col-xl-9');
        var productContent = document.querySelectorAll('.shop__product-items .col-md-6');
        sidebar.classList.toggle('d-none');
        productGallery.classList.toggle('col-xl-12'); // it's will be on 4 column

        productContent.forEach(function (item) {
          if (item.classList.contains('col-xl-4')) {
            item.classList.add('col-xl-3');
            item.classList.remove('col-xl-4');
          } else if (item.classList.contains('col-xl-3')) {
            item.classList.add('col-xl-4');
            item.classList.remove('col-xl-3');
          }
        });
      });
    } // Modals Rating


    var ratingStar = document.querySelector('.my-rating');

    if (ratingStar) {
      $('.my-rating').starRating({
        starSize: 40,
        activeColor: '#FD8E1F',
        hoverColor: '#FD8E1F',
        ratedColors: ['#FD8E1F', '#FD8E1F', '#FD8E1F', '#FD8E1F', '#FD8E1F'],
        starShape: 'rounded'
      });
    } //counter js


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
              countNum: $this.text()
            }).animate({
              countNum: countTo
            }, {
              duration: 4000,
              easing: 'swing',
              step: function step() {
                $this.text(Math.floor(this.countNum));
              },
              complete: function complete() {
                $this.text(this.countNum);
              }
            });
          });
          a = 1;
        }
      });
    } // testimonial owl carousel


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
            nav: false
          },
          600: {
            items: 1
          },
          755: {
            items: 2
          },
          1000: {
            items: 3
          }
        }
      });
    } // category page tools slider js


    var tools_slider = $('.tools-slider');

    if (tools_slider.is_exist()) {
      tools_slider.owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        items: 6,
        navText: ['<img src="assets/images/svg-icon/arrowleft-orange.svg"/>', '<img src="assets/images/svg-icon/arrowright-orange.svg"/>'],
        responsive: {
          0: {
            items: 1,
            nav: false
          },
          500: {
            items: 2
          },
          756: {
            items: 3
          },
          1000: {
            items: 4
          },
          1380: {
            items: 6
          }
        }
      });
    } // bvSelectbox
    // if(document.getElementById()) { }


    if (document.getElementById('activitySelect')) {
      var activity = new BVSelect({
        selector: '#activitySelect'
      });
    }

    if (document.getElementById('revenueSelect')) {
      var revenue = new BVSelect({
        selector: '#revenueSelect'
      });
    }

    if (document.getElementById('viewSelect')) {
      var view = new BVSelect({
        selector: '#viewSelect'
      });
    }

    if (document.getElementById('ratingSelect')) {
      var rating = new BVSelect({
        selector: '#ratingSelect'
      });
    }

    if (document.getElementById('overviewSelect')) {
      var overview = new BVSelect({
        selector: '#overviewSelect'
      });
    }

    if (document.getElementById('categorySelect')) {
      var category = new BVSelect({
        selector: '#categorySelect',
        placeholder: 'Select...'
      });
    }

    if (document.getElementById('subCategorySelect')) {
      var subcategory = new BVSelect({
        selector: '#subCategorySelect',
        placeholder: 'Select...'
      });
    }

    if (document.getElementById('languageSelect')) {
      var language = new BVSelect({
        selector: '#languageSelect',
        placeholder: 'Select...'
      });
    }

    if (document.getElementById('sublanguageSelect')) {
      var sublanguage = new BVSelect({
        selector: '#sublanguageSelect',
        placeholder: 'Select...'
      });
    }

    if (document.getElementById('levelSelect')) {
      var level = new BVSelect({
        selector: '#levelSelect',
        placeholder: 'Select...'
      });
    }

    if (document.getElementById('durationSelect')) {
      var duration = new BVSelect({
        selector: '#durationSelect',
        placeholder: 'Select...'
      });
    }

    if (document.getElementById('teacherSelect')) {
      var teacher = new BVSelect({
        selector: '#teacherSelect',
        placeholder: 'Select...'
      });
    } // Apex Chart


    if (document.getElementById('revenueChart')) {
      var revenueChart = new ApexCharts(document.querySelector('#revenueChart'), {
        chart: {
          width: '100%',
          height: 400,
          type: 'area',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          area: {
            fillTo: 'origin'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        series: [{
          data: [80, 105, 90, 98, 60, 120, 150, 90, 60, 30, 20, 10, 75]
        }],
        colors: ['#564FFD'],
        tooltip: {
          theme: 'dark'
        },
        grid: {
          show: false
        },
        fill: {
          type: 'gradient',
          colors: '#564FFD',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.1,
            opacityTo: 0.9,
            stops: [0, 100, 0]
          }
        },
        xaxis: {
          labels: {
            style: {
              colors: '#A1A5B3',
              fontSize: '12px'
            }
          },
          categories: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr']
        },
        yaxis: {
          labels: {
            style: {
              colors: '#A1A5B3',
              fontSize: '12px'
            }
          }
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
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
            show: false
          },
          offsetX: 0,
          offsetY: 0,
          zoom: {
            enabled: false
          },
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          area: {
            fillTo: 'origin'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        series: [{
          data: [70, 100, 50, 80, 70, 100, 70]
        }],
        colors: ['#FD8E1F'],
        tooltip: {
          theme: 'light'
        },
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        },
        yaxis: {
          show: false
        },
        fill: {
          type: 'solid',
          opacity: [0.2, 1]
        },
        xaxis: {
          low: 0,
          offsetX: 0,
          offsetY: 0,
          show: false,
          labels: {
            low: 0,
            offsetX: 0,
            show: false
          },
          axisBorder: {
            low: 0,
            offsetX: 0,
            show: false
          }
        },
        legend: {
          show: false
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
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
            show: false
          },
          offsetX: 0,
          offsetY: 0,
          zoom: {
            enabled: true
          },
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '50px',
            barHeight: '100%',
            borderRadius: 0,
            distributed: false,
            rangeBarOverlap: true,
            rangeBarGroupRows: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 1
        },
        series: [{
          data: [1000, 400, 1000, 600, 700, 400, 800, 600, 800]
        }, {
          data: [900, 600, 150, 400, 450, 700, 400, 100, 300]
        }],
        colors: ['#23BD33', 'rgba(35, 189, 51, 0.1)'],
        tooltip: {
          theme: 'dark'
        },
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        },
        yaxis: {
          show: false
        },
        fill: {
          type: 'solid',
          opacity: [1, 1]
        },
        xaxis: {
          low: 0,
          offsetX: 0,
          offsetY: 0,
          show: false,
          labels: {
            low: 0,
            offsetX: 0,
            show: false
          },
          axisBorder: {
            low: 0,
            offsetX: 0,
            show: false
          }
        }
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
            show: false
          },
          offsetX: 0,
          offsetY: 0,
          zoom: {
            enabled: false
          },
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        series: [{
          type: 'area',
          data: [400, 600, 1000, 800, 600, 1000, 800]
        }, {
          type: 'line',
          data: [1000, 800, 600, 900, 1200, 1000, 400]
        }],
        colors: ['#564FFD', '#FF6636'],
        tooltip: {
          theme: 'dark'
        },
        grid: {
          padding: {
            left: 20,
            right: 20,
            bottom: 0
          }
        },
        yaxis: {
          show: false,
          labels: {
            show: false
          }
        },
        fill: {
          colors: '#564FFD',
          type: 'gradient'
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
            show: false
          },
          axisBorder: {
            low: 0,
            offsetX: 0,
            show: false
          }
        },
        legend: {
          show: false
        }
      });
      overviewChart.render();
    }

    if (document.getElementById('overviewChart2')) {
      var overviewChart = new ApexCharts(document.querySelector('#overviewChart2'), {
        chart: {
          height: 340,
          type: 'area',
          toolbar: {
            autoSelected: 'pan',
            show: false
          },
          offsetX: 0,
          offsetY: 0,
          zoom: {
            enabled: false
          },
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        series: [{
          type: 'area',
          data: [400, 600, 1000, 800, 600, 1000, 800]
        }, {
          type: 'line',
          data: [1000, 800, 600, 900, 1200, 1000, 400]
        }],
        colors: ['#564FFD', '#FF6636'],
        tooltip: {
          theme: 'dark'
        },
        grid: {
          padding: {
            left: 20,
            right: 20,
            bottom: 0
          }
        },
        yaxis: {
          show: false,
          labels: {
            show: false
          }
        },
        fill: {
          colors: '#564FFD',
          type: 'gradient'
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
            show: false
          },
          axisBorder: {
            low: 0,
            offsetX: 0,
            show: false
          }
        },
        legend: {
          show: false
        }
      });
      overviewChart.render();
    } // Slider
    // if(document.getElementById()) { }
    // if(document.getElementsByClassName()) { }


    var testimonial2_slider = $('.testimonial2-slider');

    if (testimonial2_slider.is_exist()) {
      testimonial2_slider.owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: false,
        items: 1,
        navText: ['<img src="assets/images/svg-icon/arrowleft-orange.svg"/>', '<img src="assets/images/svg-icon/arrowright-orange.svg"/>']
      });
      var selector = $('.owl-carousel');
      $('.my-next-button').click(function () {
        selector.trigger('next.owl.carousel');
      });
      $('.my-prev-button').click(function () {
        selector.trigger('prev.owl.carousel');
      });
    } // Editor


    var hasckeditor = document.getElementById('editorDes');

    if (hasckeditor) {
      ClassicEditor.create(document.querySelector('#editorDes'), {
        toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', 'underline']
      })["catch"](function (error) {
        console.error(error);
      });
    } // body scroll single course page


    if ($('.student-profile-menu ul li a').length > 0) {
      $('.student-profile-menu ul li a').click(function (e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        $('body , html').animate({
          scrollTop: target.offset().top
        }, 500);
      });
    } // single course page popup js


    var popup_youtube = $('.popup-youtube');

    if (popup_youtube.is_exist()) {
      popup_youtube.magnificPopup({
        type: 'iframe'
      });
    } // lecture slider student dashed board


    var lecture_slider = $('.lecture-slider');

    if (lecture_slider.is_exist()) {
      lecture_slider.owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        items: 4,
        navText: ['<img src="assets/images/svg-icon/arrowleft-orange.svg"/>', '<img src="assets/images/svg-icon/arrowright-orange.svg"/>'],
        responsive: {
          0: {
            items: 1,
            nav: false
          },
          600: {
            items: 1
          },
          755: {
            items: 2
          },
          1000: {
            items: 3
          },
          1380: {
            items: 3
          },
          1400: {
            items: 4
          }
        }
      });
    }

    if ($(".payment-card-slider").length > 0) {
      $('.payment-card-slider').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        items: 1,
        navText: ["<img src=\"assets/images/svg-icon/arrowleft-orange.svg\"/>", "<img src=\"assets/images/svg-icon/arrowright-orange.svg\"/>"]
      });
      var selector = $('.owl-carousel');
      $('.card-next-button').click(function () {
        selector.trigger('next.owl.carousel');
      });
      $('.card-prev-button').click(function () {
        selector.trigger('prev.owl.carousel');
      });
    } //map js contact page


    var google_map = $('#map');

    if (google_map.is_exist()) {
      var init = function init() {
        var mapOptions = {
          zoom: 11,
          scrollwheel: false,
          navigationControl: false,
          mapTypeControl: false,
          scaleControl: false,
          draggable: true,
          disableDefaultUI: true,
          center: new google.maps.LatLng(40.67, -73.94),
          styles: [{
            featureType: 'landscape.man_made',
            elementType: 'geometry',
            stylers: [{
              color: '#f7f1df'
            }]
          }, {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{
              color: '#d0e3b4'
            }]
          }, {
            featureType: 'landscape.natural.terrain',
            elementType: 'geometry',
            stylers: [{
              visibility: 'off'
            }]
          }, {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{
              visibility: 'off'
            }]
          }, {
            featureType: 'poi.business',
            elementType: 'all',
            stylers: [{
              visibility: 'off'
            }]
          }, {
            featureType: 'poi.medical',
            elementType: 'geometry',
            stylers: [{
              color: '#fbd3da'
            }]
          }, {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{
              color: '#bde6ab'
            }]
          }, {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{
              visibility: 'off'
            }]
          }, {
            featureType: 'road',
            elementType: 'labels',
            stylers: [{
              visibility: 'off'
            }]
          }, {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{
              color: '#ffe15f'
            }]
          }, {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{
              color: '#efd151'
            }]
          }, {
            featureType: 'road.arterial',
            elementType: 'geometry.fill',
            stylers: [{
              color: '#ffffff'
            }]
          }, {
            featureType: 'road.local',
            elementType: 'geometry.fill',
            stylers: [{
              color: 'black'
            }]
          }, {
            featureType: 'transit.station.airport',
            elementType: 'geometry.fill',
            stylers: [{
              color: '#cfb2db'
            }]
          }, {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{
              color: '#a2daf2'
            }]
          }]
        };
        var mapElement = document.getElementById('map');
        var map = new google.maps.Map(mapElement, mapOptions); // let marker;
        // marker.setAnimation(google.maps.Animation.BOUNCE);
        // setTimeout(function () {
        //   marker.setAnimation(null);
        // }, 750); //time it takes for one bounce
        // google.maps.event.addListener(marker, 'click', function () {
        //   infowindow.open(map, marker);
        // });
      };

      google.maps.event.addDomListener(window, 'load', init);
    }
  });
  /*End document ready*/
})(jQuery);