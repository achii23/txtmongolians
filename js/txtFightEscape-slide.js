$(window)
	.load(fightEscapeLoad)
	.resize(fightEscapeResize)
	.scroll(fightEscapeScroll);

var fightEscapeSet = false;
var fightEscapeTop = 0;
var fightEscapeHeight = $(window).outerHeight();


var photoInner_top = 0;
var photoInner_height = 0;
function fightEscapeLoad(){
	fightEscapeSet = true;

	fightEscapeHeight = $(window).outerHeight();
	


	
	photoTop = $(".album-detail .album-photo .slide-wrap").offset().top;
	photoHeight = $(".album-detail .album-photo .slide-wrap").outerHeight();


	videoLoad();

	if (viewportWidth() > 768)
	{
		fightEscapeMode = "pc";
	}else{
		fightEscapeMode = "mobile";
	}
	fightEscapeVideo_Load();
}


var fightEscapeMode = "pc";
function fightEscapeResize(){
	fightEscapeHeight = $(window).outerHeight();

	photoTop = $(".album-detail .album-photo .slide-wrap").offset().top;
	photoHeight = $(".album-detail .album-photo .slide-wrap").outerHeight();

	if (viewportWidth() < 769)
	{
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"","top":"","height":""});
	}else{
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo").css({"margin-top":""});
	}

	var mReset = false;
	if (viewportWidth() > 768 && fightEscapeMode == "mobile")
	{
		mReset = true;
		fightEscapeMode = "pc";
	}else if (viewportWidth() < 769 && fightEscapeMode == "pc"){
		mReset = true;
		fightEscapeMode = "mobile";
	}

	if (mReset)
	{
		photoVideo01_able = false;
		photoVideo02_able = false;
	}
}

function fightEscapeScroll()
{
	fightEscapeTop = $(window).scrollTop();
	if (fightEscapeSet)
	{
		fightEscapeHeight = $(window).outerHeight();
		photoHeight = $(".album-detail .album-photo .slide-wrap").outerHeight();

		var fixedStart = photoInner_top - fightEscapeHeight;
		var fixedEnd = photoInner_top + photoHeight;
		
		var arrow_reHeight = fightEscapeTop - photoInner_top + fightEscapeHeight;
		var arrow_top = 0;
		
		if (fightEscapeHeight > photoInner_height)
		{
			if (arrow_reHeight > photoInner_height)
			{
				arrow_top = (arrow_reHeight - fightEscapeHeight);
				if (arrow_top < 0)
				{
					arrow_top = 0;
				}
				arrow_reHeight = photoInner_height;
				if ((arrow_top + arrow_reHeight) > photoInner_height)
				{
					arrow_reHeight = (photoInner_top + photoHeight) - fightEscapeTop;
				}
			}
		}else{
			if (arrow_reHeight > fightEscapeHeight)
			{
				arrow_top = (arrow_reHeight - fightEscapeHeight);
				arrow_reHeight = fightEscapeHeight;
				if ((arrow_top + arrow_reHeight) > photoInner_height)
				{
					arrow_reHeight = (photoInner_top + photoHeight) - fightEscapeTop;
				}
			}else{
				arrow_top = 0;
			}
		}
		
		var minHeight = photoInner_top + photoHeight - ($("header").outerHeight() * 2 + 90 );
		if (minHeight > fightEscapeTop)
		{
			if (viewportWidth() > 768)
			{
				if (fightEscapeTop > fixedStart && fightEscapeTop < fixedEnd)
				{
					$(".the_chaos_chapter-fight_escape .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"0px","top":arrow_top + "px","height":arrow_reHeight + "px"});
				}else{
					if (fightEscapeTop < fixedStart)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"","top":"","height":""});
					}
				}
			}else{
				$(".the_chaos_chapter-fight_escape .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"","top":"","height":""});
			}
		}

		
		if (viewportWidth() > 768)
		{
			if (slideIdx == 0)
			{
				/* if (postionStart < fightEscapeTop && postionEnd > fightEscapeTop)
				{
					if (postionTop < fightEscapeTop && (!photoVideo01_able || !photoVideo02_able))
					{
						photoVideo01_able = true;
						photoVideo02_able = true;
						if(check_androidDevice() == '')
						{
							
						}else{
							if (tabIndex == 0)
							{
								window.addEventListener('touchstart', function videoStart() {
									if(photoVideo01.paused)
									{

										if(parseInt(photoVideo01.currentTime) != 0)
											photoVideo01.currentTime = 0;

										photoVideo01.play();
									}
								  
								  this.removeEventListener('touchstart', videoStart);
								});
							}else if (tabIndex == 1)
							{
								window.addEventListener('touchstart', function videoStart() {
									if(photoVideo02.paused)
									{

										if(parseInt(photoVideo02.currentTime) != 0)
											photoVideo02.currentTime = 0;

										photoVideo02.play();
									}
								  
								  this.removeEventListener('touchstart', videoStart);
								});
							}
						}
					}
				}else{
					if (tabIndex == 0)
					{
						photoVideo01_able = false;
						if (postionStart > scrollTop || fightEscapeTop == 0)
						{
							photoVideo01.pause();
							photoVideo01.currentTime = 0;						
						}
					}else if (tabIndex == 1)
					{
						photoVideo02_able = false;
						if (postionStart > scrollTop || fightEscapeTop == 0)
						{
							photoVideo02.pause();
							photoVideo02.currentTime = 0;						
						}
					}
				} */
			}
		}
	}	
}

