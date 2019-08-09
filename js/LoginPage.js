$(function () {
    // 随机图形验证码
    var yzmText = "";
    let captcha1 = new Captcha();
    captcha1.draw(document.querySelector('#captcha1'), r => {
        yzmText = r;
    });
    // 
    var phone = "flase";
    var password = "flase";
    var yzm = "flase";
    $(".phone>input").blur(function () {
        let phonenum = $(this).val();
        if (!(/^1[3456789]\d{9}$/.test(phonenum))) {
            $(".spnaPhone").css({
                "background": "url(../images/registration/login_error.png) no-repeat left center",
                "padding-left": "30px",
                "color": "#c9c9c9"
            }).text("请输入正确的手机号码");
            phone = false;
        } else {
            $(".spnaPhone").css("background", "none").text("");
            phone = true;
        }
    });
    $(".password>input").blur(function () {
        let passwordnum = $(this).val();
        if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/).test(passwordnum)) {
            $(".spanPassword").css({
                "background": "url(../images/registration/login_error.png) no-repeat left center",
                "padding-left": "30px",
                "color": "#c9c9c9"
            }).text("密码为6-16位的数字，字母组成");
            password = false;
        } else {
            $(".spanPassword").css("background", "none").text("");
            password = true;
        }
    });
    $(".yzm>input").blur(function () {
        let yzmnum = $(this).val();
        if (yzmnum == yzmText) {
            $(".spanY").css("background", "none").text("");
            yzm = true;
        } else {
            $(".spanY").css({
                "background": "url(../images/registration/login_error.png) no-repeat left center",
                "padding-left": "30px",
                "color": "#c9c9c9"
            }).text("请输入正确验证码,区分大小写");
            yzm = false;
        }
    });
    // 获取数据库
    $(".submit").click(function () {
        if (phone == true && password == true && yzm == true) {
            let username = $(".phone>input").val();
            let passwordText = $(".password>input").val();
            $.ajax({
                type: "post",
                url: "../php/TextUsername.php",
                data: `username=${username}`,
                dataType: "json",
                success: function (response) {
                    if (response.length == 0) {
                        alert("对不起，该用户未注册！");
                        $("input").val("");
                    } else {
                        if (passwordText != response[0].password) {
                            alert("对不起，密码错误！");
                            $(".password>input").val("");
                        } else {
                            localStorage.setItem("username", username);
                            alert("登入成功，请点击跳转首页！");
                            window.location.href = "./HomePage.html";
                        }
                    }
                }
            });
        } else {
            alert("请确认输入内容！")
        }
        return false;
    })
})