$(function () {
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
            $(".sidebar-service>a").css("top", "52x0px");
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
            url: "../php/HomePage.php",
            dataType: "json",
            success: function (response) {
                var res = response.map(ele => {
                    return `
                        <li>
                            <span calss="${ele.id}">
                                <a href="">${ele.title}</a>
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
            // $(".none-nav").css("display","none");
        })
    })
})