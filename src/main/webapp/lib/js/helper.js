/*=================================================
	1 - 서브밋 버튼
=================================================*/
$(".submit_btn").on("click", function(){
	var form			= $(this).data("form")||$(this).parents("form").attr("id");
	var confirm_text	= $(this).data("confirm")||"";
	
	if(confirm_text!=""){
		if(confirm(confirm_text)){
			checkFormValid($("#"+form));
		}
	} else {
		checkFormValid($("#"+form));
	}
});

/*=================================================
	1 - 입력 변경
=================================================*/
$(".replace_input").keyup(function(){
	var value	= $(this).val();
	var target	= $(this).data("target");
	var content	= $(this).data("content").replace("{value}", value);
	
	$(this).parents("form").find(target).val(content);
});

$(".replace_select").change(function(){
	var value	= $(this).find("option:selected").text();
	var target	= $(this).data("target");
	var content	= $(this).data("content").replace("{value}", value);
	
	$(this).parents("form").find(target).val(content);
});


/*=================================================
	2 - 폼 유효성 검사
=================================================*/
function checkFormValid(form){
	var result		= true;
	var callback	= arguments[1]||false;

	$(form).find(".valid_input").not(".valid_skip").each(function(key, val){
		//##### 라벨 정보 설정 #####//
		var label	= $(val).data("label")?$(val).data("label"):"";
		
		if(label==undefined || label==""){
			if(label==""){
				label	= $(val).parents(".form-group").find(".control-label").text()
			}
			if(label==""){
				label	= $(val).parents("tr").find("th").text();
			}
			if(label==""){
				label	= "필수값";
			}
		}
		
		label	= $.trim(label);
		
		var action	= "입력";
		
		//##### 유효성 정보 설정 #####//
		//-- 빈값 체크 --//
		var value	= $(val).val()||"";
		var name	= ($(val).data("name")!="" && $(val).data("name")!=undefined)?$(val).data("name"):$(val).attr("name");

		if($(val).get(0).tagName.toUpperCase()=="SELECT"){
			value = $(val).find("option:selected").val();
			
			action	= "선택";
		}
		else if($(val).attr("type")=="radio"){
			var radio_name	= $(val).attr("name");
			value = $(form).find("[name="+radio_name+"]").is(":checked");
			
			action	= "선택";
		}
		else if($(val).attr("type")=="checkbox"){
			value 	= $(val).prop("checked");
			
			action	= "체크";
		}
		
		//-- 기타 유효성 체크 --//
		var required= $(val).data("required");
		var min_len	= $(val).data("minlen")||"";
		var max_len	= $(val).data("maxlen")||"";
		var exp		= $(val).data("exp")||"";
		var re_pw	= $(val).data("repw")||"";
		var table	= $(val).data("table")||"";	
		var output	= "";
		
		
		//##### 빈값 확인 #####//
		if(required!=false && ((value==false) || (value=="") || ($(val).get(0).tagName.toUpperCase()=="SELECT" && value==0))){
			output	= label+getPostposition(label,"을")+" "+action+"해 주세요";
			
			alert(output);
			$(val).focus();
			
			result = false;
			return false;
		}
		
		//##### 최소 글자 확인 #####//
		else if(min_len!="" && value.length<min_len){
			output	= label+getPostposition(label,"은")+" "+min_len+" 글자 이상이어야 합니다";
			
			alert(output);
			$(val).focus();
			
			result = false;
			return false;
		}
		
		//##### 최대 글자 확인 #####//
		else if(max_len!="" && value.length>max_len){
			output	=  label+getPostposition(label,"은")+" "+min_len+"글자 이하이어야 합니다";
			
			alert(output);
			$(val).focus();
			
			result = false;
			return false;
		}
		
		//##### 비밀번호 확인 #####//
		else if(re_pw!="" && $("[name="+re_pw+"]").val()!=value){
			output	=  "비밀번호가 일치하지 않습니다.";
			
			alert(output);
			$(val).focus();
			
			result = false;
			return false;
		}
		
		//##### 정규식 확인 #####//
		else if(value!="" && exp!="" && testRegExp(exp, value)!=true){
			output	= label+" "+testRegExp(exp, value);
			
			alert(output);
			$(val).focus();
			
			result = false;
			return false;
		}
		
		//##### 중복 확인 #####//
		else if(name!="" && table!=""){
			var snd	= {
				table	: table,
				where	: "`"+name+"`='"+value+"'",
				ajax	: "true"
			}
			
			$.ajax({
				type: "POST",
				async: false,
				url: "/_crud/select",
				data: $.param(snd),
				success: function(rcv){
					var obj	= $.parseJSON(rcv);
					
					if(obj.length > 0){
						alert(label+"에 중복된 값이 존재합니다.");
						$(val).focus();
						
						result = false;
						return false;
					}
				}
			});
			
			if(!result){
				return false;
			}
		}
	});
	
	//##### AJAX 폼 확인 #####//
	var is_ajax_form	= ($(form).find("input[name=ajax]").val()=="true")?true:false;
	
	//##### Valid 결과 #####//
	if(result){
		//##### Callback 실행 #####//
		if(is_ajax_form){
			var action		= $(form).attr("action");
			var ajax_alert	= $(form).find("input[name=ajax_alert]").val();
			var ajax_empty	= $(form).find("input[name=ajax_empty]").val();
			var close_modal	= $(form).find("input[name=close_modal]").val();
			
			$.post(action, $(form).serialize(), function(rcv){
				if(rcv.trim()!="ok"){
					var obj	= $.parseJSON(rcv);
				}
				
				//== 폼 비우기 ==//
				if(ajax_empty!="false"){
					$(form).find(".form-control").val("");
				}
				
				//== Modal 닫기 ==//
				if(close_modal){
					$(close_modal).modal('hide');
				}
				
				//== 알림창 ==//
				if(ajax_alert){
					alert(ajax_alert);
				}
				
				//== 콜백 ==//
				if(typeof(callback) == "function"){
					callback(rcv);
				}
			});
		}
		else {
			if(typeof(callback) == "function"){
				callback();
			} else {
				$(form).submit();
			}
		}
	}
}

