
// faq page
var faq_init1 = function (el, multiple) {
  this.el = el || {};
  this.multiple = multiple || false;
  var link = this.el.find('.link');
  link.on(
    'click',
    {
      el: this.el,
      multiple: this.multiple,
    },
    this.dropdown,
  );
};

faq_init1.prototype.dropdown = function (e) {
  var $el = e.data.el;
  ($this = $(this)), ($next = $this.next());
  $next.slideToggle();
  $this.parent().toggleClass('open');
  if (!e.data.multiple) {
    $el.find('.accordion-body-text').not($next).slideUp().parent().removeClass('open');
  }
};

var faq_init1 = new faq_init1($('.faq_init1'), false);


// student dashedborad purchaces history

var faq_init2 = function (el, multiple) {
  this.el = el || {};
  this.multiple = multiple || false;
  var link = this.el.find(".link");
  link.on(
      "click",
      {
          el: this.el,
          multiple: this.multiple,
      },
      this.dropdown
  );
};
faq_init2.prototype.dropdown = function (e) {
  var $el = e.data.el;
  ($this = $(this)), ($next = $this.next());
  $next.slideToggle();
  $this.parent().toggleClass("open");
  if (!e.data.multiple) {
      $el.find(".accordion-body-text").not($next).slideUp().parent().removeClass("open");
  }
};
var faq_init2 = new faq_init2($("#faq_init2"), false);

// single course

var faq_init3 = function (el, multiple) {
  this.el = el || {};
  this.multiple = multiple || false;
  var link = this.el.find('.link');
  link.on('click', {
     el: this.el,
     multiple: this.multiple
  }, this.dropdown)
}
faq_init3.prototype.dropdown = function (e) {
  var $el = e.data.el;
  $this = $(this),
     $next = $this.next();
  $next.slideToggle();
  $this.parent().toggleClass('open');
  if (!e.data.multiple) {
     $el.find('.accordion-body-text').not($next).slideUp().parent().removeClass('open');
  }
}
var faq_init3 = new faq_init3($('#faq_init3'), false);


