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
function magicLoad() {
	magicSet = true;

	magicHeight = $(window).outerHeight();

	$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap").removeClass("fix").removeClass("bottom").css({ "bottom": "", "left": "" });
	$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap").removeClass("fix").removeClass("bottom").css({ "bottom": "", "right": "" });

	arrowPosition_t = $(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap").offset().top;
	arrowPosition_l = $(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap").offset().left;
	photoTop = $(".album-detail .album-photo .slide-wrap").offset().top;
	photoHeight = $(".album-detail .album-photo .slide-wrap").outerHeight();
	arrowHeight = $(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap ").outerHeight();
	photoInner_top = $(".album-detail .album-photo .slide-wrap .click_hh").offset().top;
	photoInner_height = $(".album-detail .album-photo .slide-wrap .click_hh > li").eq(0).find("> ul > li").eq(0).outerHeight();

	videoLoad();

	if (viewportWidth() > 768) {
		1
		magicMode = "pc";
	} else {
		magicMode = "mobile";
	}
	magicVideo_Load();
}


var magicMode = "pc";
function magicResize() {
	magicHeight = $(window).outerHeight();

	$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .btn-prev").removeClass("fix").removeClass("btm").css({ "bottom": "", "left": "" });
	$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .btn-next").removeClass("fix").removeClass("btm").css({ "bottom": "", "right": "" });

	arrowPosition_t = $(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap ").offset().top;
	arrowPosition_l = $(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap ").offset().left;
	photoTop = $(".album-detail .album-photo .slide-wrap").offset().top;
	photoHeight = $(".album-detail .album-photo .slide-wrap").outerHeight();
	arrowHeight = $(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .btn-prev").outerHeight();
	photoInner_top = $(".album-detail .album-photo .slide-wrap .click_hh").offset().top;
	photoInner_height = $(".album-detail .album-photo .slide-wrap .click_hh > li").eq(tabIndex).find("> ul > li").eq(slideIdx).outerHeight();

	if (viewportWidth() < 769) {
		$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .slide-obj button").css({ "margin-top": "", "top": "", "height": "" });
	} else {
		$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo").css({ "margin-top": "" });
	}

	var mReset = false;
	if (viewportWidth() > 768 && magicMode == "mobile") {
		mReset = true;
		magicMode = "pc";
	} else if (viewportWidth() < 769 && magicMode == "pc") {
		mReset = true;
		magicMode = "mobile";
	}

	if (mReset) {
		photoVideo01_able = false;
		photoVideo02_able = false;
	}
}

function magicScroll() {
	magicTop = $(window).scrollTop();
	if (magicSet) {
		magicHeight = $(window).outerHeight();
		photoHeight = $(".album-detail .album-photo .slide-wrap").outerHeight();
		photoInner_height = $(".album-detail .album-photo .slide-wrap .click_hh > li").eq(tabIndex).find("> ul > li").eq(slideIdx).outerHeight();

		var fixedStart = photoInner_top - magicHeight;
		var fixedEnd = photoInner_top + photoHeight;

		var arrow_reHeight = magicTop - photoInner_top + magicHeight;
		var arrow_top = 0;

		if (magicHeight > photoInner_height) {
			if (arrow_reHeight > photoInner_height) {
				arrow_top = (arrow_reHeight - magicHeight);
				if (arrow_top < 0) {
					arrow_top = 0;
				}
				arrow_reHeight = photoInner_height;
				if ((arrow_top + arrow_reHeight) > photoInner_height) {
					arrow_reHeight = (photoInner_top + photoHeight) - magicTop;
				}
			}
		} else {
			if (arrow_reHeight > magicHeight) {
				arrow_top = (arrow_reHeight - magicHeight);
				arrow_reHeight = magicHeight;
				if ((arrow_top + arrow_reHeight) > photoInner_height) {
					arrow_reHeight = (photoInner_top + photoHeight) - magicTop;
				}
			} else {
				arrow_top = 0;
			}
		}

		var minHeight = photoInner_top + photoHeight - ($("header").outerHeight() * 2 + 90);
		if (minHeight > magicTop) {
			if (viewportWidth() > 768) {
				if (magicTop > fixedStart && magicTop < fixedEnd) {
					$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .slide-obj button").css({ "margin-top": "0px", "top": arrow_top + "px", "height": arrow_reHeight + "px" });
				} else {
					if (magicTop < fixedStart) {
						$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .slide-obj button").css({ "margin-top": "", "top": "", "height": "" });
					}
				}
			} else {
				$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .slide-obj button").css({ "margin-top": "", "top": "", "height": "" });
			}
		}


		if (viewportWidth() > 768) {
			if (slideIdx == 0) {
				var postionStart = $(".album-detail .album-photo .slide-wrap .click_hh").offset().top - magicHeight;
				var postionTop = $(".album-detail .album-photo .slide-wrap .click_hh").offset().top - magicHeight + ($(".album-detail .album-photo .slide-wrap .click_hh").outerHeight() / 3);
				var postionEnd = $(".album-detail .album-photo .slide-wrap .click_hh").offset().top + $(".album-detail .album-photo .slide-wrap .click_hh").outerHeight();

				if (postionStart < magicTop && postionEnd > magicTop) {
					if (postionTop < magicTop && (!photoVideo01_able || !photoVideo02_able)) {
						photoVideo01_able = true;
						photoVideo02_able = true;
						if (check_androidDevice() == '') {
							$(".album-detail .album-photo .slide-wrap .click_hh > li").eq(tabIndex).find("> ul > li").eq(0).find("video").each(function () {
								if ($(this).parent().find(".v_cover").css("display") == "block") {
									$(this).parent().find(".v_cover").animate({ "opacity": 0 }, 300, function () {
										$(this).css({ "display": "none" });
									});
								}
								if (this.paused) {
									this.currentTime = 0;
									this.play();
								}
							});
						} else {
							if (tabIndex == 0) {
								window.addEventListener('touchstart', function videoStart() {
									if (photoVideo01.paused) {
										if ($(".album-detail .album-photo .slide-wrap .click_hh > li").eq(0).find("> ul > li").eq(0).css("display") == "block") {
											$(".album-detail .album-photo .slide-wrap .click_hh > li").eq(0).find("> ul > li").eq(0).animate({ "opacity": 0 }, 300, function () {
												$(this).css({ "display": "none" });
											});
										}

										if (parseInt(photoVideo01.currentTime) != 0)
											photoVideo01.currentTime = 0;

										photoVideo01.play();
									}

									this.removeEventListener('touchstart', videoStart);
								});
							} else if (tabIndex == 1) {
								window.addEventListener('touchstart', function videoStart() {
									if (photoVideo02.paused) {
										if ($(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).find("> ul > li").eq(0).find(".v_cover").css("display") == "block") {
											$(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).find("> ul > li").eq(0).find(".v_cover").animate({ "opacity": 0 }, 300, function () {
												$(this).css({ "display": "none" });
											});
										}


										if (parseInt(photoVideo02.currentTime) != 0)
											photoVideo02.currentTime = 0;

										photoVideo02.play();
									}

									this.removeEventListener('touchstart', videoStart);
								});
							}
						}
					}
				} else {
					if (tabIndex == 0) {
						photoVideo01_able = false;
						if (postionStart > scrollTop || magicTop == 0) {
							photoVideo01.pause();
							photoVideo01.currentTime = 0;
						}
					} else if (tabIndex == 1) {
						photoVideo02_able = false;
						if (postionStart > scrollTop || magicTop == 0) {
							photoVideo02.pause();
							photoVideo02.currentTime = 0;
						}
					}
				}
			}
		} else {
			var postionChange = $(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).offset().top - magicHeight + ($(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).outerHeight() / 3);
			if (postionChange > magicTop) {
				if (parseInt($(".album-detail .album-photo .slide-wrap .click_hh > li").eq(0).find("> ul > li").eq(0).css("margin-left")) == 0) {
					var postionStart01 = $(".album-detail .album-photo .slide-wrap .click_hh > li").eq(0).offset().top - magicHeight;
					var postionTop01 = $(".album-detail .album-photo .slide-wrap .click_hh > li").eq(0).offset().top - magicHeight + ($(".album-detail .album-photo .slide-wrap .click_hh > li").eq(0).outerHeight() / 3);
					var postionEnd01 = $(".album-detail .album-photo .slide-wrap .click_hh > li").eq(0).offset().top + $(".album-detail .album-photo .slide-wrap .click_hh > li").eq(0).outerHeight();
					if (postionStart01 < magicTop && postionEnd01 > magicTop) {
						if (postionTop01 < magicTop && !photoVideo01_able) {
							photoVideo02_able = false;
							photoVideo02.pause();
							photoVideo02.currentTime = 0;

							photoVideo01_able = true;
							if (check_androidDevice() == '') {
								$(".album-detail .album-photo .slide-wrap .click_hh > li").eq(0).find("> ul > li").eq(0).find("video").each(function () {
									if ($(this).parent().find(".v_cover").css("display") == "block") {
										$(this).parent().find(".v_cover").animate({ "opacity": 0 }, 300, function () {
											$(this).css({ "display": "none" });
										});
									}
									if (this.paused) {
										this.currentTime = 0;
										this.play();
									}
								});
							} else {
								window.addEventListener('touchstart', function videoStart() {
									if (photoVideo01.paused) {
										if ($(".album-detail .album-photo .slide-wrap .click_hh > li").eq(0).find("> ul > li").eq(0).find(".v_cover").css("display") == "block") {
											$(".album-detail .album-photo .slide-wrap .click_hh > li").eq(0).find("> ul > li").eq(0).find(".v_cover").animate({ "opacity": 0 }, 300, function () {
												$(this).css({ "display": "none" });
											});
										}

										if (parseInt(photoVideo01.currentTime) != 0)
											photoVideo01.currentTime = 0;

										photoVideo01.play();
									}

									this.removeEventListener('touchstart', videoStart);
								});
							}
						}
					} else {
						photoVideo01_able = false;
						if (postionStart01 > scrollTop || magicTop == 0) {
							photoVideo01.pause();
							photoVideo01.currentTime = 0;
						}
					}
				}
			} else {
				if (parseInt($(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).find("> ul > li").eq(0).css("margin-left")) == 0) {
					var postionStart02 = $(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).offset().top - magicHeight;
					var postionTop02 = $(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).offset().top - magicHeight + ($(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).outerHeight() / 3);
					var postionEnd02 = $(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).offset().top + $(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).outerHeight();

					if (postionStart02 < magicTop && postionEnd02 > magicTop) {
						if (postionTop02 < magicTop && !photoVideo02_able) {
							photoVideo01_able = false;
							photoVideo01.pause();
							photoVideo01.currentTime = 0;

							photoVideo02_able = true;
							if (check_androidDevice() == '') {
								$(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).find("> ul > li").eq(0).find("video").each(function () {
									if ($(this).parent().find(".v_cover").css("display") == "block") {
										$(this).parent().find(".v_cover").animate({ "opacity": 0 }, 300, function () {
											$(this).css({ "display": "none" });
										});
									}

									if (this.paused) {
										this.currentTime = 0;
										this.play();
									}
								});
							} else {
								window.addEventListener('touchstart', function videoStart() {
									if (photoVideo02.paused) {
										if ($(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).find("> ul > li").eq(0).find(".v_cover").css("display") == "block") {
											$(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).find("> ul > li").eq(0).find(".v_cover").animate({ "opacity": 0 }, 300, function () {
												$(this).css({ "display": "none" });
											});
										}

										if (parseInt(photoVideo02.currentTime) != 0)
											photoVideo02.currentTime = 0;

										photoVideo02.play();
									}

									this.removeEventListener('touchstart', videoStart);
								});
							}
						}
					} else {
						photoVideo02_able = false;
						if (postionStart02 > scrollTop || magicTop == 0) {
							photoVideo02.pause();
							photoVideo02.currentTime = 0;
						}
					}
				}
			}
		}

	}
}

function sqStart() {
	if (slideIdx == 0) {
		if (tabIndex == 0) {
			if (photoVideo02) {
				photoVideo02.pause();
				photoVideo02.currentTime = 0;
			}

			$(".album-detail .album-photo .slide-wrap .click_hh > li").eq(0).find("> ul > li").eq(0).find("video").each(function () {
				if ($(this).parent().find(".v_cover").css("display") == "block") {
					$(this).parent().find(".v_cover").animate({ "opacity": 0 }, 300, function () {
						$(this).css({ "display": "none" });
					});
				}
				if (this.paused) {
					this.currentTime = 0;
					this.play();
				}
			});
		} else {
			if (photoVideo01) {
				photoVideo01.pause();
				photoVideo01.currentTime = 0;
			}

			$(".album-detail .album-photo .slide-wrap .click_hh > li").eq(1).find("> ul > li").eq(0).find("video").each(function () {
				if ($(this).parent().find(".v_cover").css("display") == "block") {
					$(this).parent().find(".v_cover").animate({ "opacity": 0 }, 300, function () {
						$(this).css({ "display": "none" });
					});
				}
				if (this.paused) {
					this.currentTime = 0;
					this.play();
				}
			});
		}
	}
}

function sqStop() {
	if (photoVideo01) {
		photoVideo01.pause();
		photoVideo01.currentTime = 0;
	}
	if (photoVideo02) {
		photoVideo02.pause();
		photoVideo02.currentTime = 0;
	}
}

var photoVideo01_able = false;
var photoVideo02_able = false;
var photoVideo01;
var photoVideo02;
var photoVideo03;
var photoVideo04;
var photoVideo05;

function videoLoad() {
	photoVideo01 = document.getElementById("freeze_day1_movie1");
	photoVideo02 = document.getElementById("freeze_day1_movie2");
	photoVideo03 = document.getElementById("freeze_day1_movie3");
	photoVideo04 = document.getElementById("freeze_day1_movie4");
	photoVideo05 = document.getElementById("freeze_day1_movie5");
}


function magicScroll_reset() {
	if (viewportWidth() > 768) {
		$(".the_chaos_chapter_freeze .album-detail .bottom ul li").each(function () {
			if ($(this).hasClass("active")) {
				tabIndex = $(this).index();
			}
		});
	}


	magicHeight = $(window).outerHeight();
	photoHeight = $(".album-detail .album-photo .slide-wrap").outerHeight();
	photoInner_height = $(".album-detail .album-photo .slide-wrap .click_hh > li").eq(tabIndex).find("> ul > li").eq(slideIdx).outerHeight();

	var fixedStart = photoInner_top - magicHeight;
	var fixedEnd = photoInner_top + photoHeight;

	var arrow_reHeight = magicTop - photoInner_top + magicHeight;
	var arrow_top = 0;

	if (magicHeight > photoInner_height) {
		if (arrow_reHeight > photoInner_height) {
			arrow_top = (arrow_reHeight - magicHeight);
			if (arrow_top < 0) {
				arrow_top = 0;
			}
			arrow_reHeight = photoInner_height;
			if ((arrow_top + arrow_reHeight) > photoInner_height) {
				arrow_reHeight = (photoInner_top + photoHeight) - magicTop;
			}
		}
	} else {
		if (arrow_reHeight > magicHeight) {
			arrow_top = (arrow_reHeight - magicHeight);
			arrow_reHeight = magicHeight;
			if ((arrow_top + arrow_reHeight) > photoInner_height) {
				arrow_reHeight = (photoInner_top + photoHeight) - magicTop;
			}
		} else {
			arrow_top = 0;
		}
	}

	var minHeight = photoInner_top + photoHeight - ($("header").outerHeight() * 2 + 90);
	if (minHeight > magicTop) {
		if (viewportWidth() > 768) {
			if (magicTop > fixedStart && magicTop < fixedEnd) {
				$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .slide-obj button").css({ "margin-top": "0px", "top": arrow_top + "px", "height": arrow_reHeight + "px" });
			} else {
				if (magicTop < fixedStart) {
					$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .slide-obj button").css({ "margin-top": "", "top": "", "height": "" });
				}
			}
		} else {
			$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .slide-obj button").css({ "margin-top": "", "top": "", "height": "" });
		}
	}

}



var tabIndex = 0;
var slideIdx = 0;
var cIdx = 0;
var magicIng = false;
$(window).load(function () {

	$("#depth-04 .click_area .area_image, #depth-05 .click_area .area_image").click(function () {

		var clickId = $(this).attr("id");
		tabIndex = $(this).parents('.map_gallery').parent('li').index();
		console.log('tabindex:' + tabIndex)

		slideIdx = $(this).parents('.img_wrap').index();

		cIdx = $(this).attr("data-idx") - 1;

		$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li").removeClass("active");
		$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).addClass("active");
		$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li ul").removeClass("active");
		$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).addClass("active");
		$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li ul > li").css({ "margin-left": "100%" });
		$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({ "margin-left": "0" });

		$(".the_chaos_chapter_freeze .popup-bg").css({ "display": "block", "opacity": 0 }).animate({ "opacity": 1 }, 500);
		$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo").css({ "display": "block", "opacity": 0 }).animate({ "opacity": 1 }, 500);


		setTimeout(function () {
			playVideo();
		}, 500);


		var goTop = $(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo").offset().top - $("header").outerHeight();
		var speed = Math.abs(goTop - magicTop);
		$("html, body").stop().animate({ "scrollTop": goTop + "px" }, 100, 'swing');

		popupLanguage();
		$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").focus();

	});

	$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-close").click(function () {
		$(".the_chaos_chapter_freeze .popup-bg").animate({ "opacity": 0 }, 500, function () {
			$(this).css({ "display": "none" });
		});
		$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo").animate({ "opacity": 0 }, 500, function () {
			$(this).css({ "display": "none" });
			sqStart();
		});
		videoPause();
		return false;
	});

	$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").click(function () {
		var path01 = "";
		//var path02 = "";
		var dataFile = "";
		if (tabIndex == 0) {
			path01 = "day1";
		} else if (tabIndex == 1) {
			path01 = "day2";
		} else {
			path01 = "day3";
		}

		var dataFile = path01 + "/" + $(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).find(".contents-obj").attr("data-src");

		if (check_ios() != "") {
			window.open("https://ibighit.com/txt/images/the_chaos_chapter_freeze/" + dataFile);
		} else {
			cfDownload("https://ibighit.com/txt/images/the_chaos_chapter_freeze/", dataFile);
			// document.getElementById("hiddenFrame").src="./../../../common/fileDownload_freeze.html?f=" + dataFile;
		}


		return false;
	});

	$(".the_chaos_chapter_freeze .popup-bg").click(function () {
		$(".the_chaos_chapter_freeze .popup-bg").animate({ "opacity": 0 }, 500, function () {
			$(this).css({ "display": "none" });
		});
		$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo").animate({ "opacity": 0 }, 500, function () {
			$(this).css({ "display": "none" });
		});
		return false;
	});

	$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .btn-prev").click(function () {
		if (viewportWidth() < 769) {
			tabIndex = $(this).parent().parent().index();
		}
		slideIdx = albumPhoto_idx[albumPhoto];

		magicScroll_reset();

		sqStop();
		sqStart();

	});
	$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .btn-next").click(function () {
		if (viewportWidth() < 769) {
			tabIndex = $(this).parent().parent().index();
		}
		slideIdx = albumPhoto_idx[albumPhoto];

		magicScroll_reset();

		sqStop();
		sqStart();
	});
	$(".album-detail .bottom ul li button").click(function () {
		magicScroll_reset();
		slideIdx = 0;

	});

	$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .pop-btn-prev").click(function () {
		if (!magicIng) {
			magicIng = true;
			tabIndex = $(this).parent().parent().index();

			var cMax = $(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").length;
			$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).animate({ "margin-left": "100%" }, 500);
			cIdx--;
			if (cIdx < 0) {
				cIdx = cMax - 1;
			}
			$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({ "margin-left": "-100%" }).animate({ "margin-left": "0%" }, 500);
			setTimeout(function () {
				magicIng = false;
				playVideo();
			}, 500);
			popupLanguage();
		}

		return false;
	});

	$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .pop-btn-next").click(function () {
		if (!magicIng) {
			magicIng = true;
			tabIndex = $(this).parent().parent().index();

			var cMax = $(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").length;
			$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).animate({ "margin-left": "-100%" }, 500);
			cIdx++;

			if (cIdx == cMax) {
				cIdx = 0;
			}
			$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).css({ "margin-left": "100%" }).animate({ "margin-left": "0%" }, 500);

			setTimeout(function () {
				magicIng = false;
				playVideo();
			}, 500);
			popupLanguage();
		}
		return false;
	});
});