/*=================================================
	3 - 정규식 체크
=================================================*/
function testRegExp(type, str){
	var regExp;
	var errText;
	
	switch(type){
		case "num":
			regExp	= /^[0-9]*$/;
			errText	= "숫자만 입력 가능합니다.";
			break;
		case "dashnum":
			regExp	= /^[0-9-]*$/;
			errText	= "숫자와 대쉬(-)만 입력 가능합니다.";
			break;
		case "low_eng":
			regExp	= /^[a-z]*$/;
			errText	= "영어 소문자만 입력 가능합니다.";
			break;
		case "up_eng":
			regExp	= /^[A-Z]*$/;
			errText	= "영어 대문자만 입력 가능합니다.";
			break;
		case "eng":
			regExp	= /^[A-Za-z]*$/;
			errText	= "영어만 입력 가능합니다.";
			break;
		case "low_eng_num":
			regExp	= /^[a-z0-9_]*$/;
			errText	= "영어 소문자와 숫자만 입력 가능합니다.";
			break;
		case "up_eng_num":
			regExp	= /^[A-Z0-9_]*$/;
			errText	= "영어 대문자와 숫자만 입력 가능합니다.";
			break;
		case "eng_num":
			regExp	= /^[A-Za-z0-9_]*$/;
			errText	= "영어와 숫자만 입력 가능합니다.";
			break;
		case "email":
			regExp	= /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
			errText	= "올바른 이메일 주소만 입력 가능합니다.";
			break;
		case "mobile":
			regExp	= /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
			errText	= "올바른 휴대폰 번호만 입력 가능합니다.";
			break;
		case "phone":
			regExp	= /^\d{2,3}-\d{3,4}-\d{4}$/;
			errText	= "올바른 전화번호만 입력 가능합니다.";
			break;
		case "url":
			regExp	= /^http/;
			errText	= "올바른 도메인 정보만 입력 가능합니다.";
			break;
	}
	
	var result	= regExp.test(str)?true:errText;
	
	return result;
}

/*=================================================
	4 - 조사 출력
=================================================*/
function getPostposition(str, pp){
	var final_str			= str.charAt(str.length-1);
	var is_final_consonant	= checkConsonant(final_str).length==3?true:false;
	
	if(pp=='을' || pp=='를') return (is_final_consonant?'을':'를');
	if(pp=='이' || pp=='가') return (is_final_consonant?'이':'가');
	if(pp=='은' || pp=='는') return (is_final_consonant?'은':'는');
	if(pp=='와' || pp=='과') return (is_final_consonant?'와':'과');
}

