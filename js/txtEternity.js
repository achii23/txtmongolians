var dataNumber = 0;
var scretNumber = 0;

$(window).load(eternityLoad)
	.resize(eternityResize)
	.scroll(eternityScroll);

var eternityLoad_able = false;
var photoInner_top;
var photoInner_height;
var parametaData = "";
function eternityLoad() {
	var para = document.URL.replace("#", "").split("?").length > 1 ? document.URL.replace("#", "").split("?")[1] : "=";
	var data = para.split("=");
	if (data[0] == "photo") {
		parametaData = data[1];

		if (parametaData == "port") {
			var goTop = 0;
			if (viewportWidth() > 768) {
				$(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li").eq(1).find("button").click();
				goTop = $(".the_dream_chapter-eternity .album-detail .album-photo").offset().top - $("header").outerHeight();
			} else {
				goTop = $(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap > ul > li").eq(1).offset().top - $("header").outerHeight();
			}
			var speed = Math.abs(scrollTop - goTop) / 5;
			$("html, body").stop().stop().animate({ "scrollTop": goTop + "px" }, speed, 'swing');
		} else if (parametaData == "starboard") {
			var goTop = 0;
			if (viewportWidth() > 768) {
				$(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li").eq(2).find("button").click();
				goTop = $(".the_dream_chapter-eternity .album-detail .album-photo").offset().top - $("header").outerHeight();
			} else {
				goTop = $(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap > ul > li").eq(2).offset().top - $("header").outerHeight();
			}
			var speed = Math.abs(scrollTop - goTop) / 5;
			$("html, body").stop().stop().animate({ "scrollTop": goTop + "px" }, speed, 'swing');
		}
	}
	eternityLoad_able = true;
	photoInner_top = $(".album-detail .album-photo .slide-wrap > ul").offset().top;
	photoInner_height = $(".album-detail .album-photo .slide-wrap > ul > li").eq(0).find("> ul > li").eq(0).outerHeight();

	if (windowWidth > 768) {
		eternityMode = "pc";
	} else {
		eternityMode = "mo";
	}
}
var eternityMode = "pc";
function eternityResize() {
	photoInner_top = $(".album-detail .album-photo .slide-wrap > ul").offset().top;
	photoInner_height = $(".album-detail .album-photo .slide-wrap > ul > li").eq(0).find("> ul > li").eq(0).outerHeight();

	if (viewportWidth() < 769) {
		$(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap .slide-obj button").css({ "margin-top": "", "top": "", "height": "" });
	} else {
		$(".the_dream_chapter-eternity .album-detail .album-photo .popup-photo").css({ "margin-top": "" });

	}

	if (windowWidth > 768 && eternityMode == "mo") {
		eternityMode = "pc";
		if ($(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap > ul > li.active").index() <= 0) {
			$(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap > ul > li").css({ "display": "none", "opacity": 0 });
			$(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap > ul > li").eq(0).css({ "display": "block", "opacity": 1 });
		} else {
			$(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap > ul > li").css({ "display": "none", "opacity": 0 });
			$(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap > ul > li.active").css({ "display": "block", "opacity": 1 });
			$(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap > ul > li").eq(0).css({ "display": "", "opacity": 0 });
		}
		oldPhoto = $(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap > ul > li.active").index();
	} else if (windowWidth < 769 && eternityMode == "pc") {
		eternityMode = "mo";
	}
}
var eternityTop = 0;
function eternityScroll() {
	if (eternityLoad_able) {
		eternityTop = $(window).scrollTop();
		var tabIndex = 0;
		if (viewportWidth() > 768) {
			tabIndex = $(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li.active").index();
		} else {
			tabIndex = $(this).parent().parent().parent().parent().index();
		}
		var txtPhoto = albumPhoto_idx[tabIndex];

		var eternityHeight = $(window).outerHeight();
		var photoHeight = $(".album-detail .album-photo .slide-wrap").outerHeight();
		var photoInner_height = $(".album-detail .album-photo .slide-wrap > ul > li").eq(tabIndex).find("> ul > li").eq(txtPhoto).outerHeight();


		var fixedStart = photoInner_top - eternityHeight;
		var fixedEnd = photoInner_top + photoHeight;

		var arrow_reHeight = eternityTop - photoInner_top + eternityHeight;
		var arrow_top = 0;

		if (eternityHeight > photoInner_height) {
			if (arrow_reHeight > photoInner_height) {
				arrow_top = (arrow_reHeight - eternityHeight);
				if (arrow_top < 0) {
					arrow_top = 0;
				}
				arrow_reHeight = photoInner_height;
				if ((arrow_top + arrow_reHeight) > photoInner_height) {
					arrow_reHeight = (photoInner_top + photoHeight) - eternityTop;
				}
			}
		} else {
			if (arrow_reHeight > eternityHeight) {
				arrow_top = (arrow_reHeight - eternityHeight);
				arrow_reHeight = eternityHeight;
				if ((arrow_top + arrow_reHeight) > photoInner_height) {
					arrow_reHeight = (photoInner_top + photoHeight) - eternityTop;
				}
			} else {
				arrow_top = 0;
			}
		}

		var minHeight = photoInner_top + photoHeight - ($("header").outerHeight() * 2 + 90);
		if (minHeight > eternityTop) {
			if (viewportWidth() > 768) {
				if (eternityTop > fixedStart && eternityTop < fixedEnd) {
					$(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap .slide-obj button").css({ "margin-top": "0px", "top": arrow_top + "px", "height": arrow_reHeight + "px" });
				} else {
					if (eternityTop < fixedStart) {
						$(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap .slide-obj button").css({ "margin-top": "", "top": "", "height": "" });
					}
				}
			} else {
				$(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap .slide-obj button").css({ "margin-top": "", "top": "", "height": "" });
			}
		}
	}

}

$(window).load(function () {
	$(".the_dream_chapter-eternity .click-area > a").click(function () {

		var tabIndex = 0;
		if (viewportWidth() > 768) {
			tabIndex = $(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li.active").index();
		} else {
			tabIndex = $(this).parent().parent().parent().parent().index();
			$(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li").removeClass("active");
			$(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li").eq(tabIndex).addClass("active");
			$(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap > ul > li").removeClass("active");
			$(".the_dream_chapter-eternity .album-detail .album-photo .slide-wrap > ul > li").eq(tabIndex).addClass("active");
		}

		var txtPhoto = albumPhoto_idx[tabIndex];

		tabIndex--;

		dataNumber = 0;
		var clickIndex = $(this).index();
		if (clickIndex < 2) {
			var path = $(this).parents(".mix").siblings("h3").text();

			var dataPopup = $(this).attr("data-popup");

			var dataURL = "https://ibighit.com/txt/video/" + String(path).toLowerCase() + "/" + String(dataPopup).toLowerCase() + ".html?l=" + ($(".lang_opt .btn-lang p").text().toLowerCase());
			window.open(dataURL);
		} else {
			dataNumber = $(this).attr("data-number");
			dataNumber--;
			$(".popup-bg").css({ "display": "block", "opacity": 0 }).stop().animate({ "opacity": 1 }, motionDelay);
			$(".popup-photo").css({ "display": "block", "opacity": 0 }).stop().animate({ "opacity": 1 }, motionDelay);

			$(".popup-photo > ul > li").css({ "display": "none" });
			$(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).css({ "display": "block", "opacity": 1 }).find(" > ul > li").css({ "margin-left": "100%" });
			$(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").eq(dataNumber).css({ "margin-left": "0px" });

			var goTop = $(".the_dream_chapter-eternity .album-detail .album-photo .popup-photo > ul").eq(tabIndex).offset().top - $("header").outerHeight();
			var speed = Math.abs(scrollTop - goTop);
			$("html, body").stop().stop().animate({ "scrollTop": goTop + "px" }, speed, 'swing');

		}
		return false;
	});

	$(".the_dream_chapter-eternity .album-detail .album-photo .popup-photo .btn-next").click(function () {
		if (!motionIng) {
			motionIng = true;
			var tabIndex = 0;
			if (viewportWidth() > 768) {
				tabIndex = $(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li.active").index();

			} else {
				tabIndex = $(this).parent().parent().parent().index();
				tabIndex++;
			}

			var txtPhoto = albumPhoto_idx[tabIndex];

			tabIndex--;

			$(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").eq(dataNumber).stop().animate({ "margin-left": "-100%" }, motionDelay);
			dataNumber++;
			var maxLayer = $(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").length;

			if (dataNumber == maxLayer) {
				dataNumber = 0;
			}
			$(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").eq(dataNumber).css({ "margin-left": "100%" }).stop().animate({ "margin-left": "0px" }, motionDelay);

			setTimeout(function () {
				motionIng = false;
			}, motionDelay);
		}
		return false;
	});

	$(".the_dream_chapter-eternity .album-detail .album-photo .popup-photo .btn-prev").click(function () {
		if (!motionIng) {
			motionIng = true;

			var tabIndex = 0;
			if (viewportWidth() > 768) {
				tabIndex = $(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li.active").index();
			} else {
				tabIndex = $(this).parent().parent().parent().index();
				tabIndex++;
			}

			var txtPhoto = albumPhoto_idx[tabIndex];

			tabIndex--;

			$(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").eq(dataNumber).stop().animate({ "margin-left": "100%" }, motionDelay);
			dataNumber--;
			var maxLayer = $(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").length;
			if (dataNumber < 0) {
				dataNumber = maxLayer - 1;
			}
			$(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").eq(dataNumber).css({ "margin-left": "-100%" }).stop().animate({ "margin-left": "0px" }, motionDelay);

			setTimeout(function () {
				motionIng = false;
			}, motionDelay);
		}
		return false;
	});

	$(".the_dream_chapter-eternity .album-detail .album-photo .popup-photo .popup-btn .btn-down").click(function () {
		return false;
	});

	$(".the_dream_chapter-eternity .album-detail .album-photo .popup-photo .popup-btn .btn-close").click(function () {
		$(".popup-bg").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});
		$(".popup-photo").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});
		return false;
	});

	$(".popup-bg").click(function () {
		$(".popup-bg").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});
		$(".popup-photo").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});
		return false;
	});

	$(".the_dream_chapter-eternity .album-detail .album-photo .popup-photo").click(function () {
		$(".popup-bg").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});
		$(".popup-photo").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});
		return false;
	});

	$(".the_dream_chapter-eternity .album-detail .album-photo .popup-photo ul > li").click(function () {
		return false;
	});


	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$(".the_dream_chapter-eternity .album-detail .album-photo .popup-photo ul > li > ul > li a.move_photo").click(function () {
		scretNumber = $(this).attr("data-number");
		scretNumber--;

		var tabIndex = 0;
		if (viewportWidth() > 768) {
			tabIndex = $(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li.active").index();
		} else {
			tabIndex = $(this).parent().parent().parent().parent().index();
			tabIndex++;
		}

		var txtPhoto = albumPhoto_idx[tabIndex];
		tabIndex--;

		$(".popup-bg-white").css({ "display": "block", "opacity": 0 }).stop().animate({ "opacity": 1 }, motionDelay);
		$(".popup-hidden").css({ "display": "block", "opacity": 0 }).stop().animate({ "opacity": 1 }, motionDelay);
		$(".popup-hidden > ul").find(" > li").css({ "display": "none" }).find("> ul > li").css({ "display": "none" });
		$(".popup-hidden > ul").eq(tabIndex).find(" > li").eq(txtPhoto).css({ "display": "block" }).find("> ul > li").eq(scretNumber).css({ "display": "block" });

		var goTop = $(".the_dream_chapter-eternity .album-detail .album-photo .popup-hidden ul").eq(tabIndex).offset().top - $("header").outerHeight();
		var speed = Math.abs(scrollTop - goTop);
		$("html, body").stop().stop().animate({ "scrollTop": goTop + "px" }, speed, 'swing');

		return false;
	});




	$(".the_dream_chapter-eternity .album-detail .album-photo .popup-hidden .popup-btn .btn-close").click(function () {
		$(".popup-bg-white").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});
		$(".popup-hidden").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});
	});


	$(".popup-bg-white").click(function () {
		$(".popup-bg-white").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});
		$(".popup-hidden").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});
		return false;
	});

	$(".the_dream_chapter-eternity .album-detail .album-photo .popup-hidden").click(function () {
		$(".popup-bg-white").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});
		$(".popup-hidden").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});
		return false;
	});

	$(".the_dream_chapter-eternity .album-detail .album-photo .popup-hidden ul > li").click(function () {
		return false;
	});

	$(".the_dream_chapter-eternity .album-detail .album-photo .popup .popup-btn button.btn-down").click(function () {
		var dataFile = "";
		var tabIndex = 0;
		//var pathIdx = $(this).parents("ul").index();

		if (viewportWidth() > 768) {
			tabIndex = $(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li.active").index();
		} else {
			tabIndex = $(this).parent().parent().parent().index();
			tabIndex++;
		}

		var txtPhoto = albumPhoto_idx[tabIndex];

		tabIndex--;

		if ($(this).parents(".popup").hasClass("popup-hidden")) {
			dataFile = $(".popup-hidden > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").eq(scretNumber).attr("data-file");
		} else {
			dataFile = $(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").eq(dataNumber).attr("data-file");
		}

		var path = $(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li").eq(tabIndex + 1).find("h3").text().toLowerCase();


		if (dataFile != "") {
			dataFile = dataFile + ".jpg";
			if (check_ios() != "") {
				window.open("https://ibighit.com/txt/images/the_dream_chapter-eternity/" + path + "/" + dataFile);
			} else {
				cfDownload("https://ibighit.com/txt/images/the_dream_chapter-eternity/", path + "/" + dataFile);
				// document.getElementById("hiddenFrame").src="./../../../../txt/common/fileDownload_eternity.html?p=" + path + "&f=" + dataFile;
			}
		}
		return false;
	});

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var txtMember = ["group", "yeonjun", "beomgyu", "soobin", "taehyun", "hueningkai"];
	$(".the_dream_chapter-eternity .album-detail .album-photo .popup-photo ul > li > ul > li a.move_feed").click(function () {
		var tabIndex = 0;
		if (viewportWidth() > 768) {
			tabIndex = $(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li.active").index();
		} else {
			tabIndex = $(this).parent().parent().parent().parent().index();
			tabIndex++;
		}
		var txtPhoto = albumPhoto_idx[tabIndex];

		var DataMember = $(this).attr("data-member");
		var memberIndex = 0;
		var i = 0;
		for (var i = 0; i < txtMember.length; i++) {
			if (txtMember[i] == DataMember) {
				memberIndex = i
			}
		}

		if (txtPhoto > memberIndex) {
			$(".album-detail .album-photo .slide-wrap > ul > li").eq(tabIndex).find("li").eq(txtPhoto).animate({ "margin-left": "100%" }, motionDelay);
			$(".album-detail .album-photo .slide-wrap > ul > li").eq(tabIndex).find("li").eq(memberIndex).css({ "margin-left": "-100%" }).animate({ "margin-left": "0%" }, motionDelay);
		} else if (txtPhoto < memberIndex) {
			$(".album-detail .album-photo .slide-wrap > ul > li").eq(tabIndex).find("li").eq(txtPhoto).animate({ "margin-left": "-100%" }, motionDelay);
			$(".album-detail .album-photo .slide-wrap > ul > li").eq(tabIndex).find("li").eq(memberIndex).css({ "margin-left": "100%" }).animate({ "margin-left": "0%" }, motionDelay);
		}

		$(".popup-bg").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});
		$(".popup-photo").stop().animate({ "opacity": 0 }, motionDelay, function () {
			$(this).css({ "display": "none" });
		});

		albumPhoto_idx[tabIndex] = memberIndex;
		return false;
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	$(".the_dream_chapter-eternity .album-detail .album-photo .popup-photo > ul").swipe({
		swipeStatus: function (event, phase, direction, distance, duration, fingerCount, fingerData) {
		},
		swipe: function (event, phase, direction, distance, duration, fingerCount, fingerData) {
			if (distance > 50 && !popupShow) {
				if (direction == "left" || phase == "left" || direction == "right" || phase == "right") {
					if ((direction == "left" || phase == "left")) {
						if (!motionIng) {
							motionIng = true;

							var tabIndex = 0;
							if (viewportWidth() > 768) {
								tabIndex = $(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li.active").index();
							} else {
								tabIndex = $(this).index() + 1;
							}
							var txtPhoto = albumPhoto_idx[tabIndex];
							tabIndex--;

							$(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").eq(dataNumber).stop().animate({ "margin-left": "-100%" }, motionDelay);
							dataNumber++;
							var maxLayer = $(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").length;

							if (dataNumber == maxLayer) {
								dataNumber = 0;
							}
							$(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").eq(dataNumber).css({ "margin-left": "100%" }).stop().animate({ "margin-left": "0px" }, motionDelay);

							setTimeout(function () {
								motionIng = false;
							}, motionDelay);
						}
					} else if ((direction == "right" || phase == "right")) {
						if (!motionIng) {
							motionIng = true;

							var tabIndex = 0;
							if (viewportWidth() > 768) {
								tabIndex = $(".the_dream_chapter-eternity .album-detail .album-photo .bottom ul li.active").index();
							} else {
								tabIndex = $(this).index() + 1;
							}

							var txtPhoto = albumPhoto_idx[tabIndex];
							tabIndex--;

							$(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").eq(dataNumber).stop().animate({ "margin-left": "100%" }, motionDelay);
							dataNumber--;
							var maxLayer = $(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").length;
							if (dataNumber < 0) {
								dataNumber = maxLayer - 1;
							}
							$(".popup-photo > ul").eq(tabIndex).find(" > li").eq(txtPhoto).find("> ul > li").eq(dataNumber).css({ "margin-left": "-100%" }).stop().animate({ "margin-left": "0px" }, motionDelay);

							setTimeout(function () {
								motionIng = false;
							}, motionDelay);
						}
					}
				}
			}
		}, allowPageScroll: "vertical"
	});
});
