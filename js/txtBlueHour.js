var dataNumber = 0;
var scretNumber = 0;

$(window).load(blueHourLoad)
		.resize(blueHourResize)
		.scroll(blueHourScroll);

var blueHourLoad_able = false;
var photoInner_top;
var photoInner_height;
var parametaData = "";

var pageHash = false;
function blueHourLoad()
{
	try{
		pageLog("blueHourLoad");
		var para = document.URL.replace("#","").split("?").length > 1 ? document.URL.replace("#","").split("?")[1] : "=";
		var data = para.split("=");
		if (data[0] == "photo")
		{
			parametaData = data[1];
			$(".photo_contents .home > ul").css({"display":"none"});

			$(".blue_hour-photo .bottom ul li").each(function(){
				if ($(this).find("h3").text().toLowerCase() == parametaData)
				{
					pageHash = true;

					$(".blue_hour-photo .bottom ul li").removeClass("active");
					$(this).addClass("active");
					switch ($(this).find("h3").text())
					{
						case "R":
						{
							blueHour_idx = 0;
							break;
						}
						case "AR":
						{
							blueHour_idx = 1;
							break;
						}
						case "VR":
						{
							blueHour_idx = 2;
							break;
						}			
					}

					blueHour_photo = $(this).find("h3").text();
					showAble = false;
					
					switch (blueHour_photo)
					{
						case "R":
						{
							$(".photo_contents .home > .version_r").css({"position":"relative", "display":"block", "opacity":1, "z-index":1});
							break;
						}
						case "AR":
						{
							$(".photo_contents .home > .version_ar").css({"position":"relative", "display":"block", "opacity":1, "z-index":1});
							break;
						}
						case "VR":
						{
							$(".photo_contents .home > .version_vr").css({"position":"relative", "display":"block", "opacity":1, "z-index":1});
							break;
						}	
					}
					buttonAble = true;
					tileShow();
					oldPhoto = blueHour_photo;
				}
			});

			goTop = $(".blue_hour-photo").offset().top - $("header").outerHeight();
			var speed = Math.abs(scrollTop-goTop) / 5;
			$("html, body").stop().animate({"scrollTop":goTop + "px"}, speed, 'swing');
		}

		if (!pageHash)
		{
			blueHour_idx = 1;
			blueHour_photo = "AR";
			
			$(".blue_hour-photo .bottom ul li").removeClass("active");
			
			
			$(".photo_contents .home > ul").css({"display":"none"});

			switch (blueHour_photo)
			{
				case "R":
				{
					$(".blue_hour-photo .bottom ul li").eq(0).addClass("active");
					$(".photo_contents .home > .version_r").css({"position":"relative", "display":"block", "opacity":1, "z-index":1});
					break;
				}
				case "AR":
				{
					$(".blue_hour-photo .bottom ul li").eq(2).addClass("active");
					$(".photo_contents .home > .version_ar").css({"position":"relative", "display":"block", "opacity":1, "z-index":1});
					break;
				}
				case "VR":
				{
					$(".blue_hour-photo .bottom ul li").eq(1).addClass("active");
					$(".photo_contents .home > .version_vr").css({"position":"relative", "display":"block", "opacity":1, "z-index":1});
					break;
				}	
			}
			buttonAble = true;
			tileShow();
			oldPhoto = blueHour_photo;
		}
	
		blueHourLoad_able = true;
		photoInner_top = $(".blue_hour-photo .photo_contents").offset().top;
		photoInner_height = $(".blue_hour-photo .photo_contents").outerHeight();

		if (windowWidth > 768)
		{
			blueHourMode = "pc";
		}else {
			blueHourMode = "mo";
		}

		roundSilder();

		tileReset();
		pageLog("Script Load Success");
		blueHourScroll();
	}catch(e)
	{
		setTimeout(function(){
			blueHourLoad();
		},1000);
	}
}

var blueHourMode = "pc";
function blueHourResize()
{
	pageLog("blueHourResize");
	photoInner_top = $(".blue_hour-photo .photo_contents").offset().top;
	photoInner_height = $(".blue_hour-photo .photo_contents").outerHeight();

	if (windowWidth > 768 && blueHourMode == "mo")
	{
		blueHourMode = "pc";
	}else if (windowWidth < 769 && blueHourMode == "pc"){
		blueHourMode = "mo";
	}

	minHeight_set("");

	blueHourScroll();

	tileReset();
	setTimeout(function(){
		tileReset();
	},showDelay);
}

var blueHourTop = 0;
var showDelay = 200;

var tileInterval = "";
var motionAble = false;
function scrollMotion()
{
	pageLog("scrollMotion");
	if (!motionAble && tileLoad)
	{
		$(".blue_hour-photo .bottom ul li").addClass("disabled");

		motionAble = true;
		clearInterval(tileInterval);
		tileInterval == "";
		tabMotion = true;
		tileShow();
	}
}
function blueHourScroll()
{
	pageLog("blueHourScroll - blueHourLoad_able : " + blueHourLoad_able);
	if (blueHourLoad_able)
	{
		blueHourTop = $(window).scrollTop();
		var tabIndex = 0;
		if (viewportWidth() > 768)
		{
			tabIndex = $(".blue_hour-photo .bottom ul li.active").index();
		}else{
			tabIndex = $(this).parent().parent().parent().parent().index();
		}
		var txtPhoto = albumPhoto_idx[tabIndex];

		var blueHourHeight = $(window).outerHeight();
		var photoHeight = $(".blue_hour-photo .slide-wrap").outerHeight();
		var photoInner_height = $(".blue_hour-photo .photo_contents").outerHeight();


		var fixedStart = photoInner_top - blueHourHeight;
		var fixedEnd = photoInner_top + photoHeight;
		
		var arrow_reHeight = blueHourTop - photoInner_top + blueHourHeight;
		var arrow_top = 0;
		
		if (blueHourHeight > photoInner_height)
		{
			if (arrow_reHeight > photoInner_height)
			{
				arrow_top = (arrow_reHeight - blueHourHeight);
				if (arrow_top < 0)
				{
					arrow_top = 0;
				}
				arrow_reHeight = photoInner_height;
				if ((arrow_top + arrow_reHeight) > photoInner_height)
				{
					arrow_reHeight = (photoInner_top + photoHeight) - blueHourTop;
				}
			}
		}else{
			if (arrow_reHeight > blueHourHeight)
			{
				arrow_top = (arrow_reHeight - blueHourHeight);
				arrow_reHeight = blueHourHeight;
				if ((arrow_top + arrow_reHeight) > photoInner_height)
				{
					arrow_reHeight = (photoInner_top + photoHeight) - blueHourTop;
				}
			}else{
				arrow_top = 0;
			}
		}
		
		var showAble = false;

		var minHeight = photoInner_top + photoHeight - ($("header").outerHeight() * 2 + 90 );

		var controlEnd = photoInner_top + (photoHeight / 3 * 2);

		if (minHeight > blueHourTop)
		{
			if (blueHourTop > fixedStart && blueHourTop < controlEnd)
			{
				var cTop = blueHourTop - fixedStart - $(".controller").outerHeight();
				var showTop = photoInner_height / 3;
				if (cTop > photoInner_height - $(".controller").outerHeight())
				{
					cTop = photoInner_height - $(".controller").outerHeight();					
				}
				$(".controller").css({"top":cTop + "px", "bottom":"auto"});
				


				var motionTop = photoInner_height / 6;
				if (cTop > photoInner_height - $(".controller").outerHeight())
				{
					if (tileInterval === false || tileInterval == "")
					{
						tileInterval = setInterval(scrollMotion, 1000);
						scrollMotion();
					}
					showAble = true;					
				}else if (cTop < motionTop)
				{
					clearInterval(tileInterval);
					tileInterval == "";
					showAble = false;
					motionAble = false;
				}else{
					if (tileInterval === false || tileInterval == "")
					{
						tileInterval = setInterval(scrollMotion, 1000);
						scrollMotion();
					}
					showAble = true; 
				}
			}else{
				showAble = false;
				motionAble = false;
			}

			if (viewportWidth() > 768)
			{
				if (blueHourTop > fixedStart && blueHourTop < fixedEnd)
				{
					$(".blue_hour-photo .slide-wrap .slide-obj button").css({"margin-top":"0px","top":arrow_top + "px","height":arrow_reHeight + "px"});
				}else{
					if (blueHourTop < fixedStart)
					{
						$(".blue_hour-photo .slide-wrap .slide-obj button").css({"margin-top":"","top":"","height":""});
					}
				}
			}else{
				$(".blue_hour-photo .slide-wrap .slide-obj button").css({"margin-top":"","top":"","height":""});
			}
		}else{
			showAble = false;
			motionAble = false;
		}


		if (showAble)
		{
			$(".controller").css({"transition":"opacity 0.4s", "opacity":1});
		}else{
			$(".controller").css({"transition":"opacity 0.4s", "opacity":0});
		}
	}	
}