function playVideo() {
	$(".the_chaos_chapter_freeze .album-detail .album-photo video").each(function () {
		this.pause();
		this.currentTime = 0;
	});

	if (cIdx == 0 || cIdx == 1 || cIdx == 2 || cIdx == 3 || cIdx == 4 || cIdx == 5 || cIdx == 6 || cIdx == 7) {
		$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo > ul > li").eq(tabIndex).find("ul").eq(slideIdx).find("li").eq(cIdx).find("video").each(function () {

			if (this.paused) {
				this.currentTime = 0;
				this.play();
			}
			else {
				this.pause();
			}
		});
	}
}

function popupLanguage() {
	var lan = $(".lang_opt .btn-lang p").text();

	if (tabIndex == 0) {
		if (lan == "KOR") {
			switch (slideIdx) {
				case 0:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER");
						}
						break;
					}
				case 1:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						}
						break;
					}
				case 2:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						}
						break;
					}
				case 3:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						}
						break;
					}
				case 4:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						}
						break;
					}
				case 5:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						}
						break;
					}
			}
		} else if (lan == "ENG") {
			switch (slideIdx) {
				case 0:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER");
						}
						break;
					}
				case 1:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("ttitle", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						}
						break;
					}
				case 2:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						}
						break;
					}
				case 3:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						}
						break;
					}
				case 4:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						}
						break;
					}
				case 5:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						}
						break;
					}
			}
		} else if (lan == "JPN") {
			switch (slideIdx) {
				case 0:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHER");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHER");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHER");
						}
						break;
					}
				case 1:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						}
						break;
					}
				case 2:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						}
						break;
					}
				case 3:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						}
						break;
					}
				case 4:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						}
						break;
					}
				case 5:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						}
						break;
					}
			}
		} else if (lan == "CHN") {
			switch (slideIdx) {
				case 0:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER");
						}
						break;
					}
				case 1:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						}
						break;
					}
				case 2:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						}
						break;
					}
				case 3:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						}
						break;
					}
				case 4:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						}
						break;
					}
				case 5:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						}
						break;
					}
			}
		}
	} else if (tabIndex == 1) {
		if (lan == "KOR") {
			switch (slideIdx) {
				case 0:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER");
						}
						break;
					}
				case 1:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						}
						break;
					}
				case 2:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						}
						break;
					}
				case 3:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						}
						break;
					}
				case 4:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						}
						break;
					}
				case 5:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						}
						break;
					}
			}
		} else if (lan == "ENG") {
			switch (slideIdx) {
				case 0:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER");
						}
						break;
					}
				case 1:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("ttitle", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						}
						break;
					}
				case 2:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						}
						break;
					}
				case 3:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						}
						break;
					}
				case 4:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						}
						break;
					}
				case 5:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						}
						break;
					}
			}
		} else if (lan == "JPN") {
			switch (slideIdx) {
				case 0:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHER");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHER");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHER");
						}
						break;
					}
				case 1:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						}
						break;
					}
				case 2:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						}
						break;
					}
				case 3:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						}
						break;
					}
				case 4:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						}
						break;
					}
				case 5:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						}
						break;
					}
			}
		} else if (lan == "CHN") {
			switch (slideIdx) {
				case 0:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER");
						}
						break;
					}
				case 1:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						}
						break;
					}
				case 2:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						}
						break;
					}
				case 3:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						}
						break;
					}
				case 4:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						}
						break;
					}
				case 5:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 5) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						}
						break;
					}
			}
		}
	} else (tabIndex == 2)
	{
		if (lan == "KOR") {
			switch (slideIdx) {
				case 0:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER");
						}
						break;
					}
				case 1:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 수빈");
						}
						break;
					}
				case 2:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 연준");
						}
						break;
					}
				case 3:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 범규");
						}
						break;
					}
				case 4:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 태현");
						}
						break;
					}
				case 5:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "다운로드 : TOMORROW X TOGETHER 멤버 휴닝카이");
						}
						break;
					}
			}
		} else if (lan == "ENG") {
			switch (slideIdx) {
				case 0:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER");
						}
						break;
					}
				case 1:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("ttitle", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member SOOBIN");
						}
						break;
					}
				case 2:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member YEONJUN");
						}
						break;
					}
				case 3:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member BEOMGYU");
						}
						break;
					}
				case 4:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member TAEHYUN");
						}
						break;
					}
				case 5:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "Download : TOMORROW X TOGETHER member HUENINGKAI");
						}
						break;
					}
			}
		} else if (lan == "JPN") {
			switch (slideIdx) {
				case 0:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHER");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHER");
						}
						break;
					}
				case 1:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、SOOBIN");
						}
						break;
					}
				case 2:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、YEONJUN");
						}
						break;
					}
				case 3:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、BEOMGYU");
						}
						break;
					}
				case 4:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、TAEHYUN");
						}
						break;
					}
				case 5:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "ダウンロード: TOMORROW X TOGETHERのメンバー、HUENINGKAI");
						}
						break;
					}
			}
		} else if (lan == "CHN") {
			switch (slideIdx) {
				case 0:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER");
						}
						break;
					}
				case 1:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员SOOBIN");
						}
						break;
					}
				case 2:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员YEONJUN");
						}
						break;
					}
				case 3:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员BEOMGYU");
						}
						break;
					}
				case 4:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员TAEHYUN");
						}
						break;
					}
				case 5:
					{
						if (cIdx == 0) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 1) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 2) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 3) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else if (cIdx == 4) {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						} else {
							$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").attr("title", "下载: TOMORROW X TOGETHER成员HUENINGKAI");
						}
						break;
					}
			}
		}
	}
}


