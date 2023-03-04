$(window)
	.load(magicLoad)
	.resize(magicResize)
	.scroll(magicScroll);

var magicSet = false;
var magicTop = 0;
var magicHeight = $(window).outerHeight();

var arrowPosition_t = 0;
var arrowPosition_l = 0;
var photoTop = 0;
var photoHeight = 0;
var arrowHeight = 0;
var photoInner_top = 0;
var photoInner_height = 0;
function magicLoad(){
	magicSet = true;

	magicHeight = $(window).outerHeight();
	
	$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-prev").removeClass("fix").removeClass("bottom").css({"bottom":"", "left":""});
	$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-next").removeClass("fix").removeClass("bottom").css({"bottom":"", "right":""});

	arrowPosition_t = $(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-prev").offset().top;
	arrowPosition_l = $(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-prev").offset().left;
	photoTop = $(".album-detail .album-photo .slide-wrap").offset().top;
	photoHeight = $(".album-detail .album-photo .slide-wrap").outerHeight();
	arrowHeight = $(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-prev").outerHeight();
	photoInner_top = $(".album-detail .album-photo .slide-wrap > ul").offset().top;
	photoInner_height = $(".album-detail .album-photo .slide-wrap > ul > li").eq(0).find("> ul > li").eq(0).outerHeight();

	videoLoad();

	if (viewportWidth() > 768)
	{
		magicMode = "pc";
	}else{
		magicMode = "mobile";
	}
	magicVideo_Load();
}


var magicMode = "pc";
function magicResize(){
	magicHeight = $(window).outerHeight();
	
	$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-prev").removeClass("fix").removeClass("btm").css({"bottom":"", "left":""});
	$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-next").removeClass("fix").removeClass("btm").css({"bottom":"", "right":""});

	arrowPosition_t = $(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-prev").offset().top;
	arrowPosition_l = $(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-prev").offset().left;
	photoTop = $(".album-detail .album-photo .slide-wrap").offset().top;
	photoHeight = $(".album-detail .album-photo .slide-wrap").outerHeight();
	arrowHeight = $(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-prev").outerHeight();
	photoInner_top = $(".album-detail .album-photo .slide-wrap > ul").offset().top;
	photoInner_height = $(".album-detail .album-photo .slide-wrap > ul > li").eq(tabIndex).find("> ul > li").eq(slideIdx).outerHeight();

	if (viewportWidth() < 769)
	{
		$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"","top":"","height":""});
	}else{
		$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo").css({"margin-top":""});
	}

	var mReset = false;
	if (viewportWidth() > 768 && magicMode == "mobile")
	{
		mReset = true;
		magicMode = "pc";
	}else if (viewportWidth() < 769 && magicMode == "pc"){
		mReset = true;
		magicMode = "mobile";
	}

	if (mReset)
	{
		photoVideo01_able = false;
		photoVideo02_able = false;
	}
}

function magicScroll()
{
	magicTop = $(window).scrollTop();
	if (magicSet)
	{
		magicHeight = $(window).outerHeight();
		photoHeight = $(".album-detail .album-photo .slide-wrap").outerHeight();
		photoInner_height = $(".album-detail .album-photo .slide-wrap > ul > li").eq(tabIndex).find("> ul > li").eq(slideIdx).outerHeight();

		var fixedStart = photoInner_top - magicHeight;
		var fixedEnd = photoInner_top + photoHeight;
		
		var arrow_reHeight = magicTop - photoInner_top + magicHeight;
		var arrow_top = 0;
		
		if (magicHeight > photoInner_height)
		{
			if (arrow_reHeight > photoInner_height)
			{
				arrow_top = (arrow_reHeight - magicHeight);
				if (arrow_top < 0)
				{
					arrow_top = 0;
				}
				arrow_reHeight = photoInner_height;
				if ((arrow_top + arrow_reHeight) > photoInner_height)
				{
					arrow_reHeight = (photoInner_top + photoHeight) - magicTop;
				}
			}
		}else{
			if (arrow_reHeight > magicHeight)
			{
				arrow_top = (arrow_reHeight - magicHeight);
				arrow_reHeight = magicHeight;
				if ((arrow_top + arrow_reHeight) > photoInner_height)
				{
					arrow_reHeight = (photoInner_top + photoHeight) - magicTop;
				}
			}else{
				arrow_top = 0;
			}
		}
		
		var minHeight = photoInner_top + photoHeight - ($("header").outerHeight() * 2 + 90 );
		if (minHeight > magicTop)
		{
			if (viewportWidth() > 768)
			{
				if (magicTop > fixedStart && magicTop < fixedEnd)
				{
					$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"0px","top":arrow_top + "px","height":arrow_reHeight + "px"});
				}else{
					if (magicTop < fixedStart)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"","top":"","height":""});
					}
				}
			}else{
				$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"","top":"","height":""});
			}
		}

		
		if (viewportWidth() > 768)
		{
			if (slideIdx == 0)
			{
				var postionStart = $(".album-detail .album-photo .slide-wrap > ul").offset().top - magicHeight;
				var postionTop = $(".album-detail .album-photo .slide-wrap > ul").offset().top - magicHeight + ($(".album-detail .album-photo .slide-wrap > ul").outerHeight() / 3);
				var postionEnd = $(".album-detail .album-photo .slide-wrap > ul").offset().top + $(".album-detail .album-photo .slide-wrap > ul").outerHeight();
				
				if (postionStart < magicTop && postionEnd > magicTop)
				{
					if (postionTop < magicTop && (!photoVideo01_able || !photoVideo02_able))
					{
						photoVideo01_able = true;
						photoVideo02_able = true;
						if(check_androidDevice() == '')
						{
							$(".album-detail .album-photo .slide-wrap > ul > li").eq(tabIndex).find("> ul > li").eq(0).find("video").each(function(){
								if ($(this).parent().find(".v_cover").css("display") == "block")
								{
									$(this).parent().find(".v_cover").animate({"opacity":0},300,function(){
										$(this).css({"display":"none"});
									});
								}
								if(this.paused){
									this.currentTime = 0;
									this.play();
								}		
							});
						}else{
							if (tabIndex == 0)
							{
								window.addEventListener('touchstart', function videoStart() {
									if(photoVideo01.paused)
									{
										if($(".album-detail .album-photo .slide-wrap > ul > li").eq(0).find("> ul > li").eq(0).css("display") == "block")
										{
											$(".album-detail .album-photo .slide-wrap > ul > li").eq(0).find("> ul > li").eq(0).animate({"opacity":0},300,function(){
												$(this).css({"display":"none"});
											});
										}

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
										if($(".album-detail .album-photo .slide-wrap > ul > li").eq(1).find("> ul > li").eq(0).find(".v_cover").css("display") == "block")
										{
											$(".album-detail .album-photo .slide-wrap > ul > li").eq(1).find("> ul > li").eq(0).find(".v_cover").animate({"opacity":0},300,function(){
												$(this).css({"display":"none"});
											});
										}


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
						if (postionStart > scrollTop || magicTop == 0)
						{
							photoVideo01.pause();
							photoVideo01.currentTime = 0;						
						}
					}else if (tabIndex == 1)
					{
						photoVideo02_able = false;
						if (postionStart > scrollTop || magicTop == 0)
						{
							photoVideo02.pause();
							photoVideo02.currentTime = 0;						
						}
					}
				}
			}
		}else{
			var postionChange = $(".album-detail .album-photo .slide-wrap > ul > li").eq(1).offset().top - magicHeight + ($(".album-detail .album-photo .slide-wrap > ul > li").eq(1).outerHeight() / 3);
			if (postionChange > magicTop)
			{
				if (parseInt($(".album-detail .album-photo .slide-wrap > ul > li").eq(0).find("> ul > li").eq(0).css("margin-left")) == 0)
				{
					var postionStart01 = $(".album-detail .album-photo .slide-wrap > ul > li").eq(0).offset().top - magicHeight;
					var postionTop01 = $(".album-detail .album-photo .slide-wrap > ul > li").eq(0).offset().top - magicHeight + ($(".album-detail .album-photo .slide-wrap > ul > li").eq(0).outerHeight() / 3);
					var postionEnd01 = $(".album-detail .album-photo .slide-wrap > ul > li").eq(0).offset().top + $(".album-detail .album-photo .slide-wrap > ul > li").eq(0).outerHeight();
					if (postionStart01 < magicTop && postionEnd01 > magicTop)
					{
						if (postionTop01 < magicTop && !photoVideo01_able)
						{
							photoVideo02_able = false;
							photoVideo02.pause();
							photoVideo02.currentTime = 0;

							photoVideo01_able = true;
							if(check_androidDevice() == '')
							{
								$(".album-detail .album-photo .slide-wrap > ul > li").eq(0).find("> ul > li").eq(0).find("video").each(function(){
									if ($(this).parent().find(".v_cover").css("display") == "block")
									{
										$(this).parent().find(".v_cover").animate({"opacity":0},300,function(){
											$(this).css({"display":"none"});
										});
									}
									if(this.paused){
										this.currentTime = 0;
										this.play();
									}
								});
							}else{
								window.addEventListener('touchstart', function videoStart() {
									if(photoVideo01.paused)
									{
										if($(".album-detail .album-photo .slide-wrap > ul > li").eq(0).find("> ul > li").eq(0).find(".v_cover").css("display") == "block")
										{
											$(".album-detail .album-photo .slide-wrap > ul > li").eq(0).find("> ul > li").eq(0).find(".v_cover").animate({"opacity":0},300,function(){
												$(this).css({"display":"none"});
											});
										}

										if(parseInt(photoVideo01.currentTime) != 0)
											photoVideo01.currentTime = 0;

										photoVideo01.play();
									}
								  
								  this.removeEventListener('touchstart', videoStart);
								});
							}
						}
					}else{
						photoVideo01_able = false;
						if (postionStart01 > scrollTop || magicTop == 0)
						{
							photoVideo01.pause();
							photoVideo01.currentTime = 0;
						}
					}
				}
			}else{
				if (parseInt($(".album-detail .album-photo .slide-wrap > ul > li").eq(1).find("> ul > li").eq(0).css("margin-left")) == 0)
				{
					var postionStart02 = $(".album-detail .album-photo .slide-wrap > ul > li").eq(1).offset().top - magicHeight;
					var postionTop02 = $(".album-detail .album-photo .slide-wrap > ul > li").eq(1).offset().top - magicHeight + ($(".album-detail .album-photo .slide-wrap > ul > li").eq(1).outerHeight() / 3);
					var postionEnd02 = $(".album-detail .album-photo .slide-wrap > ul > li").eq(1).offset().top + $(".album-detail .album-photo .slide-wrap > ul > li").eq(1).outerHeight();

					if (postionStart02 < magicTop && postionEnd02 > magicTop)
					{
						if (postionTop02 < magicTop && !photoVideo02_able)
						{
							photoVideo01_able = false;
							photoVideo01.pause();
							photoVideo01.currentTime = 0;

							photoVideo02_able = true;
							if(check_androidDevice() == '')
							{
								$(".album-detail .album-photo .slide-wrap > ul > li").eq(1).find("> ul > li").eq(0).find("video").each(function(){
									if ($(this).parent().find(".v_cover").css("display") == "block")
									{
										$(this).parent().find(".v_cover").animate({"opacity":0},300,function(){
											$(this).css({"display":"none"});
										});
									}

									if(this.paused){
										this.currentTime = 0;
										this.play();
									}
								});
							}else{
								window.addEventListener('touchstart', function videoStart() {
									if(photoVideo02.paused)
									{
										if($(".album-detail .album-photo .slide-wrap > ul > li").eq(1).find("> ul > li").eq(0).find(".v_cover").css("display") == "block")
										{
											$(".album-detail .album-photo .slide-wrap > ul > li").eq(1).find("> ul > li").eq(0).find(".v_cover").animate({"opacity":0},300,function(){
												$(this).css({"display":"none"});
											});
										}

										if(parseInt(photoVideo02.currentTime) != 0)
											photoVideo02.currentTime = 0;

										photoVideo02.play();
									}
								  
								  this.removeEventListener('touchstart', videoStart);
								});
							}
						}
					}else{
						photoVideo02_able = false;
						if (postionStart02 > scrollTop || magicTop == 0)
						{
							photoVideo02.pause();
							photoVideo02.currentTime = 0;						
						}
					}
				}
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
			
			$(".album-detail .album-photo .slide-wrap > ul > li").eq(0).find("> ul > li").eq(0).find("video").each(function(){
				if ($(this).parent().find(".v_cover").css("display") == "block")
				{
					$(this).parent().find(".v_cover").animate({"opacity":0},300,function(){
						$(this).css({"display":"none"});
					});
				}
				if(this.paused){
					this.currentTime = 0;
					this.play();
				}		
			});
		}else{
			if (photoVideo01)
			{
				photoVideo01.pause();
				photoVideo01.currentTime = 0;
			}
			
			$(".album-detail .album-photo .slide-wrap > ul > li").eq(1).find("> ul > li").eq(0).find("video").each(function(){
				if ($(this).parent().find(".v_cover").css("display") == "block")
				{
					$(this).parent().find(".v_cover").animate({"opacity":0},300,function(){
						$(this).css({"display":"none"});
					});
				}
				if(this.paused){
					this.currentTime = 0;
					this.play();
				}		
			});
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


function magicScroll_reset()
{
	if (viewportWidth() > 768)
	{
		$(".the_dream_chapter-magic .album-detail .bottom ul li").each(function(){
			if ($(this).hasClass("active"))
			{
				tabIndex = $(this).index();
			}
		});
	}
	

	magicHeight = $(window).outerHeight();
	photoHeight = $(".album-detail .album-photo .slide-wrap").outerHeight();
	photoInner_height = $(".album-detail .album-photo .slide-wrap > ul > li").eq(tabIndex).find("> ul > li").eq(slideIdx).outerHeight();

	var fixedStart = photoInner_top - magicHeight;
	var fixedEnd = photoInner_top + photoHeight;
	
	var arrow_reHeight = magicTop - photoInner_top + magicHeight;
	var arrow_top = 0;

	if (magicHeight > photoInner_height)
	{
		if (arrow_reHeight > photoInner_height)
		{
			arrow_top = (arrow_reHeight - magicHeight);
			if (arrow_top < 0)
			{
				arrow_top = 0;
			}
			arrow_reHeight = photoInner_height;
			if ((arrow_top + arrow_reHeight) > photoInner_height)
			{
				arrow_reHeight = (photoInner_top + photoHeight) - magicTop;
			}
		}
	}else{
		if (arrow_reHeight > magicHeight)
		{
			arrow_top = (arrow_reHeight - magicHeight);
			arrow_reHeight = magicHeight;
			if ((arrow_top + arrow_reHeight) > photoInner_height)
			{
				arrow_reHeight = (photoInner_top + photoHeight) - magicTop;
			}
		}else{
			arrow_top = 0;
		}
	}
	
	var minHeight = photoInner_top + photoHeight - ($("header").outerHeight() * 2 + 90 );
	if (minHeight > magicTop)
	{
		if (viewportWidth() > 768)
		{
			if (magicTop > fixedStart && magicTop < fixedEnd)
			{
				$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"0px","top":arrow_top + "px","height":arrow_reHeight + "px"});
			}else{
				if (magicTop < fixedStart)
				{
					$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"","top":"","height":""});
				}
			}
		}else{
			$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .slide-obj button").css({"margin-top":"","top":"","height":""});
		}
	}
	
}
var tabIndex = 0;
var slideIdx = 0;
var cIdx = 0;
var magicIng = false;
$(function(){
	$(".click-area").click(function(){
		if ($(this).parent().index() != 0 && viewportWidth() > 768)
		{
			var clickId = $(this).attr("id");
			$(".the_dream_chapter-magic .album-detail .bottom ul li").each(function(){
				if ($(this).hasClass("active"))
				{
					tabIndex = $(this).index();
				}
			});
			slideIdx = $(this).parent().index();
			
			cIdx = 0;
		
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").removeClass("active");
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).addClass("active");
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li ul").removeClass("active");
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).addClass("active");
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li ul > li").css({"margin-left":"100%"});
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({"margin-left":"0"});
			
			$(".the_dream_chapter-magic .popup-bg").css({"display":"block", "opacity":0}).animate({"opacity":1},500);
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo").css({"display":"block", "opacity":0}).animate({"opacity":1},500);
			
			var goTop = $(".the_dream_chapter-magic .album-detail .album-photo .popup-photo").offset().top - $("header").outerHeight();
			var speed = Math.abs(goTop - magicTop);
			$("html, body").stop().animate({"scrollTop":goTop + "px"}, 100, 'swing');

			playVideo();
			popupLanguage();
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").focus();
		}
		return false;
	});
	$(".click-area > div").click(function(){
		if (viewportWidth() > 768)
		{
			var clickId = $(this).attr("id");
			$(".the_dream_chapter-magic .album-detail .bottom ul li").each(function(){
				if ($(this).hasClass("active"))
				{
					tabIndex = $(this).index();
				}
			});
			slideIdx = $(this).parent().parent().index();
			
			cIdx = $(this).attr("data-idx") - 1;
			
		
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").removeClass("active");
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).addClass("active");
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li ul").removeClass("active");
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).addClass("active");
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li ul > li").css({"margin-left":"100%"});
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({"margin-left":"0"});

			$(".the_dream_chapter-magic .popup-bg").css({"display":"block", "opacity":0}).animate({"opacity":1},500);
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo").css({"display":"block", "opacity":0}).animate({"opacity":1},500);

			setTimeout(function(){
				playVideo();
			},500);

			var goTop = $(".the_dream_chapter-magic .album-detail .album-photo .popup-photo").offset().top - $("header").outerHeight();
			var speed = Math.abs(goTop - magicTop);
			$("html, body").stop().animate({"scrollTop":goTop + "px"}, 100, 'swing');
			
			popupLanguage();
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").focus();
		}
		return false;
	});

	$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap > ul > li .mix li .contents-obj .contents-inner").click(function(){
		if (viewportWidth() < 769)
		{
			tabIndex = $(this).parent().parent().parent().parent().index();
			slideIdx = $(this).parent().parent().index();
			
			cIdx = 0;
		
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").removeClass("active");
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).addClass("active");
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li ul").removeClass("active");
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).addClass("active");
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li ul > li").css({"margin-left":"100%"});
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({"margin-left":"0"});
			
			if (tabIndex == 1)
			{
				var mTop = $(".album-detail .album-photo .slide-wrap.center > ul > li").outerHeight();
				$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo").css({"margin-top":mTop + "px"});
			}else{
				$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo").css({"margin-top":""});
			}

			$(".the_dream_chapter-magic .popup-bg").css({"display":"block", "opacity":0}).animate({"opacity":1},500);
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo").css({"display":"block", "opacity":0}).animate({"opacity":1},500);

			playVideo();
			popupLanguage();
		}
		return false;
	});

	$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-close").click(function(){
		$(".the_dream_chapter-magic .popup-bg").animate({"opacity":0},500,function(){
			$(this).css({"display":"none"});
		});
		$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo").animate({"opacity":0},500,function(){
			$(this).css({"display":"none"});
			sqStart();
		});
		return false;
	});

	$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").click(function(){
		var path01 = "";
		var path02 = "";
		var dataFile = "";
		if (tabIndex == 0)
		{
			path01 = "Sanctuary";
		}else if (tabIndex == 1)
		{
			path01 = "Arcadia";
		}
		if (tabIndex == 1)
		{
			var dataFile = $(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).find(".contents-obj").attr("data-src");
			if (dataFile != "")
			{
				if (slideIdx != 0 && cIdx == 0)
				{
					dataFile = dataFile + ".gif";
				}else if ((slideIdx == 0 && cIdx == 0) || (slideIdx != 0 && cIdx == 1))
				{
					dataFile = dataFile + ".mp4";
				}else 
				{
					dataFile = dataFile + ".jpg";
				}
				
				if (check_ios() != "")
				{
					window.open("https://ibighit.com/txt/images/the_dream_chapter-magic/" + dataFile);
				}else{
					cfDownload("https://ibighit.com/txt/images/the_dream_chapter-magic/", dataFile);
					// document.getElementById("hiddenFrame").src="./../../../../common/fileDownload_CDN.html?f=" + dataFile;
				}
			}
		}else if (tabIndex == 0)
		{
			switch (slideIdx)
			{
				case 0:
				{
					path02 = "Group";
					break;
				}case 1:
				{
					path02 = "Soobin";
					break;
				}case 2:
				{
					path02 = "Hueningkai";
					break;
				}case 3:
				{
					path02 = "Beomgyu";
					break;
				}case 4:
				{
					path02 = "Yeonjun";
					break;
				}case 5:
				{
					path02 = "Taehyun";
					break;
				}
			}
			var downloadCid = cIdx - 1;
			if (slideIdx == 0)
			{
				downloadCid = cIdx;
			}
			if (path01 != "" && path02 != "")
			{
				if (slideIdx != 0 && cIdx == 0)
				{
					dataFile = "TXT_" + path01 + "_" + path02 + ".gif";
				}else if ((slideIdx == 0 && cIdx == 0) || (slideIdx != 0 && cIdx == 1))
				{
					dataFile = "TXT_" + path01 + "_" + path02 + "_video.mp4";
				}else if (downloadCid >= 10)
				{
					dataFile = "TXT_" + path01 + "_" + path02 + "_" + downloadCid + ".jpg";
				}else{
					dataFile = "TXT_" + path01 + "_" + path02 + "_0" + downloadCid + ".jpg";
				}			
			}
			if (check_ios() != "")
			{
				window.open("https://ibighit.com/txt/images/the_dream_chapter-magic/" + path01 + "/" + dataFile,path01 + "_" + path02);
			}else{
				cfDownload("https://ibighit.com/txt/images/the_dream_chapter-magic/", path01 + "/" + dataFile);
				// document.getElementById("hiddenFrame").src="./../../../../common/fileDownload.html?f=" + dataFile;
			}
		}
		
		return false;
	});

	$(".the_dream_chapter-magic .popup-bg").click(function(){
		$(".the_dream_chapter-magic .popup-bg").animate({"opacity":0},500,function(){
			$(this).css({"display":"none"});
		});
		$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo").animate({"opacity":0},500,function(){
			$(this).css({"display":"none"});
		});
		return false;
	});

	$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-prev").click(function(){
		if (viewportWidth() < 769)
		{
			tabIndex = $(this).parent().parent().index();
		}
		slideIdx = albumPhoto_idx[albumPhoto];
		
		magicScroll_reset();

		sqStop();
		sqStart();
		
	});
	$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-next").click(function(){
		if (viewportWidth() < 769)
		{
			tabIndex = $(this).parent().parent().index();
		}
		slideIdx = albumPhoto_idx[albumPhoto];
		
		magicScroll_reset();
		
		sqStop();
		sqStart();
	});
	$(".album-detail .bottom ul li button").click(function(){
		magicScroll_reset();
		slideIdx = 0;
		
	});
	
	$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .pop-btn-prev").click(function(){
		if (!magicIng)
		{
			magicIng = true;
			tabIndex = $(this).parent().parent().index();

			var cMax = $(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").length;
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).animate({"margin-left":"100%"}, 500);
			cIdx--;
			if (cIdx < 0)
			{
				cIdx = cMax-1;
			}
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({"margin-left":"-100%"}).animate({"margin-left":"0%"}, 500);
			setTimeout(function(){
				magicIng = false;
				playVideo();
			},500);
			popupLanguage();
		}
		
		return false;
	});

	$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .pop-btn-next").click(function(){
		if (!magicIng)
		{
			magicIng = true;
			tabIndex = $(this).parent().parent().index();
			
			var cMax = $(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").length;
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).animate({"margin-left":"-100%"}, 500);
			cIdx++;
			
			if (cIdx == cMax)
			{
				cIdx = 0;
			}
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({"margin-left":"100%"}).animate({"margin-left":"0%"}, 500);

			setTimeout(function(){
				magicIng = false;
				playVideo();
			},500);
			popupLanguage();
		}
		return false;
	});
});