var gifIdx = 0;

var groupIdx = 0;

var blueHour_idx = 0;
var blueHour_listIdx = 0;
var blueHour_Step = "lock";
var blueHour_password = ["0304","0304","0304"];
var blueHour_photo = "R";
var clickPassword = new Array();
var buttonAble = true;

var passArray = ["Uyo1Tp406iDdTMdKGXw5rmsd.jpg", "tBOJ4pse1qQ4WOTo0KWYDVac.jpg", "zu1iIUWXO6HT0txcpPT29Vrd.jpg", "4rh2S9U0YVLMYZfzfy4qwnrm.jpg", "gZAuGz27RV8WGAd6YhTkfWx0.jpg"];
$(function(){
	gifIdx = $(".album-detail .gif .bottom ul li").length - 1;

	$(".album-detail .gif .bottom ul li button").click(function(){
		pageLog(".album-detail .gif .bottom ul li button");
		if (!motionIng)
		{
			motionIng = true;

			if (!$(this).parent().hasClass("active"))
			{
				$(".album-detail .gif .bottom ul li").removeClass("active");
				$(this).parent().addClass("active");
				var clickIdx = $(this).parent().index();
				pageLog("clickIdx : " + clickIdx + ", gifIdx : " + gifIdx);
				if (clickIdx > gifIdx)
				{
					$(".album-detail .gif .overlap_cont > li").eq(clickIdx).css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay,function(){
						if (gifIdx != 0)
						{
							$(".album-detail .gif .overlap_cont > li").eq(gifIdx).css({"display":"none", "opacity":0});
						}
						gifIdx = clickIdx;
					});
				}else{
					$(".album-detail .gif .overlap_cont > li").eq(clickIdx).css({"display":"block", "opacity":1});
					$(".album-detail .gif .overlap_cont > li").eq(gifIdx).stop().animate({"opacity":0},showDelay,function(){
						$(this).css({"display":"none"});
					});
					gifIdx = clickIdx;
				}

				
			}

			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}
		return false;
	});

	$(".album-detail .gif .btn-down").click(function(){
		pageLog(".album-detail .gif .btn-down");
		var downloadFile = $(".album-detail .gif .overlap_cont > li").eq(gifIdx).attr("data-file") + ".gif";
		cfDownload("https://ibighit.com/txt/images/blue_hour/gif/", downloadFile);
		// document.getElementById("hiddenFrame").src="https://ibighit.com/txt/common/fileDownload_blueHour.html?p=gif&f=" + downloadFile;
		return false;
	});

	$(".blue_hour-photo .bottom ul li button").click(function(){
		pageLog("tabMotion : " + tabMotion);
		if (!$(this).parent().hasClass("active") && !tabMotion)
		{
			$(".blue_hour-photo .bottom ul li").addClass("disabled");
			tabMotion = true;
			$(".btn-back").css({"display":"none"});
			$(".blue_hour-photo .home_passcode img").attr("src", "https://ibighit.com/txt/images/txt/discography/blue_hour/"+passArray[0]);
			clickPassword = new Array();
			buttonAble = true;


			$(".blue_hour-photo .bottom ul li").removeClass("active");
			$(this).parent().addClass("active");
			switch ($(this).find("h3").text())
			{
				case "R":
				{
					blueHour_idx = 0;
					break;
				}
				case "AR":
				{
					blueHour_idx = 1;
					break;
				}
				case "VR":
				{
					blueHour_idx = 2;
					break;
				}			
			}
			//blueHour_idx = $(this).parent().index();
			blueHour_photo = $(this).find("h3").text();
			showAble = false;
			
			allClose();
			photoChange_Tab();
		}
		return false;
	});

	$(".blue_hour-photo .home_lock button").click(function(){
		pageLog("tabMotion : " +tabMotion);
		if (!tabMotion && $(this).css("opacity") != 0)
		{
			$(this).parents(".overlap_cont").find(".home_passcode").css({"display":"block", "opacity":0, "transform":"translate(0px, 0px)", "transition":"none"}).stop().animate({"opacity":1},showDelay);
			blueHour_Step = "password";
			buttonAble = true;

			$(".btn-back").css({"display":"block"});
		}		
		return false;
	});

	$(".blue_hour-photo .home_passcode button.btn_passcode").click(function(){
		pageLog(".blue_hour-photo .home_passcode button.btn_passcode");
		if (buttonAble)
		{
			clickPassword.push($(this).attr("data-value"));
			if (clickPassword.length >= 4)
			{
				var setPassword = "";
				for (var i = 0; i < 4 ; i++)
				{
					setPassword += clickPassword[i];
				}

				if (blueHour_password[blueHour_idx] == setPassword)
				{
					buttonAble = false;
					$(this).parent().parent().find("img").eq(0).attr("src", "https://ibighit.com/txt/images/txt/discography/blue_hour/"+passArray[clickPassword.length]);
					setTimeout(function(){
						$(".blue_hour-photo .overlap_cont .home_passcode").css({"transition":"transform 800ms cubic-bezier(0.230, 1.000, 0.320, 1.000)", "z-index":"999", "transform":"translate(0px, -100%)"});
						setTimeout(function(){
							$(this).css({"z-index":""});
						},700);
						$(".blue_hour-photo .overlap_cont .home_unlock").css({"display":"block", "opacity":1});
						blueHour_Step = "home";

						clickPassword = new Array();
						$(".blue_hour-photo .home > ul").eq(blueHour_idx).find(".home_passcode img").eq(0).attr("src", "https://ibighit.com/txt/images/txt/discography/blue_hour/"+passArray[0]);
					},showDelay);
					return false;
				}else{
					buttonAble = false;

					$(".blue_hour-photo .home > ul").eq(blueHour_idx).find(".home_passcode img").eq(0).attr("src", "https://ibighit.com/txt/images/txt/discography/blue_hour/"+passArray[4]);
					$(".blue_hour-photo .home_passcode .failed_code").css({"display":"block"});
					$(".blue_hour-photo .home_passcode .failed_code").css({"animation-duration": "0.8s", "animation-name": "password_fail", "animation-fill-mode":"forwards"});
					setTimeout(function(){
						$(".blue_hour-photo .home > ul").eq(blueHour_idx).find(".home_passcode img").eq(0).attr("src", "https://ibighit.com/txt/images/txt/discography/blue_hour/"+passArray[0]);
						$(".blue_hour-photo .home_passcode .failed_code").css({"display":"none"});
						clickPassword = new Array();
						buttonAble = true;
					},800);
				}
			}else{
				$(this).parent().parent().find("img").eq(0).attr("src", "https://ibighit.com/txt/images/txt/discography/blue_hour/"+passArray[clickPassword.length]);
			}
		}
		return false;
	});

	$(".blue_hour-photo .home_passcode button.cancle").click(function(){
		pageLog(".blue_hour-photo .home_passcode button.cancle");
		clickPassword = new Array();
		$(this).parent().parent().find("img").eq(0).attr("src", "https://ibighit.com/txt/images/txt/discography/blue_hour/" + passArray[clickPassword.length]);
		return false;
	});

	$(".blue_hour-photo .home_unlock button").click(function(){
		pageLog(".blue_hour-photo .home_unlock button");
		$(".blue_hour-photo .application > div").css({"display":"none"});
		$(".blue_hour-photo .application").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);

		if ($(this).hasClass("app_photo"))
		{
			$(".blue_hour-photo .application > .photo").css({"display":"block", "opacity":1, "transform":"", "transition" : "none"});
			setTimeout(function(){
				$(".blue_hour-photo .application > .photo").css({ "transform":"scale(1)", "transition":"transform 100ms"});
			},100);
			blueHour_Step = "photo";
		}else if ($(this).hasClass("app_video"))
		{
			$(".blue_hour-photo .application > .video").css({"display":"block", "opacity":1, "transform":"", "transition" : "none"});
			setTimeout(function(){
				$(".blue_hour-photo .application > .video").css({ "transform":"scale(1)", "transition":"transform 100ms"});
			},100);
			blueHour_Step = "video";
		}else if ($(this).hasClass("app_music"))
		{
			$(".blue_hour-photo .application > .music").css({"display":"block", "opacity":1, "transform":"", "transition" : "none"});
			setTimeout(function(){
				$(".blue_hour-photo .application > .music").css({ "transform":"scale(1)", "transition":"transform 100ms"});
			},100);
			blueHour_Step = "music";
		}else if ($(this).hasClass("app_downloads"))
		{
			$(".blue_hour-photo .application > .downloads").css({"display":"block", "opacity":1, "transform":"", "transition" : "none"});
			setTimeout(function(){
				$(".blue_hour-photo .application > .downloads").css({ "transform":"scale(1)", "transition":"transform 100ms"});
			},100);
			$(".blue_hour-photo .application > .downloads > ul").css({"display":"none"});
			$(".blue_hour-photo .application > .downloads > ul").eq(blueHour_idx).css({"display":"block", "opacity":1});
			blueHour_Step = "downloads";
		}
		return false;
	});

	$(".blue_hour-photo .application .select_version button").click(function(){
		pageLog(".blue_hour-photo .application .select_version button");
		if (!motionIng)
		{
			motionIng = true;		
		
			blueHour_Step = "memberList";

			$(this).parents(".photo").find(".select_list").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);

			$(this).parents(".photo").find(".select_list .version_r").css({"display":"none"});
			$(this).parents(".photo").find(".select_list .version_vr").css({"display":"none"});
			$(this).parents(".photo").find(".select_list .version_ar").css({"display":"none"});

			$(".blue_hour-photo .bottom ul li").removeClass("active");
			if ($(this).hasClass("select_version-r"))
			{
				blueHour_photo = "R";
				blueHour_idx = 0;
				$(this).parents(".photo").find(".select_list .version_r").css({"position":"relative", "display":"block", "opacity":1});
				$(this).parents(".photo").find(".select_list .version_r .select_member_list").css({"display":"block"});
				$(this).parents(".photo").find(".select_list .version_r .detail_list").css({"display":"none"});
			}else if ($(this).hasClass("select_version-ar"))
			{
				blueHour_photo = "AR";
				blueHour_idx = 1;
				$(this).parents(".photo").find(".select_list .version_ar").css({"position":"relative", "display":"block", "opacity":1});
				$(this).parents(".photo").find(".select_list .version_ar .select_member_list").css({"display":"block"});
				$(this).parents(".photo").find(".select_list .version_ar .detail_list").css({"display":"none"});
			}else if ($(this).hasClass("select_version-vr"))
			{
				blueHour_photo = "VR";
				blueHour_idx = 2;
				$(this).parents(".photo").find(".select_list .version_vr").css({"position":"relative", "display":"block", "opacity":1});
				$(this).parents(".photo").find(".select_list .version_vr .select_member_list").css({"display":"block"});
				$(this).parents(".photo").find(".select_list .version_vr .detail_list").css({"display":"none"});
			}

			$(".blue_hour-photo .bottom ul li").each(function(){
				if ($(this).find("h3").text() == blueHour_photo)
				{
					$(this).addClass("active");
				}
			});
			
			setTimeout(function(){
				photoChange();
			},showDelay);

			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}
		return false;
	});

	$(".blue_hour-photo .application .select_list .select_member_list button").click(function(){
		pageLog(".blue_hour-photo .application .select_list .select_member_list button");
		if (!motionIng)
		{
			motionIng = true;

			blueHour_Step = "detailList";

			blueHour_listIdx = $(this).index();
			$(this).parent().parent().parent().parent().find(".detail_list").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
			$(this).parent().parent().parent().parent().find(".detail_list > li").css({"display":"none"}).removeClass("active");
			$(this).parent().parent().parent().parent().find(".detail_list > li").eq(blueHour_listIdx).css({"display":"block", "opacity":1}).addClass("active");
			
			$(".blue_hour-photo .home").stop().animate({"opacity":0},showDelay);
			$(".blue_hour-photo .application .select_version").stop().animate({"opacity":0},showDelay);
			$(".blue_hour-photo .application .select_member_list").stop().animate({"opacity":0},showDelay);

			if (blueHour_listIdx == 0)
			{
				var showPage = "";
				if (blueHour_idx == 0)
				{
					groupIdx = 0;
					showPage = $(this).parent().parent().parent().parent().find(".detail_list > li").eq(blueHour_listIdx);
					showPage.find(".overlap_cont img").css({"display":"none", "opacity":0});
					showPage.find(".overlap_cont img").eq(0).css({"display":"block", "opacity":1});
				}else if (blueHour_idx == 1)
				{
					
					groupIdx = 0;

					showPage = $(this).parent().parent().parent().parent().find(".detail_list > li").eq(blueHour_listIdx);
					showPage.find("> ul > li").removeClass("active").css({"margin-left":"100%"});
					showPage.find("> ul > li").eq(0).addClass("active").css({"margin-left":"0px"});
				}else if (blueHour_idx == 2)
				{
					showPage = $(this).parent().parent().parent().parent().find(".detail_list > li").eq(blueHour_listIdx).find("> ul > li").eq(0);
					$(this).parent().parent().parent().parent().find(".detail_list > li").eq(blueHour_listIdx).find("> ul > li").css({"margin-left":"100%"}).removeClass("active");
					$(this).parent().parent().parent().parent().find(".detail_list > li").eq(blueHour_listIdx).find("> ul > li").eq(0).css({"margin-left":"0px"}).addClass("active");

					blueHourScroll();
					setTimeout(function(){
						blueHourScroll();
					},500);
				}

				$(".blue_hour-photo > .slide-wrap > .btn-down").css({"display":"block"});
				
				minHeight_set(showPage);
			}

			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}
		return false;
	});
	
	
	$(".blue_hour-photo .application .select_list .detail_list .select_gr_list .click-area button").click(function(){
		pageLog(".blue_hour-photo .application .select_list .detail_list .select_gr_list .click-area button");
		if (!motionIng)
		{
			motionIng = true;
		
			if (!$(this).hasClass("back"))
			{
				if (blueHour_idx == 0)
				{
					var cIndex = $(this).index() + 1;
					if (groupIdx != cIndex)
					{
						if (groupIdx > cIndex)
						{
							$(this).parent().parent().find(".overlap_cont img").eq(cIndex).addClass("active").stop().css({"display":"block", "opacity":1});
							$(this).parent().parent().find(".overlap_cont img").eq(groupIdx).removeClass("active").stop().animate({"opacity":0},showDelay,function(){
								$(this).css({"display":"none"});
								groupIdx = cIndex;
							});
						}else{							
							$(this).parent().parent().find(".overlap_cont img").eq(cIndex).addClass("active").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay,function(){
								$(this).parent().find("img").eq(groupIdx).removeClass("active").stop().animate({"opacity":0,"display":"none"});
								groupIdx = cIndex;
							});
						}
					}else{
						$(".popup-bg").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
						$(".blue_hour-photo .popup").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
						$(".blue_hour-photo .popup > div").css({"display":"none"});
						$(".blue_hour-photo .popup > .photo_detail").css({"display":"block"});
						
						$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").css({"display":"none"});
						$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).css({"display":"block", "opacity":1});

						$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".group_detail").css({"display":"none"});
						$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").css({"display":"none"});
						$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".group_detail").eq($(this).index()).css({"display":"block", "opacity":1}).find(".slide_cont > li").removeClass("active");
						$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".group_detail").eq($(this).index()).css({"display":"block", "opacity":1}).find(".slide_cont > li").css({"margin-left":"100%"});
						$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".group_detail").eq($(this).index()).css({"display":"block", "opacity":1}).find(".slide_cont > li").eq(0).css({"margin-left":"0px"});

						var goTop = $(".blue_hour-photo .popup > .photo_detail").offset().top - $("header").outerHeight();
						var speed = Math.abs(scrollTop-goTop);
						//$("html, body").stop().animate({"scrollTop":goTop + "px"}, speed, 'swing');
					}
				}else if (blueHour_idx == 1){
					$(".popup-bg").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
					$(".blue_hour-photo .popup").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
					$(".blue_hour-photo .popup > div").css({"display":"none"});
					$(".blue_hour-photo .popup > .photo_detail").css({"display":"block"});
					
					$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").css({"display":"none"});
					$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).css({"display":"block", "opacity":1});

					$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".group_detail").css({"display":"none"});
					$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").css({"display":"none"});
					$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".group_detail").eq($(this).parent().parent().index()).css({"display":"block", "opacity":1}).find(".slide_cont > li").css({"margin-left":"100%"}).removeClass("active");
					$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".group_detail").eq($(this).parent().parent().index()).css({"display":"block", "opacity":1}).find(".slide_cont > li").eq($(this).index()).css({"margin-left":"0px"}).addClass("active");
									
					var goTop = $(".blue_hour-photo .popup > .photo_detail").offset().top - $("header").outerHeight();
					var speed = Math.abs(scrollTop-goTop);
					//$("html, body").stop().animate({"scrollTop":goTop + "px"}, speed, 'swing');
				}
			}else{
				blueHour_Step = "memberList";

				$(this).parents(".detail_list").stop().animate({"opacity":0},showDelay,function(){
					$(this).css({"display":"none"});
				});

				$(".blue_hour-photo .home").stop().animate({"opacity":1},showDelay);
				$(".blue_hour-photo .application .select_version").stop().animate({"opacity":1},showDelay);
				$(".blue_hour-photo .application .select_member_list").stop().animate({"opacity":1},showDelay);

				minHeight_clear();
			}

			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}
		return false;
	});
	
	var photoPopup = 0;
	$(".blue_hour-photo .application .select_list .detail_list .portrait button").click(function(){
		pageLog(".blue_hour-photo .application .select_list .detail_list .portrait button");
		if (!motionIng)
		{
			motionIng = true;

			if (!$(this).hasClass("back"))
			{
				photoPopup = $(this).index();
				$(".popup-bg").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
				$(".blue_hour-photo .popup").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
				$(".blue_hour-photo .popup > div").css({"display":"none"});
				$(".blue_hour-photo .popup > .photo_detail").css({"display":"block"});

				$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").css({"display":"none"});
				$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).css({"display":"block", "opacity":1});
				
				$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".group_detail").css({"display":"none"});
				$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").css({"display":"none"});
				$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).css({"display":"block", "opacity":1});
				$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).find(".slide_cont > li").removeClass("active").css({"margin-left":"100%"});
				$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).find(".slide_cont > li").eq($(this).index()).addClass("active").css({"margin-left":"0%"});
				
				var goTop = $(".blue_hour-photo .popup > .photo_detail").offset().top - $("header").outerHeight();
				var speed = Math.abs(scrollTop-goTop);
				//$("html, body").stop().animate({"scrollTop":goTop + "px"}, speed, 'swing');

				if ($(this).index() == 8)
				{
					$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).find(".slide_cont > li").eq($(this).index()).find(".message").css({"transition":"none", "display":"block","opacity":0,"transform":"scale(0)", "top":"auto", "left":"auto", "margin":"0"});
					setTimeout(function(){
						$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).find(".slide_cont > li.active").find(".message").css({"transition":"all 0.1s linear","opacity":1,"transform":"scale(1)", "top":"0", "left":"0", "margin":"auto"});
					},2000);
				}else if ($(this).index() == 0)
				{
					$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).find(".slide_cont > li").eq($(this).index()).find(".overlap_cont > li").removeClass("active").css({"display":"none", "opacity":"0"});
					$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).find(".slide_cont > li").eq($(this).index()).find(".overlap_cont > li").eq(0).addClass("active").css({"display":"block", "opacity":1});
				}
			}else{
				blueHour_Step = "memberList";

				$(this).parents(".detail_list").stop().animate({"opacity":0},showDelay,function(){
					$(this).css({"display":"none"});
				});

				$(".blue_hour-photo .home").stop().animate({"opacity":1},showDelay);
				$(".blue_hour-photo .application .select_version").stop().animate({"opacity":1},showDelay);
				$(".blue_hour-photo .application .select_member_list").stop().animate({"opacity":1},showDelay);

				minHeight_clear();
			}

			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}
		return false;
	});
	
	var showPage;
	$(".blue_hour-photo .slide-wrap .slide-obj .btn-prev").click(function(){
		pageLog(".blue_hour-photo .slide-wrap .slide-obj .btn-prev");
		if (!motionIng)
		{
			motionIng = true;			
			var slideLI = $(this).parent().parent().find(".slide_cont > li");
			var activeIdx = 0;
			
			slideLI.each(function(){
				if ($(this).hasClass("active"))
				{
					activeIdx = $(this).index();
				}
			});
			
			slideLI.eq(activeIdx).stop().animate({"margin-left":"100%"}, motionDelay);
			activeIdx--;

			if (activeIdx < 0)
			{
				activeIdx = slideLI.length - 1;
			}
			slideLI.eq(activeIdx).css({"margin-left":"-100%"}).stop().animate({"margin-left":"0%"}, motionDelay);
			slideLI.removeClass("active");
			slideLI.eq(activeIdx).addClass("active");
			
			showPage = slideLI.eq(activeIdx);
			minHeight_set(showPage);
			
			groupIdx = activeIdx;

			blueHourScroll();

			
			setTimeout(function(){
				motionIng = false;
				minHeight_set(showPage);
				roundSilder_reset();

				if (blueHour_idx == 2)
				{
					if (groupIdx == 2)
					{
						sliderInterval = setInterval(sliderShow,15);
					}else{
						sliderIdx = 0;
						clearInterval(sliderInterval);
					}
				}

			},motionDelay);
		}
		return false;
	});

	$(".blue_hour-photo .slide-wrap .slide-obj .btn-next").click(function(){
		pageLog(".blue_hour-photo .slide-wrap .slide-obj .btn-next");
		if (!motionIng)
		{
			motionIng = true;
			var slideLI = $(this).parent().parent().find(".slide_cont > li");
			var activeIdx = 0;
			
			slideLI.each(function(){
				if ($(this).hasClass("active"))
				{
					activeIdx = $(this).index();
				}
			});
			
			slideLI.eq(activeIdx).stop().animate({"margin-left":"-100%"}, motionDelay);
			activeIdx++;

			if (activeIdx == slideLI.length)
			{
				activeIdx = 0;
			}
			slideLI.eq(activeIdx).css({"margin-left":"100%"}).stop().animate({"margin-left":"0%"}, motionDelay);
			slideLI.removeClass("active");
			slideLI.eq(activeIdx).addClass("active");
			
			showPage = slideLI.eq(activeIdx);
			minHeight_set(showPage);
			
			groupIdx = activeIdx;
			
			blueHourScroll();

			setTimeout(function(){
				motionIng = false;
				minHeight_set(showPage);
				roundSilder_reset();

				if (blueHour_idx == 2)
				{
					if (groupIdx == 2)
					{
						sliderInterval = setInterval(sliderShow,15); 
					}else{
						sliderIdx = 0;
						clearInterval(sliderInterval);
					}
				}

			},motionDelay);
		}
		return false;
	});

	$(".blue_hour-photo .slide-wrap .slide_cont").swipe({
		swipeStatus:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
			pageLog(".blue_hour-photo .slide-wrap .slide_cont");
			if (sliderAble)
			{
				return false;
			}
		},
		swipe:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
			if(distance > 50 && !popupShow && !sliderAble)
			{
				if(direction == "left" || phase == "left" || direction == "right" || phase == "right")
				{
					if((direction == "left" || phase == "left"))
					{			
						$(this).parent().find(".btn-next").click();
					}else if((direction == "right" || phase == "right"))
					{
						$(this).parent().find(".btn-prev").click();
					}
				}
			}
		},allowPageScroll:"vertical"
	});
	
	$(".blue_hour-photo .application .video button").click(function(){
		pageLog(".blue_hour-photo .application .video button");
		if (!$(this).hasClass("back"))
		{
			var videoPopup = $(this).attr("data-popup").replace("_", "/");
			var dataURL = "https://ibighit.com/txt/video/blue_hour/" + videoPopup + ".html?l="+($(".lang_opt .btn-lang p").text().toLowerCase());
			window.open(dataURL);
		}else{
			blueHour_Step = "home";

			$(".application").stop().animate({"opacity":0},showDelay,function(){
				$(this).css({"display":"none"});
			});
		}
		return false;
	});


	$(".blue_hour-photo .application .music button").click(function(){
		pageLog(".blue_hour-photo .application .music button");
		if (!$(this).hasClass("back"))
		{
			var musicPopup = $(this).attr("data-popup");
			var dataURL =  "https://ibighit.com/txt/music/blue_hour/" + musicPopup + ".html?l="+($(".lang_opt .btn-lang p").text().toLowerCase());
			window.open(dataURL, "music", "height=1181px,width=530px,scrollbar=no,status=no,resize=no");
		}else{
			blueHour_Step = "home";

			$(".application").stop().animate({"opacity":0},showDelay,function(){
				$(this).css({"display":"none"});
			});
		}
		return false;
	});
	
	var downloadsIdx = 0;
	$(".blue_hour-photo .application .downloads button").click(function(){
		pageLog(".blue_hour-photo .application .downloads button");
		if (!$(this).hasClass("back"))
		{			
			downloadsIdx = $(this).index();

			$(".popup-bg").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
			$(".blue_hour-photo .popup").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
			$(".blue_hour-photo .popup > div").css({"display":"none"});
			$(".blue_hour-photo .popup > .downloads_detail").css({"display":"block", "opacity":1, "position":"relative"});
			
			$(".blue_hour-photo .popup > .downloads_detail .version_wrap > div").css({"display":"none"});
			$(".blue_hour-photo .popup > .downloads_detail .version_wrap > div").eq(blueHour_idx).css({"display":"block", "opacity":1});
			$(".blue_hour-photo .popup > .downloads_detail .version_wrap > div").eq(blueHour_idx).find("> div").css({"display":"none", "opacity":"0", "position":"absolute"});
			$(".blue_hour-photo .popup > .downloads_detail .version_wrap > div").eq(blueHour_idx).find("> div").eq(downloadsIdx).css({"display":"block", "opacity":1, "position":"relative"});
		}else{
			blueHour_Step = "home";

			$(".application").stop().animate({"opacity":0},showDelay,function(){
				$(this).css({"display":"none"});
			});
		}
		return false;
	});

	$(".blue_hour-photo .select_version .select_box").click(function(){
		pageLog(".blue_hour-photo .select_version .select_box");
		if (!motionIng)
		{
			motionIng = true;

			$(".blue_hour-photo .application").stop().animate({"opacity":0},showDelay,function(){
				$(this).css({"display":"none"});
			});

			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}

		return false;
	});


	$(".blue_hour-photo .select_version .select_box .click-area").click(function(){
		return false;
	});

	$(".blue_hour-photo .select_list .select_box").click(function(){
		pageLog(".blue_hour-photo .select_list .select_box");
		if (!motionIng)
		{
			motionIng = true;
			
			$(".blue_hour-photo .select_list").stop().animate({"opacity":0},showDelay,function(){
				$(this).css({"display":"none"});
			});

			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}

		return false;
	});


	$(".blue_hour-photo .select_list .select_box .click-area").click(function(){
		return false;
	});


	$(".blue_hour-photo .popup .popup-btn button.btn-close").click(function(){
		pageLog(".blue_hour-photo .popup .popup-btn button.btn-close");
		$(".blue_hour-photo .popup").stop().animate({"opacity":0},showDelay,function(){
			$(this).css({"display":"none"});
		});

		$(".popup-bg").stop().animate({"opacity":0},showDelay,function(){
			$(this).css({"display":"none"});
		});
		return false;
	});

	$(".popup-bg, .popup").click(function(){
		pageLog(".popup-bg, .popup");
		$(".blue_hour-photo .popup").stop().animate({"opacity":0},showDelay,function(){
			$(this).css({"display":"none"});
		});

		$(".popup-bg").stop().animate({"opacity":0},showDelay,function(){
			$(this).css({"display":"none"});
		});
		return false;
	});
	
	$(".popup .photo_detail .version_wrap .contents-obj img").click(function(){
		pageLog(".popup .photo_detail .version_wrap .contents-obj img");
		return false;
	});
	
	$(".popup .photo_detail .version_wrap .contents-obj .message").click(function(){
		pageLog(".popup .photo_detail .version_wrap .contents-obj .message");
		return false;
	});

	$(".popup .photo_detail .version_wrap .member_detail .img-area").click(function(){
		pageLog(".popup .photo_detail .version_wrap .member_detail .overlap_cont img");
		return false;
	});

	$(".popup .downloads_detail .version_wrap .contents-obj img").click(function(){
		pageLog(".popup .downloads_detail .version_wrap .contents-obj img");
		return false;
	});
	
	$(".blue_hour-photo .popup .version_wrap .slide_cont > li > .click-area button").click(function(){
		pageLog(".blue_hour-photo .popup .version_wrap .slide_cont > li .click-area button");
		if (!motionIng)
		{
			pageLog("transform : " + ($(this).parent().parent().find(".message").css("transform")));
			if ($(this).parent().parent().index() == 8)
			{
				if ($(this).parent().parent().find(".message").css("transform") == "matrix(1, 0, 0, 1, 0, 0)")
				{
					return false;
				}
			}

			motionIng = true;
			$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .btn-down").css({"display":"block"});
			if (blueHour_idx == 0)
			{
				if ($(this).parent().parent().index() == 0)
				{
					var activeAble = 0;
					var clickIdx = $(this).index() - 1;
					$(this).parent().parent().find(".overlap_cont > li").each(function(){
						if ($(this).hasClass("active"))
						{
							activeAble = $(this).index();
						}
					});
					pageLog("activeAble : " + activeAble + ", clickIdx : " + clickIdx);
					if (!$(this).parent().parent().find(".overlap_cont > li").eq(clickIdx).hasClass("active") && (activeAble != clickIdx))
					{
						if (activeAble < clickIdx)
						{
							$(this).parent().parent().find(".overlap_cont > li").eq(clickIdx).addClass("active").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay,function(){
								$(this).parent().find("li").eq(activeAble).removeClass("active").css({"opacity":"0", "display":"none"});
							});
						}else{
							$(this).parent().parent().find(".overlap_cont > li").eq(activeAble).removeClass("active").stop().animate({"opacity":0},showDelay,function(){
								$(this).css({"display":"none"});
							});
							$(this).parent().parent().find(".overlap_cont > li").eq(clickIdx).addClass("active").css({"display":"block", "opacity":1});
						}
						
					}
				}else{	
					var showPopup = $(this).parent().parent().index() - 7;
					downloadsIdx = showPopup;
					pageLog("blueHour_listIdx : " + blueHour_listIdx + ", showPopup : " + showPopup);
					$(".blue_hour .album-detail .blue_hour-photo .popup_hidden").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
					$(".popup-bg-white").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
					$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_wrap > div").css({"display":"none"});
					$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_wrap .version_r").css({"display":"block"});
					$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_r .member_hidden").css({"display":"none", "opacity":0, "position":"absolute"});
					$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_r .member_hidden").eq(blueHour_listIdx-1).css({"display":"block", "opacity":1, "position":"relative"});
					$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_r .member_hidden").eq(blueHour_listIdx-1).find("> ul > li").css({"display":"none", "opacity":0});
					$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_r .member_hidden").eq(blueHour_listIdx-1).find("> ul > li").eq(showPopup).css({"display":"block", "opacity":1});				
				}
			}else if (blueHour_idx == 1){
				var showPopup = $(this).parent().parent().index() - 7;
				downloadsIdx = showPopup;
				pageLog("blueHour_listIdx : " + blueHour_listIdx + ", showPopup : " + showPopup);
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
				$(".popup-bg-white").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_wrap > div").css({"display":"none"});
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_wrap .version_ar").css({"display":"block"});
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_ar .member_hidden").css({"display":"none", "opacity":0, "position":"absolute"});
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_ar .member_hidden").eq(blueHour_listIdx-1).css({"display":"block", "opacity":1, "position":"relative"});
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_ar .member_hidden").eq(blueHour_listIdx-1).find("> ul > li").css({"display":"none", "opacity":0});
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_ar .member_hidden").eq(blueHour_listIdx-1).find("> ul > li").eq(showPopup).css({"display":"block", "opacity":1});	
			}else{
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .btn-down").css({"display":"none"});
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
				$(".popup-bg-white").css({"display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay);
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_wrap > div").css({"display":"none"});
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_wrap .version_vr").css({"display":"block"});
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_vr .member_hidden").css({"display":"none", "opacity":0, "position":"absolute"});
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_vr .member_hidden").eq(blueHour_listIdx-1).css({"display":"block", "opacity":1, "position":"relative"});
				$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_vr .member_hidden").eq(blueHour_listIdx-1).find("> ul > li").css({"display":"none", "opacity":0});
				if (blueHour_idx == 2 && $(this).parent().parent().index() == 3)
				{
					downloadsIdx = 3;
					$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .btn-down").css({"display":"block"});
					$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_vr .member_hidden").eq(blueHour_listIdx-1).find("> ul > li").eq(3).css({"display":"block", "opacity":1});				
				}else{
					$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_vr .member_hidden").eq(blueHour_listIdx-1).find("> ul > li").eq($(this).index()).css({"display":"block", "opacity":1});
				}
			}			

			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}
		return false;
	});

	$(".blue_hour-photo .popup_hidden .popup-btn button.btn-close").click(function(){
		pageLog(".blue_hour-photo .popup_hidden .popup-btn button.btn-close");
		$(".blue_hour-photo .popup_hidden").stop().animate({"opacity":0},showDelay,function(){
			$(this).css({"display":"none"});
		});
		$(".popup-bg-white").stop().animate({"opacity":0},showDelay,function(){
			$(this).css({"display":"none"});
		});
		return false;
	});

	$(".blue_hour-photo .message .message_close").click(function(){
		pageLog(".blue_hour-photo .message .message_close");
		$(this).parent().parent().css({"transition":"all 0.1s linear", "transform":"scale(0)"});
		setTimeout(function(){
			$(".blue_hour-photo .message").css({"display":"none"});
		},showDelay);

		return false;
	});
	
	$(".popup-bg-white, .popup_hidden").click(function(){
		pageLog(".popup-bg-white, .popup_hidden");
		$(".blue_hour-photo .popup_hidden").stop().animate({"opacity":0},showDelay,function(){
			$(this).css({"display":"none"});
		});
		$(".popup-bg-white").stop().animate({"opacity":0},showDelay,function(){
			$(this).css({"display":"none"});
		});
		return false;
	});

	$(".popup_hidden .version_wrap .contents-obj img").click(function(){
		pageLog(".popup_hidden .version_wrap .contents-obj img");
		return false;
	});

	$(".blue_hour-photo .popup .version_wrap .slide-obj .btn-prev").click(function(){
		pageLog(".blue_hour-photo .popup .version_wrap .slide-obj .btn-prev");
		if (!motionIng)
		{
			motionIng = true;			
			var slideLI = $(this).parent().parent().find(".slide_cont > li");
			var activeIdx = 0;
			
			slideLI.each(function(){
				if ($(this).hasClass("active"))
				{
					activeIdx = $(this).index();
				}
			});
			
			slideLI.eq(activeIdx).stop().animate({"margin-left":"100%"}, motionDelay);
			activeIdx--;
			if (activeIdx < 0)
			{
				activeIdx = slideLI.length - 1;
			}
			slideLI.eq(activeIdx).css({"margin-left":"-100%"}).stop().animate({"margin-left":"0%"}, motionDelay);
			slideLI.removeClass("active");
			slideLI.eq(activeIdx).addClass("active");

			if (activeIdx == 8)
			{
				slideLI.find(".message").css({"transitioin":"none", "display":"block","opacity":0, "transform":"scale(0)", "top":"auto", "left":"auto", "margin":"0"});
				showMessage = setTimeout(function(){
					$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).find(".slide_cont > li.active").find(".message").css({"transition":"all 0.1s linear", "opacity":1, "transform":"scale(1)", "top":"0", "left":"0", "margin":"auto"});
				},2000);
			}else{
				clearTimeout(showMessage);
			}

			photoPopup = activeIdx;

			setTimeout(function(){
				if (activeIdx != 0)
				{
					$(".blue_hour-photo .member_detail .overlap_cont > li").css({"display":"", "opacity":""}).removeClass("active");
				}
				motionIng = false;
			},motionDelay);
		}
		return false;
	});
	var showMessage;
	$(".blue_hour-photo .popup .version_wrap .slide-obj .btn-next").click(function(){
		pageLog(".blue_hour-photo .popup .version_wrap .slide-obj .btn-next");
		if (!motionIng)
		{
			motionIng = true;
			var slideLI = $(this).parent().parent().find(".slide_cont > li");
			var activeIdx = 0;
			
			slideLI.each(function(){
				if ($(this).hasClass("active"))
				{
					activeIdx = $(this).index();
				}
			});
			
			slideLI.eq(activeIdx).stop().animate({"margin-left":"-100%"}, motionDelay);
			activeIdx++;
			if (activeIdx == slideLI.length)
			{
				activeIdx = 0;
			}
			slideLI.eq(activeIdx).css({"margin-left":"100%"}).stop().animate({"margin-left":"0%"}, motionDelay);
			slideLI.removeClass("active");
			slideLI.eq(activeIdx).addClass("active");

			if (activeIdx == 8)
			{
				slideLI.find(".message").css({"transitioin":"none", "display":"block","opacity":0, "transform":"scale(0)", "top":"auto", "left":"auto", "margin":"0"});
				showMessage = setTimeout(function(){
					$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).find(".slide_cont > li.active").find(".message").css({"transition":"all 0.1s linear", "opacity":1, "transform":"scale(1)", "top":"0", "left":"0", "margin":"auto"});
				},2000);
			}else{
				clearTimeout(showMessage);
			}

			photoPopup = activeIdx;

			setTimeout(function(){
				if (activeIdx != 0)
				{
					$(".blue_hour-photo .member_detail .overlap_cont > li").css({"display":"", "opacity":""}).removeClass("active");
				}		
				motionIng = false;
			},motionDelay);
		}
		return false;
	});

	$(".blue_hour-photo .popup .version_wrap .slide_cont").swipe({
		swipeStatus:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
			pageLog(".blue_hour-photo .popup .version_wrap .slide_cont");
		},
		swipe:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
			if(distance > 50 && !popupShow)
			{
				if(direction == "left" || phase == "left" || direction == "right" || phase == "right")
				{
					if((direction == "left" || phase == "left"))
					{			
						$(this).parent().find(".btn-next").click();
					}else if((direction == "right" || phase == "right"))
					{
						$(this).parent().find(".btn-prev").click();
					}
				}
			}
		},allowPageScroll:"vertical"
	});
	
	$(".btn-back").click(function(){
		pageLog(".btn-back");
		if (!motionIng)
		{
			pageLog("blueHour_Step : " + blueHour_Step);
			motionIng = true;

			switch (blueHour_Step)
			{
				case "detailList":
				{
					$(".blue_hour-photo .home").stop().animate({"opacity":1},showDelay);
					$(".blue_hour-photo .application .select_version").stop().animate({"opacity":1},showDelay);
					$(".blue_hour-photo .application .select_member_list").stop().animate({"opacity":1},showDelay);
					
					$(".blue_hour-photo > .slide-wrap > .btn-down").css({"display":"none"});
					minHeight_clear();

					blueHour_Step = "memberList";
					$(".detail_list").stop().animate({"opacity":0},showDelay,function(){
						$(this).css({"display":"none"});
					});
					break;
				}
				case "memberList":
				{
					blueHour_Step = "photo";
					$(".select_list").stop().animate({"opacity":0},showDelay,function(){
						$(this).css({"display":"none"});
					});
					break;
				}
				case "photo":
				{
					blueHour_Step = "home";
					$(".application").stop().animate({"opacity":0},showDelay,function(){
						$(this).css({"display":"none"});
					});
					break;
				}
				case "video":
				{
					blueHour_Step = "home";
					$(".application").stop().animate({"opacity":0},showDelay,function(){
						$(this).css({"display":"none"});
					});
					break;
				}
				case "music":
				{
					blueHour_Step = "home";
					$(".application").stop().animate({"opacity":0},showDelay,function(){
						$(this).css({"display":"none"});
					});
					break;
				}
				case "downloads":
				{
					blueHour_Step = "home";
					$(".application").stop().animate({"opacity":0},showDelay,function(){
						$(this).css({"display":"none"});
					});
					break;
				}
				case "home":
				{
					blueHour_Step = "lock";
					$(".home_passcode").css({"display":"none", "opacity":0});
					$(".home_unlock").stop().animate({"opacity":0},showDelay,function(){
						$(this).css({"display":"none"});
					});

					$(".home_lock button").css({"opacity":1});
		
					$(this).css({"display":"none"});
					buttonAble = true;
					tabMotion = false;
					break;
				}
				case "password":
				{
					blueHour_Step = "lock";
					$(".home_passcode").stop().animate({"opacity":0},showDelay,function(){
						$(this).css({"display":"none"});
						$(".blue_hour-photo .home_passcode img").attr("src", "https://ibighit.com/txt/images/txt/discography/blue_hour/"+passArray[0]);
						clickPassword = new Array();
					});

					$(".home_lock button").css({"opacity":1});

					$(this).css({"display":"none"});
					buttonAble = true;
					tabMotion = false;
					break;
				}
			}

			setTimeout(function(){
				motionIng = false;
			},motionDelay);
		}
		return false;
	});

	/*$(".blue_hour-photo > .slide-wrap > .btn-down").click(function(){
		switch (blueHour_idx)
		{
			case 0:
			{
				var activeIdx = 0;
				$(".blue_hour-photo .application .select_list .version_r .detail_list .select_gr_list img").each(function(){
					if ($(this).hasClass("active"))
					{
						activeIdx = $(this).index();
					}
				});

				downloadFile = $(".blue_hour-photo .application .select_list .version_r .detail_list .select_gr_list img").eq(activeIdx).attr("data-file");
				filDownload();
				break;
			}
			case 1:
			{
				var activeIdx = 0;
				$(".blue_hour-photo .application .select_list .version_ar .detail_list .select_gr_list > ul > li").each(function(){
					if ($(this).hasClass("active"))
					{
						activeIdx = $(this).index();
					}
				});

				downloadFile = $(".blue_hour-photo .application .select_list .version_ar .detail_list .select_gr_list > ul > li").eq(activeIdx).attr("data-file");
				filDownload();
				break;
			}
			case 2:
			{
				var activeIdx = 0;
				$(".blue_hour-photo .application .select_list .version_vr .detail_list .select_gr_list > ul > li").each(function(){
					if ($(this).hasClass("active"))
					{
						activeIdx = $(this).index();
					}
				});

				downloadFile = $(".blue_hour-photo .application .select_list .version_vr .detail_list .select_gr_list > ul > li").eq(activeIdx).attr("data-file");
				filDownload();
				break;
			}
		
		}
		return false;
	});*/

	$(".blue_hour-photo .popup .photo_detail .btn-down").click(function(){
		pageLog("blueHour_idx : " + blueHour_idx + ", blueHour_listIdx : " + blueHour_listIdx + ", photoPopup : " + photoPopup + ", groupIdx : " + groupIdx);

		if (blueHour_listIdx == 0)
		{
			var activeIdx = 0;
			if (blueHour_idx == 0)
			{
				$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".group_detail").eq(groupIdx-1).find(".slide_cont > li").each(function(){
					if ($(this).hasClass("active"))
					{
						activeIdx = $(this).index();
					}
				});
				downloadFile = $(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".group_detail").eq(groupIdx-1).find(".slide_cont > li").eq(activeIdx).attr("data-file");
			}else{
				$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".group_detail").eq(groupIdx).find(".slide_cont > li").each(function(){
					if ($(this).hasClass("active"))
					{
						activeIdx = $(this).index();
					}
				});
				pageLog("activeIdx : " + activeIdx);
				downloadFile = $(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".group_detail").eq(groupIdx).find(".slide_cont > li").eq(activeIdx).attr("data-file");
			}
		}else{
			if (photoPopup == 0)
			{
				if (blueHour_idx == 0)
				{
					var activeIdx = 0;
					$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).find(".slide_cont > li").eq(0).find("> .overlap_cont > li").each(function(){
						if ($(this).hasClass("active"))
						{
							activeIdx = $(this).index();
						}
					});
					downloadFile = $(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).find(".slide_cont > li").eq(0).find("> .overlap_cont > li").eq(activeIdx).attr("data-file");
				}else{
					var activeIdx = 0;
					$(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).find(".slide_cont > li").each(function(){
						if ($(this).hasClass("active"))
						{
							activeIdx = $(this).index();
						}
					});
					downloadFile = $(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).find(".slide_cont > li").eq(activeIdx).attr("data-file");
				}
			}else{
				downloadFile = $(".blue_hour-photo .popup > .photo_detail .version_wrap > div").eq(blueHour_idx).find(".member_detail").eq(blueHour_listIdx-1).find(".slide_cont > li").eq(photoPopup).attr("data-file");
			}
		}
	
		
		pageLog("downloadFile : " + downloadFile);
		filDownload();
		return false;
	});

	$(".blue_hour-photo .popup .downloads_detail .btn-down").click(function(){
		pageLog(".blue_hour-photo .popup .downloads_detail .btn-down");
		downloadFile = $(".blue_hour-photo .popup > .downloads_detail .version_wrap > div").eq(blueHour_idx).find("> div").eq(downloadsIdx).attr("data-file");
		filDownload();
		return false;
	});

	$(".blue_hour .album-detail .blue_hour-photo .popup_hidden .btn-down").click(function(){
		pageLog(".blue_hour .album-detail .blue_hour-photo .popup_hidden .btn-down");
		downloadFile = $(".blue_hour .album-detail .blue_hour-photo .popup_hidden .version_wrap > div").eq(blueHour_idx).find(".member_hidden").eq(blueHour_listIdx-1).find("> ul > li").eq(downloadsIdx).attr("data-file");
		filDownload();
		return false;
	});
	
	if (checkBrowser() == "InternetExplorer")
	{
		$(".blue_hour .album-detail .blue_hour-photo .version_vr .select_gr_list .controller").hover(function(e){
			$(".blue_hour-photo .slide-wrap .slide_cont").eq(1).swipe("destroy");
		}, function(){
			$(".blue_hour-photo .slide-wrap .slide_cont").eq(1).swipe({
				swipeStatus:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
					if (sliderAble)
					{
						return false;
					}
				},
				swipe:function(event, phase, direction, distance, duration, fingerCount, fingerData) {
					if(distance > 50 && !popupShow && !sliderAble)
					{
						if(direction == "left" || phase == "left" || direction == "right" || phase == "right")
						{
							if((direction == "left" || phase == "left"))
							{			
								$(this).parent().find(".btn-next").click();
							}else if((direction == "right" || phase == "right"))
							{
								$(this).parent().find(".btn-prev").click();
							}
						}
					}
				},allowPageScroll:"vertical"
			});
		});
	}
	
	$(".blue_hour .album-detail .blue_hour-photo .version_vr .select_gr_list .controller").click(function(){
		return false;
	});
	$(".blue_hour .album-detail .blue_hour-photo .version_vr .select_gr_list .controller #imgSlider").click(function(){
		return false;
	});

	
});

