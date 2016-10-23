/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/

/* 01 - VARIABLES */
/* 02 - WINDOW LOAD */
/* 03 - SWIPER SLIDER */
/* 04 - MOBILE MENU */
/* 05 - WINDOW SCROLL */
/* 06 - IZOTOPE */
/* 07 - VIDEO OPEN */
/* 08 - CLICK */
/* 09 - WOW ANIMATION */
/* 10 - ACCORDEON  */
/* 11 - TAB  */

jQuery(function($) { "use strict";

    /*============================*/
	/* 01 - VARIABLES */
	/*============================*/
	
	var swipers = [], winW, winH, winScr, _isresponsive, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
	}
	pageCalculations();
	
	var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
    {
       $('.bg.ready').removeAttr('data-jarallax').addClass('fix'); 
    }
					
	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	  if (isSafari) {
	     $('.bg.ready').removeAttr('data-jarallax').addClass('fix');
	  }			
					
   if(_ismobile) {
	   $('body').addClass('mobile');
	   $('.bg').removeAttr('data-jarallax');
    }
	
	/*============================*/
	/* 02 - WINDOW LOAD */
	/*============================*/
	
	$(window).load(function(){
	     izotopInit();
	     $('.loader').fadeOut(200);
		 fixHeader();
	});
	
	/*============================*/
	/* 03 - SWIPER SLIDER */
	/*============================*/
					
	function updateSlidesPerView(swiperContainer){
		if(winW>=addPoint) return parseInt(swiperContainer.attr('data-add-slides'),10);
		else if(winW>=lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'),10);
		else if(winW>=mdPoint) return parseInt(swiperContainer.attr('data-md-slides'),10);
		else if(winW>=smPoint) return parseInt(swiperContainer.attr('data-sm-slides'),10);
		else return parseInt(swiperContainer.attr('data-xs-slides'),10);
	}

	function resizeCall(){
		pageCalculations();

		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t), centerVar = thisSwiper.params.centeredSlides;
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			if(!centerVar){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
		});
	}
	if(!_ismobile){
		$(window).resize(function(){
			resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}
					
	function initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'),10);

			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = updateSlidesPerView($t);
			}
			else slidesPerViewVar = parseInt(slidesPerViewVar,10);

			var loopVar = parseInt($t.attr('data-loop'),10);
			var speedVar = parseInt($t.attr('data-speed'),10);
            var centerVar = parseInt($t.attr('data-center'),10);
			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true,
				calculateHeight: true, 
				simulateTouch: true,
				roundLengths: true,
				centeredSlides: centerVar,
				onInit: function(swiper){
					var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex;
				   $t.find('.swiper-slide[data-val="0"]').addClass('active');
				},
				onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex,
					qVal = $t.find('.swiper-slide-active').attr('data-val');
					$t.find('.swiper-slide').removeClass('active');
					$t.find('.swiper-slide[data-val="'+qVal+'"]').addClass('active');
				},
				onSlideChangeStart: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($t.closest('.slider-with-preview').length){
					    $t.closest('.slider-with-preview').find('.prev-img.active').removeClass('active');
						$t.closest('.slider-with-preview').find('.prev-img').eq(activeIndex).addClass('active');
					}
				},
				onSlideClick: function(swiper){
				    if($t.closest('.slider-duble').length){
						swiper.swipeTo(swiper.clickedSlideIndex);
						swipers['swiper-'+$t.closest('.slider-duble').find('.swiper-slider-second').attr('id')].swipeTo(swiper.activeIndex);
					}
					if($t.closest('.click-point').length){
						swiper.swipeTo(swiper.clickedSlideIndex);
						swipers['swiper-'+$t.closest('.click-point').find('.swiper-slider-second').attr('id')].swipeTo(swiper.activeIndex);
					}
				}
			});
			swipers['swiper-'+index].reInit();
				if($t.attr('data-slides-per-view')=='responsive'){
					var paginationSpan = $t.find('.pagination span');
					var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
					if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
					else $t.removeClass('pagination-hidden');
					paginationSlice.show();
				}
			initIterator++;
		});
		
		$('.swiper-slider-second').each(function(){
			var $th = $(this);
			if($th.closest('.slider-duble').find('.swiper-slider-first').length){
				swipers['swiper-'+$th.attr('id')].addCallback('SlideChangeStart', function(swiper){
					swipers['swiper-'+$th.closest('.slider-duble').find('.swiper-slider-first').attr('id')].swipeTo(swiper.activeIndex);
				});
			}
		});
		
	}

	initSwiper();

	$('.swiper-arrow-left').on('click', function(){
		swipers['swiper-'+$(this).closest('.arrow-closest').find('.swiper-container').attr('id')].swipePrev();
	});
	$('.swiper-arrow-right').on('click', function(){
		swipers['swiper-'+$(this).closest('.arrow-closest').find('.swiper-container').attr('id')].swipeNext();
	});
	
	/*============================*/
	/* 04 - MOBILE MENU */
	/*============================*/
	
	$(document).on('click', '.burger-menu', function(){
	    $('.nav-menu').toggleClass('slide');
		 $('body').toggleClass('fix');
	      $(this).toggleClass('active');
		   return false;
	});
	
	/*============================*/
	/* 05 - WINDOW SCROLL */
	/*============================*/
	
    $(window).scroll(function() {
	   fixHeader();
	   if ($('.time-line').length) {
		 $('.time-line').not('.animated').each(function(){
		  if($(window).scrollTop() >= $(this).offset().top-$(window).height()*0.5)
		   {$(this).addClass('animated').find('.timer').countTo();}});
		}	
	});
					
	function fixHeader() {
	    if ($(window).scrollTop() >= $('.top-baner').height()-$('.header-style-1').height()) {
		      $('.header-style-1.type-1').addClass('fix');
			}else{
              $('.header-style-1.type-1').removeClass('fix');
		}
		if ($(window).scrollTop() >= 80) {
		      $('.header-style-1.type-2').addClass('fix');
			}else{
              $('.header-style-1.type-2').removeClass('fix');
		}
	}				
	
	/*============================*/
	/* 06 - IZOTOPE */
	/*============================*/
	
	function izotopInit() {
	  if ($('.izotope-container').length) {
	    var $container = $('.izotope-container');
	  	  $container.isotope({
			itemSelector: '.item',
			layoutMode: 'masonry',
			masonry: {
			  columnWidth: '.grid-sizer'
			}
		  });
			$('.filter-mob-list').on('click', 'li', function() {
			  $('.izotope-container').each(function(){
				 $(this).find('.item').removeClass('animated');
			  });
				 $('.filter-mob-list li').removeClass('active');
				 $(this).addClass('active');
				   var filterValue = $(this).attr('data-filter');
					$container.isotope({filter: filterValue});
			});  
	  }
	}
    
	$('.load-more').on('click', function(){
	    $(this).parent().parent().find('.load-item').fadeIn(0);
		 izotopInit();
		  $(this).fadeOut(0);
		   $(this).parent().find('.no-item').fadeIn(500);
		  return false;
	});				
	
	/*============================*/
	/* 07 - VIDEO OPEN */
	/*============================*/

    $(function(){
	   $('.bgvid').each(function(){
		  var vid = $(this);
			$(document).on('click', '.play-button', function(){
				   $(this).parent().parent().find('.video-item').addClass('act');
					vid.get(0).play();
				return false;
			});
		  
		    $('.close-video').on('click', function(){
			   $('.video-item').removeClass('act');
			   vid.get(0).pause();
		    });
	   });		
     });
					
	/*============================*/
	/* 08 - CLICK */
	/*============================*/
					
	if ($(window).width()<=992){
		$(document).on('click', '.drop-filter', function(){
		  $(this).find('.arrow-down').toggleClass('active');	
		   $(this).parent().find('.filter-mob-list').slideToggle(300);
		}); 

		$(document).on('click', '.filter-mob-list li', function(){
		   $(this).parent().slideUp(300);
			$(this).parent().parent().find('.arrow-down').removeClass('active');
             $('.drop-filter span').text($(this).text());
		});
	}
	
	$('.input-field').on('focusin', function(){
	   $(this).addClass('active');
	});				
					
	$('.input-field').on('focusout', function(){
	   $(this).removeClass('active');
	});			

	$('.prev-img').on('click', function(){
		 var slideIndex = $('.prev-img').index(this);
		 $('.prev-img').removeClass('active');
		   $(this).addClass('active');
		    swipers['swiper-'+$(this).closest('.slider-with-preview').find('.main-detail-slider').attr('id')].swipeTo(slideIndex);
	 });
	
	/*============================*/
	/* 10 - ACCORDEON  */
	/*============================*/
					
	$('.accordeon-triger').on('click', function(e){
	  e.preventDefault();
		var $this = $(this),
			item = $this.closest('.accordeon-item'),
			list = $this.closest('.accordeon-list'),
			items = list.find('.accordeon-item'),
			content = item.find('.accordeon-inner'),
			otherContent = list.find('.accordeon-inner'),
			times = 300;
		if (!item.hasClass('active')){
		   items.removeClass('active');
		   item.addClass('active');
		   otherContent.stop(true, true).slideUp(times);
		   content.stop(true, true).slideDown(times);
		}else{
		   item.removeClass('active');	
		   content.stop(true, true).slideUp(times);	
		}
	});
					
	/*============================*/
	/* 11 - TAB  */
	/*============================*/				
					
	$('.tabs-button').on('click', function(e){
		e.preventDefault();
	    var $this = $(this),
			tab_button = $this.index(),
			tab_item = $this.closest('.tabs').find('.tab-item');		
			tab_item.eq(tab_button).add($this).addClass('active').siblings().removeClass('active');   
	});	
	
	/*============================*/
	/* 12 - DETAIL GALLERY  */
	/*============================*/
					
	$('.open-popup').on('click', function(){
	    var dataIndex = $(this).attr('data-rel');
		 var slideIndex = $('.team-item').index(this);
		  $('body').addClass('overflow-h');
		   $('.popup-'+dataIndex+'').addClass('active');
		    initSwiper();
		     setTimeout(function(){
				swipers['swiper-'+$('.popup-slider').attr('id')].swipeTo(slideIndex);	 
			 },500);
	 });
					
	$('.close-popup').on('click', function(){
	   $(this).parent().removeClass('active');
		 $('body').removeClass('overflow-h');
		   $('.success').removeClass('active');
	});
					
    $('.ajax-imit').on('click', function(){
	  var linkData = $(this).attr('data-tab');	
	   $('.tab-content').removeClass('active');;	
	     $(this).closest('.tabs-wrap').find('.link-'+linkData+'').addClass('active');
		return false;
	});					
	
					
					
					
					
					
					
					
					
					
					
					
     
});