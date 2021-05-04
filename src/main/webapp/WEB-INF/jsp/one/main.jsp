<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>

<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js"><!--<![endif]-->

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- 		<meta name="naver-site-verification" content="41f14c9d3f824c77383c0628e013fa82cad15aa1"/> -->
<!-- 		<title>메타페이롤</title> -->
<!-- 		<meta name="description" content="급여아웃소싱 전문기업, Payroll service 및 Solution제공, ISMS 보안인증,연말정산 대행, IT역량기반의 Metanet Group 소속"/> -->
		
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		
		<!--##### 폰트 CSS 라이브러리 #####-->
		<link type='text/css' rel='stylesheet' href='http://fonts.googleapis.com/earlyaccess/nanumgothic.css'>
		<!--<link type='text/css' rel='stylesheet' href='http://fonts.googleapis.com/css?family=Raleway:400,900,200,100,300,500,600,700,800'>-->
		<link type='text/css' rel='stylesheet' href='http://fonts.googleapis.com/css?family=Montserrat:400,700'>
		<!--<link type='text/css' rel='stylesheet' href='http://fonts.googleapis.com/css?family=Cardo'>-->
		
		<!--##### CSS 라이브러리 #####-->
		<!--<link type="text/css" rel="stylesheet" href="lib/css/bootstrap.min.css">-->
		<!--<link type="text/css" rel="stylesheet" href="lib/css/bootstrap-ui-theme.css">-->
		<link type="text/css" rel="stylesheet" href="/lib/css/jquery-ui.min.css">
		<link type="text/css" rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
		
		<link type="text/css" rel="stylesheet" href="/lib/css/animate.css">
		<link type="text/css" rel="stylesheet" href="/lib/fancybox/jquery.fancybox.css">
		<link type="text/css" rel="stylesheet" href="/lib/css/jquery.bxslider.css"><!--배너슬라이드 페이지 스타일-->
		<link type="text/css" rel="stylesheet" href="/lib/css/jquery.animateSlider.css">
		<link type="text/css" rel="stylesheet" href="/lib/icheck/skins/grey.css">
		<link type="text/css" rel="stylesheet" href="/lib/css/bootstrap-switch.min.css"><!--지도보기스위치 스타일-->
		
		<link type="text/css" rel="stylesheet" href="/lib/rs-plugin/css/settings.css"><!--메인비쥬얼 스타일-->

		<!--##### 공통 CSS #####-->
		<link type="text/css" rel="stylesheet" href="/css/helper.css"><!--기본-->
		<link type="text/css" rel="stylesheet" href="/css/style.css"><!--기본-->
		<link type="text/css" rel="stylesheet" href="/css/main.css?1"><!--기본-->
		
		<!--##### JS 라이브러리 #####-->
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
		<script src="http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
		
		<script>
			window.jQuery || document.write("<script src='/lib/js/jquery-1.11.2.min.js'><\/script>");
			window.Modernizr || document.write("<script src='/lib/js/modernizr.min.js'><\/script>");
        </script>		
		<script type="text/javascript">
		//오른쪽마우스 막기
			document.oncontextmenu = function(e){
			 	if(e){
			  		e.preventDefault();
			 	}
			 	else{
			  		event.keyCode = 0;
			       	event.returnValue = false;
			    }
			}
			function sendMail() {
				var name = $("#name").val();
				var phone = $("#phone").val();
				var email = $("#email").val();
				var content = $("#content").val();
				
				if (name == "" || name == null){
					alert("이름을 입력해주세요");
					return false;
				}
				if (phone == "" || phone == null){
					alert("전화번호를 입력해주세요");
					return false;
				}
				if (email == "" || email == null){
					alert("이메일을 입력해주세요");
					return false;
				}
				if (content == "" || content == null){
					alert("상담내용을 입력해주세요");
					return false;
				}
				
				
				var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
				//이메일 형식에 맞지않으면
				if (!email.match(regExp)){
					alert("이메일 형식이 맞지 않습니다.");
					$("#email").val("");
					$("#email").focus();
					return false;
				}
				
				$.ajax({
			        type:"post",
			        url:"<c:url value='/sendMail.do'/>",
			        data:"name="+name+"&phone="+phone+"&email="+email+"&content="+content,     
			        dataType : "json",
			        success:function(result){
			        	alert("상담문의가 완료되었습니다.\n빠른시일내에 연락드리겠습니다.");
			        	$("#name").val("");
					    $("#phone").val("");
						$("#email").val("");
						$("#content").val("");
			        },
			        error:function(request,status,error){
			        	alert(error);
			        }
		 	    });
			 }
			
			function aboutUs(){
// 				window.open('http://www.metanet.co.kr', '_blank'); 
				window.open('http://www.metanet.co.kr', "METANET", "fullscreen:yes, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes"); 
			}
			function popup(){
				window.open('http://www.metapay.co.kr/personalinformation.html', "개인정보처리방침", "fullscreen:yes, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes"); 
			}
		</script>
	</head>
	