var oldPhoto = "R";
function photoChange()
{
	pageLog("photoChange - oldPhoto : " + oldPhoto);
	$(".photo_contents .select_version > div").css({"display":"none"});
	switch (blueHour_photo)
	{
		case "R":
		{
			if (oldPhoto == "VR")
			{
				$(".photo_contents .home > .version_vr").css({"position":"absolute"}).stop().animate({"opacity":0},showDelay,function(){
					$(this).css({"display":"none"});
				});
			}else if (oldPhoto == "AR")
			{
				$(".photo_contents .home > .version_ar").css({"position":"absolute"}).stop().animate({"opacity":0},showDelay,function(){
					$(this).css({"display":"none"});
				});
			}

			$(".photo_contents .home > .version_r").css({"position":"relative", "display":"block", "opacity":1});
			$(".select_version .version_r").css({"position":"relative", "display":"block", "opacity":1});
			break;
		}
		case "AR":
		{
			if (oldPhoto == "R")
			{
				$(".photo_contents .home > .version_r").css({"position":"absolute"});
				$(".photo_contents .home > .version_ar").css({"position":"relative", "display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay,function(){
					//$(".photo_contents .home > .version_r").css({"position":"absolute", "opacity":0, "display":"none"});
					$(".select_version .version_ar").css({"position":"relative", "display":"block", "opacity":1});
				});
			}else if (oldPhoto == "VR")
			{
				$(".photo_contents .home > .version_vr").css({"position":"absolute"}).stop().animate({"opacity":0},showDelay,function(){
					$(this).css({"display":"none"});
					$(".select_version .version_ar").css({"position":"relative", "display":"block", "opacity":1});
				});
				$(".photo_contents .home > .version_ar").css({"position":"relative", "display":"block", "opacity":1});
			}else{
				$(".select_version .version_ar").css({"position":"relative", "display":"block", "opacity":1});
			}
			break;
		}
		case "VR":
		{
			$(".photo_contents .home > .version_r").css({"position":"absolute"});
			$(".photo_contents .home > .version_ar").css({"position":"absolute"});

			$(".photo_contents .home > .version_vr").css({"position":"relative", "display":"block", "opacity":0}).stop().animate({"opacity":1},showDelay,function(){
				$(".photo_contents .home > .version_r").css({"opacity":0, "display":"none"});
				$(".photo_contents .home > .version_ar").css({"opacity":0, "display":"none"});
				$(".select_version .version_vr").css({"position":"relative", "display":"block", "opacity":1});
			});			
			
			break;
		}	
	}
	oldPhoto = blueHour_photo;
}

