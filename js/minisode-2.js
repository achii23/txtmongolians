var sectionPhotoTop = 0;

$(window).load(function () {
    // var isMobile = false;
    // $(window).resize(function () {
    //     var windowWidth = $(window).width();
    //     if (isMobile && windowWidth > 767) {
    //         isMobile = false;
    //         changeScreenMode();
    //     } else if (!isMobile && windowWidth < 768) {
    //         isMobile = true;
    //         changeScreenMode();
    //     }
    // })

    // ìŠ¤í¬ë¡¤ ê´€ë ¨
    $(window).scroll((evt) => {
        console.log($('.txt-section-photo').offset());
        var sectionPhotoOffset = $('.txt-section-photo').offset()
        sectionPhotoTop = sectionPhotoOffset.top;
        return false;
    });

    // í‹°ì € ê´€ë ¨
    $('.txt-section-teaser .video-thumbnail').click(function (evt) {
        $(this).css('opacity', 0);
        var vid = document.getElementById('teaser-video');
        vid.play();
        $("#teaser-video").show();
    })

    $(".txt-photo-home").click(function (evt) {
        $('.txt-photo').removeClass('off');
        $('.txt-photo-main').addClass('on');
    })

    $(".txt-btn-wrap > .txt-btn").click(function (evt) {
        var next = $(this).attr('data-next');
        // console.log('next', next);
        if (next == 'close') {
            $(this).parent().parent().removeClass('on');
            $(this).parent().parent().addClass('off');
            $('.txt-photo-main').removeClass('off');
            $('.txt-photo-main').addClass('on');
        } else if (next.indexOf('popup') >= 0) {
            var nextList = next.split('-');
            showPopup(nextList[1], nextList[2], nextList[3]);
        } else {
            $(this).parent().parent().removeClass('on');
            $(this).parent().parent().addClass('off');
            $("." + next).removeClass('off');
            $("." + next).addClass('on');
        }
    });
    $('.txt-popup-photo .btn-close').click(function (evt) {
        $('.txt-popup-photo').fadeOut();
    });
    $('.txt-popup-photo .bg').click(function (evt) {
        $('.txt-popup-photo').fadeOut();
    });

    // íŒŒì¼ ë‹¤ìš´ë¡œë“œ
    $(".popup-btn .btn-down").click(function (evt) {
        evt.preventDefault();
        var dataFile = $(".txt-popup-photo-swiper .swiper-slide-active .contents-obj").attr("data-src");
        if (check_ios() != "") {
            window.open("./https://ibighit.com/txt/images/txt/discography/minisode-2/photo/" + dataFile);
        } else {
            cfDownload("./https://ibighit.com/txt/images/txt/discography/minisode-2/photo/", dataFile);
        }
    });

    // íŒì—… ê´€ë ¨
    new Swiper('.txt-popup-photo-swiper', {
        slidesPerView: 1,
        centeredSlides: true,
    });

    console.log(ytReady);
})

