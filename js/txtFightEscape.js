$(window).load(function () {
    /* í† ê¸€ ë²„íŠ¼ */
    $(".phone_bg .toggler").click(function () {
        $(this).toggleClass('off');
        $('.toggle_btn').toggleClass('escape');
        $(".toggle_change").toggleClass('active');
    });

    /* ì±„íŒ…ì°½ ë³´ê¸° */
    var go2depthBtn = $('.goDepth-02-btn');
    go2depthBtn.click(function () {
        $('.toggle_change').find('[data-depth]').removeClass('active');
        $('.toggle_change').find('.chat').addClass('active');
    });

    /* í”„ë¡œí•„ ë³´ê¸° */
    var go3depthBtn = $('.goDepth-03-btn button');
    for (i = 0; i < go3depthBtn.length; i++) {
        go3depthBtn.eq(i).click(function () {
            var member = $(this).attr('data-member');
            $('.toggle_change').find('[data-depth]').removeClass('active');
            $('.toggle_change').find("li[data-profileMember]").removeClass('active');
            var memberProfile = $('.toggle_change').find("li[data-profileMember=" + member + "]");
            $('.toggle_change').find('.profile').addClass('active');
            memberProfile.addClass('active');
        });
    }

    /* í”„ë¡œí•„ ì–¼ëžì°½ */
    var profileAlertBtn = $('.toggle_change .profile .click-area button[data-profileAlert="soon"]');
    for (i = 0; i < profileAlertBtn.length; i++) {
        profileAlertBtn.eq(i).click(function () {
            $(this).parents('.profile').find('.profile_alert').addClass('show');
        });
    }
    $('.profile_alert .alert_close').click(function () {
        $(this).parents('.profile').find('.profile_alert').removeClass('show');
    });
    $('.profile_alert').click(function () {
        $(this).parents('.profile').find('.profile_alert').removeClass('show');
    });

    /* ë’¤ë¡œê°€ê¸° */
    var backBtn = $('.toggle_change .back_btn');
    for (i = 0; i < backBtn.length; i++) {
        backBtn.eq(i).click(function () {
            var currentDepth = $(this).closest(".depth_change").attr('data-depth');
            $('.toggle_change').find('[data-depth]').removeClass('active');
            goBack(currentDepth);
        })
    }
    function goBack(depth) {
        $('.toggle_change').find('[data-depth=' + (depth - 1) + ']').addClass('active');
    }

    /* ì±„íŒ…ì°½ ìŠ¤í¬ë¡¤ */
    var messengerClick = false;
    $('.click-chat_photo').find('button[data-idx="4"]').addClass('btnHide');
    $('.chat .messenger_arrow').on('click', function () {
        if (!messengerClick) {
            $(this).parent('.chat').addClass("down");
            $(this).addClass('scroll_up');
            $(this).parent('.chat').find('.click-chat_photo').addClass('scroll');
            $(this).parent('.chat').find('.click-chat_photo button').addClass('btnHide');
            $(this).parent('.chat').find('.click-chat_photo button[data-idx="4"]').removeClass('btnHide');
            messengerClick = !messengerClick;
        } else if (messengerClick) {
            $(this).parent('.chat').removeClass("down");
            $(this).removeClass('scroll_up');
            $(this).parent('.chat').find('.click-chat_photo').removeClass('scroll')
            $(this).parent('.chat').find('.click-chat_photo button').removeClass('btnHide');
            $(this).parent('.chat').find('.click-chat_photo button[data-idx="4"]').addClass('btnHide');
            messengerClick = !messengerClick;
        }
    });


    /* ì»¨ì…‰ í´ë¦½ ì˜ìƒ ìž¬ìƒ  */
    var ConceptPlayClick = false;
    $('.concept_teaser .play_btn').click(function () {
        $(this).fadeOut();
        $('.concept_teaser #myVideo').get(0).play();
        ConceptPlayClick = !ConceptPlayClick;
    });
    $('.concept_teaser #myVideo').on('click', function () {
        if (ConceptPlayClick == true) {
            $(this).get(0).pause();
            ConceptPlayClick = !ConceptPlayClick;
        } else {
            $(this).get(0).play();
            ConceptPlayClick = !ConceptPlayClick;
        }
    })










})