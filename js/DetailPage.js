$(function () {
    // 
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
            return false;
        });
    }
    // 
    // 
    $.ajax({
        type: "post",
        url: "../php/gerenSP.php",
        data: `username=${status}`,
        dataType: "json",
        success: function (response) {
            $($(".shopping")[1]).siblings("p").text(response.length);
            $($(".shopping")[2]).find("p").text(response.length);
        }
    });
    // 
    let url = window.location.search;
    let urlCate = url.substr(6, 1) - 1;
    let urlId = url.substr(11, 13);
    let attr = ["新鲜水果", "绿色菜篮", "粮油调味", "干货特产", "零食饮料", "美酒名茶", "礼品礼券", "家具厨卫", "创意家电"];
    let attrColor = ["#76b003", "#30B633", "#e0a63b", "#da9166", "#27beaf", "#64b0c0", "#d864d3", "#8351ce", "#6494e8"]
    let res = attr[urlCate];
    // 发送ajax获取商品信息
    $.ajax({
        type: "post",
        url: "../php/DetailPage.php",
        data: `urlID=${urlId}`,
        dataType: "json",
        success: function (response) {
            let num = parseInt((response[0].price).substr(1, 5));
            $(".main-box>h3").html(`${response[0].title}<span>${response[0].explain}</span>`);
            $(".price>.l>em").text(`${response[0].price}`);
            $(".price>.l>i").text(`${num+num*0.5}`);
            $(".exzoom_img_ul>li>img").attr("src", `${response[0].imgurl}`)
        }
    });
    // 获取推荐商品
    $.ajax({
        type: "post",
        url: "../php/NewDetail.php",
        data: `classify=${urlCate + 1}`,
        dataType: "json",
        success: function (response) {
            let newlist = response.map(ele => {
                return `
                <div class="list">
                <a href=""><img src="${ele.imgurl}"
                        alt=""></a>
                <em>${ele.price}</em>
            </div>
                `
            }).join("");
            $(".slider_four_in_line").html(newlist);
            $('.slider_four_in_line').EasySlides({
                'autoplay': true,
                'show': 9
            })
        }
    });
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
    // 设置侧边栏的功能
    let windowHeight = $(window).height() - 30;
    $("#sidebar").css("height", `${windowHeight}`);
    $(document).scroll(function () {
        let height = $(document).scrollTop();
        if (height >= 30) {
            $("#sidebar").css({
                "height": "100%",
                "top": "0"
            });
        } else {
            $("#sidebar").css({
                "height": "100%",
                "top": 30 - height
            });
        }
        if (height >= 60) {
            $(".sidebar-service>a").css("top", "520px");
            $(".sidebar-service>p").css("top", "520px");
            $(".sidebar-hotLine>a").css("top", "560px");
            $(".sidebar-hotLine>p").css("top", "560px");
            $(".sidebar-qr>a").css("display", "block");
            $(".sidebar-goTop>a").css("display", "block");
        } else {
            $(".sidebar-service>a").css("top", "600px");
            $(".sidebar-service>p").css("top", "600px");
            $(".sidebar-hotLine>a").css("top", "640px");
            $(".sidebar-hotLine>p").css("top", "640px");
            $(".sidebar-qr>a").css("display", "none");
            $(".sidebar-goTop>a").css("display", "none");
        }
    });
    // 侧边栏一系列动画效果
    $("#sidebar>div").mouseenter(function () {
        $($(this).children()[1]).stop().animate({
            right: '40px'
        }, 300)
    }).mouseleave(function () {
        $($(this).children()[1]).css("right", "70px")
    })
    // 根据url数据改变页面标签内容和样式
    $(`.main-topNav>ul>li:eq(${urlCate})`).css("background-color", `${attrColor[urlCate]}`);
    $(".goods-leftNav>p>a:eq(1)").text(res);
    $(".goods-leftNav>p>a:eq(0)").text(res);
    // 主要内容上面二级菜单动画
    $(".main-topNav>ul>li").hover(function () {
        $(".nav-none").show(500);
    }, function () {
        $(".nav-none").hover(function () {
            $(this).css("display", "block")
        }, function () {
            $(".nav-none").hide();
        });
        $(".nav-none").hide();
    })
    // 渲染内容头部二级导航
    $(".main-topNav>ul>li").mouseover(function () {
        let index = jQuery.inArray($(this).text(), attr);
        $.ajax({
            type: "post",
            url: "../public/nav.json",
            dataType: "json",
            success: function (response) {
                let data = response[index].data;
                let res = data.map(ele => {
                    return `
                    <dl>
                    <dt>
                        <h4>${ele.title}</h4>
                    </dt>
                    <dd>
                        <a href="" class="hover-red">${ele.list[0]}</a>
                        <a href="" class="hover-red">${ele.list[1]}</a>
                        <a href="" class="hover-red">${ele.list[2]}</a>
                        <a href="" class="hover-red">${ele.list[3]}</a>
                        <a href="" class="hover-red">${ele.list[4]}</a>
                        <a href="" class="hover-red">${ele.list[5]}</a>
                    </dd>
                </dl>
                    `
                }).join("");
                $(".nav-none").html(res);
                $("a:contains(undefined)").remove();
            }
        });
    });
    // 左侧img插件
    $("#exzoom").exzoom();
    // 右侧轮播插件
    $('.slider_one_big_picture').EasySlides({
        'autoplay': true,
    });
    // 
    $(".cp-btnbox>ul>li:eq(0)>span:eq(0)").click(function () {
        let val = parseInt($(".cp-btnbox>ul>li:eq(1)>input").val());
        val = val + 1;
        $(".cp-btnbox>ul>li:eq(1)>input").val(val);
    })
    $(".cp-btnbox>ul>li:eq(0)>span:eq(1)").click(function () {
        let val = parseInt($(".cp-btnbox>ul>li:eq(1)>input").val());
        if (val > 1) {
            val = val - 1;
            $(".cp-btnbox>ul>li:eq(1)>input").val(val);
        } else {
            $(".cp-btnbox>ul>li:eq(1)>input").val("1");
        }
    })
    //
    $(".click").click(function () {
        if (status == null) {
            alert("请登录！");
            return false;
        } else {
            let imgurl = $(".current").find("img").attr("src");
            let title = ($(".main-box").find("h3").html()).split('<span>')[0];
            let price = $(".price>.l>em").text();
            let quantity = $(".cp-btnbox>ul>li:eq(1)>input").val();
            let id = urlId;
            $.ajax({
                type: "post",
                url: "../php/gerenSP.php",
                data: `username=${status}`,
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    let splength = response.length;
                    if (response.length > 9) {
                        console.log(response.length);
                        alert("对不起，购物车已满");
                    } else {
                        console.log(response.length);

                        $.ajax({
                            type: "post",
                            url: "../php/shangpingtianjia.php",
                            data: `username=${status}&id=${id}&quantity=${quantity}&imgurl=${imgurl}&title=${title}&price=${price}`,
                            dataType: "json",
                            success: function (response) {
                                alert("添加购物车成功");
                                console.log(response);
                                $($(".shopping")[1]).siblings("p").text(splength + 1);
                                $($(".shopping")[2]).find("p").text(splength + 1);
                            }
                        });
                    }
                }
            });
            return false;
        }
    })
    // 

})