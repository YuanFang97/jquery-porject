$(function () {
    let status = localStorage.getItem("username");
    if (status == null) {
        $(".shopping").click(function () {
            alert("对不起，请先登入！")
            return false;
        })
    } else {
        $(".head-nav>.right>ul>li:eq(0)>a").text(status);
        $(".head-nav>.right>ul>li:eq(1)>a").text("退出");
        $(".head-nav>.right>ul>li:eq(0)>a").click(function () {
            return false;
        })
        $(".head-nav>.right>ul>li:eq(1)>a").click(function () {
            localStorage.clear();
            alert("已退出！");
            location.reload();
            window.location.href = './HomePage.html';
            return false;
        });
    }
    // 头部轮播图自动切换
    let headCarousel = function () {
        setInterval(function () {
            let oneCss = $(".carousel-a1").css("display");
            let towCss = $(".carousel-a2").css("display");
            if (oneCss == "block" && towCss == "none") {

                $(".carousel-a1").css("display", "none");
                $(".carousel-a2").css("display", "block");
            }
            if (towCss == "block" && oneCss == "none") {
                $(".carousel-a1").css("display", "block");
                $(".carousel-a2").css("display", "none");
            }
        }, 3000)
    }();
    // 渲染数据
    let xr = function () {
        $.ajax({
            type: "post",
            url: "../php/gerenSP.php",
            data: `username=${status}`,
            dataType: "json",
            success: function (response) {
                console.log(response.length);

                if (response.length != 0) {
                    $(".none").css("display", "none")
                }
                let shoplist = response.map(ele => {
                    return `
                    <div class="list">
                    <div class="text">
                        <input type="checkbox" checked>
                        <img src="${ele.imgurl}"
                            alt="">
                        <span>${ele.title}</span>
                    </div>
                    <div class="title">
                        <p>${ele.price}</p>
                        <p><em class="jian">-</em><i class = "${ele.id}">${ele.quantity}</i><em class="jia">+</em></p>
                        <p class="he">${parseInt((ele.price).substr(1,6) * ele.quantity)}</p>
                        <p>4KG</p>
                        <p><a href="" class="hover-green romove" id="${ele.id}">删除</a></p>
                    </div>
                </div>
                    `
                }).join("");
                $(".block").html(shoplist);
                let zong = 0;
                for (let i = 0; i < $(".title").find(".he").length; i++) {
                    zong = zong + parseInt($($(".title").find(".he")[i]).text());
                }
                $(".result>p:eq(0)>span:eq(0)>em").text(`￥${zong}`);
            }
        });
    };
    xr();

    // 
    $(".block").on("click", ".title>p>a", function () {
        let id = $(this).attr("id");
        $.ajax({
            type: "post",
            url: "../php/remove.php",
            data: `id=${id}&username=${status}`,
            dataType: "json",
            success: function (response) {
                xr();
            }
        });
        return false;
    })
    // 
    $(".block").on("click", ".jia", function () {
        let ival = parseInt($(this).siblings("i").text());
        ival = ival + 1;
        $(this).siblings("i").text(ival);
        let id = $(this).siblings("i").attr("class");
        $.ajax({
            type: "post",
            url: "../php/amend.php",
            data: `id=${id}&username=${status}&quantity=${ival}`,
            dataType: "json",
            success: function (response) {
                console.log(response);
                xr();
            }
        });
    });
    $(".block").on("click", ".jian", function () {
        let ival = parseInt($(this).siblings("i").text());
        if (ival > 1) {
            ival = ival - 1;
            $(this).siblings("i").text(ival);
        } else {
            $(this).siblings("i").text("1");
        }
        let id = $(this).siblings("i").attr("class");
        $.ajax({
            type: "post",
            url: "../php/amend.php",
            data: `id=${id}&username=${status}&quantity=${ival}`,
            dataType: "json",
            success: function (response) {
                console.log(response);
                xr();
            }
        });
    })
})