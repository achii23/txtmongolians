$(document).ready(temptationReady)
$(window).load(temptationLoad)
    .resize(temptationResize)
    .scroll(temptationScroll);

var conceptIdx = 0;
var memberIdx = 0;
var cIdx = 0;
var temptationIng = false;
var tabIndex = 0
var slideIdx = 0;

var temptationSet = false;
var temptationTop = 0;
var temptationHeight = $(window).outerHeight();

var arrowPosition_t = 0;
var arrowPosition_l = 0;
var photoTop = 0;
var photoHeight = 0;
var arrowHeight = 0;
var photoInner_top = 0;
var photoInner_height = 0;
function temptationReady() {
    console.log('temptationReady');

    $(".video-wrap-1 .pc video").on('loadeddata', function () {
        console.log('pc video 1 loaded');
        setTimeout(() => {
            this.currentTime = 0;
            this.play();
        }, 500);
    })
    $(".video-wrap-1 .mb video").on('loadeddata', function () {
        console.log('mb video 1 loaded');
        setTimeout(() => {
            this.currentTime = 0;
            this.play();
        }, 500);
    })

    $('.video-wrap-2 video').on('loadeddata', function () {
        this.currentTime = 0;
        this.play();

        setTimeout(() => {
            $('.video-wrap-1').fadeOut(function () {
                $(this).hide();
                // $('.video-wrap-2').addClass('shadow');
            })
        }, 250);
    });

    $('.concept_teaser video').on('loadeddata', function () {
        console.log('concept video loaded');
        setTimeout(() => {
            console.log('concept video play');
            this.currentTime = 0;
            this.play();
        }, 500);
    });

    $('.schedule video.pc').on('loadeddata', function () {
        console.log('schedule video loaded');
        setTimeout(() => {
            console.log('pc schedule video play');
            this.currentTime = 0;
            this.play();
        }, 500);
    });

    $('.schedule video.mb').on('loadeddata', function () {
        console.log('mb schedule video loaded');
        setTimeout(() => {
            console.log('mb schedule video play');
            this.currentTime = 0;
            this.play();
        }, 500);
    });

    $('#track-list-video').on('loadeddata', function () {
        console.log('tracklist video loaded');
        setTimeout(() => {
            console.log('tracklist video play');
            this.currentTime = 0;
            this.play();
        }, 500);
    });

    temptationSet = true;
    temptationHeight = $(window).outerHeight();

    // $(".temptation .album-detail .album-photo .contents-obj").removeClass("fix").removeClass("bottom").css({ "bottom": "", "left": "" });
    // $(".temptation .album-detail .album-photo .contents-obj").removeClass("fix").removeClass("bottom").css({ "bottom": "", "right": "" });

    arrowPosition_t = $(".temptation .album-detail .album-photo .contents-obj").offset().top;
    arrowPosition_l = $(".temptation .album-detail .album-photo .contents-obj").offset().left;
    photoTop = $(".album-detail .album-photo .contents-obj").offset().top;
    photoHeight = $(".album-detail .album-photo .contents-obj").outerHeight();
    arrowHeight = $(".temptation .album-detail .album-photo .contents-obj ").outerHeight();
    // photoInner_top = $(".album-detail .album-photo .contents-obj .click_hh").offset().top;
    // photoInner_height = $(".album-detail .album-photo .contents-obj .click_hh > li").eq(0).find("> ul > li").eq(0).outerHeight();

    if (viewportWidth() > 768) {
        temptationMode = "pc";
    } else {
        temptationMode = "mobile";
    }
    loadVideo();

    $('.video-wrap-1 .btn').click(function () {
        const videoSrc = $(this).attr('data-src');
        $('.video-wrap-2 video').attr('src', 'https://ibighit.com/txt/images/txt/discography/temptation/concept-photo/video-2/' + videoSrc);

        conceptIdx = $(this).attr('data-concept-idx');

        if (conceptIdx == 3) {
            console.log('hide');
            $(".temptation .video-wrap-2 .btn-group").hide();
        } else {
            console.log('show');
            $(".temptation .video-wrap-2 .btn-group").show();
        }
        $('.video-wrap-2').css('visibility', 'visible');
    });

    $(".video-wrap-2 .btn-close").click(function () {
        // $('.video-wrap-2').removeClass('shadow');
        $(".video-wrap-1")
            .fadeIn(function () {
            })
    });

    $('.video-wrap-2 .btn').click(function () {
        memberIdx = $(this).attr('data-member-idx');

        cIdx = 0;

        $(".temptation .album-detail .album-photo .popup-photo > ul > li").removeClass("active");
        $(".temptation .album-detail .album-photo .popup-photo > ul > li").eq(conceptIdx).addClass("active");
        $(".temptation .album-detail .album-photo .popup-photo > ul > li ul").removeClass("active");
        $(".temptation .album-detail .album-photo .popup-photo > ul > li").eq(conceptIdx).find("ul").eq(memberIdx).addClass("active");
        $(".temptation .album-detail .album-photo .popup-photo > ul > li ul > li").css({ "margin-left": "100%" });
        $(".temptation .album-detail .album-photo .popup-photo > ul > li").eq(conceptIdx).find("ul").eq(memberIdx).find("li").eq(cIdx).css({ "margin-left": "0" });

        $(".temptation .popup-bg").css({ "display": "block", "opacity": 0 }).animate({ "opacity": 1 }, 500);
        $(".temptation .album-detail .album-photo .popup-photo").css({ "display": "block", "opacity": 0 }).animate({ "opacity": 1 }, 500);

        var goTop = $(".temptation .album-detail .album-photo .popup-photo").offset().top - $("header").outerHeight();
        var speed = Math.abs(goTop - temptationTop);
        $("html, body").stop().animate({ "scrollTop": goTop + "px" }, 100, 'swing');

        // popupLanguage();
        $(".temptation .album-detail .album-photo .popup-photo .btn-down").focus();
    });

    $(".temptation .album-detail .album-photo .popup-photo .pop-btn-prev").click(function () {
        console.log('prev');
        if (!temptationIng) {
            temptationIng = true;
            // tabIndex = $(this).parent().parent().index();
            tabIndex = conceptIdx

            var cMax = $(".temptation .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex)
                .find("ul").eq(memberIdx)
                .find("li").length;
            $(".temptation .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex)
                .find("ul").eq(memberIdx)
                .find("li").eq(cIdx)
                .animate({ "margin-left": "100%" }, 500);
            cIdx--;
            if (cIdx < 0) {
                cIdx = cMax - 1;
            }
            $(".temptation .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex)
                .find("ul").eq(memberIdx)
                .find("li").eq(cIdx).css({ "margin-left": "-100%" })
                .animate({ "margin-left": "0%" }, 500);
            setTimeout(function () {
                temptationIng = false;
            }, 500);
            // popupLanguage();
        }
        return false;
    });

    $(".temptation .album-detail .album-photo .popup-photo .pop-btn-next").click(function () {
        console.log('next', temptationIng);
        if (!temptationIng) {
            temptationIng = true;
            // tabIndex = $(this).parent().parent().index();
            tabIndex = conceptIdx;

            var cMax = $(".temptation .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex)
                .find("ul").eq(memberIdx)
                .find("li").length;
            $(".temptation .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex)
                .find("ul").eq(memberIdx)
                .find("li").eq(cIdx)
                .animate({ "margin-left": "-100%" }, 500);
            cIdx++;

            console.log(tabIndex, cMax, cIdx);

            if (cIdx == cMax) {
                cIdx = 0;
            }
            $(".temptation .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex)
                .find("ul").eq(memberIdx)
                .find("li").eq(cIdx)
                .css({ "margin-left": "100%" })
                .animate({ "margin-left": "0%" }, 500);

            setTimeout(function () {
                temptationIng = false;
            }, 500);
            // popupLanguage();
        }
        return false;
    });

    $(".temptation .popup-bg").click(function () {
        $(".temptation .popup-bg").animate({ "opacity": 0 }, 500, function () {
            $(this).css({ "display": "none" });
        });
        $(".temptation .album-detail .album-photo .popup-photo").animate({ "opacity": 0 }, 500, function () {
            $(this).css({ "display": "none" });
        });
        $(".popup-video").animate({ "opacity": 0 }, 500, function () {
            $(this).css({ "display": "none" });
        })
        return false;
    });

    $(".temptation .album-detail .album-photo .popup-photo .btn-close").click(function () {
        console.log('btn-close');
        $(".temptation .popup-bg").animate({ "opacity": 0 }, 500, function () {
            $(this).css({ "display": "none" });
        });
        $(".temptation .album-detail .album-photo .popup-photo").animate({ "opacity": 0 }, 500, function () {
            $(this).css({ "display": "none" });
        });
        return false;
    });

    $(".temptation .album-detail .album-photo .popup-photo .btn-down").click(function () {
        var tabIndex = conceptIdx;
        var dataSrc = $(".temptation .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex)
            .find("ul").eq(memberIdx)
            .find("li").eq(cIdx)
            .find(".contents-obj")
            .find('img')
            .attr('src');
        var dataSrcList = dataSrc.replace('https://ibighit.com/txt/', '').split('/');
        dataSrcList.splice(dataSrcList.length - 1, 0, 'original').join();
        var src = "/txt/" + dataSrcList.join('/');

        if (src != "") {
            if (check_ios() != "") {
                window.open(window.location.origin + src);
            } else {
                cfDownload(window.location.origin, src);
                // document.getElementById("hiddenFrame").src="./../../../../common/fileDownload_CDN.html?f=" + dataFile;
            }
        }
        return false;
    });

    // temptationVideo_Load();
    // TrackList
    $(".temptation .album-detail .song-list .popup-video video").on('loadeddata', function () {
        $(".temptation .album-detail .song-list .popup-video").css({ "display": "block", "opacity": 0 }).animate({ "opacity": 1 }, 500);
        setTimeout(() => {
            this.currentTime = 0;
            this.play();
        }, 500);
    })
    $('.song-list .button-wrap>.btn').click(function () {
        console.log(this);
        const id = parseInt($(this).attr('data-id'));

        var src = "https://ibighit.com/txt/images/txt/discography/temptation/tracklist/track-list-" + id + ".mp4";
        $(".temptation .popup-bg").css({ "display": "block", "opacity": 0 }).animate({ "opacity": 1 }, 500);
        $(".temptation .album-detail .song-list .popup-video video").attr('src', src)



        // var goTop = $(".temptation .album-detail .album-photo .popup-photo").offset().top - $("header").outerHeight();
        // var speed = Math.abs(goTop - temptationTop);
        // $("html, body").stop().animate({ "scrollTop": goTop + "px" }, 100, 'swing');

        // popupLanguage();
        // $(".temptation .album-detail .album-photo .popup-photo .btn-down").focus();
    })
    $('.popup-video .btn-close').click(function () {
        $(".temptation .popup-bg").animate({ "opacity": 0 }, 500, function () {
            $(this).css({ "display": "none" });
        });

        $(this).parent().parent().parent().parent().animate({ "opacity": 0 }, 500, function () {
            $(this).css({ "display": "none" });
        })
    })

    $('.popup-video .btn-down').click(function () {
        var src = $(this).parent().parent().find('video').attr('src');
        console.log(src);

        if (src != "") {
            if (check_ios() != "") {
                window.open(window.location.origin + src);
            } else {
                cfDownload(window.location.origin, src);
                // document.getElementById("hiddenFrame").src="./../../../../common/fileDownload_CDN.html?f=" + dataFile;
            }
        }
        return false;
    });
}

function temptationLoad() {
    console.log('temptationLoad');
    console.log('tracklist');
    // $('.song-list .etc_inner .video-wrap video').attr('src', "/txt/images/txt/discography/temptation/pc-section-6-content.mp4");
}

var temptationMode = "pc";
function temptationResize() {
    console.log('temptationResize');
    temptationHeight = $(window).outerHeight();

    $(".temptation .album-detail .album-photo .contents-obj .btn-prev").removeClass("fix").removeClass("btm").css({ "bottom": "", "left": "" });
    $(".temptation .album-detail .album-photo .contents-obj .btn-next").removeClass("fix").removeClass("btm").css({ "bottom": "", "right": "" });

    arrowPosition_t = $(".temptation .album-detail .album-photo .contents-obj ").offset().top;
    arrowPosition_l = $(".temptation .album-detail .album-photo .contents-obj ").offset().left;
    photoTop = $(".album-detail .album-photo .contents-obj").offset().top;
    photoHeight = $(".album-detail .album-photo .contents-obj").outerHeight();
    arrowHeight = $(".temptation .album-detail .album-photo .contents-obj .btn-prev").outerHeight();
    // photoInner_top = $(".album-detail .album-photo .contents-obj .click_hh").offset().top;
    // photoInner_height = $(".album-detail .album-photo .contents-obj .click_hh > li").eq(tabIndex).find("> ul > li").eq(slideIdx).outerHeight();

    if (viewportWidth() < 769) {
        $(".temptation .album-detail .album-photo .contents-obj .slide-obj button").css({ "margin-top": "", "top": "", "height": "" });
    } else {
        $(".temptation .album-detail .album-photo .popup-photo").css({ "margin-top": "" });
    }

    var mReset = false;
    if (viewportWidth() > 768 && temptationMode == "mobile") {
        mReset = true;
        temptationMode = "pc";
    } else if (viewportWidth() < 769 && temptationMode == "pc") {
        mReset = true;
        temptationMode = "mobile";
    }

    if (mReset) {
        photoVideo01_able = false;
        photoVideo02_able = false;
        loadVideo();
    }
}

function loadVideo() {
    console.log('loadVideo', temptationMode);
    if (temptationMode === 'pc') {
        $(".video-wrap-1 .pc video").attr('src', 'https://ibighit.com/txt/images/txt/discography/temptation/concept-photo/video-1/4-a4c3e64c2a38ed3d8eaccc634ad60d32-pc.mp4');
        $('.schedule video.pc').attr('src', 'https://ibighit.com/txt/images/txt/discography/temptation/scheduler/pc-scheduler.mp4');
    } else {
        $(".video-wrap-1 .mb video").attr('src', 'https://ibighit.com/txt/images/txt/discography/temptation/concept-photo/video-1/4-a4c3e64c2a38ed3d8eaccc634ad60d32-mb.mp4');
        $('.schedule video.mb').attr('src', 'https://ibighit.com/txt/images/txt/discography/temptation/scheduler/mb-scheduler.mp4');
    }
    console.log('track-list-video', $('.track-list-video'));
    $(".concept_teaser video").attr('src', 'https://ibighit.com/txt/images/txt/discography/temptation/concept-teaser/concept-teaser.mp4');
    $('#track-list-video').attr('src', "https://ibighit.com/txt/images/txt/discography/temptation/pc-section-6-content.mp4");

}

function temptationScroll() {
    // console.log('temptationScroll');
    temptationTop = $(window).scrollTop();
    if (temptationSet) {
        temptationHeight = $(window).outerHeight();
        photoHeight = $(".album-detail .album-photo .contents-obj").outerHeight();
        // photoInner_height = $(".album-detail .album-photo .contents-obj .click_hh > li").eq(tabIndex).find("> ul > li").eq(slideIdx).outerHeight();

        var fixedStart = photoInner_top - temptationHeight;
        var fixedEnd = photoInner_top + photoHeight;

        var arrow_reHeight = temptationTop - photoInner_top + temptationHeight;
        var arrow_top = 0;

        if (temptationHeight > photoInner_height) {
            if (arrow_reHeight > photoInner_height) {
                arrow_top = (arrow_reHeight - temptationHeight);
                if (arrow_top < 0) {
                    arrow_top = 0;
                }
                arrow_reHeight = photoInner_height;
                if ((arrow_top + arrow_reHeight) > photoInner_height) {
                    arrow_reHeight = (photoInner_top + photoHeight) - temptationTop;
                }
            }
        } else {
            if (arrow_reHeight > temptationHeight) {
                arrow_top = (arrow_reHeight - temptationHeight);
                arrow_reHeight = temptationHeight;
                if ((arrow_top + arrow_reHeight) > photoInner_height) {
                    arrow_reHeight = (photoInner_top + photoHeight) - temptationTop;
                }
            } else {
                arrow_top = 0;
            }
        }

        var minHeight = photoInner_top + photoHeight - ($("header").outerHeight() * 2 + 90);
        if (minHeight > temptationTop) {
            if (viewportWidth() > 768) {
                if (temptationTop > fixedStart && temptationTop < fixedEnd) {
                    $(".temptation .album-detail .album-photo .contents-obj .slide-obj button").css({ "margin-top": "0px", "top": arrow_top + "px", "height": arrow_reHeight + "px" });
                } else {
                    if (temptationTop < fixedStart) {
                        $(".temptation .album-detail .album-photo .contents-obj .slide-obj button").css({ "margin-top": "", "top": "", "height": "" });
                    }
                }
            } else {
                $(".temptation .album-detail .album-photo .contents-obj .slide-obj button").css({ "margin-top": "", "top": "", "height": "" });
            }
        }
    }
}

function temptationScroll_reset() {
    if (viewportWidth() > 768) {
        $(".temptation .album-detail .bottom ul li").each(function () {
            if ($(this).hasClass("active")) {
                tabIndex = $(this).index();
            }
        });
    }
    temptationHeight = $(window).outerHeight();
    photoHeight = $(".album-detail .album-photo .contents-obj").outerHeight();
    photoInner_height = $(".album-detail .album-photo .contents-obj .click_hh > li").eq(tabIndex).find("> ul > li").eq(slideIdx).outerHeight();

    var fixedStart = photoInner_top - temptationHeight;
    var fixedEnd = photoInner_top + photoHeight;

    var arrow_reHeight = temptationTop - photoInner_top + temptationHeight;
    var arrow_top = 0;

    if (temptationHeight > photoInner_height) {
        if (arrow_reHeight > photoInner_height) {
            arrow_top = (arrow_reHeight - temptationHeight);
            if (arrow_top < 0) {
                arrow_top = 0;
            }
            arrow_reHeight = photoInner_height;
            if ((arrow_top + arrow_reHeight) > photoInner_height) {
                arrow_reHeight = (photoInner_top + photoHeight) - temptationTop;
            }
        }
    } else {
        if (arrow_reHeight > temptationHeight) {
            arrow_top = (arrow_reHeight - temptationHeight);
            arrow_reHeight = temptationHeight;
            if ((arrow_top + arrow_reHeight) > photoInner_height) {
                arrow_reHeight = (photoInner_top + photoHeight) - temptationTop;
            }
        } else {
            arrow_top = 0;
        }
    }

    var minHeight = photoInner_top + photoHeight - ($("header").outerHeight() * 2 + 90);
    if (minHeight > temptationTop) {
        if (viewportWidth() > 768) {
            if (temptationTop > fixedStart && temptationTop < fixedEnd) {
                $(".temptation .album-detail .album-photo .contents-obj .slide-obj button").css({ "margin-top": "0px", "top": arrow_top + "px", "height": arrow_reHeight + "px" });
            } else {
                if (temptationTop < fixedStart) {
                    $(".temptation .album-detail .album-photo .contents-obj .slide-obj button").css({ "margin-top": "", "top": "", "height": "" });
                }
            }
        } else {
            $(".temptation .album-detail .album-photo .contents-obj .slide-obj button").css({ "margin-top": "", "top": "", "height": "" });
        }
    }

}