function photoChange_Tab()
{
	switch (blueHour_photo)
	{
		case "R":
		{
			$(".photo_contents .home > .version_r").css({"position":"absolute", "display":"block", "opacity":1, "z-index":1});
			break;
		}
		case "AR":
		{
			$(".photo_contents .home > .version_ar").css({"position":"absolute", "display":"block", "opacity":1, "z-index":1});
			break;
		}
		case "VR":
		{
			$(".photo_contents .home > .version_vr").css({"position":"absolute", "display":"block", "opacity":1, "z-index":1});
			break;
		}	
	}
	buttonAble = true;
	tileShow();
	oldPhoto = blueHour_photo;
}

function allClose()
{
	pageLog("allClose()");
	buttonAble = true;
	if (blueHour_Step == "video" || blueHour_Step == "music" || blueHour_Step == "downloads")
	{
		$(".application").stop().animate({"opacity":0},showDelay,function(){
			$(this).css({"display":"none"});
		});
		$(".home_unlock").css({"opacity":0,"display":"none"});
		$(".home_passcode").css({"opacity":0,"display":"none"});
	}else{
		switch (blueHour_Step)
		{
			case "detailList":
			{
				$(".detail_list").stop().animate({"opacity":0},showDelay,function(){
					$(this).css({"display":"none"});
				});
				$(".select_list").css({"opacity":0,"display":"none"});
				$(".application").css({"opacity":0,"display":"none"});
				$(".home_unlock").css({"opacity":0,"display":"none"});
				$(".home_passcode").css({"opacity":0,"display":"none"});
				break;
			}
			case "memberList":
			{
				$(".select_list").stop().animate({"opacity":0},showDelay,function(){
					$(this).css({"display":"none"});
				});
				$(".application").css({"opacity":0,"display":"none"});
				$(".home_unlock").css({"opacity":0,"display":"none"});
				$(".home_passcode").css({"opacity":0,"display":"none"});
				break;
			}
			case "photo":
			{
				$(".application").stop().animate({"opacity":0},showDelay,function(){
					$(this).css({"display":"none"});
				});
				$(".home_unlock").css({"opacity":0,"display":"none"});
				$(".home_passcode").css({"opacity":0,"display":"none"});
				break;
			}
			case "home":
			{
				$(".home_unlock").stop().animate({"opacity":0},showDelay,function(){
					$(this).css({"display":"none"});
				});
				$(".home_passcode").css({"opacity":0,"display":"none"});
				break;
			}
			case "password":
			{
				$(".home_passcode").stop().animate({"opacity":0},showDelay,function(){
					$(this).css({"display":"none"});
				});
				break;
			}
		}
	}
	$(".blue_hour-photo .home").css({"opacity":1});
	$(".blue_hour-photo .application .select_version").css({"opacity":1});
	$(".blue_hour-photo .application .select_member_list").css({"opacity":1});

	minHeight_clear();
	blueHour_Step = "lock";
	$(".blue_hour-photo > .slide-wrap > .btn-down").css({"display":"none"});
}


