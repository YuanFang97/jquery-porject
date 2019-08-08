$(function () {
    let captcha1 = new Captcha();
    captcha1.draw(document.querySelector('#captcha1'), r => {
        console.log(r, '验证码1');
    });
})