function sqStart()
{
	if (slideIdx == 0)
	{
		if (tabIndex == 0)
		{
			if (photoVideo02)
			{
				photoVideo02.pause();
				photoVideo02.currentTime = 0;
			}
		}else{
			if (photoVideo01)
			{
				photoVideo01.pause();
				photoVideo01.currentTime = 0;
			}
		}
	}	
}

function sqStop()
{
	if (photoVideo01)
	{
		photoVideo01.pause();
		photoVideo01.currentTime = 0;
	}
	if (photoVideo02)
	{
		photoVideo02.pause();
		photoVideo02.currentTime = 0;
	}	
}

var photoVideo01_able = false;
var photoVideo02_able = false;
var photoVideo01;
var photoVideo02;
function videoLoad()
{
	photoVideo01 = document.getElementById("Sanctuary_mood");
	photoVideo02 = document.getElementById("Arcadia_mood");
}


function fightEscapeScroll_reset()
{
	if (viewportWidth() > 768)
	{
		$(".the_chaos_chapter-fight_escape .album-detail .bottom ul li").each(function(){
			if ($(this).hasClass("active"))
			{
				tabIndex = $(this).index();
			}
		});
	}
	

	fightEscapeHeight = $(window).outerHeight();
	photoHeight = $(".album-detail .album-photo .slide-wrap").outerHeight();

	var fixedStart = photoInner_top - fightEscapeHeight;
	var fixedEnd = photoInner_top + photoHeight;
	
	var arrow_reHeight = fightEscapeTop - photoInner_top + fightEscapeHeight;
	var arrow_top = 0;

	
	
	var minHeight = photoInner_top + photoHeight - ($("header").outerHeight() * 2 + 90 );
	if (minHeight > fightEscapeTop)
	{
		if (viewportWidth() > 768)
		{
			if (fightEscapeTop > fixedStart && fightEscapeTop < fixedEnd)
			{
				$(".the_chaos_chapter-fight_escape .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"0px","top":arrow_top + "px","height":arrow_reHeight + "px"});
			}else{
				if (fightEscapeTop < fixedStart)
				{
					$(".the_chaos_chapter-fight_escape .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"","top":"","height":""});
				}
			}
		}else{
			$(".the_chaos_chapter-fight_escape .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"","top":"","height":""});
		}
	}
	
}
var tabIndex = 0;
var slideIdx = 0;
var cIdx = 0;
var fightEscapeIng = false;
$(function(){	
	/* 프로필창 이미지 슬라이드 */
	$(".toggle_change .profile .profile_click_wrap .member_profile .click-area button[data-photo='show']").click(function(){			
		
		tabIndex = $(this).parents('.profile_click_wrap').parent('li').attr('data-popIndex') - 1;
		slideIdx = $(this).parents('.member_profile').attr('data-profileMember') - 1;
		
		cIdx = $(this).attr("data-idx");

		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").removeClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).addClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li ul").removeClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).addClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li ul > li").css({"margin-left":"100%"});
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({"margin-left":"0"});
		
		$(".the_chaos_chapter-fight_escape .popup-bg").css({"display":"block", "opacity":0}).animate({"opacity":1},500);
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo").css({"display":"block", "opacity":0}).animate({"opacity":1},500);
		
		var goTop = $(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo").offset().top - $("header").outerHeight();
		var speed = Math.abs(goTop - fightEscapeTop);
		$("html, body").stop().animate({"scrollTop":goTop + "px"}, 100, 'swing');

		playVideo();
		popupLanguage();
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").focus();		
		$('.pop-btn-prev').show();
		$('.pop-btn-next').show();
	});
	/* 프로필창 영상 팝업 */
	$(".toggle_change .profile .profile_click_wrap .member_profile .click-area button[data-video='show'").click(function(){			
		
		tabIndex = $(this).parents('.profile_click_wrap').parent('li').attr('data-popIndex') - 1;
		slideIdx = parseInt($(this).parents('.member_profile').attr('data-profileMember')) + 4;
		
		cIdx = 0;

		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").removeClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).addClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li ul").removeClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).addClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li ul > li").css({"margin-left":"100%"});
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({"margin-left":"0"});
		
		$(".the_chaos_chapter-fight_escape .popup-bg").css({"display":"block", "opacity":0}).animate({"opacity":1},500);
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo").css({"display":"block", "opacity":0}).animate({"opacity":1},500);
		
		var goTop = $(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo").offset().top - $("header").outerHeight();
		var speed = Math.abs(goTop - fightEscapeTop);
		$("html, body").stop().animate({"scrollTop":goTop + "px"}, 100, 'swing');

		playVideo();
		popupLanguage();
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").focus();		
		$('.pop-btn-prev').hide();
		$('.pop-btn-next').hide();
	});
	/* 채팅장 그룹 이미지 슬라이드 */
	$(".toggle_change .chat .click-area .click-chat_photo button.groupPhoto").click(function(){			
		
		tabIndex = $(this).parents('.chat').attr('data-popIndex') - 1;
		slideIdx = $(this).parents('.toggle_change').index()-1;
		
		cIdx = $(this).attr("data-idx");

		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").removeClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).addClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li ul").removeClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).addClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li ul > li").css({"margin-left":"100%"});
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({"margin-left":"0"});
		
		$(".the_chaos_chapter-fight_escape .popup-bg").css({"display":"block", "opacity":0}).animate({"opacity":1},500);
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo").css({"display":"block", "opacity":0}).animate({"opacity":1},500);
		
		var goTop = $(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo").offset().top - $("header").outerHeight();
		var speed = Math.abs(goTop - fightEscapeTop);
		$("html, body").stop().animate({"scrollTop":goTop + "px"}, 100, 'swing');

		playVideo();
		popupLanguage();
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").focus();		
		$('.pop-btn-prev').show();
		$('.pop-btn-next').show();
	});
	/* 채팅장 그룹 영상 팝업*/
	$(".toggle_change .chat .click-area .click-chat_photo button.groupVideo").click(function(){			
		
		tabIndex = $(this).parents('.chat').attr('data-popIndex');
		slideIdx = parseInt($(this).parents('.toggle_change').index()) - 1;
		
		cIdx = $(this).attr("data-idx");

		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").removeClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).addClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li ul").removeClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).addClass("active");
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li ul > li").css({"margin-left":"100%"});
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({"margin-left":"0"});
		
		$(".the_chaos_chapter-fight_escape .popup-bg").css({"display":"block", "opacity":0}).animate({"opacity":1},500);
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo").css({"display":"block", "opacity":0}).animate({"opacity":1},500);
		
		var goTop = $(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo").offset().top - $("header").outerHeight();
		var speed = Math.abs(goTop - fightEscapeTop);
		$("html, body").stop().animate({"scrollTop":goTop + "px"}, 100, 'swing');

		playVideo();
		popupLanguage();
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").focus();		
		$('.pop-btn-prev').hide();
		$('.pop-btn-next').hide();
	});

	$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-close").click(function(){
		$(".the_chaos_chapter-fight_escape .popup-bg").animate({"opacity":0},500,function(){
			$(this).css({"display":"none"});
		});
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo").animate({"opacity":0},500,function(){
			$(this).css({"display":"none"});
			sqStart();
		});
		videoPause();
		return false;
	});
	$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").click(function(){
		var dataFile = "";
		var dataFile = $(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).find(".contents-obj").attr("data-src");
		
		/* 다운 경로 */
		if (check_ios() != "")
		{
			window.open("https://ibighit.com/txt/images/the_chaos_chapter-fight_escape/" + dataFile);
		}else{
			cfDownload("https://ibighit.com/txt/images/the_chaos_chapter-fight_escape/", dataFile);
		}


		return false;
	});

	$(".the_chaos_chapter-fight_escape .popup-bg").click(function(){
		$(".the_chaos_chapter-fight_escape .popup-bg").animate({"opacity":0},500,function(){
			$(this).css({"display":"none"});
		});
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo").animate({"opacity":0},500,function(){
			$(this).css({"display":"none"});
		});
		videoPause();
		return false;
	});

	$(".the_chaos_chapter-fight_escape .album-detail .album-photo .slide-wrap .btn-prev").click(function(){
		if (viewportWidth() < 769)
		{
			tabIndex = $(this).parent().parent().index();
		}
		slideIdx = albumPhoto_idx[albumPhoto];
		
		fightEscapeScroll_reset();

		sqStop();
		sqStart();
		
	});
	$(".the_chaos_chapter-fight_escape .album-detail .album-photo .slide-wrap .btn-next").click(function(){
		if (viewportWidth() < 769)
		{
			tabIndex = $(this).parent().parent().index();
		}
		slideIdx = albumPhoto_idx[albumPhoto];
		
		fightEscapeScroll_reset();
		
		sqStop();
		sqStart();
	});
	$(".album-detail .bottom ul li button").click(function(){
		fightEscapeScroll_reset();
		slideIdx = 0;
		
	});
	
	$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .pop-btn-prev").click(function(){
		if (!fightEscapeIng)
		{
			fightEscapeIng = true;
			tabIndex = $(this).parent().parent().index();

			var cMax = $(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").length;
			$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).animate({"margin-left":"100%"}, 500);
			cIdx--;
			if (cIdx < 0)
			{
				cIdx = cMax-1;
			}
			$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({"margin-left":"-100%"}).animate({"margin-left":"0%"}, 500);
			setTimeout(function(){
				fightEscapeIng = false;
				playVideo();
			},500);
			popupLanguage();
		}
		
		return false;
	});

	$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .pop-btn-next").click(function(){
		if (!fightEscapeIng)
		{
			fightEscapeIng = true;
			tabIndex = $(this).parent().parent().index();
			
			var cMax = $(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").length;
			$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).animate({"margin-left":"-100%"}, 500);
			cIdx++;
			
			if (cIdx == cMax)
			{
				cIdx = 0;
			}
			$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({"margin-left":"100%"}).animate({"margin-left":"0%"}, 500);

			setTimeout(function(){
				fightEscapeIng = false;
				playVideo();
			},500);
			popupLanguage();
		}
		return false;
	});
});