$(function () {
	$(window).keydown(function (e) {
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

	$(document).on("keydown", ".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .pop-btn-next", function (e) {
		if (e.keyCode === 13) { // enter
			//e.preventDefault();
		};

		if ((e.keyCode === 9 && !e.shiftKey)) { // tab
			e.preventDefault();
			$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down").focus();
		};

		if ((e.keyCode === 9 && e.shiftKey)) { // shift+tab
			//e.preventDefault();
		};
	});

	$(document).on("keydown", ".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .btn-down", function (e) {
		if (e.keyCode === 13) { // enter
			//e.preventDefault();
		};

		if ((e.keyCode === 9 && !e.shiftKey)) { // tab
			//e.preventDefault();

		};

		if ((e.keyCode === 9 && e.shiftKey)) { // shift+tab
			e.preventDefault();
			$(".the_chaos_chapter_freeze .album-detail .album-photo .popup-photo .pop-btn-next").focus();
		};
	});

	$(document).on("keydown", ".album-photo", function (e) {
		if (e.keyCode === 13) { // enter
			//e.preventDefault();
		};

		if ((e.keyCode === 9 && !e.shiftKey)) { // tab
			if ($(this).is(":focus")) {
				e.preventDefault();
				$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .btn-prev").focus();
			}
		};

		if ((e.keyCode === 9 && e.shiftKey)) { // shift+tab
			//e.preventDefault();			
		};
	});

	$(document).on("keydown", ".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .btn-prev", function (e) {
		if (e.keyCode === 13) { // enter
			//e.preventDefault();
		};

		if ((e.keyCode === 9 && !e.shiftKey)) { // tab
			e.preventDefault();
			$(".album-detail .album-photo .slide-wrap .click_hh > li").eq(tabIndex).find("> ul > li").eq(slideIdx).focus();
		};

		if ((e.keyCode === 9 && e.shiftKey)) { // shift+tab
			e.preventDefault();
			$(".album-photo").focus();
		};
	});

	$(document).on("keydown", ".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .btn-next", function (e) {
		if (e.keyCode === 13) { // enter
			//e.preventDefault();
		};

		if ((e.keyCode === 9 && !e.shiftKey)) { // tab
			//e.preventDefault();

		};

		if ((e.keyCode === 9 && e.shiftKey)) { // shift+tab
			e.preventDefault();
			$(".album-detail .album-photo .slide-wrap .click_hh > li").eq(tabIndex).find("> ul > li").eq(slideIdx).focus();
		};
	});

	$(document).on("keydown", ".album-detail .album-photo .slide-wrap .click_hh > li > ul > li", function (e) {
		if (e.keyCode === 13) { // enter
			e.preventDefault();
			if (viewportWidth() > 768) {
				$(".click_area").click();
			} else {
				$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .click_hh > li .mix li .contents-obj .contents-inner").click();
			}
		};

		if ((e.keyCode === 9 && !e.shiftKey)) { // tab
			e.preventDefault();
			$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .btn-next").focus();
		};

		if ((e.keyCode === 9 && e.shiftKey)) { // shift+tab
			e.preventDefault();
			$(".the_chaos_chapter_freeze .album-detail .album-photo .slide-wrap .btn-prev").focus();
		};
	});
});

var magic_island_video01;
var magic_island_video02;
var magic_island_video03;
var magic_island_video04;
var magic_island_video05;
function magicVideo_Load() {
	magic_island_video01 = document.getElementById("freeze_day1_movie1");
	magic_island_video02 = document.getElementById("freeze_day1_movie2");
	magic_island_video03 = document.getElementById("freeze_day1_movie3");
	magic_island_video04 = document.getElementById("freeze_day1_movie4");
	magic_island_video05 = document.getElementById("freeze_day1_movie5");
	if (magic_island_video01 !== false && magic_island_video01) {
		magic_island_video01.onended = function () {
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}

	if (magic_island_video02 !== false && magic_island_video02) {
		magic_island_video02.onended = function () {
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}

	if (magic_island_video03 !== false && magic_island_video03) {
		magic_island_video03.onended = function () {
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}

	if (magic_island_video04 !== false && magic_island_video04) {
		magic_island_video04.onended = function () {
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}

	if (magic_island_video05 !== false && magic_island_video05) {
		magic_island_video05.onended = function () {
			$(this).parent().find("button").removeClass("btn-pause");
		};
	}
}


$(window).load(function () {

	const $Depth_1 = $("#depth-01");
	const $Depth_2 = $("#depth-02");
	const $Depth_3 = $("#depth-03");
	const $Depth_4 = $("#depth-04");
	const $Depth_5 = $("#depth-05");

	$Depth_1.css({ "visibility": "hidden", "opacity": 0 });
	$Depth_2.hide();
	$Depth_3.hide();
	$Depth_4.hide();
	$Depth_5.hide();

	$("#depth-02 > div").css({ "display": "none", "opacity": 0 });
	$("#depth-03 > div").css({ "display": "none", "opacity": 0 });
	$("#depth-04 > div").css({ "display": "none", "opacity": 0 });
	$("#depth-05 > div").css({ "display": "none", "opacity": 0 });

	const transitionPeriod = 200;
	$Depth_1.css({ "visibility": "visible", "opacity": 1, "transition": "all 0.2s" });

	const $MapArea = $('.map-area');
	$MapArea.on('click touchstart', function () {

		if ($(this).data("zoom-map") == "zoomMap1") {
			$Depth_1.css({ "visibility": "hidden", "opacity": 0, "transition": "all 0.2s" });
			setTimeout(function () {
				$Depth_2.fadeIn(transitionPeriod);
				$("#zoom1-1").css({ "display": "block", "opacity": 1 });
			}, transitionPeriod);
			return;
		}

		if ($(this).data("zoom-map") == "zoomMap2") {
			$Depth_1.css({ "visibility": "hidden", "opacity": 0, "transition": "all 0.2s" });
			setTimeout(function () {
				$Depth_2.fadeIn(transitionPeriod);
				$("#zoom1-2").css({ "display": "block", "opacity": 1 });
			}, transitionPeriod);
			return;
		}

		if ($(this).data("zoom-map") == "zoomMap3") {
			$Depth_1.css({ "visibility": "hidden", "opacity": 0, "transition": "all 0.2s" });
			setTimeout(function () {
				$Depth_2.fadeIn(transitionPeriod);
				$("#zoom1-3").css({ "display": "block", "opacity": 1 });
			}, transitionPeriod);
			return;
		};

	});

	$('.alert_close').on('click', function () {
		$Depth_2.fadeOut(transitionPeriod);
		setTimeout(function () {
			$(".map_alert").css({ "display": "none", "opacity": 0 });
			$Depth_1.css({ "visibility": "visible", "opacity": 1, "transition": "all 0.2s" });
		}, transitionPeriod);
	});

	$('#depth-02 .zoom-btn').on('click', function () {
		$Depth_2.fadeOut(transitionPeriod);
		setTimeout(function () {
			$(".map_zoom1").css({ "display": "none", "opacity": 0 });
			$Depth_1.css({ "visibility": "visible", "opacity": 1, "transition": "all 0.2s" });
		}, transitionPeriod);
	});
	$('#depth-03 .zoom-btn').on('click', function () {
		$Depth_3.fadeOut(transitionPeriod);
		setTimeout(function () {
			$(".map_zoom2").css({ "display": "none", "opacity": 0 });
			$Depth_1.css({ "visibility": "visible", "opacity": 1, "transition": "all 0.2s" });
		}, transitionPeriod);
	});

	$('#depth-02 .back_btn').on('click', function () {
		$Depth_2.fadeOut(transitionPeriod);
		setTimeout(function () {
			$(".map_zoom1").css({ "display": "none", "opacity": 0 });
			$Depth_1.css({ "visibility": "visible", "opacity": 1, "transition": "all 0.2s" });
		}, transitionPeriod);
	});

	$('#depth-03 #zoom2-1 .back_btn').on('click', function () {
		$Depth_3.fadeOut(transitionPeriod);
		setTimeout(function () {
			$(".map_zoom2").css({ "display": "none", "opacity": 0 });
			$(".map_zoom1").css({ "display": "none", "opacity": 0 });
			$("#zoom1-1").css({ "display": "block", "opacity": 1 });
			$Depth_2.fadeIn(transitionPeriod);
		}, transitionPeriod);
	});
	$('#depth-03 #zoom2-2 .back_btn').on('click', function () {
		$Depth_3.fadeOut(transitionPeriod);
		setTimeout(function () {
			$(".map_zoom2").css({ "display": "none", "opacity": 0 });
			$(".map_zoom1").css({ "display": "none", "opacity": 0 });
			$("#zoom1-2").css({ "display": "block", "opacity": 1 });
			$Depth_2.fadeIn(transitionPeriod);
		}, transitionPeriod);
	});
	$('#depth-03 #zoom2-3 .back_btn').on('click', function () {
		$Depth_3.fadeOut(transitionPeriod);
		setTimeout(function () {
			$(".map_zoom2").css({ "display": "none", "opacity": 0 });
			$(".map_zoom1").css({ "display": "none", "opacity": 0 });
			$(".popup-video-call").fadeOut(0);
			$("#zoom1-3").css({ "display": "block", "opacity": 1 });
			$Depth_2.fadeIn(transitionPeriod);
		}, transitionPeriod);
	});
	$('#depth-03 #zoom2-center .back_btn').on('click', function () {
		$Depth_3.fadeOut(transitionPeriod);
		setTimeout(function () {
			$(".map_zoom2").css({ "display": "none", "opacity": 0 });
			$(".map_zoom1").css({ "display": "none", "opacity": 0 });
			$("#zoom1-center").css({ "display": "block", "opacity": 1 });
			$Depth_2.fadeIn(transitionPeriod);
		}, transitionPeriod);
	});

	$('#depth-04 #gallery1 .back_btn').on('click', function () {
		$Depth_4.fadeOut(transitionPeriod);
		setTimeout(function () {
			$(".map_gallery").css({ "display": "none", "opacity": 0 });
			$(".img_wrap").css({ "display": "none", "opacity": 0 });
			$("#zoom2-1").css({ "display": "block", "opacity": 1 });
			$Depth_2.fadeIn(transitionPeriod);
		}, transitionPeriod);
	});
	$('#depth-04 #gallery2 .back_btn').on('click', function () {
		$Depth_4.fadeOut(transitionPeriod);
		$("#gallery3").removeClass('scroll_add');
		$("#gallery6").removeClass('scroll_add');
		setTimeout(function () {
			$(".map_gallery").css({ "display": "none", "opacity": 0 });
			$(".img_wrap").css({ "display": "none", "opacity": 0 });
			$("#zoom2-2").css({ "display": "block", "opacity": 1 });
			$Depth_2.fadeIn(transitionPeriod);
		}, transitionPeriod);
	});
	$('#depth-04 #gallery3 .back_btn').on('click', function () {
		$Depth_4.fadeOut(transitionPeriod);
		setTimeout(function () {
			$(".map_gallery").css({ "display": "none", "opacity": 0 });
			$(".img_wrap").css({ "display": "none", "opacity": 0 });
			$("#zoom2-3").css({ "display": "block", "opacity": 1 });
			$Depth_2.fadeIn(transitionPeriod);
		}, transitionPeriod);
	});

	$('#depth-05 #gallery4 .back_btn').on('click', function () {
		$Depth_4.fadeOut(transitionPeriod);
		setTimeout(function () {
			$(".map_gallery").css({ "display": "none", "opacity": 0 });
			$("#zoom2-1").css({ "display": "block", "opacity": 1 });
			$Depth_3.fadeIn(transitionPeriod);
		}, transitionPeriod);
	});
	$('#depth-05 #gallery5 .back_btn').on('click', function () {
		$Depth_4.fadeOut(transitionPeriod);
		$("#gallery3").removeClass('scroll_add');
		$("#gallery6").removeClass('scroll_add');
		setTimeout(function () {
			$(".map_gallery").css({ "display": "none", "opacity": 0 });
			$("#zoom2-2").css({ "display": "block", "opacity": 1 });
			$Depth_3.fadeIn(transitionPeriod);
		}, transitionPeriod);
	});
	$('#depth-05 #gallery6 .back_btn').on('click', function () {
		$Depth_4.fadeOut(transitionPeriod);
		setTimeout(function () {
			$(".map_gallery").css({ "display": "none", "opacity": 0 });
			$("#zoom2-3").css({ "display": "block", "opacity": 1 });
			$Depth_3.fadeIn(transitionPeriod);
		}, transitionPeriod);
	});

	$('#zoom1-1 .goDep3_btn').on('click', function () {
		$Depth_3.fadeIn(transitionPeriod);
		setTimeout(function () {
			$(".map_zoom1").css({ "display": "none", "opacity": 0 });
			$(".map_zoom2").css({ "display": "none", "opacity": 0 });
			$Depth_2.fadeOut(transitionPeriod);
			$('#zoom2-1').css({ "display": "block", "opacity": 1 });
		}, transitionPeriod);
	});

	$('#zoom1-2 .goDep3_btn').on('click', function () {
		$Depth_3.fadeIn(transitionPeriod);
		setTimeout(function () {
			$(".map_zoom1").css({ "display": "none", "opacity": 0 });
			$(".map_zoom2").css({ "display": "none", "opacity": 0 });
			$Depth_2.fadeOut(transitionPeriod);
			$('#zoom2-2').css({ "display": "block", "opacity": 1 });
		}, transitionPeriod);
	})

	$('#zoom1-3 .goDep3_btn').on('click', function () {
		$Depth_3.fadeIn(transitionPeriod);
		setTimeout(function () {
			$(".map_zoom1").css({ "display": "none", "opacity": 0 });
			$(".map_zoom2").css({ "display": "none", "opacity": 0 });
			$(".popup-video-call").fadeOut(0);
			$Depth_2.fadeOut(transitionPeriod);
			$('#zoom2-3').css({ "display": "block", "opacity": 1 });
		}, transitionPeriod);
	})


	$('#zoom1-1 .click_icon button').on('click touchstart', function () {

		if ($(this).data("tear-icon") == "group") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery1 .group').css({ "display": "block", "opacity": 1 });
				$('#gallery1').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("tear-icon") == "sb") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery1 .member-sb').css({ "display": "block", "opacity": 1 });
				$('#gallery1').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("tear-icon") == "yj") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery1 .member-yj').css({ "display": "block", "opacity": 1 });
				$('#gallery1').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("tear-icon") == "bg") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery1 .member-bg').css({ "display": "block", "opacity": 1 });
				$('#gallery1').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("tear-icon") == "th") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery1 .member-th').css({ "display": "block", "opacity": 1 });
				$('#gallery1').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("tear-icon") == "hk") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery1 .member-hk').css({ "display": "block", "opacity": 1 });
				$('#gallery1').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

	});


	$('#zoom1-2 .click_icon button').on('click touchstart', function () {

		if ($(this).data("boy-icon") == "group") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$("#gallery3").addClass('scroll_add');
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery2 .group').css({ "display": "block", "opacity": 1 });
				$('#gallery2').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("boy-icon") == "sb") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery2 .member-sb').css({ "display": "block", "opacity": 1 });
				$('#gallery2').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("boy-icon") == "yj") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery2 .member-yj').css({ "display": "block", "opacity": 1 });
				$('#gallery2').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("boy-icon") == "bg") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery2 .member-bg').css({ "display": "block", "opacity": 1 });
				$('#gallery2').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("boy-icon") == "th") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery2 .member-th').css({ "display": "block", "opacity": 1 });
				$('#gallery2').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("boy-icon") == "hk") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery2 .member-hk').css({ "display": "block", "opacity": 1 });
				$('#gallery2').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}
	});


	$('#zoom1-3 .click_icon button').on('click touchstart', function () {

		if ($(this).data("you-icon") == "group") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery3 .group').css({ "display": "block", "opacity": 1 });
				$('#gallery3').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "sb") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery3 .member-sb').css({ "display": "block", "opacity": 1 });
				$('#gallery3').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "yj") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery3 .member-yj').css({ "display": "block", "opacity": 1 });
				$('#gallery3').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "bg") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery3 .member-bg').css({ "display": "block", "opacity": 1 });
				$('#gallery3').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "th") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery3 .member-th').css({ "display": "block", "opacity": 1 });
				$('#gallery3').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "hk") {
			$Depth_4.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_2.fadeOut(transitionPeriod);
				$('#gallery3 .member-hk').css({ "display": "block", "opacity": 1 });
				$('#gallery3').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}
	});


	$('#zoom2-1 .click_icon button').on('click touchstart', function () {

		if ($(this).data("world-icon") == "group") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery4 .group').css({ "display": "block", "opacity": 1 });
				$('#gallery4').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("world-icon") == "sb") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery4 .member-sb').css({ "display": "block", "opacity": 1 });
				$('#gallery4').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("world-icon") == "yj") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery4 .member-yj').css({ "display": "block", "opacity": 1 });
				$('#gallery4').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("world-icon") == "bg") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery4 .member-bg').css({ "display": "block", "opacity": 1 });
				$('#gallery4').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("world-icon") == "th") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery4 .member-th').css({ "display": "block", "opacity": 1 });
				$('#gallery4').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("world-icon") == "hk") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery4 .member-hk').css({ "display": "block", "opacity": 1 });
				$('#gallery4').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}
	});

	$('#zoom2-center .click_icon button').on('click touchstart', function () {

		if ($(this).data("world-icon") == "group") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery4 .group').css({ "display": "block", "opacity": 1 });
				$('#gallery4').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("world-icon") == "sb") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery4 .member-sb').css({ "display": "block", "opacity": 1 });
				$('#gallery4').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("world-icon") == "yj") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery4 .member-yj').css({ "display": "block", "opacity": 1 });
				$('#gallery4').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("world-icon") == "bg") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery4 .member-bg').css({ "display": "block", "opacity": 1 });
				$('#gallery4').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("world-icon") == "th") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery4 .member-th').css({ "display": "block", "opacity": 1 });
				$('#gallery4').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("world-icon") == "hk") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery4 .member-hk').css({ "display": "block", "opacity": 1 });
				$('#gallery4').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}
	});

	$('#zoom2-2 .click_icon button').on('click touchstart', function () {

		if ($(this).data("boy-icon") == "group") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$("#gallery6").addClass('scroll_add');
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery5 .group').css({ "display": "block", "opacity": 1 });
				$('#gallery5').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("boy-icon") == "sb") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery5 .member-sb').css({ "display": "block", "opacity": 1 });
				$('#gallery5').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("boy-icon") == "yj") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery5 .member-yj').css({ "display": "block", "opacity": 1 });
				$('#gallery5').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("boy-icon") == "bg") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery5 .member-bg').css({ "display": "block", "opacity": 1 });
				$('#gallery5').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("boy-icon") == "th") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery5 .member-th').css({ "display": "block", "opacity": 1 });
				$('#gallery5').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("boy-icon") == "hk") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery5 .member-hk').css({ "display": "block", "opacity": 1 });
				$('#gallery5').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}
	});


	$('#zoom2-3 .click_icon button').on('click touchstart', function () {

		if ($(this).data("you-icon") == "group") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery6 .group').css({ "display": "block", "opacity": 1 });
				$('#gallery6').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "sb") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery6 .member-sb').css({ "display": "block", "opacity": 1 });
				$('#gallery6').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "yj") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery6 .member-yj').css({ "display": "block", "opacity": 1 });
				$('#gallery6').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "bg") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery6 .member-bg').css({ "display": "block", "opacity": 1 });
				$('#gallery6').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "th") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery6 .member-th').css({ "display": "block", "opacity": 1 });
				$('#gallery6').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "hk") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery6 .member-hk').css({ "display": "block", "opacity": 1 });
				$('#gallery6').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}
	});

	$('#zoom2-center .click_icon button').on('click touchstart', function () {

		if ($(this).data("you-icon") == "group") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery6 .group').css({ "display": "block", "opacity": 1 });
				$('#gallery6').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "sb") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery6 .member-sb').css({ "display": "block", "opacity": 1 });
				$('#gallery6').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "yj") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery6 .member-yj').css({ "display": "block", "opacity": 1 });
				$('#gallery6').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "bg") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery6 .member-bg').css({ "display": "block", "opacity": 1 });
				$('#gallery6').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "th") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery6 .member-th').css({ "display": "block", "opacity": 1 });
				$('#gallery6').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}

		if ($(this).data("you-icon") == "hk") {
			$Depth_5.fadeIn(transitionPeriod);
			setTimeout(function () {
				$(".map_zoom2").css({ "display": "none", "opacity": 0 });
				$(".map_gallery .img_wrap").css({ "display": "none", "opacity": 0 });
				$Depth_3.fadeOut(transitionPeriod);
				$('#gallery6 .member-hk').css({ "display": "block", "opacity": 1 });
				$('#gallery6').css("opacity", "1").fadeIn(transitionPeriod);
			}, transitionPeriod);
		}
	});

	var messengerClick = false;
	$('#depth-04 #gallery2 .messenger_arrow, #depth-05 #gallery5 .messenger_arrow').on('click', function () {
		if (!messengerClick) {
			$(this).next('.messenger').addClass("down");
			$(this).addClass('scroll_up')
			messengerClick = !messengerClick;
		} else if (messengerClick) {
			$(this).next('.messenger').removeClass("down");
			$(this).removeClass('scroll_up');
			messengerClick = !messengerClick;
		}
	});

	var dragMap_01 = $('.drag_wrap').eq(0);
	var dragMap_02 = $('.drag_wrap').eq(1);
	var dragMap_03 = $('.drag_wrap').eq(2);
	var dragMap_04 = $('.drag_wrap').eq(3);
	var dragMap_05 = $('.drag_wrap').eq(4);
	var dragMap_06 = $('.drag_wrap').eq(5);
	var dragMap_07 = $('.drag_wrap').eq(6);
	var dragMap_08 = $('.drag_wrap').eq(7);

	dragMap_01.draggable({
		cancel: '.click_icon button',
	});
	dragMap_02.draggable({
		cancel: '.click_icon button',
	});
	dragMap_03.draggable({
		cancel: '.click_icon button',
	});
	dragMap_04.draggable({
		cancel: '.click_icon button',
	});
	dragMap_05.draggable({
		cancel: '.click_icon button',
	});
	dragMap_06.draggable({
		cancel: '.click_icon button',
	});
	dragMap_07.draggable({
		cancel: '.click_icon button',
	});
	dragMap_08.draggable({
		cancel: '.click_icon button',
	});


	$('map').imageMapResize();

});//ready