<body id="page-top" data-spy="scroll" data-target="#menu-navbar">
    <!--##### 네비게이션 #####-->
    <!--##### 메인 네비게이션 #####-->
    <nav class="navbar navbar-default" id="main-gnb">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="btn nav-btn" data-toggle="collapse" data-target="#menu-navbar">
                    <!--<i class="fa fa-bars fa-fw"></i>-->
                </button>
<!--                 <a class="navbar-brand page-scroll" href="#page-top"><img src="/img/img_logo.png" class="img-responsive" alt="GoPAY 로고"></a> -->
                <a class="navbar-brand page-scroll"><img src="/img/img_logo.png" class="img-responsive"></a>
            </div><!--/.navbar-header-->

            <div class="collapse" id="menu-navbar">
                <ul class="nav navbar-nav">
                    <li><a href="javascript:aboutUs();">About us</a></li>
                    <li><a class="page-scroll" href="#gopay">MetaPayroll</a></li>
                    <li><a class="page-scroll" href="#process">Business</a></li>
                    <li><a class="page-scroll" href="#what-we-do">What we do</a></li>
                    <li><a class="page-scroll" href="#client">Our Main Client</a></li>
                    <li class="contact"><a class="page-scroll" href="#contact"><img src="/img/icon_letter.png" alt="">Contact</a></li>
                </ul><!--/.navbar-nav-->
            </div><!--/#menu-navbar-->
        </div><!--/.container-->
    </nav><!--/#main-navbar-->		
		<!--##### 페이지 컨텐츠 #####-->


<!--=================================================
    메인비쥬얼