/*=================================================
	5 - 초 / 중 / 종성 체크
=================================================*/
function checkConsonant(str){
	var cCho  = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ],
        cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ],
        cJong = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ],
        cho, jung, jong;

    var str = str,
        cnt = str.length,
        chars = [],
        cCode;

    for (var i = 0; i < cnt; i++) {
        cCode = str.charCodeAt(i);
        
        if (cCode == 32) { continue; }

        // 한글이 아닌 경우
        if (cCode < 0xAC00 || cCode > 0xD7A3) {
            chars.push(str.charAt(i));
            continue;
        }

        cCode  = str.charCodeAt(i) - 0xAC00;

        jong = cCode % 28; // 종성
        jung = ((cCode - jong) / 28 ) % 21; // 중성
        cho  = (((cCode - jong) / 28 ) - jung ) / 21; // 초성

        chars.push(cCho[cho], cJung[jung]);
        if (cJong[jong] !== '') { chars.push(cJong[jong]); }
    }

    return chars;
}

/*=================================================
	2 - 게시물 상태
=================================================*/
function get_bc_status(key){
	var array	= ["","등록","답변대기","답변완료","대기중","진행중","완료","미승인"];
	
	if(key!=""){
		return array[key];
	} else {
		return array;
	}
}

/*=================================================
	2 - 배열 안에 꽉차게 있는지 확인
=================================================*/
function isFullArray(arr, cnt){
	var is_full	= true;
	
	for($i=1; $i<cnt+1; $i++){
		if(arr[$i]==undefined || arr[$i]=="" || arr[$i]==0){is_full	= false;}
	}
	
	return is_full;
}

/*=================================================
	2 - 배열 안의 숫자 합치기
=================================================*/
function sumArray(arr){
	var sum	= 0
	
	$.each(arr, function(idx, val){
		if($.isNumeric(val)){sum+=Number(val);}
	});
	
	return sum;
}

/*=================================================
	2 - 숫자 콤마 설정
=================================================*/
function setComma(n){
	var reg = /(^[+-]?\d+)(\d{3})/;
	n += '';
	while (reg.test(n)){
		n = n.replace(reg, '$1' + ',' + '$2');
	}			
	return n;
}

/*=================================================
	6 - 엔터 클릭
=================================================*/
$(".enter_submit").on("keyup", function(event){
	var input	= $(this);
	var target	= $(this).data("target")?$($(this).data("target")):$(this).parents("form").find(".submit_btn");
	
	if(event.which==13){
		event.preventDefault();
		target.trigger("click");
	}
});

/*=================================================
	7 - 엔터 클릭 (폼)
=================================================*/
$(".enter_form").find("input").on("keyup", function(event){
	var input	= $(this);
	var target	= $(this).data("target")?$($(this).data("target")):$(this).parents("form").find(".submit_btn");
	
	if(event.which==13){
		event.preventDefault();
		target.trigger("click");
	}
});

/*=================================================
	8 - 단일 인풋
=================================================*/
$(".only_input").keypress(function(e){
	var input	= $(this);
	var target	= $(this).data("target")?$($(this).data("target")):$(this).parents("form").find(".submit_btn");
	
	if(e.which==13){
		e.preventDefault();
		target.trigger("click");
	}
});

/*=================================================
	9 - 비밀번호 변경
=================================================*/
$(".readonly_pw").on("click", function(){
	var input	= $(this);
	
	if(input.prop("readonly")){
		if(confirm("비밀번호를 수정하시겠습니까?")){
			input.attr("readonly", false);
			input.focus();
		}
	}
});

/*=================================================
	10 - 다운로드 링크
=================================================*/
$(".download_link").on("click", function(){
	var name	= $(this).data("name");
	var path	= $(this).data("path");
	
	$("#download_form").find("input[name=name]").val(name);
	$("#download_form").find("input[name=path]").val(path);
	
	$("#download_form").submit();
});

