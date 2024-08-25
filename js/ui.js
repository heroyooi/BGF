var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
var runToast = false;

$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results == null){
    return null;
  }
  else {
    return decodeURI(results[1]) || 0;
  }
}

if ($.datepicker) {
  $.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    // changeYear: true,
    // changeMonth: true,
    dayNamesMin: ['일','월','화','수','목','금','토'],
    monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    showOtherMonths: true,
    yearSuffix: '',
  });
}

var GUI = window.GUI || (function(){
  return {
    init: function(){
      GUI.baseUI($(document));

      AOS.init({ // https://github.com/michalsnik/aos#1-initialize-aos
        duration: 600,
        once: true,
      });
    },
    baseUI: function($this){
      var _ = $this;
      var $win = $(window);
      var $header = _.find('#header');

      var inputUI = _.find('.input-base');
      var inputCountUI = _.find('.input-wrap.w-count');
      var calendarUI = _.find('.datepicker');
      var selectUI = _.find(".select-base");
      var csSelectUI = _.find('.select-box');
      var tabUI = _.find('.tab-base');
      var popupUI = _.find('.popup-wrap');
      var csPopupUI = _.find('.cs-popup-wrap');
      var textareaCountUI = _.find('.textarea-base');
      var tbScrollUI = _.find('.tb-scroll');

      var dp1 = $('.lnb').data('dp1');
      var dp2 = $('.lnb').data('dp2');

      if (dp1) {
        // $('.lnb > li').eq(dp1 - 1).addClass('active');
        $('.lnb > li').eq(dp1 - 1).addClass('on');
        if (dp2) {
          // $('.lnb > li').eq(dp1 - 1).find('dd li').eq(dp2 - 1).addClass('active');
          $('.lnb > li').eq(dp1 - 1).find('dd li').eq(dp2 - 1).addClass('on');
        }
      }

      var menuSwiper = new Swiper('.menu-swiper', {
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
      });
      $('.menu-swiper .swiper-slide a').on('click', function(e){
        e.preventDefault();
        $(this).closest('.swiper-slide').addClass('on');
        $(this).closest('.swiper-slide').siblings().removeClass('on');
        menuSwiper.slideTo($('.menu-swiper .swiper-slide a').index(this));
      });

      $('.tit-area .item-wrap a.mem').on('click', function(){
        var $tip = $(this).next('.utils-tip');
        if (!$tip.hasClass('on')) {
          $(this).addClass('on');
          $tip.addClass('on');
        } else {
          $(this).removeClass('on');
          $tip.removeClass('on');
        }
      });
      $('.lnb li dt').on('click', function(){
        if (!$(this).closest('li').hasClass('on')) {
          $(this).closest('li').addClass('on');
          $(this).closest('li').siblings().removeClass('on');
        } else {
          $(this).closest('li').removeClass('on');
        }
      });
      $('.lnb-wrap .btn-arrow').on('click', function(e){
        e.preventDefault();
        if (!$('#container').hasClass('ver-collapse')) {
          $('#container').addClass('ver-collapse')
        } else {
          $('#container').removeClass('ver-collapse')
        }
      });
      $('.btn-toggle').on('click', function(e){
        e.preventDefault();
        if ($(this).hasClass('disabled')) {
          return;
        }
        if (!$(this).hasClass('on')) {
          $(this).addClass('on');
        } else {
          $(this).removeClass('on');
        }
      });

      if (inputCountUI.length) {
        inputCountUI.each(function(){
          var $input = $(this).find('.input-base');
          var $inputCount = $(this).find('.tx-count'); 
          var $inputTotal = Number($inputCount.text().split('/')[1]);
          var inputMemo = null;

          $input.on('keyup', function(){
            if ($(this).val().length > $inputTotal) {
              $(this).val(inputMemo)
            } else {
              inputMemo = $(this).val();
            }
            $inputCount.find('em').text($(this).val().length);
          })
        })
      }
      if (textareaCountUI.length) {
        textareaCountUI.each(function(){
          var $textarea = $(this);
          var $textareaCount = $(this).closest('.textarea-wrap').find('.tx-count');
          var $textareaTotal = Number($textareaCount.text().split('/')[1]);
          var textareaMemo = null;

          $textarea.on('keyup', function(){
            if ($(this).val().length > $textareaTotal) {
              $(this).val(textareaMemo)
            } else {
              textareaMemo = $(this).val();
            }
            $textareaCount.find('em').text($(this).val().length);
          })
        })
      }
      if (inputUI.length) {
        inputUI.each(function(){
          if ($(this).val().length) {
            $(this).next('.tip').hide();
          }
        })
        inputUI.on('keyup', function(){
          if ($(this).val().length) {
            $(this).next('.tip').hide();
          } else {
            $(this).next('.tip').show();
          }
        });
        inputUI.closest('.input-wrap').find('.btn-del').on('click', function(){
          $(this).prev('.input-base').val('').focus();
        })
      }
      if (calendarUI.length) {
        _.find('.datepicker').datepicker({
          showOn:"button",
          buttonImage: "img/icon/calendar.svg", // type 2
          onChangeMonthYear: function(year, month, inst) {
            setTimeout(function() {
                var dateText = (month < 10 ? '0' + month : month) + '.' + year;
                $(".ui-datepicker-title").text(dateText);
            }, 1);
          },
          beforeShow: function(input, inst) {
            $('#ui-datepicker-div').addClass('s-datepicker');
            setTimeout(function() {
                var month = inst.selectedMonth + 1;
                var year = inst.selectedYear;
                var dateText = (month < 10 ? '0' + month : month) + '.' + year;
                $(".ui-datepicker-title").text(dateText);
            }, 1);
          }
        });
      }
      if (selectUI.length) {
        selectUI.find('select').each(function(){
          if ($(this).closest('.select-base').hasClass('disabled')) {
            return true;
          }
          if ($(this).find('option:eq(0)').attr('value') === undefined) {
            $(this).find('option:eq(0)').val(0);
          }
          if (parseInt($(this).val()) === 0) {
            $(this).closest('.select-base').removeClass('active');
          } else {
            $(this).closest('.select-base').addClass('active');
          }
        });
        selectUI.find('select').on("change",function(){
          if ($(this).closest('.select-base').hasClass('disabled')) {
            return true;
          }
          if (parseInt($(this).val()) === 0) {
            $(this).closest('.select-base').removeClass('active');
          } else {
            $(this).closest('.select-base').addClass('active');
          }
          $(this).prev().html($(this).find("option:selected").text());
        }).prev().html(function() {
          return $(this).next().find("option:selected").text();
        });
      }
      if (csSelectUI.length) {
        csSelectUI.each(function(){
          if ($(this).data('active')) {
            var activeIndex = $(this).find('li').eq($(this).data('active') - 1);
            if (activeIndex.text() !== '선택') {
              $(this).addClass('active');
            }
            activeIndex.addClass('on');          
            if (activeIndex.text() === '') {
              return;
            } else {
              $(this).find('.value').text(activeIndex.text());
            }
          }
        })
        csSelectUI.find('.value').on('click', function(e){
          e.preventDefault();
          var $target = $(this).closest('.select-box');
          if ($target.hasClass('disabled')) {
            return;
          }
          if (!$target.hasClass('on')) {
            $('.select-box').removeClass('on');
            $target.addClass('on');
          } else {
            $target.removeClass('on');
          }
        });
        csSelectUI.find('li a').on('click', function(e){
          e.preventDefault();
          if ($(this).text() === '선택') {
            $(this).closest('.select-box').removeClass('active');
          } else {
            $(this).closest('.select-box').addClass('active');
          }
          $(this).closest('li').addClass('on');
          $(this).closest('li').siblings().removeClass('on');
          var $target = $(this).closest('.select-box');
          $target.data('active', parseInt($(this).closest('li').index()) + 1);
          $target.find('.value:not(.fixed)').text($(this).text());
          $target.removeClass('on');
        })
      }
      if (tabUI.length) {
        tabUI.each(function(){
          var target = $(this).find('li.on').find('a').attr('href');
          $(target).show();
        })
        tabUI.find('a').on('click', function(e){
          e.preventDefault();
          var target = $(this).attr('href');
          $(this).closest('li').addClass('on');
          $(this).closest('li').siblings().removeClass('on');
          $(target).show();
          $(target).siblings().hide();
        });
      }
      if (popupUI.length) {
        var posY = null;
        var magnificPopupConfiguration = function() {
          return {
            beforeOpen: function() {
              posY = window.pageYOffset;
              $('html').css('overflow', 'hidden');
              $('body').css({'position': 'fixed', 'top': -posY});
            },
            resize: function() {
              if ($('.fix-bottom').length) {
                var $coWrap = $('.fix-bottom .popup-wrap .con-wrap');
                if ($coWrap.hasClass('ws')) {
                  $coWrap.children('div').css('max-height', $win.height() - 202 + 'px');
                }
                if ($coWrap.outerHeight() > $win.height() / 3 * 2.3) {
                  $coWrap.addClass('ws');
                  $coWrap.children('div').css('max-height', $win.height() - 202 + 'px');
                }
              }
            },
            open: function() {},
            beforeClose: function() {
              $('html').css('overflow', '');
              $('body').css({'position': '', 'top': ''});
              window.scrollTo(0, posY);
            }
          }
        }
  
        //팝업 (공통) - jquery magnific 팝업
        _.find('.btn-base.disabled, .all-view.disabled, .add-mylist.disabled').on('click', function (e) { // 비활성화 버튼
          e.preventDefault();
        });
        _.find('.btn-popup-modal a').magnificPopup({
          type: 'inline',
          preloader: false,
          modal: false
        });
        $(document).on('click', '.b-mfp-close', function (e) {
          e.preventDefault();
          $.magnificPopup.close();
        });
        
        _.find('.btn-popup-anim-1:not(.disabled) a, a.btn-popup-anim-1:not(.disabled)').magnificPopup({
          type: 'inline',
          fixedContentPos: true,
          fixedBgPos: true,
          overflowY: 'auto',
          closeBtnInside: true,
          preloader: false,
          midClick: true,
          removalDelay: 300,
          mainClass: 'mfp-zin'
        });
        _.find('.btn-popup-anim-2:not(.disabled) a').magnificPopup({
          type: 'inline',
          fixedContentPos: false,
          fixedBgPos: true,
          overflowY: 'auto',
          closeBtnInside: true,
          preloader: false,
          midClick: true,
          removalDelay: 300,
          mainClass: 'mfp-slide-b'
        });
        _.find('.btn-popup-anim-3:not(.disabled) a, a.btn-popup-anim-3:not(.disabled)').magnificPopup({
          type: 'inline',
          fixedContentPos: true,
          fixedBgPos: true,
          overflowY: 'auto',
          closeBtnInside: true,
          preloader: false,
          midClick: true,
          removalDelay: 300,
          mainClass: 'fade-slideup fix-bottom',
          callbacks: magnificPopupConfiguration()
        });

		    $('.popup-wrap').each(function(){
          if ($(this).data('width')) {
            $(this).css('width', $(this).data('width'));
          }
        });

        if (popupUI.hasClass('popup-window')) {
          resizeWindow();
        }
      }

      $('.modal-wrap .modal-close').on('click', function(e){
        e.preventDefault();
        $(this).closest('.modal-wrap').hide();
      })
      _.on('click', function(e){
        if (csSelectUI.length) {
          if (!$(e.target).closest('.select-box .value, .select-box ul').length) {
            csSelectUI.removeClass('on');
          }
        }
        if (!$(e.target).closest('.modal-wrap, .btn-modal').length) {
          $('.modal-wrap').css('z-index', 1);
          $('.modal-wrap').hide();
        }
        if (!$(e.target).closest('.utils-tip, .tit-area .item-wrap a.mem').length) {
          $('.utils-tip').removeClass('on');
          $('.tit-area .item-wrap a.mem').removeClass('on');
        }
      });

      if (tbScrollUI.length) {
        tbScrollUI.each(function(){
          if ($(this).children('table').hasClass('classic')) {
            var thead = $(this).find('thead').prop('outerHTML');
            $(this).closest('.tb-list-wrap').prepend(`<div class="tb-fix"><table class="table classic">${thead}</table></div>`);
          } else {
            var colgroup = $(this).find('colgroup').prop('outerHTML');
            var thead = $(this).find('thead').prop('outerHTML');
            $(this).closest('.tb-list-wrap').prepend(`<div class="tb-fix"><table class="tb-list">${colgroup + thead}</table></div>`);
          }
        });
      }
    },
    checkAllUI: function(selector, mode, callback){
      var chkGroup = null;
      var chkInput = null;
      var allChecked = null;
    
      if (mode === 'terms') {
        chkGroup = $(selector).closest('.chk-list');
      } else if (mode === 'table' || mode === 'tableScroll') {
        chkGroup = $(selector).closest('.tb-list');
      } else {
        chkGroup = $(selector).closest('.chk-group-area');  
      }
      if (mode === 'tableScroll') {
        chkInput = chkGroup.next('.tb-list-scroll').find('.chk-base input');
      } else {
        chkInput = chkGroup.find('.chk-base input');
      }
    
      $(selector).on('click', function(){
        chkInput.prop('checked', $(this).is(":checked"));
        if (typeof callback === 'function') {
          callback($(this).is(":checked"));
        }
      });
    
      chkInput.on('change', function(){
        if (mode === 'table') {
          allChecked = chkGroup.find('tbody .chk-base input:checked').length === chkGroup.find('tbody .chk-base input').length;
        } else if (mode === 'tableScroll') {
          allChecked = chkGroup.next('.tb-list-scroll').find('tbody .chk-base input:checked').length === chkGroup.next('.tb-list-scroll').find('tbody .chk-base input').length;
        } else {
          allChecked = chkGroup.find('li:not(.total) .chk-base input:checked').length === chkGroup.find('li:not(.total) .chk-base input').length;
        }
        $(selector).prop('checked', allChecked);
        callback(allChecked);
      });
    },
    openSpinner: function(dimm){
      if (dimm) {
        $('.c-dimm').stop().fadeIn(200);
      }
      $('.c-spinner').stop().fadeIn(200);
    },
    closeSpinner: function(){
      $('.c-dimm, .c-spinner').stop().fadeOut(200);
    },
  }
}());