==================================================-->
<header id="main">
	<div class="tp-banner-container">
		<div class="tp-banner">
			<ul>
				<li data-transition="fade" data-slotamount="7" >
					<img src="/img/header/main_bg_1.jpg"
						class="first-image"
						data-kenburns="on"
						data-bgposition="center center"
						data-bgpositionend="center center"
						data-bgfit="120"
						data-bgfitend="100"
						data-duration="4000" >
					<div class="caption lfc ltt rs-parallaxlevel-4"
						data-x="center"
						data-y="180"
						data-speed="1000"
						data-start="800"
						data-easing="Power3.easeInOut">
						<h2><img src="/img/header/txt_main01.png" alt=""></h2>
						<span class="separator"></span>
						
					</div>
					<div class="caption lfb ltb rs-parallaxlevel-3"
						data-x="center"
						data-y="520"
						data-voffset="150"
						data-speed="1000"
						data-start="1200"
						data-easing="Power3.easeInOut">
						<h5>
                            고객의 Biz가 성장 할 수록 수행 인력과 solution이 필요합니다. <br/>
                            Start up 기업부터 global 법인 까지,<br/>MetaPayroll은 HR 부서의 Tool이 될 수 있는<br/> 
                            기술적, 체계적, 조직적인 검증 방안을 제공 합니다.
                        </h5>
					</div>
				</li>
				<li data-transition="fade" data-slotamount="7" >
					<img src="/img/header/main_bg_2.jpg"
						data-kenburns="on"
						data-bgposition="center center"
						data-bgpositionend="center center"
						data-bgfit="120"
						data-bgfitend="100"
						data-duration="4000" >
					<div class="caption lfc ltr rs-parallaxlevel-4"
						data-x="center"
						data-y="180"
						data-speed="1000"
						data-start="800"
						data-easing="Power3.easeInOut">
						<h2><img src="/img/header/txt_main02.png" alt=""></h2>
						<span class="separator"></span>
					</div>
					<div class="caption ltl lfb rs-parallaxlevel-3"
						data-x="center"
						data-y="520"
						data-voffset="-50"
						data-speed="1000"
						data-start="1200"
						data-easing="Power3.easeInOut">
						<h5>
						급여는 회사별로 다양한 지급과 공제의 기준으로 운영됩니다.<br/>
                        이처럼 각기 다른 지급의 형태를 하나의 시스템에서 표준화 할 수 있는 방법을<br/>우리는 준비 해왔습니다.  
						</h5>
					</div>
				</li>
				<li data-transition="fade" data-slotamount="7" >
					<img src="/img/header/main_bg_3.jpg"
						data-kenburns="on"
						data-bgposition="center center"
						data-bgpositionend="center center"
						data-bgfit="120"
						data-bgfitend="100"
						data-duration="4000">
					<div class="caption lfc ltl rs-parallaxlevel-3"
						data-x="center"
						data-y="180"
						data-voffset="-100"
						data-speed="1000"
						data-start="1200"
						data-easing="Power3.easeInOut">
						<h2><img src="/img/header/txt_main03.png" alt=""></h2>
						<span class="separator"></span>
					</div>
					<div class="caption lfb ltr rs-parallaxlevel-4"
						data-x="center"
						data-y="520"
						data-hoffset="-20"
						data-speed="1000"
						data-start="1200"
						data-easing="Power3.easeInOut">
						<h5>
						급여아웃소싱 서비스는 기존의 단순 급여 지급 및 신고 등의<br/>처리(Process) 개념에 머물러 있었습니다.<br/>
						우리의 서비스는 급여처리를 기반으로 <br/>해당 데이터를 관리(Management) 할 수 있는 방안 제공합니다.
						</h5>
					</div>
				</li>
			</ul>
		</div><!--/.tp-banner-->
	</div><!--/.tp-banner-container-->
</header>

<!--=================================================
    GoPAY
==================================================-->
<section id="gopay" class="whatwedo">
	<div class="container">
		<div class="section-title-wrap">
			<h2 class="section-title wow fadeInDown" data-wow-delay="0.2s"><span class="txt_blue">Meta</span>Payroll</h2>
			<span class="separator wow fadeInDown" data-wow-delay="0.4s"></span>
			<p class="txt_add01">Business의 성장 + 기술의 확장성</p>
			<p class="txt_add02">MetaPayroll 최적의 조합 </p>
		</div><!--/.section-title-wrap-->
		
		<div class="row row_10">
			<div class="col-sm-4">
				<div class="what-wrap">
					<h3 class="three-title wow bounceIn" data-wow-delay="0.3s"><img src="/img/img_buss01.jpg" alt=""><img class="arrow" src="/img/arrow_next.png" alt=""></h3>
				</div><!--/.three-wrap-->
			</div><!--/.col-sm-4-->
			
			<div class="col-sm-4">
				<div class="what-wrap">
					<h3 class="three-title wow bounceIn" data-wow-delay="0.6s"><img  src="/img/img_buss02.jpg" alt=""><img  class="arrow" src="/img/arrow_next.png" alt=""></h3>
				</div><!--/.three-wrap-->
			</div><!--/.col-sm-4-->
			
			<div class="col-sm-4">
				<div class="what-wrap">
					<h3 class="three-title wow bounceIn" data-wow-delay="0.9s"><img src="/img/img_buss03.jpg" alt=""><img  class="arrow" src="/img/arrow_next.png" alt=""></h3>
				</div><!--/.three-wrap-->
			</div><!--/.col-sm-4-->
			
			<div class="col-sm-4">
				<div class="what-wrap">
					<h3 class="three-title wow bounceIn" data-wow-delay="1.2s"><img src="/img/img_buss04.jpg" alt=""></h3>
				</div><!--/.three-wrap-->
			</div><!--/.col-sm-4-->
		</div><!--/.row-->
	</div><!--/.container-->
