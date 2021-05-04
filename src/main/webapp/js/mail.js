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
	
	$.ajax({
        type:"post",
        url:'/sendMail',
        data:"name="+name+"&phone="+phone+"&email="+email+"&content="+content,     
        dataType : "json",
        success:function(result){
        	alert("성공");
        },
        error:function(request,status,error){
        	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
 	    });
 }