$(function(){
  GUI.init();
})

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function openModal(id) {
  $('.modal-wrap').hide();
  $(id).css('z-index', 2);
  $(id).show();
}
function closeModal(id) {
  $(id).css('z-index', 1);
  $(id).hide();
}

function getOptions(id, closeOnBgClick) {
  return {
    items: {
      src: id,
      type: 'inline',
    },
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'mfp-zin',
    closeOnBgClick: closeOnBgClick ?? true,
  };
}

var magnificPopupDimmConfiguration = function(dimmClass, openCB, closeCB) {
  return {
    open: function() {
      $('.mfp-content').prepend('<div class="'+dimmClass+'"></div>');
      if (typeof openCallback === 'function') {
        openCB();
      }
    },
    beforeClose: function() {
      $('.mfp-content .' + dimmClass).remove();
    },
    close: function(){
      if (typeof closeCallback === 'function') {
        closeCB();
      }
    }
  }
}

function devOptions(id, dimmClass, openCB, closeCB) {
  return {
    items: {
      src: id,
      type: 'inline',
    },
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'mfp-zin',
    closeOnBgClick: false,
    callbacks: magnificPopupDimmConfiguration(dimmClass, openCB, closeCB),
  };
}

var openWindow = function(url, width, height){
  var option = "width=" + width + ", height=" + height + ", left=119, top=211, resizeable=no, scrollbars=yes, status=no;";
  window.open(url, "", option);
}
var resizeWindow = function(){
  $(window).on('load', function(){
    var winW = $('.popup-wrap').outerWidth() + (window.outerWidth - window.innerWidth);
    var winH = $('.popup-wrap').outerHeight() + (window.outerHeight - window.innerHeight);
    var realW = winH <= 700 ? winW : winW + 20;
    var realH = winH <= 700 ? winH : 700;
    window.resizeTo(realW, realH);
  });
}

var checkInTbScroll = function(id){
  $(`.tb-fix ${id}`).on('change', function(){
    $(this).closest('.tb-fix').next('.tb-scroll').find('input[type="checkbox"]').prop('checked', $(this).is(':checked'));
  });
  $('.tb-scroll input[type="checkbox"]').on('change', function(){
    var $tbScroll = $(this).closest('.tb-scroll');
    var $tbFix = $tbScroll.prev('.tb-fix');
    if ($(this).is(':checked')) {
      if ($tbScroll.find('tbody input[type="checkbox"]').length == $tbScroll.find('tbody input[type="checkbox"]:checked').length) {
        $tbFix.find('input[type="checkbox"]').prop('checked', true);
      }
    } else {
      $tbFix.find('input[type="checkbox"]').prop('checked', false);
    }
  });
}