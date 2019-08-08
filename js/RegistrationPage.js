 $(function () {
     var phonetf = "flase";
     var password = "flase";
     var passwordres = "flase";
     var note = "flase";
     var notenum = "";
     $(".phone>input").blur(function () {
         let phone = $(this).val();
         if (!(/^1[3456789]\d{9}$/.test(phone))) {
             $(".phone").css("background", "url(../images/registration/login_right.png) no-repeat 440px -35px");
             $(".spnaPhone").css({
                 "background": "url(../images/registration/login_error.png) no-repeat left center",
                 "padding-left": "30px",
                 "color": "#c9c9c9"
             }).text("请输入正确的手机号码");
             phonetf = false;
         } else {
             $(".phone").css("background", "url(../images/registration/login_right.png) no-repeat 440px 8px");
             $(".spnaPhone").css("background", "none").text("");
             phonetf = true;
         }
     });
     $(".note>input").blur(function () {
         let notenum = $(this).val();
         if (notenum == notenum && notenum.length != 0) {
             $(".note").css("background", "url(../images/registration/login_right.png) no-repeat 440px 8px");
             $(".spanNote").css("background", "none").text("");
             note = true;
         } else {
             $(".note").css("background", "url(../images/registration/login_right.png) no-repeat 440px -35px");
             $(".spanNote").css({
                 "background": "url(../images/registration/login_error.png) no-repeat left center",
                 "padding-left": "30px",
                 "color": "#c9c9c9"
             }).text("请输入正确验证码");
             note = false;
         }
     });
     $(".note>a").click(function () {
         let arr = [5266, 8215, 8233, 8641, 1841, 3129, 8411, 3156, 5412, 8485, 1286, 5113, 5461, 9874, 3188, 1218, 1534, 4315, 4681, 3415, 8411, 8413, 1568, 8741, 8611, 8413, 6053, 1321, 6130];
         let num = parseInt(Math.random() * 30);
         alert("短信验证码为: " + arr[num]);
         notenum = arr[num];
         return false;
     })
     $(".password>input").blur(function () {
         let passwordnum = $(this).val();
         if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/).test(passwordnum)) {
             $(".password").css("background", "url(../images/registration/login_right.png) no-repeat 440px -35px");
             $(".spanPassword").css({
                 "background": "url(../images/registration/login_error.png) no-repeat left center",
                 "padding-left": "30px",
                 "color": "#c9c9c9"
             }).text("密码为6-16位的数字，字母组成");
             password = false;
         } else {
             $(".password").css("background", "url(../images/registration/login_right.png) no-repeat 440px 8px");
             $(".spanPassword").css("background", "none").text("");
             password = true;
         }
     });
     $(".passwordres>input").blur(function () {
         let password = $(".password>input").val();
         let passwordresnum = $(this).val();
         if (password == passwordresnum && passwordresnum.length != 0) {
             $(".passwordres").css("background", "url(../images/registration/login_right.png) no-repeat 440px 8px");
             $(".spnaRes").css("background", "none").text("");
             passwordres = true;
         } else {
             $(".passwordres").css("background", "url(../images/registration/login_right.png) no-repeat 440px -35px");
             $(".spnaRes").css({
                 "background": "url(../images/registration/login_error.png) no-repeat left center",
                 "padding-left": "30px",
                 "color": "#c9c9c9"
             }).text("请输入确认密码");
             passwordres = false;
         }
     });
     $(".submit").click(function () {
         let checkbox = $("input[type='checkbox']").is(':checked');
         console.log(phonetf,password,passwordres,note,checkbox);
         
         if(phonetf == true && password == true && passwordres == true && note == true && checkbox == true){
             
         }else{
             alert("请验证")
         }
         return false;
     })
 })