var mH = "";
function minHeight_set(t)
{
	if (t == "")
	{
		if (mH != "")
		{
			$(".blue_hour-photo .photo_contents").css({"height":mH.find("img").outerHeight() + "px"});
		}		
	}else{
		mH = t;
		$(".blue_hour-photo .photo_contents").css({"height":t.find("img").outerHeight() + "px"});
	}	
}

function minHeight_clear()
{
	pageLog("minHeight_clear()");
	mH = "";
	$(".blue_hour-photo .photo_contents").css({"height":""});
}

var downloadFile = "";
function filDownload()
{
	pageLog("downloadFile : " + downloadFile);
	if (downloadFile != "" && downloadFile != "undefined")
	{	
		var file01 = downloadFile.split("_");
		if (file01.length > 1)
		{
			cfDownload("https://ibighit.com/txt/images/blue_hour/", file01[0]+"/"+file01[1]+".jpg");
			// document.getElementById("hiddenFrame").src="https://ibighit.com/txt/common/fileDownload_blueHour.html?p=" + file01[0] + "&f=" + file01[1] + ".jpg";
		}else{
			var verName = "";
			switch (blueHour_idx)
			{
				case 0:
				{
					verName = "r";
					break;
				}
				case 1:
				{
					verName = "ar";
					break;
				}
				case 2:
				{
					verName = "vr";
					break;
				}
			
			}
			// document.getElementById("hiddenFrame").src="https://ibighit.com/txt/common/fileDownload_blueHour.html?p=" + verName + "&f=" + file01[0] + ".jpg";
			cfDownload("https://ibighit.com/txt/images/blue_hour/", verName + "/" + file01[0]+".jpg");
		}
		downloadFile = "";
	}
}

