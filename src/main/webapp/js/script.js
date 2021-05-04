/*=================================================
	1 - 스크롤 이동 
=================================================*/
$("a.page-scroll").on('click', function(event) {
	event.preventDefault();
	
	var $anchor 	= $(this);
	var nav_height	= $(".main-navbar").outerHeight();
	var go_postion	= $($anchor.attr('href')).offset().top;
	
	$('html, body').stop().animate({
		scrollTop: go_postion
	}, 1500, 'easeInOutExpo');
});

/*=================================================
	2 - 메인 네비게이션 설정
=================================================*/
$(window).scroll(function(){
	if($(document).scrollTop() > $("#main-gnb").outerHeight()){
		$("#main-gnb").addClass("float");
	} else {
		$("#main-gnb").removeClass("float");
	}
});


/*=================================================
	3 - 스크롤 업 버튼 설정
=================================================*/
$(window).scroll(function(){
	if($(document).scrollTop() > 200){
		$(".scroll-up").fadeIn("slow");
		if(isMobile.any()){
			$(".fixed-call-btn").fadeIn("slow");
		}
	} else {
		$(".scroll-up").fadeOut("slow");
		if(isMobile.any()){
			$(".fixed-call-btn").fadeOut("slow");
		}
		
	}
});

$(".scroll-up").on("click", function(){
	$("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
	return false;
});

/*=================================================
	4 - 해시 설정
=================================================*/
$(window).on("hashchange", function(){
	if(document.location.hash){
		var hash_names	= document.location.hash.substring(1).split("_");
		
		if(hash_names[1]==undefined || hash_names[1]=="" || !hash_names[1]){
			$("body").css("overflow", "visible");
			$("#tmp-popup").remove();
			$(".fsp-popup").hide();
		}
	}
	else{
		$("body").css("overflow", "visible");
		$("#tmp-popup").remove();
		$(".fsp-popup").hide();
	}
});

$(document).on("click", ".fsp-open-btn", function(){
	var $btn	= $(this);
	
	document.location.hash = "#"+$btn.parents("section").attr("id")+"_"+$btn.data("idx");
});

$(document).on("click", ".fsp-close-btn", function(){
	window.history.back();
});