</section>

<!--=================================================
    슬라이드배너
==================================================-->
<section id="process" class="bg">
	<div class="container">
		<div class="process-slider-wrapper">
			<ul id="process-slider">
				<li>
					<div class="process-wrap">
						<p class="txt_add01 white">당신의 비즈니스는 <span class="txt_blue bold">성장할 것입니다.</span></p>
						<div class="process-desc word-break">
							우리의 귀하의 사업 영역의 확장에 따라 지원할 수 있는 기술가 인프라를 모두 보유하고 있습니다.<br/>
                            신규 ERP를 구축하거나 새로운 HCM (E-HR)을 도입 하더라도 Payroll Vender를 변경할 필요가 없습니다.<br/>
                            다양한 방안을 지원할 수 있는 경험과 방법, 그리고 기술을 가지고 있습니다
						</div>
					</div>
				</li>
				<li>
					<div class="process-wrap">
                        <p class="txt_add01 white"><span class="txt_blue bold">HR system</span> 무엇이 필요하십니까?</p>
						<div class="process-desc word-break">
							기존의 HR 시스템은 도입이 어려웠습니다. 과도한 구축비용과 개발기간,<br/>
                            따라서 실패할 확률도 다수 존재 했습니다. 하지만 이제 Cloud 기반의 가벼운 HR 시스템을 만나보세요.<br/>
                            원하시는 모듈만을 골라 도입 할 수 있습니다. 물론 선택하여 도입된 모듈간의 Inter-face는 서비스의 기본입니다.   
						</div>
					</div>
				</li>
				<li>
					<div class="process-wrap">
						<p class="txt_add01 white"><span class="txt_blue bold">개인정보보호</span> 및 보안 정책</p>
						<div class="process-desc word-break">
                            인사는 개인정보의 총체입니다. 우리는 개인정보를 신뢰 수준으로 보호할 수 있는 정책 및 방안을<br/>
                            보유하고 있습니다. 한국인터넷진흥원 정보보호 인증(ISMS)의 관리체계로 보호되고 있으며<br/> 
                            개인정보를 제3자에게 위탁하지 아니하고 IDC센터를 직접 운영하고 있는 자체 인프라를 보유하고 있습니다
						</div>
					</div>
				</li>
			</ul>
		</div><!--/.bx-slider-wrap-->
	</div><!--/.container-->
</section><!--/#process-->
        
<!--=================================================
    비지니스 단계