var sliderControl;
var sliderValue = 0;
var sliderAble = false;
var sliderTimeout;
function roundSilder()
{
	pageLog("roundSilder");
	sliderControl = $("#imgSlider").slider({
		max:107,
		min:0,
		slide: function( event, ui ) {
			if (sliderInterval || sliderInterval !== false)
			{
				clearInterval(sliderInterval);
			}
			pageLog("ui.value : " + ui.value);
			if (ui.value < 99)
			{
				clearTimeout(sliderTimeout);
				sliderAble = true;
				sliderValue = ui.value;
				$("#slideImg").css({"transition":"", "transform":"translate(-"+(sliderValue/2)+"%, 0px)"});
				sliderTimeout = setTimeout(function(){
					sliderAble = false;
				},showDelay);
			}else{
				sliderControl.slider("value",98);
				$("#slideImg").css({"transition":"", "transform":"translate(-49%, 0px)"});
				return false;
			}
		}
	});
}

function roundSilder_reset(){
	pageLog("roundSilder_reset()");
	$("#slideImg").css({"transition":"", "transform":"translate(0%, 0px)"});
	sliderControl.slider("value",0);
}

var sliderInterval;
var sliderIdx = 0;
function sliderShow()
{
	pageLog("sliderShow()");
	sliderIdx++;
	var reIdx =sliderIdx;
	if (sliderIdx > 98)
	{
		if (sliderIdx < 150)
		{
			reIdx = 98;
		}else{
			reIdx = 98 - (sliderIdx - 150);
		}
		
		if (reIdx == 0)
		{
			sliderIdx = 0;
			clearInterval(sliderInterval);
		}
	}

	$("#slideImg").css({"transition":"transform linear", "transform":"translate(-"+(reIdx/2)+"%, 0px)"});
	sliderControl.slider("value",reIdx);
}


