var bannerboy = bannerboy || {};
bannerboy.main = function() {

	var width = 375;
	var height = 375;
	var banner = bannerboy.createElement({id: "banner", width: width, height: height, backgroundColor: "#999", overflow: "hidden", cursor: "pointer", parent: document.body});

	var images = [];

	bannerboy.preloadImages(images, function() {

		/* Create elements
		================================================= */
		var logo = bannerboy.createElement({backgroundImage: "logo.png", left: 108, top: 179, retina: true, parent: banner});


		var strokeContainer = bannerboy.createElement({left: 109, opacity: 1, top: 118, scale: 1.345/2.9, parent: banner});
			var svg = bannerboy.createElement({innerHTML: bannerboy.svg, parent: strokeContainer});

		var frame_1 = document.getElementById("frame_1");
		var frame_2 = document.getElementById("frame_2");
		var frame_3 = document.getElementById("frame_3");

		TweenMax.set([frame_2, frame_3], {autoAlpha: 0});

		var stroke_1 = frame_1.getElementsByTagName("*")[0];
		var stroke_2 = frame_1.getElementsByTagName("*")[1];
		var stroke_3 = frame_1.getElementsByTagName("*")[2];
		var stroke_4 = frame_1.getElementsByTagName("*")[3];
		var stroke_5 = frame_1.getElementsByTagName("*")[4];
		var stroke_6 = frame_1.getElementsByTagName("*")[5];

		var strokeArray = [
			stroke_1,
			stroke_2,
			stroke_3,
			stroke_4,
			stroke_5,
			stroke_6,
		];


		/* Initiate
		================================================= */
		animations();
		timeline();
		interaction();

		/* Animations
		================================================= */


		function timeline() {
			// create main_tl here
			main_tl = new BBTimeline()
				.add(stroke_1.tl)
				.chain(.1)
				.from(logo, .7, {alpha: 0})
		}

		function animations() {
			// add animations that will go into main_tl here

			function strokeIn(element, element_number) {
				return new BBTimeline()
					.from(element, 0.1, {opacity: 0})
					.to(element, .99, {morphSVG: frame_2.getElementsByTagName("*")[element_number], ease: Power3.easeOut})				
			};

			function strokeOut(element, element_number, speedFactor, shapeIndex) {
				return new BBTimeline()
					.to(element, .98*speedFactor, {morphSVG: {shape: frame_3.getElementsByTagName("*")[element_number], shapeIndex: shapeIndex || 0}, ease: Power1.easeIn})				
			};

			function fadeOut() {
				return new BBTimeline()
				.staggerTo(strokeArray, 0.3, {opacity: 0}, 0.06)
			}

			stroke_1.tl = new BBTimeline()
				.add(strokeIn(stroke_1, 0))
				.chain(-0.8)
				.add(strokeIn(stroke_2, 1))
				.chain(-0.8)
				.add(strokeIn(stroke_3, 2))
				.chain(-0.85)
				.add(strokeIn(stroke_4, 3))
				.chain(-0.85)
				.add(strokeIn(stroke_5, 4))
				.chain(-0.85)
				.add(strokeIn(stroke_6, 5))
				.chain(-1.05)
				.add(strokeOut(stroke_1, 0, 0.96))
				.chain(-0.92)
				.add(strokeOut(stroke_2, 1, 1.03))
				.chain(-0.95)
				.add(strokeOut(stroke_3, 2, 1.06))
				.chain(-0.87)
				.add(strokeOut(stroke_4, 3, 0.89))
				.chain(-0.85)
				.add(strokeOut(stroke_5, 4, 0.93))
				.chain(-0.85)
				.add(strokeOut(stroke_6, 5, 0.92))
				.chain(-0.4)
				.add(fadeOut())
		}

		/* Interactions
		================================================= */
		function interaction() {
			// click logic goes here
			banner.onclick = function() {
				
			};
		}

		/* Helpers
		================================================= */

		/* Scrubber
		================================================= */
		function scrubber(tl) {
			if (window.location.origin == "file://") {
				bannerboy.include(["../bannerboy_scrubber.min.js"], function() {
					if (bannerboy.scrubberController) bannerboy.scrubberController.create({"main timeline": tl});
				});
			}
		}
	});
};