==================================================-->
<section id="service" class="bg">
	<div class="container">
		
		<!--#####===== 내용 =====#####-->
		<div class="row">
			<div class="col-sm-3 col-xs-6 tc">
				<div class="item-wrap">
					<span class="circle c01 img-responsive wow flipInX"></span>
					<h4 class="item-title wow fadeInDown">Small Business</h4>
					<div class="item-desc word-break wow fadeInUp">
						Start UP 기업 및 소규모 기업의 경우 급여의 처리는 물론 관리 시스템의 부재가 일반적입니다.<br/>
                        귀사의 부족했던 부분을 저렴한 비용으로 충족할 수 있는 최적의 솔루션을 제공합니다. 
					</div>
				</div><!--/.item-wrap-->
			</div><!--/.col-sm-3-->

			<div class="col-sm-3 col-xs-6 tc">
				<div class="item-wrap">
					<span class="circle c02 img-responsive wow flipInX"></span>
					<h4 class="item-title wow fadeInDown">Midsized Business</h4>
					<div class="item-desc word-break wow fadeInUp">
						성장기의 기업의 경우 사업초기 단계에서 미진했던 관리 부분에 대한 역량 강화 및 체계화된 시스템 도입이 필요할 시기입니다.<br/>
                        기존 사용하던 시스템과의 연동 및 체계화된 관리기능을 구축할 수 있는 환경을 제공합니다. 
					</div>
				</div><!--/.item-wrap-->
			</div><!--/.col-sm-3-->

			<div class="col-sm-3 col-xs-6 tc">
				<div class="item-wrap">
					<span class="circle c03 img-responsive wow flipInX"></span>
					<h4 class="item-title wow fadeInDown">Large Business</h4>
					<div class="item-desc word-break wow fadeInUp">
						기업의 성장으로 업무의 분업화 및 새로운 관리체계를 리뉴얼 하시길 원하십니까? <br/>
                        원활한 시스템간의 연동(Inter-Face), GL Account , Cost center간의 Data 연계 방안 불필요한 중복업무가 사라지고 간소화 되는 환경을 지원합니다.  
					</div>
				</div><!--/.item-wrap-->
			</div><!--/.col-sm-3-->

			<div class="col-sm-3 col-xs-6 tc">
				<div class="item-wrap">
					<span class="circle c04 img-responsive wow flipInX"></span>
					<h4 class="item-title wow fadeInDown">Multinational Business</h4>
					<div class="item-desc word-break wow fadeInUp">
						글로벌 법인은 Payroll 업무에 있어 특색이 있습니다.<br/>
						급여계산은 물론 글로벌 본사 시스템간의 연동에 대한 이슈, local Tax 에 대한 data 연계 등. 어떤 시스템을 사용하시나요?<br/> 
                        SAP, Oracle, Work day 외 legacy system 등 어떠한 시스템 과도 연동이 가능하며 국내 환경에 맞는 글로벌 법인 시스템 최적화를 구현해 드립니다. 
					</div>
				</div><!--/.item-wrap-->
			</div><!--/.col-sm-3-->
		</div><!--/.row-->
			
	</div><!--/.container-->
</section><!--/#three-no-->

<!--=================================================
    What we do