function playVideo()
{
	$(".the_dream_chapter-magic .album-detail .album-photo video").each(function(){
		this.pause();
		this.currentTime = 0;
	});

	if (cIdx == 0 || cIdx == 1)
	{
		$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).find("video").each(function(){
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
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER의 영상");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER의 영상");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER의 사진");
					}
					break;
				}
				case 1:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 수빈의 영상");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 수빈의 영상");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 수빈의 사진");
					}
					break;
				}
				case 2:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 휴닝카이의 영상");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 휴닝카이의 영상");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER의 멤버 휴닝카이의 사진");
					}
					break;
				}
				case 3:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 범규의 영상");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 범규의 영상");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 범규의 사진");
					}
					break;
				}
				case 4:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 연준의 영상");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 연준의 영상");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 연준의 사진");
					}
					break;
				}
				case 5:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 태현의 영상");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 태현의 영상");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","다운로드 : SANCTUARY TOMORROW X TOGETHER 멤버 태현의 사진");
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
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Video of SANCTUARY TOMORROW X TOGETHER");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Video of SANCTUARY TOMORROW X TOGETHER");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of SANCTUARY TOMORROW X TOGETHER");
					}
					break;
				}
				case 1:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Video of SANCTUARY TOMORROW X TOGETHER member SOOBIN");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Video of SANCTUARY TOMORROW X TOGETHER member SOOBIN");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of SANCTUARY TOMORROW X TOGETHER member SOOBIN");
					}
					break;
				}
				case 2:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Video of SANCTUARY TOMORROW X TOGETHER member HUENINGKAI");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Video of SANCTUARY TOMORROW X TOGETHER member HUENINGKAI");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of SANCTUARY TOMORROW X TOGETHER member HUENINGKAI");
					}
					break;
				}
				case 3:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Video of SANCTUARY TOMORROW X TOGETHER member BEOMGYU");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Video of SANCTUARY TOMORROW X TOGETHER member BEOMGYU");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of SANCTUARY TOMORROW X TOGETHER member BEOMGYU");
					}
					break;
				}
				case 4:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Video of SANCTUARY TOMORROW X TOGETHER member YEONJUN");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Video of SANCTUARY TOMORROW X TOGETHER member YEONJUN");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of SANCTUARY TOMORROW X TOGETHER member YEONJUN");
					}
					break;
				}
				case 5:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Video of SANCTUARY TOMORROW X TOGETHER member TAEHYUN");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Video of SANCTUARY TOMORROW X TOGETHER member TAEHYUN");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","Download : Photo of SANCTUARY TOMORROW X TOGETHER member TAEHYUN");
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
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHER映像");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHER映像");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERの写真");
					}
					break;
				}
				case 1:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、SOOBIN映像");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、SOOBIN映像");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、SOOBINの写真");
					}
					break;
				}
				case 2:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、HUENINGKAI映像");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、HUENINGKAI映像");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、HUENINGKAIの写真");
					}
					break;
				}
				case 3:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、BEOMGYU映像");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、BEOMGYU映像");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、BEOMGYUの写真");
					}
					break;
				}
				case 4:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、YEONJUN映像");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、YEONJUN映像");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、YEONJUNの写真");
					}
					break;
				}
				case 5:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、TAEHYUN映像");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、TAEHYUN映像");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","ダウンロード: SANCTUARY TOMORROW X TOGETHERのメンバー、TAEHYUNの写真");
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
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER映像");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER映像");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER的照片");
					}
					break;
				}
				case 1:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员SOOBIN映像");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员SOOBIN映像");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员SOOBIN的照片");
					}
					break;
				}
				case 2:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员HUENINGKAI映像");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员HUENINGKAI映像");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员HUENINGKAI的照片");
					}
					break;
				}
				case 3:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员BEOMGYU映像");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员BEOMGYU映像");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员BEOMGYU的照片");
					}
					break;
				}
				case 4:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员YEONJUN映像");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员YEONJUN映像");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员YEONJUN的照片");
					}
					break;
				}
				case 5:
				{
					if (cIdx == 0)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员TAEHYUN映像");
					}else if (cIdx == 1)
					{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员TAEHYUN映像");
					}else{
						$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").attr("title","下载: SANCTUARY TOMORROW X TOGETHER成员TAEHYUN的照片");
					}
					break;
				}					
			}
		}
	}
}