/*=================================================
	11 - 슬라이드 테이블
=================================================*/
$(".slide-table").find(".subject").on("click", function(){
	var $subject	= $(this);
	
	if($subject.hasClass("lock")){
		var bc_idx	= $subject.data("idx");
		
		$("#pw_prompt").modal('show');
		
		$(".pw_submit_btn").on("click", function(){
			var pw		= $("#pw_prompt").find(".pw_input").val();
			var bc_pw	= sha512(pw);
			
			var snd	= {
				table: "ui_board_content",
				where: "`bc_idx`='"+bc_idx+"' AND `bc_pw`='"+bc_pw+"'",
				ajax: "true"
			}
			
			$.post("/_crud/select", $.param(snd), function(rcv){
				$("#pw_prompt").modal('hide');
				
				var obj	= $.parseJSON(rcv);
				
				if(obj.length < 1){
					alert("비밀번호가 올바르지 않습니다.");
					return false;
				} else {
					$(".subject").removeClass("active");
					$(".content").removeClass("active");
					
					$subject.addClass("active");
					$subject.next(".content").addClass("active");
				}
			});
		});
		
		return true;
	}
	
	if($subject.hasClass("active")){
		$(".subject").removeClass("active");
		$(".content").removeClass("active");
	} else {
		$(".subject").removeClass("active");
		$(".content").removeClass("active");
		
		$subject.addClass("active");
		$subject.next(".content").addClass("active");
	}
});

/*=================================================
	12 - 툴팁 설정
=================================================*/
$('[data-toggle="tooltip"]').tooltip()

/*=================================================
	14- 호버 레이어
=================================================*/
$(".hover-layer-wrap").hover(function(){
	$(this).find(".hover-sublayer").slideDown("slow");
}, function(){
	$(this).find(".hover-sublayer").slideUp("slow");
});

/*=================================================
	모달창 설정
=================================================*/
$(".modal").on('hidden.bs.modal', function(e){
	if(!$(this).hasClass("empty-false")){
		$(this).find("input").not(".not-remove").val("");
	}
});


/*=================================================
	호버 이미지 클릭
=================================================*/
$(".hover-wrap").on("click", function(){
	var $this	= $(this);
	
	if($this.hasClass("radio")){
		$this.siblings().removeClass("active");
		$this.addClass("active");
	} else {
		if($this.hasClass("not-off")){
			$this.addClass("active");
		} else {
			$this.toggleClass("active");
		}
	}
});

/*=================================================
	13 - Ajax Paging
=================================================*/
(function($){
	$.fn.ajaxPaiging = function(board_lists){
		var $board			= $(this);
		var $section		= $board.is("section")?$board:$board.parents("section");
		var bd_id			= $board.data("bd");
		var bcat			= $board.data("bcat");
		var $page_wrap		= $board.find(".pagination-wrap");
		var $lists_wrap		= $board.find(".lists-wrap");
		var $cate_btn		= $board.find(".bcat-btn");
		var list_callback	= arguments[1]||false;
		
		/////#####===== 리스트 설정 =====#####/////
		var setAjaxLists	= function(rcv){
			var lists_output	= board_lists(rcv);
			
			$lists_wrap.html(lists_output);
			
			if(typeof(list_callback) == "function"){
				list_callback();
			}
			
			$('html, body').stop().animate({
				scrollTop: $section.offset().top
			}, 500, 'easeInOutExpo');
			
			$lists_wrap.find(".ajax-board-item").each(function(key, val){
				setTimeout(function(){
					$(val).animate({'opacity':1.0}, 450);
				}, key*200);
			});
		}
		
		/////#####===== 게시물 정보 =====#####/////
		var getAjaxLists	= function(page){
			var bd_id	= $board.data("bd");
			var bcat_id	= $board.data("bcat")?$board.data("bcat"):"";
			var page	= page?page:1;
			
			var snd = {
				bd_id: bd_id,
				bcat_id: bcat_id,
				page: page,
				is_ajax: true
			}
			
			$.post("/_board/get_lists", $.param(snd), function(rcv){
				var obj		= $.parseJSON(rcv);
				
				//##### 페이지네이션 #####//
				$page_wrap.html(obj.pagination);
				
				setAjaxLists(obj);
			});
		}
		
		/////#####===== 카테고리 클릭 =====#####/////
		$cate_btn.on("click", function(e){
			e.preventDefault();
			
			$cate_btn.removeClass("active");
			$(this).addClass("active");
			
			$board.data("bcat", $(this).data("bcat"));
			
			getAjaxLists();
			
			return false;
		});
		
		/////#####===== 페이지 클릭 =====#####/////
		$page_wrap.on("click", ".page-num", function(e){
			e.preventDefault();
			
			var page		= $(this).text();
			
			getAjaxLists(page);
			
			return false;
		});
	}
})(jQuery);