==================================================-->
<section id="what-we-do">
	<div class="container">
		<!--#####===== 타이틀 =====#####-->
		<div class="section-title-wrap">
			<h2 class="section-title white wow fadeInDown">What we do.</h2>
			<span class="separator wow fadeInDown"></span>
		</div><!--/.section-title-wrap-->
		
		<!--#####===== 내용 =====#####-->
		<div class="row ">
			<div class="col-md-3 col-sm-4 col-xs-6">
				<div class="item-wrap">
					<span class="circle2 c01 fa-stethoscope wow flipInX"></span>
					<div class="item-desc word-break wow fadeInUp">
						급여, 상여, 각종 수당 및 성과급계산<br/>
                        급여인상에 따른 소급분 계산 <br/>
                        급여명세서 e-mail 발송 <br/>
                        퇴직금 계산 및 중간정산 내역서 제공<br/>
                        퇴직금 추계액 관리<br/>
					</div>
				</div><!--/.item-wrap-->
			</div><!--/.col-md-3-->
			
			<div class="col-md-3 col-sm-4 col-xs-6">
				<div class="item-wrap">
					<span class="circle2 c02 fa-stethoscope wow flipInX" data-wow-delay="0.3s"></span>
					<div class="item-desc word-break wow fadeInUp" data-wow-delay="0.3s">
						원천징수이행상황신고 지원<br/>
                        사업/기타/이자/배당 소득신고 지원<br/>
                        지방소득세 및 종업원할 사업소세 신고 지원<br/>
                        세금 신고납부서 출력<br/>
                        지급명세서 신고 지원<br/>
					</div>
				</div><!--/.item-wrap-->
			</div><!--/.col-md-3-->
			
            <div class="col-md-3 col-sm-4 col-xs-6">
				<div class="item-wrap">
					<span class="circle2 c03 fa-stethoscope wow flipInX" data-wow-delay="0.6s"></span>
					<div class="item-desc word-break wow fadeInUp" data-wow-delay="0.6s">
						연말정산 업무 대행<br/>
                        변경세법 연말정산 안내문 자료배포<br/> 
                        소득공제신고서 적격성 검토 및 처리<br/>
                        종이없는 연말정산 서비스 제공(PDF Upload) <br/> 
                        <br/>
					</div>
				</div><!--/.item-wrap-->
			</div><!--/.col-md-3-->
			
			<div class="col-md-3 col-sm-4 col-xs-6">
				<div class="item-wrap">
					<span class="circle3 c04 fa-stethoscope wow flipInX"></span>
					<div class="item-desc word-break wow fadeInUp">
						사회보험 취득및 상실 신고<br/>
                        (국민/건강/고용/산재)<br/>
                        건강/고용/산재 보수총액신고<br/>
                        보험 예수금 관리
					</div>
				</div><!--/.item-wrap-->
			</div><!--/.col-md-3-->
			
			<div class="col-md-3 col-sm-4 col-xs-6">
				<div class="item-wrap">
					<span class="circle3 c05 fa-stethoscope wow flipInX" data-wow-delay="0.3s"></span>
					<div class="item-desc word-break wow fadeInUp" data-wow-delay="0.3s">
						ERP 연동 방안<br/>
                        (SAP, Oracle 및 HCM system, 등)<br/>
                        GL Account, Cost Center<br/> 
                        Report etc…  
					</div>
				</div><!--/.item-wrap-->
			</div><!--/.col-md-3-->
			
            <div class="col-md-3 col-sm-4 col-xs-6">
				<div class="item-wrap">
					<span class="circle3 c06 fa-stethoscope wow flipInX" data-wow-delay="0.6s"></span>
					<div class="item-desc word-break wow fadeInUp" data-wow-delay="0.6s">
						Report 지원<br/>
                        제증명서 신청 및 발급 모듈 제공<br/>
                        휴가신청 및 승인<br/> 
                        Time-Tracking 모듈지원<br/>
                        세무 및 노무관련 상담 지원
					</div>
				</div><!--/.item-wrap-->
			</div><!--/.col-md-3-->
		</div><!--/.row-->
	</div><!--/.container-->
</section><!--/#what-we-do-->

<!--=================================================
    our client
==================================================-->
<section id="client" class="whatwedo">
	<div class="container">
		<div class="section-title-wrap">
			<h2 class="section-title wow fadeInDown" data-wow-delay="0.2s">Our Main Client</h2>
			<span class="separator wow fadeInDown" data-wow-delay="0.4s"></span>
		</div><!--/.section-title-wrap-->
		<div class="RollDiv">  
		  <div>  
		    <a><img src="/img/img_client01.JPG" height="80px"></a>  
		    <a><img src="/img/img_client02.JPG" height="80px"></a>  
		    <a><img src="/img/img_client03.JPG" height="80px"></a>  
		    <a><img src="/img/img_client04.JPG" height="80px"></a>  
		    <a><img src="/img/img_client05.JPG" height="80px"></a>  
		    <a><img src="/img/img_client06.JPG" height="80px"></a>  
		    <a><img src="/img/img_client07.JPG" height="80px"></a>  
		    <a><img src="/img/img_client08.JPG" height="80px"></a>  
		    <a><img src="/img/img_client09.JPG" height="80px"></a>  
		  </div>  
		</div>   