var tileLoad = false;
function tileReset()
{
	pageLog("tileReset");

	tileLoad = false;
	var tile = $(".blue_hour .album-detail .blue_hour-photo .photo_contents .contents-obj .motion_wrap > div");
	var motionWidth =  $(".blue_hour .album-detail .blue_hour-photo .photo_contents .contents-obj .motion_wrap > div").eq(0).outerWidth();
	tile.each(function(){
		var positionLeft = parseInt($(this).index() % 10) * motionWidth;
		if ($(this).index() < 200)
		{
			var positionTop = parseInt($(this).index() / 10) * 5;
			//pageLog("positionTop : " + positionTop);
			$(this).css({"top":positionTop + "%", "left":positionLeft + "px"});
		}else if ($(this).index() < 400)
		{
			var positionTop = parseInt(($(this).index()-200) / 10) * 5;
			//pageLog("positionTop : " + positionTop);
			$(this).css({"top":positionTop + "%", "left":positionLeft + "px"});
		}else if ($(this).index() < 600)
		{
			var positionTop = parseInt(($(this).index()-400) / 10) * 5;
			//pageLog("positionTop : " + positionTop);
			$(this).css({"top":positionTop + "%", "left":positionLeft + "px"});
		}
		if ($(this).index() == 199)
		{
			tileLoad = true;
		}
	});	
}