/*=================================================
	13 - Full Screen Popup
=================================================*/
$(document).on("click", ".fsp-open-btn", function(){
	var popup	= $(this).data("popup");
	var idx		= $(this).data("idx");
	var black	= $(this).hasClass("black")?"black":"";
	var is_lock	= $(this).hasClass("lock")?true:false;
	
	
	if(is_lock){
		var result	= true;
		var pw		= prompt("비밀번호를 입력해 주세요");
		
		if(pw==null || pw==""){
			alert("올바른 비밀번호를 입력해 주세요");
			return false;
		} else {
			var snd	= {
				bc_idx: idx,
				bc_pw: sha512(pw)
			}
			
			$.ajax({
				type: "POST",
				async: false,
				url: "/_board/get_pw",
				data: snd,
				success: function(rcv){
					if(rcv!="ok"){
						alert("올바르지 않은 비밀번호 입니다.");
						result	= false;
						return false;
					}
				}
			});
		}
		
		if(!result){
			return false;
		}
	}
	
	/////#####===== 일반 팝업 설정 =====#####/////
	if(popup=="" || popup==undefined || popup==null){
		var popup_output	= "";
		popup_output	+=	"<div id='tmp-popup' class='fsp-popup "+black+"'>";
		popup_output	+=		"<div class='fsp-header'>";
		popup_output	+=			"<div class='container'>";
		popup_output	+=				"<div class='fsp-header-wrap'>";
		popup_output	+=					"<h3 class='fsp-subject ellipsis'></h3>";
		popup_output	+=					"<i class='fa fa-times fa-border fsp-close-btn'></i>";
		popup_output	+=				"</div>";
		popup_output	+=			"</div>";
		popup_output	+=		"</div>";
		popup_output	+=		"<div class='container'>";
		popup_output	+=			"<div class='fsp-body-wrap'>";
		popup_output	+=				"<div class='fsp-content'></div>";
		popup_output	+=			"</div>";
		popup_output	+=		"</div>";
		popup_output	+=	"</div>";
		
		$("body").append(popup_output);
		
		popup	= "#tmp-popup";
	}
	/////#####===== 게시판 팝업 설정 =====#####/////
	else if(popup=="board"){
		var popup_output	= "";
		popup_output	+=	"<div id='board-popup' class='fsp-popup "+black+"'>";
		popup_output	+=		"<div class='fsp-header'>";
		popup_output	+=			"<div class='container'>";
		popup_output	+=				"<div class='fsp-header-wrap'>";
		popup_output	+=					"<h3 class='fsp-subject ellipsis'></h3>";
		popup_output	+=					"<i class='fa fa-times fa-border fsp-close-btn'></i>";
		popup_output	+=				"</div>";
		popup_output	+=			"</div>";
		popup_output	+=		"</div>";
		popup_output	+=		"<div class='container'>";
		popup_output	+=			"<div class='row'>";
		popup_output	+=				"<div class='col-lg-10 col-lg-offset-1 col-sm-12'>";
		popup_output	+=					"<div class='fsp-body-wrap'>";
		popup_output	+=						"<h2 class='bc-subject ellipsis'></h2>";
		popup_output	+=						"<div class='fsp-info'>";
		popup_output	+=							"<div class='pull-left info'>";
		popup_output	+=								"<span>작성자 : </span><span class='bc-writer-name'></span>";
		popup_output	+=							"</div>";
		popup_output	+=							"<div class='pull-right info'>";
		popup_output	+=								"<span>등록일 : </span><span class='bc-regdate'></span>";
		popup_output	+=							"</div>";
		popup_output	+=							"<div class='clearfix'></div>";
		popup_output	+=						"</div>";
		popup_output	+=						"<div class='fsp-content'></div>";
		popup_output	+=						"<ul class='cmnt-list'>";
		popup_output	+=						"</ul>";
		popup_output	+=					"</div>";
		popup_output	+=				"</div>";
		popup_output	+=			"</div>";
		popup_output	+=		"</div>";
		popup_output	+=	"</div>";
		
		$("body").append(popup_output);
		
		popup	= "#board-popup";
	}
	
	/////#####===== 게시물 정보 설정 =====#####/////
	var snd	= {
		bc_idx: idx,
		is_ajax: "true"
	}
	
	$.post("/_board/get_view", $.param(snd), function(rcv){
		var obj	= $.parseJSON(rcv);
		
		//##### 게시물 작성 정보 설정 #####//
		$(popup).find(".fsp-subject").html(obj.view.bc_subject);
		$(popup).find(".bc-subject").html(obj.view.bc_subject);
		$(popup).find(".bc-writer-name").html(obj.view.bc_writer_name);
		$(popup).find(".bc-regdate").html(obj.view.bc_regdate);
		
		//##### 게시물 컨텐츠 설정 #####//
		var output="";
		
		//== 파일 설정 ==//
		if(obj.file.length > 0){
			$.each(obj.file, function(key, val){
				// 이미지 파일 //
				if(val.file_is_image){
					output	+= "<img class='img-responsive center-block' src='"+val.file_html_full_path+"'>";
				}
				// 일반 파일 //
				else {
					
				}
			});
		}
		
		//== 컨텐츠 설정 ==//
		if(/<[a-z][\s\S]*>/i.test(obj.view.bc_content)){
			output	+= obj.view.bc_content;
		} else{
			output	+= obj.view.bc_content.replace(/\n/g,"<br>");
		}
		
		$(popup).find(".fsp-content").html(output);
		
		//##### 게시물 댓글 설정 #####//
		var cmnt	= "";
		
		if(obj.cmnt.length > 0){
			$.each(obj.cmnt, function(key, val){
				cmnt	+=	"<li>";
				cmnt	+=		"<p class='cmnt-info'>";
				cmnt	+=			"<strong>"+val.cmnt_writer_name+"</strong>";
				cmnt	+=			"<small> ("+val.cmnt_regdate+")</small>";
				cmnt	+=		"</p>";
				cmnt	+= 		"<div class='cmnt-content'>"+val.cmnt_content.replace(/\n/g,"<br>");+"</div>";
				cmnt	+=	"</li>";
			});
		}
		
		$(popup).find(".cmnt-list").html(cmnt);
		
		//##### 팝업 나타내기 #####//
		$(popup).show();
		
		$("body").css("overflow", "hidden");
	});
});

