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
            return false;
        });
    }
    // 
    $.ajax({
        type: "post",
        url: "../php/gerenSP.php",
        data: `username=${status}`,
        dataType: "json",
        success: function (response) {
            console.log(response.length);
            $($(".shopping")[1]).siblings("p").text(response.length);
            $($(".shopping")[2]).find("p").text(response.length);
        }
    });
    // 
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
    // 自动轮播图
    $(".my-banner").edslider({
        width: document.documentElement.clientWidth,
        height: 468,
        interval: 1000,
        duration: 500,
        navigator: true,
        paginator: false,
    })
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
        if (height >= 700) {
            $("#floor").css("display", "block")
        } else {
            $("#floor").css("display", "none")
        }
        if (height >= 700 && height < 1133) {
            $("[href='#new-arrivals']").parents("li").css("background", "red");
            $("[href='#new-arrivals']").parents("li").siblings().css("background", "#b7b5b5");
        } else if (height >= 1133 && height < 2044) {
            $("[href='#ht_01.jpg']").parents("li").css("background", "#76b003");
            $("[href='#ht_01.jpg']").parents("li").siblings().css("background", "#b7b5b5");
        } else if (height >= 2044 && height < 2966) {
            $("[href='#ht_02.jpg']").parents("li").css("background", "#30b633");
            $("[href='#ht_02.jpg']").parents("li").siblings().css("background", "#b7b5b5");
        } else if (height >= 2966 && height < 3884) {
            $("[href='#ht_03.jpg']").parents("li").css("background", "#e0a63b");
            $("[href='#ht_03.jpg']").parents("li").siblings().css("background", "#b7b5b5");
        } else if (height >= 3884 && height < 4789) {
            $("[href='#ht_04.jpg']").parents("li").css("background", "#da9166");
            $("[href='#ht_04.jpg']").parents("li").siblings().css("background", "#b7b5b5");
        } else if (height >= 4789 && height < 5720) {
            $("[href='#ht_05.jpg']").parents("li").css("background", "#27beaf");
            $("[href='#ht_05.jpg']").parents("li").siblings().css("background", "#b7b5b5");
        } else if (height >= 5720 && height < 6612) {
            $("[href='#ht_06.jpg']").parents("li").css("background", "#64b0c0");
            $("[href='#ht_06.jpg']").parents("li").siblings().css("background", "#b7b5b5");
        } else if (height >= 6612 && height < 7570) {
            $("[href='#ht_07.jpg']").parents("li").css("background", "#d864d3");
            $("[href='#ht_07.jpg']").parents("li").siblings().css("background", "#b7b5b5");
        } else if (height >= 7570 && height < 8448) {
            $("[href='#ht_08.jpg']").parents("li").css("background", "#8351ce");
            $("[href='#ht_08.jpg']").parents("li").siblings().css("background", "#b7b5b5");
        } else if (height >= 8448 && height < 9150) {
            $("[href='#ht_09.jpg']").parents("li").css("background", "#6494e8");
            $("[href='#ht_09.jpg']").parents("li").siblings().css("background", "#b7b5b5");
        } else if (height >= 9150) {
            $("#floor>ul>li").css("background", "#b7b5b5");
        }
    })
    // 侧边栏一系列动画效果
    $("#sidebar>div").mouseenter(function () {
        $($(this).children()[1]).stop().animate({
            right: '40px'
        }, 300)
    }).mouseleave(function () {
        $($(this).children()[1]).css("right", "70px")
    })
    // 渲染block-nav的数据
    new Promise(function (resolve, reject) {
        $.ajax({
            type: "post",
            url: "../php/homepage/classify.php",
            dataType: "json",
            success: function (response) {
                var res = response.map(ele => {
                    return `
                        <li>
                            <span calss="${ele.id}">
                                <a href="./ListPage.html?cate=00${ele.id}">${ele.title}</a>
                                <p>
                                    <a href="">${ele.list1}</a>
                                    <a href="">${ele.list2}</a>
                                    <a href="">${ele.list3}</a>
                                    <a href="">${ele.list4}</a>
                                </p>
                            </span>
                        </li>
                        `
                }).join("");
                $(".block-nav>ul").html(res);
                resolve();
            }
        });
    }).then(function () {
        $(".block-nav>ul>li>span").hover(function () {
            $(this).parent().siblings().children("span").css("background-color", "#fff")
            $(this).css("background-color", "#ccc");
            let id = parseInt($(this).attr("calss")) - 1;
            // 渲染none-nav的数据
            $.ajax({
                type: "post",
                url: "../public/nav.json",
                dataType: "json",
                success: function (response) {
                    let data = response[id].data;
                    var res = data.map(ele => {
                        return `
                        <dl>
                        <dt>
                            <a href="">
                                ${ele.title}
                                <i>></i>
                            </a>
                        </dt>
                        <dd>
                        <a href="" class="hover-red">${ele.list[0]}</a>
                        <a href="" class="hover-red">${ele.list[1]}</a>
                        <a href="" class="hover-red">${ele.list[2]}</a>
                        <a href="" class="hover-red">${ele.list[3]}</a>
                        <a href="" class="hover-red">${ele.list[4]}</a>
                        <a href="" class="hover-red">${ele.list[5]}</a>
                        <a href="" class="hover-red">${ele.list[6]}</a>
                        <a href="" class="hover-red">${ele.list[7]}</a>
                        <a href="" class="hover-red">${ele.list[8]}</a>
                        <a href="" class="hover-red">${ele.list[9]}</a>
                        <a href="" class="hover-red">${ele.list[10]}</a>
                        </dd>
                    </dl>
                            `
                    }).join("");
                    $(".none-nav").html(res);
                    $("a:contains(undefined)").remove();
                }
            });
        }, function () {
            $(this).css("background-color", "#fff");
        })
    })
    // 渲染新品的数据
    $.ajax({
        type: "post",
        url: "../php/homepage/newList.php",
        dataType: "json",
        success: function (response) {
            var res = response.map(ele => {
                return `
                <div>
                <a href="">
                    <i><img src="${ele.img}"
                            alt=""></i>
                    <span>${ele.title}</span>
                    <span>
                        <em>${ele.currentPrice}</em>
                        <i>${ele.originalCost}</i>
                    </span>
                </a>
            </div>
                    `
            }).join("");
            $(".slider_four_in_line").html(res);
            // 新品推荐位置的轮播效果
            $('.slider_four_in_line').EasySlides({
                'autoplay': true,
                'show': 10
            })
        }
    });
    // 渲染分类商品
    $.ajax({
        type: "post",
        url: "../php/homepage/goodslisttop.php",
        dataType: "json",
        success: function (response) {
            var res = response.map(ele => {
                return `
                <div class="goods" id="${ele.bgImg}">
                <div class="content">
                    <div class="goods-list">
                        <div class="goods-listNav"
                            style="background: url(../images/homepage/${ele.bgImg}) no-repeat center center">
                            <ul>
                                <li style="border: 1px sorid ${ele.liBorderC};background:${ele.liBgC};"><a
                                        href="">${ele.li1}</a></li>
                                <li style="border: 1px sorid ${ele.liBorderC};background:${ele.liBgC};"><a
                                        href="">${ele.li2}</a></li>
                                <li style="border: 1px sorid ${ele.liBorderC};background:${ele.liBgC};"><a
                                        href="">${ele.li3}</a></li>
                                <li style="border: 1px sorid ${ele.liBorderC};background:${ele.liBgC};"><a
                                        href="">${ele.li4}</a></li>
                                <li style="border: 1px sorid ${ele.liBorderC};background:${ele.liBgC};"><a
                                        href="">${ele.li5}</a></li>
                                <li style="border: 1px sorid ${ele.liBorderC};background:${ele.liBgC};"><a
                                        href="">${ele.li6}</a></li>
                            </ul>
                            <div class="main-img">
                                <a href=""><img src="${ele.mainImg}" alt=""></a>
                            </div>
                            <div class="right-img">
                                <a href=""><img src="${ele.rightImg}" alt=""></a>
                                <a href="" style="color: ${ele.liBgC}">查看更多>></a>
                            </div>
                        </div>
                        <div class="goods-listShop"></div>
                    </div>
                </div>
            </div>
                `
            }).join("");
            $("#goods").html(res);
            $.ajax({
                type: "post",
                url: "../php/homepage/HomeGoods.php",
                dataType: "json",
                success: function (response) {
                    response.unshift({
                        name: 'res'
                    })
                    let attr = [];
                    for (let i = 1; i <= response.length; i++) { //循环遍历
                        if (i % 12 == 1) { //每当余数为1时，就重新建立数组，
                            var a = [];
                            attr.push(a); //将数组存到外面的数组中
                        }
                        a.push(response[i]); //将元素存到里面的数组中
                    }
                    attr.pop();
                    for (let j = 0; j < attr.length; j++) {
                        $($(".goods-listShop")[j]).html(`
                        <ul>
                        <li>
                            <div>
                                <a href=""><img src="${attr[j][0].img}"
                                        alt=""></a>
                            </div>
                            <p>
                                <em><a href="">${attr[j][0].title}</a></em>
                                <span>
                                    <i>￥${attr[j][0].vipPrice}</i>
                                    <i>${attr[j][0].originalPrice}</i>
                                </span>
                            </p>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="${attr[j][1].img}"
                                        alt=""></a>
                            </div>
                            <p>
                                <em><a href="">${attr[j][1].title}</a></em>
                                <span>
                                    <i>￥${attr[j][1].vipPrice}</i>
                                    <i>${attr[j][1].originalPrice}</i>
                                </span>
                            </p>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="${attr[j][2].img}"
                                        alt=""></a>
                            </div>
                            <p>
                                <em><a href="">${attr[j][2].title}</a></em>
                                <span>
                                    <i>￥${attr[j][2].vipPrice}</i>
                                    <i>${attr[j][2].originalPrice}</i>
                                </span>
                            </p>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="${attr[j][3].img}"
                                        alt=""></a>
                            </div>
                            <p>
                                <em><a href="">${attr[j][3].title}</a></em>
                                <span>
                                    <i>￥${attr[j][3].vipPrice}</i>
                                    <i>${attr[j][3].originalPrice}</i>
                                </span>
                            </p>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="${attr[j][4].img}"
                                        alt=""></a>
                            </div>
                            <p>
                                <em><a href="">${attr[j][4].title}</a></em>
                                <span>
                                    <i>￥${attr[j][4].vipPrice}</i>
                                    <i>${attr[j][4].originalPrice}</i>
                                </span>
                            </p>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="${attr[j][5].img}"
                                        alt=""></a>
                            </div>
                            <p>
                                <em><a href="">${attr[j][5].title}</a></em>
                                <span>
                                    <i>￥${attr[j][5].vipPrice}</i>
                                    <i>${attr[j][5].originalPrice}</i>
                                </span>
                            </p>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="${attr[j][6].img}"
                                        alt=""></a>
                            </div>
                            <p>
                                <em><a href="">${attr[j][6].title}</a></em>
                                <span>
                                    <i>￥${attr[j][6].vipPrice}</i>
                                    <i>${attr[j][6].originalPrice}</i>
                                </span>
                            </p>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="${attr[j][7].img}"
                                        alt=""></a>
                            </div>
                            <p>
                                <em><a href="">${attr[j][7].title}</a></em>
                                <span>
                                    <i>￥${attr[j][7].vipPrice}</i>
                                    <i>${attr[j][7].originalPrice}</i>
                                </span>
                            </p>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="${attr[j][8].img}"
                                        alt=""></a>
                            </div>
                            <p>
                                <em><a href="">${attr[j][8].title}</a></em>
                                <span>
                                    <i>￥${attr[j][8].vipPrice}</i>
                                    <i>${attr[j][8].originalPrice}</i>
                                </span>
                            </p>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="${attr[j][9].img}"
                                        alt=""></a>
                            </div>
                            <p>
                                <em><a href="">${attr[j][9].title}</a></em>
                                <span>
                                    <i>￥${attr[j][9].vipPrice}</i>
                                    <i>${attr[j][9].originalPrice}</i>
                                </span>
                            </p>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="${attr[j][10].img}"
                                        alt=""></a>
                            </div>
                            <p>
                                <em><a href="">${attr[j][10].title}</a></em>
                                <span>
                                    <i>￥${attr[j][10].vipPrice}</i>
                                    <i>${attr[j][10].originalPrice}</i>
                                </span>
                            </p>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="${attr[j][11].img}"
                                        alt=""></a>
                            </div>
                            <p>
                                <em><a href="">${attr[j][11].title}</a></em>
                                <span>
                                    <i>￥${attr[j][11].vipPrice}</i>
                                    <i>${attr[j][11].originalPrice}</i>
                                </span>
                            </p>
                        </li>
                    </ul>
                        `)
                    }
                }
            });
        }
    });
})