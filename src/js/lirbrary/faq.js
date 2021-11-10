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