<!-- 		<div class="row row_10"> -->
<!-- 			<div class="col-sm-4"> -->
<!-- 				<div class="what-wrap"> -->
<!-- 					<h3 class="three-title wow bounceIn" data-wow-delay="0.3s"><img src="/img/img_client01.png" alt=""></h3> -->
<!-- 				</div>/.three-wrap -->
<!-- 			</div>/.col-sm-4 -->
			
<!-- 			<div class="col-sm-4"> -->
<!-- 				<div class="what-wrap"> -->
<!-- 					<h3 class="three-title wow bounceIn" data-wow-delay="0.6s"><img src="/img/img_client02.png" alt=""></h3> -->
<!-- 				</div>/.three-wrap -->
<!-- 			</div>/.col-sm-4 -->
			
<!-- 			<div class="col-sm-4"> -->
<!-- 				<div class="what-wrap"> -->
<!-- 					<h3 class="three-title wow bounceIn" data-wow-delay="0.9s"><img src="/img/img_client03.png" alt=""></h3> -->
<!-- 				</div>/.three-wrap -->
<!-- 			</div>/.col-sm-4 -->
			
<!-- 			<div class="col-sm-4"> -->
<!-- 				<div class="what-wrap"> -->
<!-- 					<h3 class="three-title wow bounceIn" data-wow-delay="1.2s"><img src="/img/img_client04.png" alt=""></h3> -->
<!-- 				</div>/.three-wrap -->
<!-- 			</div>/.col-sm-4 -->
<!-- 		</div>/.row -->
	</div><!--/.container-->
</section> 
        
<!--=================================================
		13 - Contact
==================================================-->
<section id="contact">
	<div class="container">
		<div class="section-title-wrap">
			<h2 class="section-title wow fadeInDown" data-wow-delay="0.2s">Contact</h2>
			<span class="separator wow fadeInDown" data-wow-delay="0.4s"></span>
			<p>Content 에 간략한 정보(근로자수, 회사정보)를 기재해 주시면 만남이 더욱 유익해 질수 있습니다.</p>
		</div><!--/.section-title-wrap-->
		
		<div class="row row_10">
			<div class="col-sm-4">
				<div class="contact-wrap">
					<div class="contact-info">
						<p>Phone</p>
						<h2><a>02-2040-5366</a></h2>
					</div>
					<div class="contact-info">
						<p>Email</p>
						<h2><a>inchul.cho@metanet.co.kr</a></h2>
					</div>
					<div class="contact-info">
						<p>Address</p>
						<h3 class="address">서울시 종로구 종로33길 15<br> (연강빌딩)</h3>
					</div>
					<div class="contact-info">
						<p>Open</p>
						<h3>월요일~금요일 9:00~18:00</h3>
					</div>
				</div><!--/.contact-wrap-->
			</div><!--/.col-sm-4-->
			
			<div class="col-sm-8 hidden-xs">
				<form id="contact-form" action="/_board/exec_write" role="form">
					<input type="hidden" name="ajax"			value="true">
					
					<!--<div class="row">-->
						<div class="col-sm-6">
							<div class="form-group">
								<label>Name</label>
								<input type="text" id="name" name="name" data-label="이름" class="form-control">
<!-- 								<input type="text" class="form-control valid_input replace_input" name="bc_writer_name" data-label="이름" data-target="[name=bc_subject]" data-content="{value}님의 상담문의입니다." placeholder="이름을 입력해 주세요"> -->
							</div>
							<div class="form-group">
								<label>Phone</label>
								<input type="text" class="form-control" name="phone" id="phone">
<!-- 								<input type="text" class="form-control valid_input" name="bc_writer_phone" placeholder="전화번호를 입력해 주세요"> -->
							</div>
							<div class="form-group">
								<label>Email</label>
								<input type="text" class="form-control" name="email" id="email" >