$(document).on("click", ".fsp-close-btn", function(){
	$(this).parents(".fsp-popup").hide();
	
	$("body").css("overflow", "visible");
	
	$("#tmp-popup").remove();
});

/*=================================================
	12 - Plugin 설정
=================================================*/
//##### iCheck 설정 #####//
if(jQuery().iCheck){
	$(".icheck-square-grey").iCheck({checkboxClass:'icheckbox_square-grey', radioClass:'iradio_square-grey'});
	$(".icheck-square-aero").iCheck({checkboxClass:'icheckbox_square-aero', radioClass:'iradio_square-aero'});
	$(".icheck-square-blue").iCheck({checkboxClass:'icheckbox_square-blue', radioClass:'iradio_square-blue'});
	$(".icheck-square-black").iCheck({checkboxClass:'icheckbox_square-black', radioClass:'iradio_square-black'});
	
	// 전체 선택 iCheck //
	$(".all-icheck").on("ifChecked", function(){
		$(".each-icheck").iCheck('check');
	});
	$(".all-icheck").on("ifUnchecked", function(){
		$(".each-icheck").iCheck('uncheck');
	});
}

//##### 부트스트랩 스위치 #####//
if(jQuery().bootstrapSwitch){
	$(".bootstrap-switch").bootstrapSwitch();
}

//##### Raty #####//
if(jQuery().raty){
	$(".raty").raty({
		score: function(){return $(this).data("score");},
		space: false,
		readOnly: function(){return $(this).data("readonly");},
		click: function(score, evt){
			var target	= $(this).data("target");
			$(target).val(score);
		}
	});
}