var photoList = {
    "mess": [
        [
            "b3abc9e8dc56c6dfdd93f3ba282d82c2.jpg",
            "998e645d7490a82d259a1cf9e122f1a8.jpg",
        ],
        [
            "a15f6877bbf55a6a324312bb9b17bf97.jpg",
            "e6c26743df07259efd763d966b4794cb.jpg",
            "84762b89ac1eb87ee1f721a67ed55d0a.jpg",
            "60d6f97818812e9df15b579eb3f42847.jpg",
            "be762f0f59ebe06a4b84d79c034287c0.jpg",
        ],
        [
            "6cfc4cf9180eafdc577026965073e7c3.jpg",
            "f3042366ac49508e65310eb6f54fd5a2.jpg",
            "718f1d7eb398ca8828957a6b02905b12.jpg",
            "1c81ae700326611b695fb68e93a71137.jpg",
            "d1c6f3471032e9082452b1c762473fdb.jpg",
        ],
        [
            "add4236e871c49e67c86e4c6aa8db647.jpg",
            "0457f23c1e4b23be6284dad9b72e5653.jpg",
            "98e77be2d471248af7659baea3ca13ff.jpg",
            "4e5c1f6ea3cd6017b7186eceaed65e33.jpg",
            "b0f2c248dc4daa0921e94cdca615d6ca.jpg",
        ],
        [
            "6ebd0128738927f122da906167620c37.jpg",
            "74d2649153e5b501ee7b1237b562ee12.jpg",
            "00eb55bc1172e7d0a9e2dbe1697541a7.jpg",
            "6e00ca90692020e72d58d7f853f742d8.jpg",
            "7ada5945944312cae42dc7560e82dbfc.jpg",
        ],
        [
            "d660041346dd4698b0a46877906b6553.jpg",
            "a62b46c9d756ac5dfaaa9af2444f0c76.jpg",
            "48f932f90a8c1ae7bf26a0c095c42329.jpg",
            "e04dd4fb35107cd630935fb0c0a4ae08.jpg",
            "cc9bf5e06dcf023e74f4a4cf10c5b076.jpg",
        ]
    ],
    "end": [
        [
            "3364a6307795b77c6adb1d14fc7dd998.jpg",
            "35f2e40d0b82bb994b98648839ba86e6.jpg",
        ],
        [
            "9380b6162a2170bca554c5d7f5c6eb01.jpg",
            "5171052004b9c6ff81aeb78c830404b5.jpg",
            "f74faa2be0f8ffb739af2b297475cfc3.jpg",
            "cb17dec04cc80bc4a14c61c056aa5abd.jpg",
            "ba6a3ca87e94eb84017a81f2afdde6ba.jpg"
        ],
        [
            "b1e9dbdfdd2d9e99275c2de5636f123d.jpg",
            "5edd56eeb8a1dc846a4cb852e0d6c6ff.jpg",
            "6e0fb07640ec76f59dcb9d9fa27e1432.jpg",
            "675e4f931168cd5ffad13971c40e89ab.jpg",
            "a1d9775b09e9daa1313b9fdb45b85424.jpg"
        ],
        [
            "cbd55755f36ae3c896fe5e4c802e127a.jpg",
            "4d3d1cae8e9a46f7fce66ad0888e36d0.jpg",
            "16d485adca982b7cbee2a16c3c65d757.jpg",
            "b190b43fb1072b19b9f89e22453478e6.jpg",
            "14ba798f925166cf63ac8daf01bb266f.jpg"
        ],
        [
            "2aa61355f6a7f8e76d5c1b9ef3130029.jpg",
            "fd518ce19a9a8077e981479cd78e02dc.jpg",
            "fc2cf446ea673bb47b73511ff315ae15.jpg",
            "20b1b3aa1828cce9b92b8745ccefc380.jpg",
            "352664d475019f68b2b26cbd9be8b0c2.jpg"
        ],
        [
            "f3482e240b708f81454ce3b0e7d87499.jpg",
            "27c00c00e0868a00bad9d3bba521cdc4.jpg",
            "b6fcaf8f7e79e9d4542bded3c12c2d68.jpg",
            "bad573e42a52fcd3a2e9b4de3aff6eb3.jpg",
            "d13ac601031b8e235c871f08c355f2a2.jpg"
        ]
    ],
    "hate": [
        [
            "68b7f11ef2b357866852e0403aba32ac.jpg",
            "4190b6cf2c40f21c7d648028f0af5cf1.jpg"
        ],
        [
            "f414b4b0b156b50c1584c6df4cfd76a5.jpg",
            "5784e36a7b62413f3160e691bc3a6925.jpg",
            "d7f8cf6134022192c69b3620a3792d0a.jpg",
            "f990f2e6a9bb3788c6d1adabe3b59243.jpg",
            "494dc4b1757e683b642218bc27a5e95b.jpg",
            "f92e93f545c430c79867a3c617ab599e.jpg"

        ],
        [
            "80679665a00f2775617eab5c9276071b.jpg",
            "717475a195f72bdfa1a9403c65b43086.jpg",
            "2bedda86b3585e07f32acb07957597d4.jpg",
            "aae0fe3bf4bf2bc089a948b0f6a771e2.jpg",
            "d7bff98c3cf63271dd62e78bf03751ba.jpg",
            "9d165a80257759fc0fa59b4e601b6291.jpg",

        ],
        [
            "36edc0bf10aff36d8423b23dabbdbc82.jpg",
            "7b1f48967fca48c8decb25103e1b2741.jpg",
            "0162ffe1fce84d601e1ae0eb319e7949.jpg",
            "1ee2bd01190e5ac8b8d2bab5236fa6d8.jpg",
            "76643d653e7acdaad4b605e26bd0505e.jpg",
            "d2507df2a28ae725d81e4d808d171ed2.jpg"
        ],
        [
            "2568cff9ac09ab9e20e693499535b565.jpg",
            "426ef908225fe80761a577a38037b010.jpg",
            "7373a023390bd18b72da22b695d70161.jpg",
            "ae8bf814672ab802ae8310f2dacf6344.jpg",
            "60ff3e0eb27dca0da241068b1edeed22.jpg",
            "60d8eb097449a7f34dcfe8637045a4ed.jpg"

        ],
        [
            "92f34989325ae97dc7abfbf7628a1fa2.jpg",
            "e0424c600ff30a3b2f2db39ba6589bbe.jpg",
            "f1374831a476d03ad6b241b2d4af4732.jpg",
            "2877df3e91ac0a7687adbfd4245948bd.jpg",
            "afb262617857a11f9ddadf51b4384ce9.jpg",
            "3d2c06e8e808d03e3c9d341c7e19e6b4.jpg"
        ]
    ]
}

var swiperWrapperBaseHtml = "<ul class='swiper-wrapper'>%SWIPER_SLIDE_HTML%</ul>";
var swiperSlideBaseHtml = "<li class='swiper-slide'><div class='wrap'><div class='contents-obj' data-src=%DATA_SRC% style='background-image:url(%IMG_URL%);'></div></div></li>"

// Open popup
function showPopup(ct, mpn, pn) {
    // console.log('showPopup', ct, mpn, pn)
    var basePath = 'https://ibighit.com/txt/images/txt/discography/minisode-2/photo';
    var mpList = photoList[ct][mpn - 1];

    var swiperSlideHtml = '';
    mpList.map(function (fn, idx) {
        let html = swiperSlideBaseHtml;
        html = html.replace(/%DATA_SRC%/g, '"' + ct + '/download/' + fn + '"');
        html = html.replace(/%IMG_URL%/g, '"' + basePath + "/" + ct + "/" + fn + '"');
        swiperSlideHtml += html;
    })
    var html = swiperWrapperBaseHtml.replace(/%SWIPER_SLIDE_HTML%/g, swiperSlideHtml);

    $('.txt-popup-photo-swiper').html(html);
    $('.txt-popup-photo').fadeIn();

    var options = {
        slidesPerView: 1,
        centeredSlides: true,
        initialSlide: pn - 1,
        loop: true,
        speed: 500,
        spaceBetween: 5,
        navigation: {
            nextEl: '.txt-pop-btn-next',
            prevEl: '.txt-pop-btn-prev',
        }
    }
    // console.log('options', options);

    new Swiper('.txt-popup-photo-swiper', options);
    $(window).trigger('scroll');
    // console.log('sectionPhotoTop', sectionPhotoTop);
    $('html, body').stop().animate({ scrollTop: sectionPhotoTop });
}