var maxDelay = 0;
var showAble = false;
var tabMotion = true;
function tileShow()
{
	pageLog("tileShow : " + showAble + ", blueHour_idx : " + blueHour_idx + ", tileLoad : "+ tileLoad);
	if (!showAble && tileLoad)
	{
		tileReset();

		maxDelay = 0;
		showAble = true;
		$(".blue_hour .album-detail .blue_hour-photo .photo_contents .home > ul").find(".contents-obj .motion_wrap").css({"display":"none"});
		$(".blue_hour .album-detail .blue_hour-photo .photo_contents .home > ul").eq(blueHour_idx).find(".contents-obj .motion_wrap").css({"display":"block"});
		$(".blue_hour .album-detail .blue_hour-photo .photo_contents .home > ul").eq(blueHour_idx).find(".contents-obj button").css({"opacity":"0"});
		var sTile = $(".blue_hour .album-detail .blue_hour-photo .photo_contents .home > ul").eq(blueHour_idx).find(".contents-obj .motion_wrap > div");
		sTile.css({"opacity":0, "transition":"none"});
		sTile.find("span").css({"opacity":1, "transition":"none"});

		setTimeout(function(){
			sTile.each(function(){
				var delayTime = Math.floor(Math.random() * 1000);
				$(this).css({"transition":"opacity 0ms " + delayTime + "ms", "opacity":1});
				$(this).find("span").css({"transition":"opacity 1000ms " + delayTime + "ms", "opacity":0});
				if (maxDelay < delayTime)
				{
					maxDelay = delayTime;
				}

				if (sTile.length - 1 == $(this).index())
				{
					setTimeout(function(){
						$(".blue_hour-photo .bottom ul li").removeClass("disabled");
						$(".blue_hour .album-detail .blue_hour-photo .photo_contents .home > ul").eq(blueHour_idx).find(".contents-obj .motion_wrap").css({"display":"none"});
						$(".blue_hour .album-detail .blue_hour-photo .photo_contents .home > ul").eq(blueHour_idx).find(".contents-obj .motion_wrap > div").css({"opacity":0, "transition":"none"});
						$(".blue_hour .album-detail .blue_hour-photo .photo_contents .home > ul").eq(blueHour_idx).find(".contents-obj .motion_wrap > div span").css({"opacity":1, "transition":"none"});
						$(".blue_hour .album-detail .blue_hour-photo .photo_contents .home > ul").eq(blueHour_idx).find(".contents-obj button").css({"opacity":1});
						

						$(".photo_contents .select_version > div").css({"display":"none"});
						switch (oldPhoto)
						{
							case "R":
							{
								$(".select_version .version_r").css({"display":"block", "opacity":1});
								$(".photo_contents .home > .version_r").css({"position":"relative", "display":"block", "z-index":"auto"});
								$(".photo_contents .home > .version_ar").css({"position":"absolute", "display":"none", "z-index":"auto"});
								$(".photo_contents .home > .version_vr").css({"position":"absolute", "display":"none", "z-index":"auto"});
								break;
							}
							case "AR":
							{
								$(".select_version .version_ar").css({"display":"block", "opacity":1});
								$(".photo_contents .home > .version_ar").css({"position":"relative", "display":"block", "z-index":"auto"});
								$(".photo_contents .home > .version_r").css({"position":"absolute", "display":"none", "z-index":"auto"});
								$(".photo_contents .home > .version_vr").css({"position":"absolute", "display":"none", "z-index":"auto"});
								break;
							}
							case "VR":
							{
								$(".select_version .version_vr").css({"display":"block", "opacity":1});
								$(".photo_contents .home > .version_vr").css({"position":"relative", "display":"block", "z-index":"auto"});
								$(".photo_contents .home > .version_ar").css({"position":"absolute", "display":"none", "z-index":"auto"});
								$(".photo_contents .home > .version_r").css({"position":"absolute", "display":"none", "z-index":"auto"});
								break;
							}
							default:
							{
								pageLog("Error");
							}
						}
						tabMotion = false;

						pageLog("tile Motion Success");

					}, (maxDelay+1000));
				}
			});
			
		},showDelay);
	}
}

var logAble = false;
function pageLog(t)
{
	if (logAble)
	{
		console.log(t);
	}
}