//##### 팬시박스 설정 #####//
if(jQuery().fancybox){
	$(".fancybox").fancybox({
		padding: 0,
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
	$(".fancybox_media").fancybox({
		padding		: 0,
		openEffect  : 'none',
		closeEffect : 'none',
		helpers 	: {
			media : {}
		}
	});
	$(".fancybox_iframe").fancybox({
		padding		: 0,
		fitToView	: false,
		width		: '90%',
		height		: '90%',
		autoSize	: false,
		closeClick	: false
	});
}

//##### Select2 설정 #####//
if(jQuery().select2){
	//-- Select2 --//
	$(".select2").select2();
	
	//-- Select2 Tags --//
	var tags	= Array();
	if($(".select2-tags").data("tags")){
		tags = $(".select2-tags").data("tags").split(",");	
	}
	$(".select2-tags").select2({tags:tags});
	
	//-- select2 이미지 --//
	var img_tag	= $(".select2-tags").data("tag");
	
	$(".select2-img").val(img_tag).select2({
		formatResult: format,
		formatSelection: format,
		escapeMarkup: function(m) { return m; }
	});
	
	//-- select2 이미지 멀티 --//
	var multi_tags	= Array();

	if($(".select2-img-multi").data("tags")){
		multi_tags = $(".select2-img-multi").data("tags").split(",");
	}

	$(".select2-img-multi").val(multi_tags).select2({
		formatResult: format,
		formatSelection: format,
		escapeMarkup: function(m) { return m; }
	});

	function format(item) {
		var option	= item.element;
		return "<img src='"+$(option).data('img')+"' width='50px'>" + item.text;
	}	
}

//##### word breake 설정 #####//
if(jQuery().wordBreakKeepAll){
	$('.word-break').wordBreakKeepAll();
}

//##### draggable 설정 #####//
if(jQuery().draggable){
	$(".draggable").draggable();
}

//##### 데이트타임 피커 설정 #####//
if(jQuery().datetimepicker){
	$(".datetimepicker").datetimepicker({
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		timeFormat: "HH:mm:ss",
		autoSize: false,
		changeMonth: true,
		changeYear: true,
		showMonthAfterYear: true,
		currentText: "현재",
		closeText: "확인",
		timeText: "시간",
		hourText: "시",
		minuteText: "분",
		secondText: "초"
	});
}

//##### 데이트 피커 설정 #####//
if(jQuery().datepicker){
	$(".datepicker").datepicker({
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		autoSize: false,
		changeMonth: true,
		changeYear: true,
		showMonthAfterYear: true
	});
}

/*=================================================
	12 - 부트스트랩 그리드 불러오기
=================================================*/
function getGrid() {
    var envs = ['xs', 'sm', 'md', 'lg'];

    $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envs.length - 1; i >= 0; i--) {
        var env = envs[i];

        $el.addClass('hidden-'+env);
        if ($el.is(':hidden')) {
            $el.remove();
            return env
        }
    };
}

function getViewport(){
	var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function showGrid(){
	var grid	= getGrid();
	var width	= getViewport().width;
	var height	= getViewport().height;
	
	$grid	= $("<div></div>");
	$grid.css({"position":"absolute","top":0,"left":0,"z-index":9999,"padding":"5px","background-color":"rgba(0,0,0,0.3)","color":"#FFFFFF"})
	$grid.html(grid+"("+width+"*"+height+")");
	$grid.prependTo("body");
	
	$(window).resize(function(){
		grid	= getGrid();
		width	= getViewport().width;
		height	= getViewport().height;
	
		$grid.html(grid+"("+width+"*"+height+")");
	});
}

/*=================================================
	12 - 모바일 체크
=================================================*/
var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

/*=================================================
	13 - 프로토 타입
=================================================*/
//##### 배열 빈값 제거 #####//
Array.prototype.removeEmpty	= function(){
	var arr	= this;
	
	arr = jQuery.grep(arr, function(n, i){
		return (n !== "" && n != null);
	});
	
	return arr;
}

//##### 글자 자르기 #####//
String.prototype.kmCut = function(len) {
	var str = this;
	var l = 0;
	
	for (var i=0; i<str.length; i++) {
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
		if(l > len){
			return str.substring(0,i);
		}
	}
	return str;
}

//##### 글자 바이트 계산 #####//
String.prototype.kmBytes = function() {
var str = this;
	var l = 0;
	for(var i=0; i<str.length; i++){
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
	}
	return l;
}