function playVideo()
{
	$(".the_chaos_chapter-fight_escape .album-detail .album-photo video").each(function(){
		this.pause();
		this.currentTime = 0;
	});

	if (cIdx == 0 || cIdx == 1)
	{
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).find("video").each(function(){
			if ($(this).parent().find(".v_cover").css("display") == "block")
			{
				$(this).parent().find(".v_cover").animate({"opacity":0},300,function(){
					$(this).css({"display":"none"});
				});
			}
			if (this.paused)
			{
				this.currentTime = 0;
				this.play();
			}
		});
	}
}

function popupLanguage()
{
	var lan = $(".lang_opt .btn-lang p").text();
	if (tabIndex == 0)
	{
		if (lan == "KOR")
		{
			switch (slideIdx)
			{
				case 0:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : TOMORROW X TOGETHER 사진");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : TOMORROW X TOGETHER 사진");
					}
					break;
				}
				case 1:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : TOMORROW X TOGETHER 사진");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : TOMORROW X TOGETHER 사진");
					}
					break;
				}
				case 2:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : TOMORROW X TOGETHER 사진");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : TOMORROW X TOGETHER 사진");
					}
					break;
				}
				case 3:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : TOMORROW X TOGETHER 사진");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : TOMORROW X TOGETHER 사진");
					}
					break;
				}
				case 4:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : TOMORROW X TOGETHER 사진");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : TOMORROW X TOGETHER 사진");
					}
					break;
				}
				case 5:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : TOMORROW X TOGETHER 사진");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : TOMORROW X TOGETHER 사진");
					}
					break;
				}				
			}
		}else if (lan == "ENG")
		{
			switch (slideIdx)
			{
				case 0:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}
					break;
				}
				case 1:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}
					break;
				}
				case 2:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}
					break;
				}
				case 3:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}
					break;
				}
				case 4:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}
					break;
				}
				case 5:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of TOMORROW X TOGETHER");
					}
					break;
				}	
			}
		}else if (lan == "JPN")
		{
			switch (slideIdx)
			{
				case 0:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}
					break;
				}
				case 1:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}
					break;
				}
				case 2:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}
					break;
				}
				case 3:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}
					break;
				}
				case 4:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}
					break;
				}
				case 5:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: TOMORROW X TOGETHERの写真");
					}
					break;
				}				
			}
		}else if (lan == "CHN")
		{
			switch (slideIdx)
			{
				case 0:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}
					break;
				}
				case 1:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}
					break;
				}
				case 2:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}
					break;
				}
				case 3:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}
					break;
				}
				case 4:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}
					break;
				}
				case 5:
				{
					if (cIdx == 0)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}else if (cIdx == 1)
					{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}else{
						$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: TOMORROW X TOGETHER的照片");
					}
					break;
				}	
			}
		}
	}
}