$(function(){
	$(window).keydown(function(e){
		console.log(document.activeElement);
	});
	
/*	$(document).on("keydown","", function(e) {
        if(e.keyCode === 13) { // enter
			e.preventDefault();
        };

        if((e.keyCode === 9 && !e.shiftKey)){ // tab
			e.preventDefault();
        };

        if((e.keyCode === 9 && e.shiftKey)){ // shift+tab
			e.preventDefault();
        };
    });*/

	$(document).on("keydown",".the_dream_chapter-magic .album-detail .album-photo .popup-photo .pop-btn-next", function(e) {
        if(e.keyCode === 13) { // enter
			//e.preventDefault();
        };

        if((e.keyCode === 9 && !e.shiftKey)){ // tab
			e.preventDefault();
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down").focus();
        };

        if((e.keyCode === 9 && e.shiftKey)){ // shift+tab
			//e.preventDefault();
        };
    });

	$(document).on("keydown",".the_dream_chapter-magic .album-detail .album-photo .popup-photo .btn-down", function(e) {
        if(e.keyCode === 13) { // enter
			//e.preventDefault();
        };

        if((e.keyCode === 9 && !e.shiftKey)){ // tab
			//e.preventDefault();
			
        };

        if((e.keyCode === 9 && e.shiftKey)){ // shift+tab
			e.preventDefault();
			$(".the_dream_chapter-magic .album-detail .album-photo .popup-photo .pop-btn-next").focus();
        };
    });

	$(document).on("keydown",".album-photo", function(e) {
        if(e.keyCode === 13) { // enter
			//e.preventDefault();
        };

        if((e.keyCode === 9 && !e.shiftKey)){ // tab
			if ($(this).is(":focus"))
			{
				e.preventDefault();
				$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-prev").focus();
			}			
        };

        if((e.keyCode === 9 && e.shiftKey)){ // shift+tab
			//e.preventDefault();			
        };
    });

	$(document).on("keydown",".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-prev", function(e) {
        if(e.keyCode === 13) { // enter
			//e.preventDefault();
        };

        if((e.keyCode === 9 && !e.shiftKey)){ // tab
			e.preventDefault();
			$(".album-detail .album-photo .slide-wrap > ul > li").eq(tabIndex).find("> ul > li").eq(slideIdx).focus();
        };

        if((e.keyCode === 9 && e.shiftKey)){ // shift+tab
			e.preventDefault();
			$(".album-photo").focus();
        };
    });

	$(document).on("keydown",".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-next", function(e) {
        if(e.keyCode === 13) { // enter
			//e.preventDefault();
        };

        if((e.keyCode === 9 && !e.shiftKey)){ // tab
			//e.preventDefault();
			
        };

        if((e.keyCode === 9 && e.shiftKey)){ // shift+tab
			e.preventDefault();
			$(".album-detail .album-photo .slide-wrap > ul > li").eq(tabIndex).find("> ul > li").eq(slideIdx).focus();
        };
    });

	$(document).on("keydown",".album-detail .album-photo .slide-wrap > ul > li > ul > li", function(e) {
        if(e.keyCode === 13) { // enter
			e.preventDefault();
			if (viewportWidth() > 768)
			{
				$(".click-area").click();
			}else{
				$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap > ul > li .mix li .contents-obj .contents-inner").click();
			}
        };

        if((e.keyCode === 9 && !e.shiftKey)){ // tab
			e.preventDefault();
			$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-next").focus();
        };

        if((e.keyCode === 9 && e.shiftKey)){ // shift+tab
			e.preventDefault();
			$(".the_dream_chapter-magic .album-detail .album-photo .slide-wrap .btn-prev").focus();
        };
    });
});

var magic_island_video01;
var magic_island_video02;
var magic_island_video03;
var magic_island_video04;
var magic_island_video05;
function magicVideo_Load()
{
	magic_island_video01 = document.getElementById("magic_island_video01");
	magic_island_video02 = document.getElementById("magic_island_video02");
	magic_island_video03 = document.getElementById("magic_island_video03");
	magic_island_video04 = document.getElementById("magic_island_video04");
	magic_island_video05 = document.getElementById("magic_island_video05");
	if (magic_island_video01 !== false && magic_island_video01)
	{
		magic_island_video01.onended = function(){
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}

	if (magic_island_video02 !== false && magic_island_video02)
	{
		magic_island_video02.onended = function(){
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}

	if (magic_island_video03 !== false && magic_island_video03)
	{
		magic_island_video03.onended = function(){
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}

	if (magic_island_video04 !== false && magic_island_video04)
	{
		magic_island_video04.onended = function(){
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}

	if (magic_island_video05 !== false && magic_island_video05)
	{
		magic_island_video05.onended = function(){
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}
}