$(window).load(function () {
	const $Call = $(".map_alert2");

	$Call.hide();

	$('#zoom1-3 .click_icon button.call01').on('click touchstart', function () {
		if ($(this).attr('data-call-icon')) {
			//Popup- start
			var videoFile = $(this).attr("data-call-icon");
			console.log(videoFile)
			const videoData = 'https://ibighit.com/txt/videos/txt/the_chaos_chapter_freeze/day3/' + videoFile + '.mp4';
			$('.popup-video-call #video-player source').attr('src', videoData);
			$('.popup-video-call #video-player').load();
			$('.popup-video-call #video-player').get(0).play();
			$('.the_chaos_chapter_freeze .popup-bg').css({ 'opacity': '1', 'display': 'block' });
			$('.popup-video-call').fadeIn();
			$('#alert-phone-1').fadeIn();
		}
	})

	$('#zoom1-3 .click_icon button.call02').on('click touchstart', function () {
		if ($(this).attr('data-call-icon')) {
			//Popup- start
			var videoFile = $(this).attr("data-call-icon");
			console.log(videoFile)
			const videoData = 'https://ibighit.com/txt/videos/txt/the_chaos_chapter_freeze/day3/' + videoFile + '.mp4';
			$('.popup-video-call #video-player source').attr('src', videoData);
			$('.popup-video-call #video-player').load();
			$('.popup-video-call #video-player').get(0).play();
			$('.the_chaos_chapter_freeze .popup-bg').css({ 'opacity': '1', 'display': 'block' });
			$('.popup-video-call').fadeIn();
			$('#alert-phone-2').fadeIn();
		}
	})

	$('#zoom1-3 .click_icon button.call03').on('click touchstart', function () {
		if ($(this).attr('data-call-icon')) {
			//Popup- start
			var videoFile = $(this).attr("data-call-icon");
			console.log(videoFile)
			const videoData = 'https://ibighit.com/txt/videos/txt/the_chaos_chapter_freeze/day3/' + videoFile + '.mp4';
			$('.popup-video-call #video-player source').attr('src', videoData);
			$('.popup-video-call #video-player').load();
			$('.popup-video-call #video-player').get(0).play();
			$('.the_chaos_chapter_freeze .popup-bg').css({ 'opacity': '1', 'display': 'block' });
			$('.popup-video-call').fadeIn();
			$('#alert-phone-3').fadeIn();
		}
	})

	$('#zoom1-3 .click_icon button.call04').on('click touchstart', function () {
		if ($(this).attr('data-call-icon')) {
			//Popup- start
			var videoFile = $(this).attr("data-call-icon");
			console.log(videoFile)
			const videoData = 'https://ibighit.com/txt/videos/txt/the_chaos_chapter_freeze/day3/' + videoFile + '.mp4';
			$('.popup-video-call #video-player source').attr('src', videoData);
			$('.popup-video-call #video-player').load();
			$('.popup-video-call #video-player').get(0).play();
			$('.the_chaos_chapter_freeze .popup-bg').css({ 'opacity': '1', 'display': 'block' });
			$('.popup-video-call').fadeIn();
			$('#alert-phone-4').fadeIn();
		}
	})

	$('#zoom1-3 .click_icon button.call05').on('click touchstart', function () {
		if ($(this).attr('data-call-icon')) {
			//Popup- start
			var videoFile = $(this).attr("data-call-icon");
			console.log(videoFile)
			const videoData = 'https://ibighit.com/txt/videos/txt/the_chaos_chapter_freeze/day3/' + videoFile + '.mp4';
			$('.popup-video-call #video-player source').attr('src', videoData);
			$('.popup-video-call #video-player').load();
			$('.popup-video-call #video-player').get(0).play();
			$('.the_chaos_chapter_freeze .popup-bg').css({ 'opacity': '1', 'display': 'block' });
			$('.popup-video-call').fadeIn();
			$('#alert-phone-5').fadeIn();
		}
	})

	$('#zoom2-3 .click_icon button.call01').on('click touchstart', function () {
		if ($(this).attr('data-call-icon')) {
			//Popup- start
			var videoFilet = $(this).attr("data-call-icon");
			console.log(videoFilet)
			const videoDatat = 'https://ibighit.com/txt/videos/txt/the_chaos_chapter_freeze/day3/' + videoFilet + '.mp4';
			$('.popup-video-call #video-player2 source').attr('src', videoDatat);
			$('.popup-video-call #video-player2').load();
			$('.popup-video-call #video-player2').get(0).play();
			$('.the_chaos_chapter_freeze .popup-bg').css({ 'opacity': '1', 'display': 'block' });
			$('.popup-video-call').fadeIn();
			$('#alert-phone2-1').fadeIn();
		}
	})

	$('#zoom2-3 .click_icon button.call02').on('click touchstart', function () {
		if ($(this).attr('data-call-icon')) {
			//Popup- start
			var videoFilet = $(this).attr("data-call-icon");
			console.log(videoFilet)
			const videoDatat = 'https://ibighit.com/txt/videos/txt/the_chaos_chapter_freeze/day3/' + videoFilet + '.mp4';
			$('.popup-video-call #video-player2 source').attr('src', videoDatat);
			$('.popup-video-call #video-player2').load();
			$('.popup-video-call #video-player2').get(0).play();
			$('.the_chaos_chapter_freeze .popup-bg').css({ 'opacity': '1', 'display': 'block' });
			$('.popup-video-call').fadeIn();
			$('#alert-phone2-2').fadeIn();
		}
	})

	$('#zoom2-3 .click_icon button.call03').on('click touchstart', function () {
		if ($(this).attr('data-call-icon')) {
			//Popup- start
			var videoFilet = $(this).attr("data-call-icon");
			console.log(videoFilet)
			const videoDatat = 'https://ibighit.com/txt/videos/txt/the_chaos_chapter_freeze/day3/' + videoFilet + '.mp4';
			$('.popup-video-call #video-player2 source').attr('src', videoDatat);
			$('.popup-video-call #video-player2').load();
			$('.popup-video-call #video-player2').get(0).play();
			$('.the_chaos_chapter_freeze .popup-bg').css({ 'opacity': '1', 'display': 'block' });
			$('.popup-video-call').fadeIn();
			$('#alert-phone2-3').fadeIn();
		}
	})

	$('#zoom2-3 .click_icon button.call04').on('click touchstart', function () {
		if ($(this).attr('data-call-icon')) {
			//Popup- start
			var videoFilet = $(this).attr("data-call-icon");
			console.log(videoFilet)
			const videoDatat = 'https://ibighit.com/txt/videos/txt/the_chaos_chapter_freeze/day3/' + videoFilet + '.mp4';
			$('.popup-video-call #video-player2 source').attr('src', videoDatat);
			$('.popup-video-call #video-player2').load();
			$('.popup-video-call #video-player2').get(0).play();
			$('.the_chaos_chapter_freeze .popup-bg').css({ 'opacity': '1', 'display': 'block' });
			$('.popup-video-call').fadeIn();
			$('#alert-phone2-4').fadeIn();
		}
	})

	$('#zoom2-3 .click_icon button.call05').on('click touchstart', function () {
		if ($(this).attr('data-call-icon')) {
			//Popup- start
			var videoFilet = $(this).attr("data-call-icon");
			console.log(videoFilet)
			const videoDatat = 'https://ibighit.com/txt/videos/txt/the_chaos_chapter_freeze/day3/' + videoFilet + '.mp4';
			$('.popup-video-call #video-player2 source').attr('src', videoDatat);
			$('.popup-video-call #video-player2').load();
			$('.popup-video-call #video-player2').get(0).play();
			$('.the_chaos_chapter_freeze .popup-bg').css({ 'opacity': '1', 'display': 'block' });
			$('.popup-video-call').fadeIn();
			$('#alert-phone2-5').fadeIn();
		}
	})

	var videoClick = false;
	//Popup-close
	$('.the_chaos_chapter_freeze .popup-video-call .popup-btn .btn-close').on('click', function () {
		videoEnded();
		videoEndedt();
	});

	$('.the_chaos_chapter_freeze .popup-video-call #video-player').on('click', function () {
		if (videoClick == true) {
			$(this).get(0).pause();
			videoClick = !videoClick;
		} else {
			$(this).get(0).play();
			videoClick = !videoClick;
		}
	})

	$('.the_chaos_chapter_freeze .popup-video-call #video-player2').on('click', function () {
		if (videoClick == true) {
			$(this).get(0).pause();
			videoClick = !videoClick;
		} else {
			$(this).get(0).play();
			videoClick = !videoClick;
		}
	})

	$('.alert_close2').on('click', function () {
		$(".map_alert2").fadeOut();
	});

});
//Video Ended
function videoEnded() {
	$('.the_chaos_chapter_freeze .popup-bg').css({ 'opacity': '0', 'display': 'none' });
	$('.the_chaos_chapter_freeze .popup-video-call #video-player').get(0).pause();
	$('.the_chaos_chapter_freeze #depth-02 #zoom1-3 .popup-video-call').fadeOut();
	/* $('.the_chaos_chapter_freeze .popup-video-call .popup-btn .btn-close').removeClass('bottom'); */
	videoClick = false;
}

function videoEndedt() {
	$('.the_chaos_chapter_freeze .popup-bg').css({ 'opacity': '0', 'display': 'none' });
	$('.the_chaos_chapter_freeze .popup-video-call #video-player2').get(0).pause();
	$('.the_chaos_chapter_freeze #depth-03 #zoom2-3 .popup-video-call').fadeOut();
	/* $('.the_chaos_chapter_freeze .popup-video-call .popup-btn .btn-close').removeClass('bottom'); */
	videoClick = false;
}
function videoPause() {
	$(".the_chaos_chapter_freeze .album-detail .album-photo video").each(function () {
		this.pause();
		this.currentTime = 0;
	});
}