var fightEscape_island_video01;
var fightEscape_island_video02;
var fightEscape_island_video03;
var fightEscape_island_video04;
var fightEscape_island_video05;
function fightEscapeVideo_Load()
{
	fightEscape_island_video01 = document.getElementById("fightEscape_island_video01");
	fightEscape_island_video02 = document.getElementById("fightEscape_island_video02");
	fightEscape_island_video03 = document.getElementById("fightEscape_island_video03");
	fightEscape_island_video04 = document.getElementById("fightEscape_island_video04");
	fightEscape_island_video05 = document.getElementById("fightEscape_island_video05");
	if (fightEscape_island_video01 !== false && fightEscape_island_video01)
	{
		fightEscape_island_video01.onended = function(){
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}

	if (fightEscape_island_video02 !== false && fightEscape_island_video02)
	{
		fightEscape_island_video02.onended = function(){
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}

	if (fightEscape_island_video03 !== false && fightEscape_island_video03)
	{
		fightEscape_island_video03.onended = function(){
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}

	if (fightEscape_island_video04 !== false && fightEscape_island_video04)
	{
		fightEscape_island_video04.onended = function(){
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}

	if (fightEscape_island_video05 !== false && fightEscape_island_video05)
	{
		fightEscape_island_video05.onended = function(){
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}
}

function videoPause() {
	$(".the_chaos_chapter-fight_escape .album-detail .album-photo video").each(function(){
		this.pause();
		this.currentTime = 0;
	});
}

function playVideo()
{
	$(".the_chaos_chapter-fight_escape .album-detail .album-photo video").each(function(){
		this.pause();
		this.currentTime = 0;
	});

	if (cIdx == 0 || cIdx == 1 || cIdx == 2 || cIdx == 3 || cIdx == 4 || cIdx == 5 || cIdx == 6 || cIdx == 7)
	{
		$(".the_chaos_chapter-fight_escape .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).find("video").each(function(){

			if (this.paused)
			{
				this.currentTime = 0;
				this.play();
			}
			else{
				this.pause();
			}
		});
	}
}