/*
 * jQuery FlexSlider v1.8
 * http://flex.madebymufffin.com
 * Copyright 2011, Tyler Smith
 */
(function (a) { a.flexslider = function (c, b) { var d = c; d.init = function () { d.vars = a.extend({}, a.flexslider.defaults, b); d.data("flexslider", true); d.container = a(".slides", d); d.slides = a(".slides > li", d); d.count = d.slides.length; d.animating = false; d.currentSlide = d.vars.slideToStart; d.animatingTo = d.currentSlide; d.atEnd = (d.currentSlide == 0) ? true : false; d.eventType = ("ontouchstart" in document.documentElement) ? "touchstart" : "click"; d.cloneCount = 0; d.cloneOffset = 0; d.manualPause = false; d.vertical = (d.vars.slideDirection == "vertical"); d.prop = (d.vertical) ? "top" : "marginLeft"; d.args = {}; d.transitions = "webkitTransition" in document.body.style; if (d.transitions) { d.prop = "-webkit-transform" } if (d.vars.controlsContainer != "") { d.controlsContainer = a(d.vars.controlsContainer).eq(a(".slides").index(d.container)); d.containerExists = d.controlsContainer.length > 0 } if (d.vars.manualControls != "") { d.manualControls = a(d.vars.manualControls, ((d.containerExists) ? d.controlsContainer : d)); d.manualExists = d.manualControls.length > 0 } if (d.vars.randomize) { d.slides.sort(function () { return (Math.round(Math.random()) - 0.5) }); d.container.empty().append(d.slides) } if (d.vars.animation.toLowerCase() == "slide") { if (d.transitions) { d.setTransition(0) } d.css({ overflow: "hidden" }); if (d.vars.animationLoop) { d.cloneCount = 2; d.cloneOffset = 1; d.container.append(d.slides.filter(":first").clone().addClass("clone")).prepend(d.slides.filter(":last").clone().addClass("clone")) } d.newSlides = a(".slides > li", d); var m = (-1 * (d.currentSlide + d.cloneOffset)); if (d.vertical) { d.newSlides.css({ display: "block", width: "100%", "float": "left" }); d.container.height((d.count + d.cloneCount) * 200 + "%").css("position", "absolute").width("100%"); setTimeout(function () { d.css({ position: "relative" }).height(d.slides.filter(":first").height()); d.args[d.prop] = (d.transitions) ? "translate3d(0," + m * d.height() + "px,0)" : m * d.height() + "px"; d.container.css(d.args) }, 100) } else { d.args[d.prop] = (d.transitions) ? "translate3d(" + m * d.width() + "px,0,0)" : m * d.width() + "px"; d.container.width((d.count + d.cloneCount) * 200 + "%").css(d.args); setTimeout(function () { d.newSlides.width(d.width()).css({ "float": "left", display: "block" }) }, 100) } } else { d.transitions = false; d.slides.css({ width: "100%", "float": "left", marginRight: "-100%" }).eq(d.currentSlide).fadeIn(d.vars.animationDuration) } if (d.vars.controlNav) { if (d.manualExists) { d.controlNav = d.manualControls } else { var e = a('<ol class="flex-control-nav"></ol>'); var s = 1; for (var t = 0; t < d.count; t++) { e.append("<li><a>" + s + "</a></li>"); s++ } if (d.containerExists) { a(d.controlsContainer).append(e); d.controlNav = a(".flex-control-nav li a", d.controlsContainer) } else { d.append(e); d.controlNav = a(".flex-control-nav li a", d) } } d.controlNav.eq(d.currentSlide).addClass("active"); d.controlNav.bind(d.eventType, function (i) { i.preventDefault(); if (!a(this).hasClass("active")) { (d.controlNav.index(a(this)) > d.currentSlide) ? d.direction = "next" : d.direction = "prev"; d.flexAnimate(d.controlNav.index(a(this)), d.vars.pauseOnAction) } }) } if (d.vars.directionNav) { var v = a('<ul class="flex-direction-nav"><li><a class="prev" href="#">' + d.vars.prevText + '</a></li><li><a class="next" href="#">' + d.vars.nextText + "</a></li></ul>"); if (d.containerExists) { a(d.controlsContainer).append(v); d.directionNav = a(".flex-direction-nav li a", d.controlsContainer) } else { d.append(v); d.directionNav = a(".flex-direction-nav li a", d) } if (!d.vars.animationLoop) { if (d.currentSlide == 0) { d.directionNav.filter(".prev").addClass("disabled") } else { if (d.currentSlide == d.count - 1) { d.directionNav.filter(".next").addClass("disabled") } } } d.directionNav.bind(d.eventType, function (i) { i.preventDefault(); var j = (a(this).hasClass("next")) ? d.getTarget("next") : d.getTarget("prev"); if (d.canAdvance(j)) { d.flexAnimate(j, d.vars.pauseOnAction) } }) } if (d.vars.keyboardNav && a("ul.slides").length == 1) { function h(i) { if (d.animating) { return } else { if (i.keyCode != 39 && i.keyCode != 37) { return } else { if (i.keyCode == 39) { var j = d.getTarget("next") } else { if (i.keyCode == 37) { var j = d.getTarget("prev") } } if (d.canAdvance(j)) { d.flexAnimate(j, d.vars.pauseOnAction) } } } } a(document).bind("keyup", h) } if (d.vars.mousewheel) { d.mousewheelEvent = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"; d.bind(d.mousewheelEvent, function (y) { y.preventDefault(); y = y ? y : window.event; var i = y.detail ? y.detail * -1 : y.wheelDelta / 40, j = (i < 0) ? d.getTarget("next") : d.getTarget("prev"); if (d.canAdvance(j)) { d.flexAnimate(j, d.vars.pauseOnAction) } }) } if (d.vars.slideshow) { if (d.vars.pauseOnHover && d.vars.slideshow) { d.hover(function () { d.pause() }, function () { if (!d.manualPause) { d.resume() } }) } d.animatedSlides = setInterval(d.animateSlides, d.vars.slideshowSpeed) } if (d.vars.pausePlay) { var q = a('<div class="flex-pauseplay"><span></span></div>'); if (d.containerExists) { d.controlsContainer.append(q); d.pausePlay = a(".flex-pauseplay span", d.controlsContainer) } else { d.append(q); d.pausePlay = a(".flex-pauseplay span", d) } var n = (d.vars.slideshow) ? "pause" : "play"; d.pausePlay.addClass(n).text((n == "pause") ? d.vars.pauseText : d.vars.playText); d.pausePlay.bind(d.eventType, function (i) { i.preventDefault(); if (a(this).hasClass("pause")) { d.pause(); d.manualPause = true } else { d.resume(); d.manualPause = false } }) } if ("ontouchstart" in document.documentElement) { var w, u, l, r, o, x, p = false; d.each(function () { if ("ontouchstart" in document.documentElement) { this.addEventListener("touchstart", g, false) } }); function g(i) { if (d.animating) { i.preventDefault() } else { if (i.touches.length == 1) { d.pause(); r = (d.vertical) ? d.height() : d.width(); x = Number(new Date()); l = (d.vertical) ? (d.currentSlide + d.cloneOffset) * d.height() : (d.currentSlide + d.cloneOffset) * d.width(); w = (d.vertical) ? i.touches[0].pageY : i.touches[0].pageX; u = (d.vertical) ? i.touches[0].pageX : i.touches[0].pageY; d.setTransition(0); this.addEventListener("touchmove", k, false); this.addEventListener("touchend", f, false) } } } function k(i) { o = (d.vertical) ? w - i.touches[0].pageY : w - i.touches[0].pageX; p = (d.vertical) ? (Math.abs(o) < Math.abs(i.touches[0].pageX - u)) : (Math.abs(o) < Math.abs(i.touches[0].pageY - u)); if (!p) { i.preventDefault(); if (d.vars.animation == "slide" && d.transitions) { if (!d.vars.animationLoop) { o = o / ((d.currentSlide == 0 && o < 0 || d.currentSlide == d.count - 1 && o > 0) ? (Math.abs(o) / r + 2) : 1) } d.args[d.prop] = (d.vertical) ? "translate3d(0," + (-l - o) + "px,0)" : "translate3d(" + (-l - o) + "px,0,0)"; d.container.css(d.args) } } } function f(j) { d.animating = false; if (d.animatingTo == d.currentSlide && !p && !(o == null)) { var i = (o > 0) ? d.getTarget("next") : d.getTarget("prev"); if (d.canAdvance(i) && Number(new Date()) - x < 550 && Math.abs(o) > 20 || Math.abs(o) > r / 2) { d.flexAnimate(i, d.vars.pauseOnAction) } else { d.flexAnimate(d.currentSlide, d.vars.pauseOnAction) } } this.removeEventListener("touchmove", k, false); this.removeEventListener("touchend", f, false); w = null; u = null; o = null; l = null } } if (d.vars.animation.toLowerCase() == "slide") { a(window).resize(function () { if (!d.animating) { if (d.vertical) { d.height(d.slides.filter(":first").height()); d.args[d.prop] = (-1 * (d.currentSlide + d.cloneOffset)) * d.slides.filter(":first").height() + "px"; if (d.transitions) { d.setTransition(0); d.args[d.prop] = (d.vertical) ? "translate3d(0," + d.args[d.prop] + ",0)" : "translate3d(" + d.args[d.prop] + ",0,0)" } d.container.css(d.args) } else { d.newSlides.width(d.width()); d.args[d.prop] = (-1 * (d.currentSlide + d.cloneOffset)) * d.width() + "px"; if (d.transitions) { d.setTransition(0); d.args[d.prop] = (d.vertical) ? "translate3d(0," + d.args[d.prop] + ",0)" : "translate3d(" + d.args[d.prop] + ",0,0)" } d.container.css(d.args) } } }) } d.vars.start(d) }; d.flexAnimate = function (g, f) { if (!d.animating) { d.animating = true; d.animatingTo = g; d.vars.before(d); if (f) { d.pause() } if (d.vars.controlNav) { d.controlNav.removeClass("active").eq(g).addClass("active") } d.atEnd = (g == 0 || g == d.count - 1) ? true : false; if (!d.vars.animationLoop && d.vars.directionNav) { if (g == 0) { d.directionNav.removeClass("disabled").filter(".prev").addClass("disabled") } else { if (g == d.count - 1) { d.directionNav.removeClass("disabled").filter(".next").addClass("disabled") } else { d.directionNav.removeClass("disabled") } } } if (!d.vars.animationLoop && g == d.count - 1) { d.pause(); d.vars.end(d) } if (d.vars.animation.toLowerCase() == "slide") { var e = (d.vertical) ? d.slides.filter(":first").height() : d.slides.filter(":first").width(); if (d.currentSlide == 0 && g == d.count - 1 && d.vars.animationLoop && d.direction != "next") { d.slideString = "0px" } else { if (d.currentSlide == d.count - 1 && g == 0 && d.vars.animationLoop && d.direction != "prev") { d.slideString = (-1 * (d.count + 1)) * e + "px" } else { d.slideString = (-1 * (g + d.cloneOffset)) * e + "px" } } d.args[d.prop] = d.slideString; if (d.transitions) { d.setTransition(d.vars.animationDuration); d.args[d.prop] = (d.vertical) ? "translate3d(0," + d.slideString + ",0)" : "translate3d(" + d.slideString + ",0,0)"; d.container.css(d.args).one("webkitTransitionEnd transitionend", function () { d.wrapup(e) }) } else { d.container.animate(d.args, d.vars.animationDuration, function () { d.wrapup(e) }) } } else { d.slides.eq(d.currentSlide).fadeOut(d.vars.animationDuration); d.slides.eq(g).fadeIn(d.vars.animationDuration, function () { d.wrapup() }) } } }; d.wrapup = function (e) { if (d.vars.animation == "slide") { if (d.currentSlide == 0 && d.animatingTo == d.count - 1 && d.vars.animationLoop) { d.args[d.prop] = (-1 * d.count) * e + "px"; if (d.transitions) { d.setTransition(0); d.args[d.prop] = (d.vertical) ? "translate3d(0," + d.args[d.prop] + ",0)" : "translate3d(" + d.args[d.prop] + ",0,0)" } d.container.css(d.args) } else { if (d.currentSlide == d.count - 1 && d.animatingTo == 0 && d.vars.animationLoop) { d.args[d.prop] = -1 * e + "px"; if (d.transitions) { d.setTransition(0); d.args[d.prop] = (d.vertical) ? "translate3d(0," + d.args[d.prop] + ",0)" : "translate3d(" + d.args[d.prop] + ",0,0)" } d.container.css(d.args) } } } d.animating = false; d.currentSlide = d.animatingTo; d.vars.after(d) }; d.animateSlides = function () { if (!d.animating) { d.flexAnimate(d.getTarget("next")) } }; d.pause = function () { clearInterval(d.animatedSlides); if (d.vars.pausePlay) { d.pausePlay.removeClass("pause").addClass("play").text(d.vars.playText) } }; d.resume = function () { d.animatedSlides = setInterval(d.animateSlides, d.vars.slideshowSpeed); if (d.vars.pausePlay) { d.pausePlay.removeClass("play").addClass("pause").text(d.vars.pauseText) } }; d.canAdvance = function (e) { if (!d.vars.animationLoop && d.atEnd) { if (d.currentSlide == 0 && e == d.count - 1 && d.direction != "next") { return false } else { if (d.currentSlide == d.count - 1 && e == 0 && d.direction == "next") { return false } else { return true } } } else { return true } }; d.getTarget = function (e) { d.direction = e; if (e == "next") { return (d.currentSlide == d.count - 1) ? 0 : d.currentSlide + 1 } else { return (d.currentSlide == 0) ? d.count - 1 : d.currentSlide - 1 } }; d.setTransition = function (e) { d.container.css({ "-webkit-transition-duration": (e / 1000) + "s" }) }; d.init() }; a.flexslider.defaults = { animation: "fade", slideDirection: "horizontal", slideshow: true, slideshowSpeed: 7000, animationDuration: 600, directionNav: true, controlNav: true, keyboardNav: true, mousewheel: false, prevText: "Previous", nextText: "Next", pausePlay: false, pauseText: "Pause", playText: "Play", randomize: false, slideToStart: 0, animationLoop: true, pauseOnAction: true, pauseOnHover: false, controlsContainer: "", manualControls: "", start: function () { }, before: function () { }, after: function () { }, end: function () { } }; a.fn.flexslider = function (b) { return this.each(function () { if (a(this).find(".slides li").length == 1) { a(this).find(".slides li").fadeIn(400) } else { if (a(this).data("flexslider") != true) { new a.flexslider(a(this), b) } } }) } })(jQuery);;
jQuery(function ($) {
    $(window).load(function () {

        //homepage slides
        $('.flexslider').flexslider({
            animation: "fade", //Select your animation type (fade/slide)
            slideshow: true, //Should the slider animate automatically by default? (true/false)
            slideshowSpeed: 6000, //Set the speed of the slideshow cycling, in milliseconds
            animationDuration: 600, //Set the speed of animations, in milliseconds
            directionNav: true, //Create navigation for previous/next navigation? (true/false)
            controlNav: false, //Create navigation for paging control of each slide? (true/false)
            keyboardNav: true, //Allow for keyboard navigation using left/right keys (true/false)
            touchSwipe: true, //Touch swipe gestures for left/right slide navigation (true/false)
            prevText: '<span class="awesome-icon-chevron-left"></span>', //Set the text for the "previous" directionNav item
            nextText: '<span class="awesome-icon-chevron-right"></span>', //Set the text for the "next" directionNav item
            randomize: false, //Randomize slide order on page load? (true/false)
            animationLoop: true, //Should the animation loop? If false, directionNav will received disabled classes when at either end (true/false)
            pauseOnAction: true, //Pause the slideshow when interacting with control elements, highly recommended. (true/false)
            pauseOnHover: false, //Pause the slideshow when hovering over slider, then resume when no longer hovering (true/false)
        });

    });// END window load
});// END function;
/*!
	jQuery Colorbox v1.4.21 - 2013-06-06
	(c) 2013 Jack Moore - jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function (t, e, i) { function o(i, o, n) { var r = e.createElement(i); return o && (r.id = te + o), n && (r.style.cssText = n), t(r) } function n() { return i.innerHeight ? i.innerHeight : t(i).height() } function r(t) { var e = E.length, i = (j + t) % e; return 0 > i ? e + i : i } function h(t, e) { return Math.round((/%/.test(t) ? ("x" === e ? H.width() : n()) / 100 : 1) * parseInt(t, 10)) } function l(t, e) { return t.photo || t.photoRegex.test(e) } function s(t, e) { return t.retinaUrl && i.devicePixelRatio > 1 ? e.replace(t.photoRegex, t.retinaSuffix) : e } function a(t) { "contains" in y[0] && !y[0].contains(t.target) && (t.stopPropagation(), y.focus()) } function d() { var e, i = t.data(A, Z); null == i ? (_ = t.extend({}, Y), console && console.log && console.log("Error: cboxElement missing settings object")) : _ = t.extend({}, i); for (e in _) t.isFunction(_[e]) && "on" !== e.slice(0, 2) && (_[e] = _[e].call(A)); _.rel = _.rel || A.rel || t(A).data("rel") || "nofollow", _.href = _.href || t(A).attr("href"), _.title = _.title || A.title, "string" == typeof _.href && (_.href = t.trim(_.href)) } function c(i, o) { t(e).trigger(i), se.trigger(i), t.isFunction(o) && o.call(A) } function u() { var t, e, i, o, n, r = te + "Slideshow_", h = "click." + te; _.slideshow && E[1] ? (e = function () { clearTimeout(t) }, i = function () { (_.loop || E[j + 1]) && (t = setTimeout(J.next, _.slideshowSpeed)) }, o = function () { R.html(_.slideshowStop).unbind(h).one(h, n), se.bind(ne, i).bind(oe, e).bind(re, n), y.removeClass(r + "off").addClass(r + "on") }, n = function () { e(), se.unbind(ne, i).unbind(oe, e).unbind(re, n), R.html(_.slideshowStart).unbind(h).one(h, function () { J.next(), o() }), y.removeClass(r + "on").addClass(r + "off") }, _.slideshowAuto ? o() : n()) : y.removeClass(r + "off " + r + "on") } function f(i) { G || (A = i, d(), E = t(A), j = 0, "nofollow" !== _.rel && (E = t("." + ee).filter(function () { var e, i = t.data(this, Z); return i && (e = t(this).data("rel") || i.rel || this.rel), e === _.rel }), j = E.index(A), -1 === j && (E = E.add(A), j = E.length - 1)), g.css({ opacity: parseFloat(_.opacity), cursor: _.overlayClose ? "pointer" : "auto", visibility: "visible" }).show(), V && y.add(g).removeClass(V), _.className && y.add(g).addClass(_.className), V = _.className, P.html(_.close).show(), $ || ($ = q = !0, y.css({ visibility: "hidden", display: "block" }), W = o(ae, "LoadedContent", "width:0; height:0; overflow:hidden").appendTo(v), D = b.height() + k.height() + v.outerHeight(!0) - v.height(), B = T.width() + C.width() + v.outerWidth(!0) - v.width(), N = W.outerHeight(!0), z = W.outerWidth(!0), _.w = h(_.initialWidth, "x"), _.h = h(_.initialHeight, "y"), J.position(), u(), c(ie, _.onOpen), O.add(S).hide(), y.focus(), _.trapFocus && e.addEventListener && (e.addEventListener("focus", a, !0), se.one(he, function () { e.removeEventListener("focus", a, !0) })), _.returnFocus && se.one(he, function () { t(A).focus() })), w()) } function p() { !y && e.body && (X = !1, H = t(i), y = o(ae).attr({ id: Z, "class": t.support.opacity === !1 ? te + "IE" : "", role: "dialog", tabindex: "-1" }).hide(), g = o(ae, "Overlay").hide(), L = o(ae, "LoadingOverlay").add(o(ae, "LoadingGraphic")), x = o(ae, "Wrapper"), v = o(ae, "Content").append(S = o(ae, "Title"), M = o(ae, "Current"), K = t('<button type="button"/>').attr({ id: te + "Previous" }), I = t('<button type="button"/>').attr({ id: te + "Next" }), R = o("button", "Slideshow"), L, P = t('<button type="button"/>').attr({ id: te + "Close" })), x.append(o(ae).append(o(ae, "TopLeft"), b = o(ae, "TopCenter"), o(ae, "TopRight")), o(ae, !1, "clear:left").append(T = o(ae, "MiddleLeft"), v, C = o(ae, "MiddleRight")), o(ae, !1, "clear:left").append(o(ae, "BottomLeft"), k = o(ae, "BottomCenter"), o(ae, "BottomRight"))).find("div div").css({ "float": "left" }), F = o(ae, !1, "position:absolute; width:9999px; visibility:hidden; display:none"), O = I.add(K).add(M).add(R), t(e.body).append(g, y.append(x, F))) } function m() { function i(t) { t.which > 1 || t.shiftKey || t.altKey || t.metaKey || t.ctrlKey || (t.preventDefault(), f(this)) } return y ? (X || (X = !0, I.click(function () { J.next() }), K.click(function () { J.prev() }), P.click(function () { J.close() }), g.click(function () { _.overlayClose && J.close() }), t(e).bind("keydown." + te, function (t) { var e = t.keyCode; $ && _.escKey && 27 === e && (t.preventDefault(), J.close()), $ && _.arrowKey && E[1] && !t.altKey && (37 === e ? (t.preventDefault(), K.click()) : 39 === e && (t.preventDefault(), I.click())) }), t.isFunction(t.fn.on) ? t(e).on("click." + te, "." + ee, i) : t("." + ee).live("click." + te, i)), !0) : !1 } function w() { var n, r, a, u = J.prep, f = ++de; q = !0, U = !1, A = E[j], d(), c(le), c(oe, _.onLoad), _.h = _.height ? h(_.height, "y") - N - D : _.innerHeight && h(_.innerHeight, "y"), _.w = _.width ? h(_.width, "x") - z - B : _.innerWidth && h(_.innerWidth, "x"), _.mw = _.w, _.mh = _.h, _.maxWidth && (_.mw = h(_.maxWidth, "x") - z - B, _.mw = _.w && _.w < _.mw ? _.w : _.mw), _.maxHeight && (_.mh = h(_.maxHeight, "y") - N - D, _.mh = _.h && _.h < _.mh ? _.h : _.mh), n = _.href, Q = setTimeout(function () { L.show() }, 100), _.inline ? (a = o(ae).hide().insertBefore(t(n)[0]), se.one(le, function () { a.replaceWith(W.children()) }), u(t(n))) : _.iframe ? u(" ") : _.html ? u(_.html) : l(_, n) ? (n = s(_, n), U = e.createElement("img"), t(U).addClass(te + "Photo").bind("error", function () { _.title = !1, u(o(ae, "Error").html(_.imgError)) }).one("load", function () { var e; f === de && (U.alt = t(A).attr("alt") || t(A).attr("data-alt") || "", _.retinaImage && i.devicePixelRatio > 1 && (U.height = U.height / i.devicePixelRatio, U.width = U.width / i.devicePixelRatio), _.scalePhotos && (r = function () { U.height -= U.height * e, U.width -= U.width * e }, _.mw && U.width > _.mw && (e = (U.width - _.mw) / U.width, r()), _.mh && U.height > _.mh && (e = (U.height - _.mh) / U.height, r())), _.h && (U.style.marginTop = Math.max(_.mh - U.height, 0) / 2 + "px"), E[1] && (_.loop || E[j + 1]) && (U.style.cursor = "pointer", U.onclick = function () { J.next() }), U.style.width = U.width + "px", U.style.height = U.height + "px", setTimeout(function () { u(U) }, 1)) }), setTimeout(function () { U.src = n }, 1)) : n && F.load(n, _.data, function (e, i) { f === de && u("error" === i ? o(ae, "Error").html(_.xhrError) : t(this).contents()) }) } var g, y, x, v, b, T, C, k, E, H, W, F, L, S, M, R, I, K, P, O, _, D, B, N, z, A, j, U, $, q, G, Q, J, V, X, Y = { transition: "elastic", speed: 300, fadeOut: 300, width: !1, initialWidth: "600", innerWidth: !1, maxWidth: !1, height: !1, initialHeight: "450", innerHeight: !1, maxHeight: !1, scalePhotos: !0, scrolling: !0, inline: !1, html: !1, iframe: !1, fastIframe: !0, photo: !1, href: !1, title: !1, rel: !1, opacity: .9, preloading: !0, className: !1, retinaImage: !1, retinaUrl: !1, retinaSuffix: "@2x.$1", current: "image {current} of {total}", previous: "previous", next: "next", close: "close", xhrError: "This content failed to load.", imgError: "This image failed to load.", open: !1, returnFocus: !0, trapFocus: !0, reposition: !0, loop: !0, slideshow: !1, slideshowAuto: !0, slideshowSpeed: 2500, slideshowStart: "start slideshow", slideshowStop: "stop slideshow", photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp)((#|\?).*)?$/i, onOpen: !1, onLoad: !1, onComplete: !1, onCleanup: !1, onClosed: !1, overlayClose: !0, escKey: !0, arrowKey: !0, top: !1, bottom: !1, left: !1, right: !1, fixed: !1, data: void 0 }, Z = "colorbox", te = "cbox", ee = te + "Element", ie = te + "_open", oe = te + "_load", ne = te + "_complete", re = te + "_cleanup", he = te + "_closed", le = te + "_purge", se = t("<a/>"), ae = "div", de = 0; t.colorbox || (t(p), J = t.fn[Z] = t[Z] = function (e, i) { var o = this; if (e = e || {}, p(), m()) { if (t.isFunction(o)) o = t("<a/>"), e.open = !0; else if (!o[0]) return o; i && (e.onComplete = i), o.each(function () { t.data(this, Z, t.extend({}, t.data(this, Z) || Y, e)) }).addClass(ee), (t.isFunction(e.open) && e.open.call(o) || e.open) && f(o[0]) } return o }, J.position = function (t, e) { function i(t) { b[0].style.width = k[0].style.width = v[0].style.width = parseInt(t.style.width, 10) - B + "px", v[0].style.height = T[0].style.height = C[0].style.height = parseInt(t.style.height, 10) - D + "px" } var o, r, l, s = 0, a = 0, d = y.offset(); H.unbind("resize." + te), y.css({ top: -9e4, left: -9e4 }), r = H.scrollTop(), l = H.scrollLeft(), _.fixed ? (d.top -= r, d.left -= l, y.css({ position: "fixed" })) : (s = r, a = l, y.css({ position: "absolute" })), a += _.right !== !1 ? Math.max(H.width() - _.w - z - B - h(_.right, "x"), 0) : _.left !== !1 ? h(_.left, "x") : Math.round(Math.max(H.width() - _.w - z - B, 0) / 2), s += _.bottom !== !1 ? Math.max(n() - _.h - N - D - h(_.bottom, "y"), 0) : _.top !== !1 ? h(_.top, "y") : Math.round(Math.max(n() - _.h - N - D, 0) / 2), y.css({ top: d.top, left: d.left, visibility: "visible" }), t = y.width() === _.w + z && y.height() === _.h + N ? 0 : t || 0, x[0].style.width = x[0].style.height = "9999px", o = { width: _.w + z + B, height: _.h + N + D, top: s, left: a }, 0 === t && y.css(o), y.dequeue().animate(o, { duration: t, complete: function () { i(this), q = !1, x[0].style.width = _.w + z + B + "px", x[0].style.height = _.h + N + D + "px", _.reposition && setTimeout(function () { H.bind("resize." + te, J.position) }, 1), e && e() }, step: function () { i(this) } }) }, J.resize = function (t) { var e; $ && (t = t || {}, t.width && (_.w = h(t.width, "x") - z - B), t.innerWidth && (_.w = h(t.innerWidth, "x")), W.css({ width: _.w }), t.height && (_.h = h(t.height, "y") - N - D), t.innerHeight && (_.h = h(t.innerHeight, "y")), t.innerHeight || t.height || (e = W.scrollTop(), W.css({ height: "auto" }), _.h = W.height()), W.css({ height: _.h }), e && W.scrollTop(e), J.position("none" === _.transition ? 0 : _.speed)) }, J.prep = function (i) { function n() { return _.w = _.w || W.width(), _.w = _.mw && _.mw < _.w ? _.mw : _.w, _.w } function h() { return _.h = _.h || W.height(), _.h = _.mh && _.mh < _.h ? _.mh : _.h, _.h } if ($) { var a, d = "none" === _.transition ? 0 : _.speed; W.empty().remove(), W = o(ae, "LoadedContent").append(i), W.hide().appendTo(F.show()).css({ width: n(), overflow: _.scrolling ? "auto" : "hidden" }).css({ height: h() }).prependTo(v), F.hide(), t(U).css({ "float": "none" }), a = function () { function i() { t.support.opacity === !1 && y[0].style.removeAttribute("filter") } var n, h, a = E.length, u = "frameBorder", f = "allowTransparency"; $ && (h = function () { clearTimeout(Q), L.hide(), c(ne, _.onComplete) }, S.html(_.title).add(W).show(), a > 1 ? ("string" == typeof _.current && M.html(_.current.replace("{current}", j + 1).replace("{total}", a)).show(), I[_.loop || a - 1 > j ? "show" : "hide"]().html(_.next), K[_.loop || j ? "show" : "hide"]().html(_.previous), _.slideshow && R.show(), _.preloading && t.each([r(-1), r(1)], function () { var i, o, n = E[this], r = t.data(n, Z); r && r.href ? (i = r.href, t.isFunction(i) && (i = i.call(n))) : i = t(n).attr("href"), i && l(r, i) && (i = s(r, i), o = e.createElement("img"), o.src = i) })) : O.hide(), _.iframe ? (n = o("iframe")[0], u in n && (n[u] = 0), f in n && (n[f] = "true"), _.scrolling || (n.scrolling = "no"), t(n).attr({ src: _.href, name: (new Date).getTime(), "class": te + "Iframe", allowFullScreen: !0, webkitAllowFullScreen: !0, mozallowfullscreen: !0 }).one("load", h).appendTo(W), se.one(le, function () { n.src = "//about:blank" }), _.fastIframe && t(n).trigger("load")) : h(), "fade" === _.transition ? y.fadeTo(d, 1, i) : i()) }, "fade" === _.transition ? y.fadeTo(d, 0, function () { J.position(0, a) }) : J.position(d, a) } }, J.next = function () { !q && E[1] && (_.loop || E[j + 1]) && (j = r(1), f(E[j])) }, J.prev = function () { !q && E[1] && (_.loop || j) && (j = r(-1), f(E[j])) }, J.close = function () { $ && !G && (G = !0, $ = !1, c(re, _.onCleanup), H.unbind("." + te), g.fadeTo(_.fadeOut || 0, 0), y.stop().fadeTo(_.fadeOut || 0, 0, function () { y.add(g).css({ opacity: 1, cursor: "auto" }).hide(), c(le), W.empty().remove(), setTimeout(function () { G = !1, c(he, _.onClosed) }, 1) })) }, J.remove = function () { y && (y.stop(), t.colorbox.close(), y.stop().remove(), g.remove(), G = !1, y = null, t("." + ee).removeData(Z).removeClass(ee), t(e).unbind("click." + te)) }, J.element = function () { return t(A) }, J.settings = Y) })(jQuery, document, window);;
(function ($) {

    Drupal.behaviors.initColorbox = {
        attach: function (context, settings) {
            if (!$.isFunction($.colorbox)) {
                return;
            }
            $('.colorbox', context)
              .once('init-colorbox')
              .colorbox(settings.colorbox);
        }
    };

    {
        $(document).bind('cbox_complete', function () {
            Drupal.attachBehaviors('#cboxLoadedContent');
        });
    }

})(jQuery);
;
(function ($) {

    Drupal.behaviors.initColorboxDefaultStyle = {
        attach: function (context, settings) {
            $(document).bind('cbox_complete', function () {
                // Only run if there is a title.
                if ($('#cboxTitle:empty', context).length == false) {
                    $('#cboxLoadedContent img', context).bind('mouseover', function () {
                        $('#cboxTitle', context).slideDown();
                    });
                    $('#cboxOverlay', context).bind('mouseover', function () {
                        $('#cboxTitle', context).slideUp();
                    });
                }
                else {
                    $('#cboxTitle', context).hide();
                }
            });
        }
    };

})(jQuery);
;

(function ($) {
    Drupal.Panels = Drupal.Panels || {};

    Drupal.Panels.autoAttach = function () {
        if ($.browser.msie) {
            // If IE, attach a hover event so we can see our admin links.
            $("div.panel-pane").hover(
              function () {
                  $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
              },
              function () {
                  $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
              }
            );
            $("div.admin-links").hover(
              function () {
                  $(this).addClass("admin-links-hover"); return true;
              },
              function () {
                  $(this).removeClass("admin-links-hover"); return true;
              }
            );
        }
    };

    $(Drupal.Panels.autoAttach);
})(jQuery);
;
(function ($) {
    Drupal.viewsSlideshow = Drupal.viewsSlideshow || {};

    /**
     * Views Slideshow Controls
     */
    Drupal.viewsSlideshowControls = Drupal.viewsSlideshowControls || {};

    /**
     * Implement the play hook for controls.
     */
    Drupal.viewsSlideshowControls.play = function (options) {
        // Route the control call to the correct control type.
        // Need to use try catch so we don't have to check to make sure every part
        // of the object is defined.
        try {
            if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].play == 'function') {
                Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].play(options);
            }
        }
        catch (err) {
            // Don't need to do anything on error.
        }

        try {
            if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].play == 'function') {
                Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].play(options);
            }
        }
        catch (err) {
            // Don't need to do anything on error.
        }
    };

    /**
     * Implement the pause hook for controls.
     */
    Drupal.viewsSlideshowControls.pause = function (options) {
        // Route the control call to the correct control type.
        // Need to use try catch so we don't have to check to make sure every part
        // of the object is defined.
        try {
            if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].pause == 'function') {
                Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].pause(options);
            }
        }
        catch (err) {
            // Don't need to do anything on error.
        }

        try {
            if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].pause == 'function') {
                Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].pause(options);
            }
        }
        catch (err) {
            // Don't need to do anything on error.
        }
    };


    /**
     * Views Slideshow Text Controls
     */

    // Add views slieshow api calls for views slideshow text controls.
    Drupal.behaviors.viewsSlideshowControlsText = {
        attach: function (context) {

            // Process previous link
            $('.views_slideshow_controls_text_previous:not(.views-slideshow-controls-text-previous-processed)', context).addClass('views-slideshow-controls-text-previous-processed').each(function () {
                var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_previous_', '');
                $(this).click(function () {
                    Drupal.viewsSlideshow.action({ "action": 'previousSlide', "slideshowID": uniqueID });
                    return false;
                });
            });

            // Process next link
            $('.views_slideshow_controls_text_next:not(.views-slideshow-controls-text-next-processed)', context).addClass('views-slideshow-controls-text-next-processed').each(function () {
                var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_next_', '');
                $(this).click(function () {
                    Drupal.viewsSlideshow.action({ "action": 'nextSlide', "slideshowID": uniqueID });
                    return false;
                });
            });

            // Process pause link
            $('.views_slideshow_controls_text_pause:not(.views-slideshow-controls-text-pause-processed)', context).addClass('views-slideshow-controls-text-pause-processed').each(function () {
                var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_pause_', '');
                $(this).click(function () {
                    if (Drupal.settings.viewsSlideshow[uniqueID].paused) {
                        Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": uniqueID, "force": true });
                    }
                    else {
                        Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": uniqueID, "force": true });
                    }
                    return false;
                });
            });
        }
    };

    Drupal.viewsSlideshowControlsText = Drupal.viewsSlideshowControlsText || {};

    /**
     * Implement the pause hook for text controls.
     */
    Drupal.viewsSlideshowControlsText.pause = function (options) {
        var pauseText = Drupal.theme.prototype['viewsSlideshowControlsPause'] ? Drupal.theme('viewsSlideshowControlsPause') : '';
        $('#views_slideshow_controls_text_pause_' + options.slideshowID + ' a').text(pauseText);
    };

    /**
     * Implement the play hook for text controls.
     */
    Drupal.viewsSlideshowControlsText.play = function (options) {
        var playText = Drupal.theme.prototype['viewsSlideshowControlsPlay'] ? Drupal.theme('viewsSlideshowControlsPlay') : '';
        $('#views_slideshow_controls_text_pause_' + options.slideshowID + ' a').text(playText);
    };

    // Theme the resume control.
    Drupal.theme.prototype.viewsSlideshowControlsPause = function () {
        return Drupal.t('Resume');
    };

    // Theme the pause control.
    Drupal.theme.prototype.viewsSlideshowControlsPlay = function () {
        return Drupal.t('Pause');
    };

    /**
     * Views Slideshow Pager
     */
    Drupal.viewsSlideshowPager = Drupal.viewsSlideshowPager || {};

    /**
     * Implement the transitionBegin hook for pagers.
     */
    Drupal.viewsSlideshowPager.transitionBegin = function (options) {
        // Route the pager call to the correct pager type.
        // Need to use try catch so we don't have to check to make sure every part
        // of the object is defined.
        try {
            if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].transitionBegin == 'function') {
                Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].transitionBegin(options);
            }
        }
        catch (err) {
            // Don't need to do anything on error.
        }

        try {
            if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].transitionBegin == 'function') {
                Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].transitionBegin(options);
            }
        }
        catch (err) {
            // Don't need to do anything on error.
        }
    };

    /**
     * Implement the goToSlide hook for pagers.
     */
    Drupal.viewsSlideshowPager.goToSlide = function (options) {
        // Route the pager call to the correct pager type.
        // Need to use try catch so we don't have to check to make sure every part
        // of the object is defined.
        try {
            if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].goToSlide == 'function') {
                Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].goToSlide(options);
            }
        }
        catch (err) {
            // Don't need to do anything on error.
        }

        try {
            if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].goToSlide == 'function') {
                Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].goToSlide(options);
            }
        }
        catch (err) {
            // Don't need to do anything on error.
        }
    };

    /**
     * Implement the previousSlide hook for pagers.
     */
    Drupal.viewsSlideshowPager.previousSlide = function (options) {
        // Route the pager call to the correct pager type.
        // Need to use try catch so we don't have to check to make sure every part
        // of the object is defined.
        try {
            if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].previousSlide == 'function') {
                Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].previousSlide(options);
            }
        }
        catch (err) {
            // Don't need to do anything on error.
        }

        try {
            if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].previousSlide == 'function') {
                Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].previousSlide(options);
            }
        }
        catch (err) {
            // Don't need to do anything on error.
        }
    };

    /**
     * Implement the nextSlide hook for pagers.
     */
    Drupal.viewsSlideshowPager.nextSlide = function (options) {
        // Route the pager call to the correct pager type.
        // Need to use try catch so we don't have to check to make sure every part
        // of the object is defined.
        try {
            if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].nextSlide == 'function') {
                Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].nextSlide(options);
            }
        }
        catch (err) {
            // Don't need to do anything on error.
        }

        try {
            if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].nextSlide == 'function') {
                Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].nextSlide(options);
            }
        }
        catch (err) {
            // Don't need to do anything on error.
        }
    };


    /**
     * Views Slideshow Pager Fields
     */

    // Add views slieshow api calls for views slideshow pager fields.
    Drupal.behaviors.viewsSlideshowPagerFields = {
        attach: function (context) {
            // Process pause on hover.
            $('.views_slideshow_pager_field:not(.views-slideshow-pager-field-processed)', context).addClass('views-slideshow-pager-field-processed').each(function () {
                // Parse out the location and unique id from the full id.
                var pagerInfo = $(this).attr('id').split('_');
                var location = pagerInfo[2];
                pagerInfo.splice(0, 3);
                var uniqueID = pagerInfo.join('_');

                // Add the activate and pause on pager hover event to each pager item.
                if (Drupal.settings.viewsSlideshowPagerFields[uniqueID][location].activatePauseOnHover) {
                    $(this).children().each(function (index, pagerItem) {
                        var mouseIn = function () {
                            Drupal.viewsSlideshow.action({ "action": 'goToSlide', "slideshowID": uniqueID, "slideNum": index });
                            Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": uniqueID });
                        }

                        var mouseOut = function () {
                            Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": uniqueID });
                        }

                        if (jQuery.fn.hoverIntent) {
                            $(pagerItem).hoverIntent(mouseIn, mouseOut);
                        }
                        else {
                            $(pagerItem).hover(mouseIn, mouseOut);
                        }

                    });
                }
                else {
                    $(this).children().each(function (index, pagerItem) {
                        $(pagerItem).click(function () {
                            Drupal.viewsSlideshow.action({ "action": 'goToSlide', "slideshowID": uniqueID, "slideNum": index });
                        });
                    });
                }
            });
        }
    };

    Drupal.viewsSlideshowPagerFields = Drupal.viewsSlideshowPagerFields || {};

    /**
     * Implement the transitionBegin hook for pager fields pager.
     */
    Drupal.viewsSlideshowPagerFields.transitionBegin = function (options) {
        for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
            // Remove active class from pagers
            $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

            // Add active class to active pager.
            $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + options.slideNum).addClass('active');
        }

    };

    /**
     * Implement the goToSlide hook for pager fields pager.
     */
    Drupal.viewsSlideshowPagerFields.goToSlide = function (options) {
        for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
            // Remove active class from pagers
            $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

            // Add active class to active pager.
            $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + options.slideNum).addClass('active');
        }
    };

    /**
     * Implement the previousSlide hook for pager fields pager.
     */
    Drupal.viewsSlideshowPagerFields.previousSlide = function (options) {
        for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
            // Get the current active pager.
            var pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"].active').attr('id').replace('views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_', '');

            // If we are on the first pager then activate the last pager.
            // Otherwise activate the previous pager.
            if (pagerNum == 0) {
                pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').length() - 1;
            }
            else {
                pagerNum--;
            }

            // Remove active class from pagers
            $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

            // Add active class to active pager.
            $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + pagerNum).addClass('active');
        }
    };

    /**
     * Implement the nextSlide hook for pager fields pager.
     */
    Drupal.viewsSlideshowPagerFields.nextSlide = function (options) {
        for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
            // Get the current active pager.
            var pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"].active').attr('id').replace('views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_', '');
            var totalPagers = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').length();

            // If we are on the last pager then activate the first pager.
            // Otherwise activate the next pager.
            pagerNum++;
            if (pagerNum == totalPagers) {
                pagerNum = 0;
            }

            // Remove active class from pagers
            $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

            // Add active class to active pager.
            $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + slideNum).addClass('active');
        }
    };


    /**
     * Views Slideshow Slide Counter
     */

    Drupal.viewsSlideshowSlideCounter = Drupal.viewsSlideshowSlideCounter || {};

    /**
     * Implement the transitionBegin for the slide counter.
     */
    Drupal.viewsSlideshowSlideCounter.transitionBegin = function (options) {
        $('#views_slideshow_slide_counter_' + options.slideshowID + ' .num').text(options.slideNum + 1);
    };

    /**
     * This is used as a router to process actions for the slideshow.
     */
    Drupal.viewsSlideshow.action = function (options) {
        // Set default values for our return status.
        var status = {
            'value': true,
            'text': ''
        }

        // If an action isn't specified return false.
        if (typeof options.action == 'undefined' || options.action == '') {
            status.value = false;
            status.text = Drupal.t('There was no action specified.');
            return error;
        }

        // If we are using pause or play switch paused state accordingly.
        if (options.action == 'pause') {
            Drupal.settings.viewsSlideshow[options.slideshowID].paused = 1;
            // If the calling method is forcing a pause then mark it as such.
            if (options.force) {
                Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce = 1;
            }
        }
        else if (options.action == 'play') {
            // If the slideshow isn't forced pause or we are forcing a play then play
            // the slideshow.
            // Otherwise return telling the calling method that it was forced paused.
            if (!Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce || options.force) {
                Drupal.settings.viewsSlideshow[options.slideshowID].paused = 0;
                Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce = 0;
            }
            else {
                status.value = false;
                status.text += ' ' + Drupal.t('This slideshow is forced paused.');
                return status;
            }
        }

        // We use a switch statement here mainly just to limit the type of actions
        // that are available.
        switch (options.action) {
            case "goToSlide":
            case "transitionBegin":
            case "transitionEnd":
                // The three methods above require a slide number. Checking if it is
                // defined and it is a number that is an integer.
                if (typeof options.slideNum == 'undefined' || typeof options.slideNum !== 'number' || parseInt(options.slideNum) != (options.slideNum - 0)) {
                    status.value = false;
                    status.text = Drupal.t('An invalid integer was specified for slideNum.');
                }
            case "pause":
            case "play":
            case "nextSlide":
            case "previousSlide":
                // Grab our list of methods.
                var methods = Drupal.settings.viewsSlideshow[options.slideshowID]['methods'];

                // if the calling method specified methods that shouldn't be called then
                // exclude calling them.
                var excludeMethodsObj = {};
                if (typeof options.excludeMethods !== 'undefined') {
                    // We need to turn the excludeMethods array into an object so we can use the in
                    // function.
                    for (var i = 0; i < excludeMethods.length; i++) {
                        excludeMethodsObj[excludeMethods[i]] = '';
                    }
                }

                // Call every registered method and don't call excluded ones.
                for (i = 0; i < methods[options.action].length; i++) {
                    if (Drupal[methods[options.action][i]] != undefined && typeof Drupal[methods[options.action][i]][options.action] == 'function' && !(methods[options.action][i] in excludeMethodsObj)) {
                        Drupal[methods[options.action][i]][options.action](options);
                    }
                }
                break;

                // If it gets here it's because it's an invalid action.
            default:
                status.value = false;
                status.text = Drupal.t('An invalid action "!action" was specified.', { "!action": options.action });
        }
        return status;
    };
})(jQuery);
;