<!-- 								<input type="text" class="form-control valid_input" name="bc_writer_email" data-label="이메일" placeholder="이메일을 입력해 주세요"> -->
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-group">
								<label>Content</label>
								<textarea class="form-control" name="content" id="content"  rows="3" ></textarea>
<!-- 								<textarea class="form-control valid_input" name="bc_content" data-label="상담내용" placeholder="상담내용을 입력해주세요" rows="3"></textarea> -->
							</div>
							
							<button type="button" class="btn btn-block contact-btn submit_btn" data-form="contact-form" onclick="javascript:sendMail();"><img src="/img/icon_letter.png" alt="">Send Message</button>
<!-- 							<button type="button" class="btn btn-block contact-btn submit_btn" data-form="contact-form"><img src="/img/icon_letter.png" alt="">Send Message</button> -->
						</div><!--/.col-sm-6-->
                    <!--</div>--><!--/.row-->
				</form>
				
			</div><!--/.col-sm-8-->
		</div><!--/.row-->
	</div><!--/.container-->
	
	<div id="map-canvas"></div>
	
	<!-- div class="switch-wrap">
		<input type="checkbox" class="map-switch">
		<h4>지도보기</h4>
	</div -->
</section><!--/#contact-->
     
     
<!--##### 푸터 #####-->
<footer>
	<div class="container">
			<div class="col-sm-2">
				<img class="img-responsive center-block" src="/img/img_logo_metanet.png" alt="Metanet Agile">
			</div>
			<div class="col-sm-10">
				<p class="company-info">
				   서울시 종로구 종로33길  (연강빌딩 5층) / 업무 및 영업문의 02 2040 5366 /<a href="javascript:popup();">개인정보처리방침</a><br/>
                    사업자등록번호 220 88 11297 대표자 박정식<br/>
                    CopyrightⓒMetanet Agile Co.,Ltd. All rights reserved.<br/>
				</p>
			</div>
	</div>
</footer>	
		 

		<!--##### Scroll Up #####-->
		<button type="button" class="btn btn-default scroll-up">
			<i class="fa fa-chevron-up fa-fw"></i>
		</button>
		
		<a href="tel:02-2040-5300" class="btn btn-default fixed-call-btn">
			<i class="fa fa-phone fa-fw"></i>
		</a>
		
		<script src="/lib/js/wow.min.js"></script>
		<script src="/lib/js/isotope.pkgd.min.js"></script>
		<script src="/lib/fancybox/jquery.fancybox.pack.js"></script>
		<script src="/lib/fancybox/helpers/jquery.fancybox-media.js"></script>
		<script src="/lib/js/jquery.bxslider.min.js"></script>
		<script src="/lib/js/jquery.raty-fa.js"></script>
		<script src="/lib/js/jquery.word-break-keep-all.min.js"></script>
		<script src="/lib/js/jquery.animateSlider.min.js"></script>
		<script src="/lib/icheck/icheck.min.js"></script>
		<script src="/lib/js/bootstrap-switch.min.js"></script>
		<script src="/lib/js/sha512.min.js"></script>
		
		<script src="/lib/rs-plugin/js/jquery.themepunch.tools.min.js"></script>
		<script src="/lib/rs-plugin/js/jquery.themepunch.revolution.min.js"></script>
		
		<script src="/lib/js/jquery.waypoints.min.js"></script>
		<script src="/lib/js/jquery.countTo.js"></script>
		<script src="http://apis.daum.net/maps/maps3.js?apikey=8f0756e816956b0961ab5b7c19f8d208"></script>
		
		<!--##### 공통 JS #####-->
		<script src="/js/helper.js"></script>
		<script src="/js/script.js"></script>
		<script src="/js/main.js"></script>
<!-- 		<script src="/js/mail.js"></script> -->

	</body>
</html>