//Detecting MSIE versions
var msIE = function(){
	var ieVersion = 0;
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ //test for MSIE x.x;
		ieVersion=new Number(RegExp.$1) // capture x.x portion and store as a number
	}	
	return {
		isIE: function(){
			return ieVersion ? true : false;
		},
		isOldIE: function(){
			return (ieVersion>0 && ieVersion<9);
		},
		getIEVersion: function(){
			return ieVersion;
		}
	}
}();
//console fix for IE8
if (typeof console === "undefined" || typeof console.log === "undefined") {
	console = {};
	console.log = function() {};
};



var currentPageIndex = 0;
var numberOfPages = 2;
var pageHeight = 800;

var currentSubPageIndex = 0;
var numberOfSubPages = 2;
var subPageHeight = 400;

var transitionDuration = 2000;
var quietPeriodBetweenTwoScrollEvents = 400;
var lastTransitionTime = 0;
var lastScrollEventTime = 0;


function pageScroll(element, position) {
	if(msIE.isOldIE()){
		$(element).animate({scrollTop:(position)}, 800, 'swing', function(){});
		return;
	}
	var translation = "translate3d(0,"+(-(position))+"px,0)";
	if(msIE.isIE()){
		if(msIE.getIEVersion()==9 ){
			translation = "translate(0,"+(-(position))+"px)";
		}
	}
	$(element).css({
		'transform': translation,
		'-webkit-transform': translation,
		'-moz-transform': translation,
		'-o-transform': translation,
		'-ms-transform': translation
	});
	 console.log(position);
	console.log(window.innerHeight*2);
	window.setTimeout(function(){
		if(position >= window.innerHeight*2){
			$('.header').css({
				'background-color':'#C6D4E1'
			});
		}
	}, 700);
	if(position < window.innerHeight*2){
		$('.header').css({
				'background-color':'transparent'
			});
		}

}

function next(e){
	if(!(currentPageIndex == (numberOfPages - 1))){
		currentPageIndex++;
		pageScroll(".content",currentPageIndex * pageHeight);
	}
	$('.page2_title').addClass('runTitle');
	$('.project_block').each(function(i){
		var $project = $(this);
		setTimeout(function(){
			$project.addClass('runBlock');
		},i*300);
	});
	// $('.project_block').addClass('runBlock');
}
function prev(e){
	if(!(currentPageIndex == 0)){
		currentPageIndex--;
		pageScroll(".content",currentPageIndex * pageHeight);
	}
}
function nextSubPage(e){
	if(!(currentSubPageIndex == (numberOfSubPages - 1))){
		currentSubPageIndex++;
		pageScroll(".subScrollPage", currentSubPageIndex * subPageHeight);
		e.stopPropagation();
	}else{
		//next(e);
		e.stopPropagation();
	}
}
function prevSubPage(e){
	if(!(currentSubPageIndex == 0)){
		currentSubPageIndex--;
		pageScroll(".subScrollPage", currentSubPageIndex * subPageHeight);
		e.stopPropagation();
	}else{
		//prev(e);
		e.stopPropagation();
	}
}



$( document ).ready(function() {

	$(".content").scrollsteps({
		up: prev,
		down: next
	});
	$("#subScrollFrame").scrollsteps({
		up: prevSubPage,
		down: nextSubPage
	});

	// $('a#next').on('')


	pageHeight = window.innerHeight;
	$(".fullScreenPage").css("height",pageHeight);

	$('a#next').on('click', function(e){
		e.preventDefault();
		next();
	});

});

$( window ).resize(function() {
	pageHeight = window.innerHeight;
	$(".fullScreenPage").css("height",pageHeight);
	pageScroll();
});