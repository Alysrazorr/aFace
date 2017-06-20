(function () {
	var a = false,
		b = /xyz/.test(function () {
			xyz
		}) ? /\b_super\b/ : /.*/;
	this.Class = function () { }, Class.extend = function (c) {
		function g() {
			!a && this.init && this.init.apply(this, arguments)
		}
		var d = this.prototype;
		a = true;
		var e = new this;
		a = false;
		for (var f in c) e[f] = typeof c[f] == "function" && typeof d[f] == "function" && b.test(c[f]) ?
			function (a, b) {
				return function () {
					var c = this._super;
					this._super = d[a];
					var e = b.apply(this, arguments);
					return this._super = c, e
				}
			}(f, c[f]) : c[f];
		return g.prototype = e, g.prototype.constructor = g, g.extend = arguments.callee, g
	}
})();

var global = function () {
	return this || (1, eval)("this")
}();

if (typeof VMM == "undefined") {
	var VMM = Class.extend({});
	VMM.createElement = function (a, b, c, d, e) {
		var f = "";
		return a != null && a != "" && (f += "<" + a, c != null && c != "" && (f += " class='" + c + "'"), d != null && d != "" && (f += " " + d), e != null && e != "" && (f += " " + e), f += ">", b != null && b != "" && (f += b), f = f + "</" + a + ">"), f
	};
	VMM.createMediaElement = function (a, b, c) {
		var d = "",
			e = false;
		return d += "<div class='media'>", a != null && a != "" && (valid = true, d += "<img src='" + a + "'>", c != null && c != "" && (d += VMM.createElement("div", c, "credit")), b != null && b != "" && (d += VMM.createElement("div", b, "caption"))), d += "</div>", d
	};
	VMM.attachElement = function (a, b) {
		typeof jQuery != "undefined" && $(a).html(b)
	};
	VMM.appendElement = function (a, b) {
		typeof jQuery != "undefined" && $(a).append(b)
	};
	VMM.getHTML = function (a) {
		var b;
		if (typeof jQuery != "undefined") return b = $(a).html(), b
	};
	VMM.getElement = function (a, b) {
		var c;
		if (typeof jQuery != "undefined") return b ? c = $(a).parent().get(0) : c = $(a).get(0), c
	};
	VMM.bindEvent = function (a, b, c, d) {
		var e, f = "click",
			g = {};
		c != null && c != "" && (f = c), g != null && g != "" && (g = d), typeof jQuery != "undefined" && $(a).bind(f, g, b)
	};
	VMM.unbindEvent = function (a, b, c) {
		var d, e = "click",
			f = {};
		c != null && c != "" && (e = c), typeof jQuery != "undefined" && $(a).unbind(e, b)
	};
	VMM.fireEvent = function (a, b, c) {
		var d, e = "click",
			f = [];
		b != null && b != "" && (e = b), c != null && c != "" && (f = c), typeof jQuery != "undefined" && $(a).trigger(e, f)
	};
	VMM.getJSON = function (a, b) {
		typeof jQuery != "undefined" && $.getJSON(a, b)
	};
	VMM.appendAndGetElement = function (a, b, c, d) {
		var e,
			f = "<div>",
			g = "",
			h = "";
		return b != null && b != "" && (f = b), c != null && c != "" && (g = c), d != null && d != "" && (h = d), typeof jQuery != "undefined" && (e = $(b), e.addClass(g), e.html(h), $(a).append(e)), e
	};
	VMM.Element = {
		init: function () {
			return this
		},
		hide: function (a, b) {
			b != null && b != "" ? typeof jQuery != "undefined" && $(a).hide(b) : typeof jQuery != "undefined" && $(a).hide()
		},
		remove: function (a) {
			typeof jQuery != "undefined" && $(a).remove()
		},
		detach: function (a) {
			typeof jQuery != "undefined" && $(a).detach()
		},
		append: function (a, b) {
			typeof jQuery != "undefined" && $(a).append(b)
		},
		show: function (a, b) {
			b != null && b != "" ? typeof jQuery != "undefined" && $(a).show(b) : typeof jQuery != "undefined" && $(a).show()
		},
		load: function (a, b, c) {
			var d = {
				elem : a
			};
			d != null && d != "" && (d = c), typeof jQuery != "undefined" && $(a).load(d, b)
		},
		addClass: function (a, b) {
			typeof jQuery != "undefined" && $(a).addClass(b)
		},
		removeClass: function (a, b) {
			typeof jQuery != "undefined" && $(a).removeClass(b)
		},
		attr: function (a, b, c) {
			if (c != null && c != "") typeof jQuery != "undefined" && $(a).attr(b, c);
			else if (typeof jQuery != "undefined") return $(a).attr(b)
		},
		prop: function (a, b, c) {
			typeof jQuery == "undefined" || !/[1-9]\.[3-9].[1-9]/.test($.fn.jquery) ? VMM.Element.attribute(a, b, c) : $(a).prop(b, c)
		},
		attribute: function (a, b, c) {
			if (c != null && c != "") typeof jQuery != "undefined" && $(a).attr(b, c);
			else if (typeof jQuery != "undefined") return $(a).attr(b)
		},
		visible: function (a, b) {
			if (b != null) typeof jQuery != "undefined" && (b ? $(a).show(0) : $(a).hide(0));
			else if (typeof jQuery != "undefined") return $(a).is(":visible") ? true : false
		},
		css: function (a, b, c) {
			if (c != null && c != "") typeof jQuery != "undefined" && $(a).css(b, c);
			else if (typeof jQuery != "undefined") return $(a).css(b)
		},
		cssmultiple: function (a, b) {
			if (typeof jQuery != "undefined") return $(a).css(b)
		},
		offset: function (a) {
			var b;
			return typeof jQuery != "undefined" && (b = $(a).offset()), b
		},
		position: function (a) {
			var b;
			return typeof jQuery != "undefined" && (b = $(a).position()), b
		},
		width: function (a, b) {
			if (b != null && b != "") typeof jQuery != "undefined" && $(a).width(b);
			else if (typeof jQuery != "undefined") return $(a).width()
		},
		height: function (a, b) {
			if (b != null && b != "") typeof jQuery != "undefined" && $(a).height(b);
			else if (typeof jQuery != "undefined") return $(a).height()
		},
		toggleClass: function (a, b) {
			typeof jQuery != "undefined" && $(a).toggleClass(b)
		},
		each: function (a, b) {
			typeof jQuery != "undefined" && $(a).each(b)
		},
		html: function (a, b) {
			var c;
			if (typeof jQuery != "undefined") return c = $(a).html(), c;
			if (b != null && b != "") typeof jQuery != "undefined" && $(a).html(b);
			else {
				var c;
				if (typeof jQuery != "undefined") return c = $(a).html(), c
			}
		},
		find: function (a, b) {
			if (typeof jQuery != "undefined") return $(a).find(b)
		},
		stop: function (a) {
			typeof jQuery != "undefined" && $(a).stop()
		},
		animate: function (a, b, c, d, e) {
			var f = "easein",
				g = 1e3,
				h = {};
			b != null && (b < 1 ? g = 1 : g = Math.round(b)), c != null && c != "" && (f = c), d != null ? h = d : h = {
				opacity: 0
			};
			typeof jQuery != "undefined" && (e != null && e != "" ? $(a).animate(h, {
				queue: false,
				duration: g,
				easing: f,
				complete: e
			}) : $(a).animate(h, {
				queue: false,
				duration: g,
				easing: f
			}))
		}
	}.init();
	VMM.TouchSlider = {
		createPanel: function (a, b, c, d, e, f) {
			VMM.TouchSlider.vertical = false, VMM.TouchSlider.vertical = e;
			var g = d;
			VMM.TouchSlider.width = c, VMM.TouchSlider.height = f, VMM.TouchSlider.makeTouchable(a, b)
		},
		removePanel: function (a) {
			VMM.unbindEvent(a, VMM.TouchSlider.onTouchStart, "touchstart"), VMM.unbindEvent(a, VMM.TouchSlider.onTouchMove, "touchmove"), VMM.unbindEvent(a, VMM.TouchSlider.onTouchEnd, "touchend")
		},
		makeTouchable: function (a, b) {
			VMM.bindEvent(a, VMM.TouchSlider.onTouchStart, "touchstart", {
				element: b
			}), VMM.bindEvent(a, VMM.TouchSlider.onTouchMove, "touchmove", {
				element: b
			}), VMM.bindEvent(a, VMM.TouchSlider.onTouchEnd, "touchend", {
				element: b
			})
		},
		onTouchStart: function (a) {
			return VMM.TouchSlider.touchStart(a.data.element, a), a.preventDefault(), a.stopPropagation(), true
		},
		onTouchEnd: function (a) {
			return a.preventDefault(), a.stopPropagation(), VMM.TouchSlider.sliding ? (VMM.TouchSlider.sliding = false, VMM.TouchSlider.touchEnd(a.data.element, a), false) : true
		},
		onTouchMove: function (a) {
			return VMM.TouchSlider.touchMove(a.data.element, a), a.preventDefault(), a.stopPropagation(), false
		},
		getLeft: function (a) {
			return parseInt(VMM.Element.css(a, "left").substring(0, VMM.Element.css(a, "left").length - 2), 10)
		},
		getTop: function (a) {
			return parseInt(VMM.Element.css(a, "top").substring(0, VMM.Element.css(a, "top").length - 2), 10)
		},
		touchStart: function (a, b) {
			VMM.Element.css(a, "-webkit-transition-duration", "0"), VMM.TouchSlider.startX = b.originalEvent.touches[0].screenX, VMM.TouchSlider.startY = b.originalEvent.touches[0].screenY, VMM.TouchSlider.startLeft = VMM.TouchSlider.getLeft(a), VMM.TouchSlider.startTop = VMM.TouchSlider.getTop(a), VMM.TouchSlider.touchStartTime = (new Date).getTime()
		},
		touchEnd: function (a, b) {
			VMM.TouchSlider.getLeft(a) > 0 ? (VMM.TouchSlider.vertical ? VMM.Element.animate(a, 1e3, "", {
				top: 0
			}) : VMM.Element.animate(a, 1e3, "", {
				left: 0
			}), VMM.TouchSlider.startX = null, VMM.TouchSlider.startY = null, VMM.fireEvent(a, "TOUCHUPDATE", [0])) : VMM.TouchSlider.slideMomentum(a, b)
		},
		slideMomentum: function (a, b) {
			var c = ((new Date).getTime() - VMM.TouchSlider.touchStartTime) * 10,
				d = c,
				e = VMM.TouchSlider.getLeft(a),
				f = VMM.TouchSlider.getTop(a),
				g = 6e3 * (Math.abs(VMM.TouchSlider.startLeft) - Math.abs(e)),
				h = 6e3 * (Math.abs(VMM.TouchSlider.startTop) - Math.abs(f));
			c = Math.round(g / c), slideAdjustY = Math.round(h / c);
			var i = c + e,
				j = slideAdjustY + f,
				k = j % VMM.TouchSlider.height,
				l = i % VMM.TouchSlider.width,
				m = {
					top: Math.min(0, j),
					left: Math.min(0, i),
					time: d
				};
			VMM.fireEvent(a, "TOUCHUPDATE", [m]), VMM.TouchSlider.startX = null, VMM.TouchSlider.startY = null
		},
		doSlide: function (a, b, c) {
			VMM.Element.css(a, "-webkit-transition-property", "left"), VMM.Element.css(a, "-webkit-transition-duration", c), VMM.Element.css(a, "left", b)
		},
		touchMove: function (a, b) {
			!!VMM.TouchSlider.sliding, VMM.TouchSlider.sliding = true;
			if (VMM.TouchSlider.vertical) if (VMM.TouchSlider.startY > b.originalEvent.touches[0].screenY) VMM.Element.css(a, "top", -(VMM.TouchSlider.startY - b.originalEvent.touches[0].screenY - VMM.TouchSlider.startTop)), VMM.TouchSlider.slidingTop = true;
			else {
				var c = b.originalEvent.touches[0].screenY - VMM.TouchSlider.startY + VMM.TouchSlider.startTop;
				VMM.Element.css(a, "top", -(VMM.TouchSlider.startY - b.originalEvent.touches[0].screenY - VMM.TouchSlider.startTop)), VMM.TouchSlider.slidingTop = false
			} else if (VMM.TouchSlider.startX > b.originalEvent.touches[0].screenX) VMM.Element.css(a, "left", -(VMM.TouchSlider.startX - b.originalEvent.touches[0].screenX - VMM.TouchSlider.startLeft)), VMM.TouchSlider.slidingLeft = true;
			else {
				var d = b.originalEvent.touches[0].screenX - VMM.TouchSlider.startX + VMM.TouchSlider.startLeft;
				VMM.Element.css(a, "left", -(VMM.TouchSlider.startX - b.originalEvent.touches[0].screenX - VMM.TouchSlider.startLeft)), VMM.TouchSlider.slidingLeft = false
			}
		}
	};
	VMM.hideUrlBar = function () {
		var a = window,
			b = a.document;
		if (!location.hash || !a.addEventListener) {
			window.scrollTo(0, 1);
			var c = 1,
				d = setInterval(function () {
					b.body && (clearInterval(d), c = "scrollTop" in b.body ? b.body.scrollTop : 1, a.scrollTo(0, c === 1 ? 0 : 1))
				}, 15);
			a.addEventListener("load", function () {
				setTimeout(function () {
					a.scrollTo(0, c === 1 ? 0 : 1)
				}, 0)
			}, false)
		}
	};
	VMM.DragSlider = {
		createPanel: function (a, b, c, d, e) {
			var f = d;
			VMM.DragSlider.width = c, VMM.DragSlider.makeDraggable(a, b), VMM.DragSlider.drag_elem = a, VMM.DragSlider.sticky = e
		},
		makeDraggable: function (a, b) {
			VMM.bindEvent(a, VMM.DragSlider.onDragStart, "mousedown", {
				element: b,
				delement: a
			}), VMM.bindEvent(a, VMM.DragSlider.onDragEnd, "mouseup", {
				element: b,
				delement: a
			}), VMM.bindEvent(a, VMM.DragSlider.onDragLeave, "mouseleave", {
				element: b,
				delement: a
			})
		},
		cancelSlide: function (a) {
			return VMM.unbindEvent(VMM.DragSlider.drag_elem, VMM.DragSlider.onDragMove, "mousemove"), true
		},
		onDragLeave: function (a) {
			return VMM.unbindEvent(a.data.delement, VMM.DragSlider.onDragMove, "mousemove"), a.preventDefault(), a.stopPropagation(), true
		},
		onDragStart: function (a) {
			return VMM.DragSlider.dragStart(a.data.element, a.data.delement, a), a.preventDefault(), a.stopPropagation(), true
		},
		onDragEnd: function (a) {
			return a.preventDefault(), a.stopPropagation(), VMM.DragSlider.sliding ? (VMM.DragSlider.sliding = false, VMM.DragSlider.dragEnd(a.data.element, a.data.delement, a), false) : true
		},
		onDragMove: function (a) {
			return VMM.DragSlider.dragMove(a.data.element, a), a.preventDefault(), a.stopPropagation(), false
		},
		dragStart: function (a, b, c) {
			VMM.DragSlider.startX = c.pageX, VMM.DragSlider.startLeft = VMM.DragSlider.getLeft(a), VMM.DragSlider.dragStartTime = (new Date).getTime(), VMM.DragSlider.dragWidth = VMM.Element.width(b);
			var d = Math.round(VMM.DragSlider.startX - c.pageX - VMM.DragSlider.startLeft);
			VMM.Element.stop(a), VMM.bindEvent(b, VMM.DragSlider.onDragMove, "mousemove", {
				element: a
			})
		},
		dragEnd: function (a, b, c) {
			VMM.unbindEvent(b, VMM.DragSlider.onDragMove, "mousemove"), VMM.DragSlider.getLeft(a) > 0 || VMM.DragSlider.dragMomentum(a, c)
		},
		dragMove: function (a, b) {
			!!VMM.DragSlider.sliding, VMM.DragSlider.sliding = true;
			if (VMM.DragSlider.startX > b.pageX) VMM.Element.css(a, "left", -(VMM.DragSlider.startX - b.pageX - VMM.DragSlider.startLeft)), VMM.DragSlider.slidingLeft = true;
			else {
				var c = b.pageX - VMM.DragSlider.startX + VMM.DragSlider.startLeft;
				VMM.Element.css(a, "left", -(VMM.DragSlider.startX - b.pageX - VMM.DragSlider.startLeft)), VMM.DragSlider.slidingLeft = false
			}
		},
		dragMomentum: function (a, b) {
			var c = ((new Date).getTime() - VMM.DragSlider.dragStartTime) * 10,
				d = c,
				e = VMM.DragSlider.getLeft(a),
				f = 6e3 * (Math.abs(VMM.DragSlider.startLeft) - Math.abs(e));
			c = Math.round(f / c);
			var g = e + c,
				h = g % VMM.DragSlider.width,
				i = {
					left: Math.min(g),
					time: d
				};
			VMM.fireEvent(a, "DRAGUPDATE", [i]);
			var j = "easeOutExpo";
			i.time > 0 && VMM.Element.animate(a, i.time, j, {
				left: i.left
			})
		},
		getLeft: function (a) {
			return parseInt(VMM.Element.css(a, "left").substring(0, VMM.Element.css(a, "left").length - 2), 10)
		}
	};
	VMM.MediaElement = {
		init: function () {
			return this
		},
		create: function (a, b, c, d, e) {
			_return = c, _w = 500, _h = 400, $mediacontainer = a;
			var f = false;
			d != null && d != "" && (_w = d), e != null && e != "" && (_h = e);
			if (b.media != null && b.media != "") {
				f = true;
				var g = "",
					h = "",
					i = "",
					j = {},
					k = _h - 50,
					l = false;
				g = "<div class='media-container'><iframe class='media-frame' frameborder='0' width='100%;' height='100%' marginheight='0' marginwidth='0' src='" + b.media + "'></iframe></div>";
				if (_return) return l ? "<div class='media text-media'><div class='media-wrapper'>" + g + "</div></div>" : "<div class='media'><div class='media-wrapper'>" + g + "</div></div>";
				VMM.appendElement($mediacontainer, g);
			}
		}
	}.init();
	VMM.MediaType = function (a) {
		return {};
	};
	VMM.Media = function (a, b, c, d) {
		function n() { }
		var e = {},
			f = false,
			g = {
				width: 720,
				height: 400,
				content_width: 720,
				content_height: 400,
				ease: "easeInOutExpo",
				duration: 1e3,
				spacing: 15
			},
			h = "",
			i = "",
			j = "",
			k = "",
			l = a;
		b != null && b != "" && (g.width = b), c != null && c != "" && (g.height = c), this.init = function (a) {
			typeof a != "undefined" ? this.setData(a) : console.log("WAITING ON DATA")
		};
		this.setData = function (a) {
			typeof a != "undefined" ? (e = a, m()) : console.log("NO DATA")
		}
	}, VMM.Media.prototype.height = function (a) {
		if (a == null || a == "") return config.height;
		config.height = a, reSize()
	}, VMM.Media.prototype.width = function (a) {
		if (a == null || a == "") return config.width;
		config.width = a, reSize()
	}, VMM.Media.prototype.getData = function () {
		return data
	}, VMM.Media.prototype.setConfig = function (a) {
		typeof a != "undefined" ? config = a : console.log("NO CONFIG DATA")
	}, VMM.Media.prototype.getConfig = function () {
		return config
	}, VMM.Media.prototype.setSize = function (a, b) {
		a != null && (config.width = a), b != null && (config.height = b), _active && reSize()
	}, VMM.Media.prototype.active = function () {
		return _active
	}
};

Date.prototype.getWeek = function () {
	var a = new Date(this.getFullYear(), 0, 1);
	return Math.ceil(((this - a) / 864e5 + a.getDay() + 1) / 7)
}, Date.prototype.getDayOfYear = function () {
	var a = new Date(this.getFullYear(), 0, 1);
	return Math.ceil((this - a) / 864e5)
};

var is = {
	Null: function (a) {
		return a === null
	},
	Undefined: function (a) {
		return a === undefined
	},
	nt: function (a) {
		return a === null || a === undefined
	},
	Function: function (a) {
		return typeof a == "function" ? a.constructor.toString().match(/Function/) !== null : false
	},
	String: function (a) {
		return typeof a == "string" ? true : typeof a == "object" ? a.constructor.toString().match(/string/i) !== null : false
	},
	Array: function (a) {
		return typeof a == "object" ? a.constructor.toString().match(/array/i) !== null || a.length !== undefined : false
	},
	Boolean: function (a) {
		return typeof a == "boolean" ? true : typeof a == "object" ? a.constructor.toString().match(/boolean/i) !== null : false
	},
	Date: function (a) {
		return typeof a == "date" ? true : typeof a == "object" ? a.constructor.toString().match(/date/i) !== null : false
	},
	HTML: function (a) {
		return typeof a == "object" ? a.constructor.toString().match(/html/i) !== null : false
	},
	Number: function (a) {
		return typeof a == "number" ? true : typeof a == "object" ? a.constructor.toString().match(/Number/) !== null : false
	},
	Object: function (a) {
		return typeof a == "object" ? a.constructor.toString().match(/object/i) !== null : false
	},
	RegExp: function (a) {
		return typeof a == "function" ? a.constructor.toString().match(/regexp/i) !== null : false
	}
};
var type = {
	of: function (a) {
		for (var b in is) if (is[b](a)) return b.toLowerCase()
	}
};
typeof jQuery != "undefined" && (jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
	def: "easeOutQuad",
	swing: function (a, b, c, d, e) {
		return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
	},
	easeInExpo: function (a, b, c, d, e) {
		return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
	},
	easeOutExpo: function (a, b, c, d, e) {
		return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
	},
	easeInOutExpo: function (a, b, c, d, e) {
		return b == 0 ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
	},
	easeInQuad: function (a, b, c, d, e) {
		return d * (b /= e) * b + c
	},
	easeOutQuad: function (a, b, c, d, e) {
		return -d * (b /= e) * (b - 2) + c
	},
	easeInOutQuad: function (a, b, c, d, e) {
		return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
	}
}));
typeof VMM != "undefined" && typeof VMM.Sequence == "undefined" && (VMM.Sequence = Class.extend({
	initialize: function (a, b) {
		console.log("sequence init"), this.increment = 1, this.decrement = 1, this.wrap = false, this.length = a == null ? 0 : a, this.index = b == null ? a == 0 ? -1 : 0 : b >= a ? a - 1 : b, this.synced = []
	},
	setLength: function (a) {
		this.length = a, this.setIndex(this.index)
	},
	getLength: function () {
		return this.length
	},
	setIndex: function (a) {
		if (this.length <= 0) {
			this.index = -1;
			return
		}
		a < 0 ? a = this.wrap ? this.length - a % this.length : 0 : a >= this.length && (a = this.wrap ? a % this.length : this.length - 1);
		var b = this.index;
		this.index = a;
		if (b != this.index) for (var c = 0; c < this.synced.length; c++) {
			var d = this.synced[c];
			d.getIndex() != this.index && d.setIndex(this.index)
		}
	},
	getIndex: function () {
		return this.index
	},
	next: function () {
		this.setIndex(this.index + this.increment)
	},
	prev: function () {
		this.setIndex(this.index - this.decrement)
	},
	sync: function (a, b) {
		return a instanceof NYTMM.Sequence && a != this ? (this.synced.push(a), b && a.sync(this), true) : false
	},
	unsync: function (a, b) {
		for (var c = 0; c < this.synced.length; c++) if (this.synced[c] == a) return this.synced.splice(c, 1), b && a.unsync(this), true;
		return false
	}
}));
typeof VMM != "undefined" && typeof VMM.Slider == "undefined" && (VMM.Slider = function (a, b, c, d) {
	function y() {
		console.log("onConfigSet")
	}
	function z(a, b) {
		var c = true,
			d = false;
		a != null && (c = a), b != null && (d = b), l = o.width, o.nav_height = VMM.Element.height(w.prevBtnContainer), o.content_width = l - o.content_padding * 2, VMM.Element.width(v, i.length * o.content_width);
		if (d) {
			var e = VMM.Element.position(i[k]);
			VMM.Element.css(u, "left", e.left)
		}
		G(), VMM.Element.css(w.nextBtn, "left", l - o.nav_width), VMM.Element.height(w.prevBtn, o.height), VMM.Element.height(w.nextBtn, o.height), VMM.Element.css(w.nextBtnContainer, "top", o.height / 2 - o.nav_height / 2), VMM.Element.css(w.prevBtnContainer, "top", o.height / 2 - o.nav_height / 2), VMM.Element.height(t, o.height), VMM.Element.width(t, l), c && I(k, "linear", 1), k == 0 && VMM.Element.visible(w.prevBtn, false)
	}
	function A(a) {
		k == i.length - 1 ? VMM.Element.animate(u, o.duration, o.ease, {
			left: -VMM.Element.position(i[k]).left
		}) : (I(k + 1), D())
	}
	function B(a) {
		k == 0 ? I(k) : (I(k - 1), D())
	}
	function C(a, b) {
		if (n.length == 0) for (var c = 0; c < i.length; c++) {
			var d = VMM.Element.position(i[c]);
			n.push(d.left)
		}
		if (typeof b.left == "number") {
			var e = b.left;
			e < -VMM.Element.position(i[k]).left - o.width / 3 ? A() : e > -VMM.Element.position(i[k]).left + o.width / 3 ? B() : VMM.Element.animate(u, o.duration, o.ease, {
				left: -VMM.Element.position(i[k]).left
			})
		} else VMM.Element.animate(u, o.duration, o.ease, {
			left: -VMM.Element.position(i[k]).left
		});
		typeof b.top == "number" && VMM.Element.animate(u, o.duration, o.ease, {
			top: -b.top
		})
	}
	function D() {
		VMM.fireEvent(x, "UPDATE")
	}
	var e = "private",
		f = {},
		g = [],
		h = "",
		i = [],
		j = [],
		k = 0,
		l = 960,
		m = {
			move: false,
			x: 10,
			y: 0,
			off: 0,
			dampen: 48
		},
		n = [],
		o = {
			interval: 10,
			something: 0,
			width: 720,
			height: 400,
			content_width: 720,
			content_height: 400,
			content_padding: 130,
			ease: "easeInOutExpo",
			duration: 1e3,
			nav_width: 100,
			nav_height: 200,
			timeline: false,
			spacing: 15
		},
		p = 1e3;
	b != null && b != "" && (o.width = b), c != null && c != "" && (o.height = c), d != null && d != "" && (o.timeline = d);
	var q = "",
		r = false,
		s = "",
		t = "",
		u = "",
		v = "",
		w = {};
	w.nextBtn, w.prevBtn, w.nextDate, w.prevDate, w.nextTitle, w.prevTitle, this.ver = "0.1";
	var x = a;
	this.init = function (a) {
		typeof a != "undefined" ? this.setData(a) : console.log("WAITING ON DATA")
	}, this.width = function (a) {
		if (a == null || a == "") return o.width;
		o.width = a, z()
	}, this.height = function (a) {
		if (a == null || a == "") return o.height;
		o.height = a, z()
	}, this.setData = function (a) {
		typeof a != "undefined" ? (g = a, K()) : console.log("NO DATA")
	}, this.getData = function () {
		return g
	}, this.setConfig = function (a) {
		typeof a != "undefined" ? o = a : console.log("NO CONFIG DATA")
	}, this.getConfig = function () {
		return o
	}, this.setSize = function (a, b) {
		a != null && (o.width = a), b != null && (o.height = b), r && z()
	}, this.active = function () {
		return r
	}, this.getCurrentNumber = function () {
		return k
	}, this.setSlide = function (a) {
		I(a)
	};
	var E = function (a) {
		g = a
	},
	F = function (a) {
		VMM.attachElement(v, "");
		for (var b = 0; b < a.length; b++) {
			var c = "",
				d, e;
			c = VMM.createElement("div", a[b].content, "content"), d = VMM.appendAndGetElement(v, "<div>", "slider-item", c), i.push(d)
		}
	},
	G = function () {
		VMM.Element.css(".slider-item", "width", o.content_width), VMM.Element.height(".slider-item", o.height); /*VMM.Element.css(".slider-item .layout-text-media .media .media-container img", "max-height", o.height);, VMM.Element.css(".slider-item .layout-media .media .media-container img", "max-height", o.height - 150), VMM.Element.css(".slider-item .media .media-container .soundcloud", "max-height", 168);*/
		var a = Math.round(o.height) - 100,
			b = Math.round(a / 9 * 16),
			c = o.content_width / 100 * 60,
			d = Math.round(c / 16 * 9) + 25;
		VMM.Element.height(".slider-item .media .media-container .media-frame", d), VMM.Element.width(".slider-item .media .media-container .media-frame", c), VMM.Element.height(".slider-item .layout-media .media .media-container .media-frame", a), VMM.Element.width(".slider-item .layout-media .media .media-container .media-frame", o.content_width), VMM.Element.height(".slider-item .layout-media .media .media-container .soundcloud", o.height - 150), VMM.Element.width(".slider-item .layout-media .media .media-container .soundcloud", o.content_width), VMM.Element.width(".slider-item .layout-text-media .media .media-container .soundcloud", c), VMM.Element.height(".slider-item .media .media-container .map", a), VMM.Element.css(".slider-item .layout-text-media .media .media-container .media-frame", "max-width", o.content_width);
		var e = 0;
		for (var f = 0; f < i.length; f++) e = f * (o.width + o.spacing), VMM.Element.css(i[f], "left", e)
	},
	H = function (a) {
		var b = "linear";
		for (var c = 0; c < i.length; c++) c == k ? VMM.Element.animate(i[c], o.duration, b, {
			opacity: 1
		}) : c == k - 1 ? VMM.Element.animate(i[c], o.duration, b, {
			opacity: .1
		}) : c == k + 1 ? VMM.Element.animate(i[c], o.duration, b, {
			opacity: .1
		}) : VMM.Element.css(i[c], "opacity", a)
	},
	I = function (a, b, c, d, e) {
		k = a;
		var f = o.ease,
			h = o.duration,
			j = false,
			l = false;
		k == 0 && (l = true), k + 1 == i.length && (j = true), b != null && b != "" && (f = b), c != null && c != "" && (h = c);
		var m = VMM.Element.position(i[k]);
		l ? VMM.Element.visible(w.prevBtn, false) : (VMM.Element.visible(w.prevBtn, true), o.timeline && VMM.attachElement(w.prevDate, g[k - 1].date), VMM.attachElement(w.prevTitle, VMM.Util.unlinkify(g[k - 1].title))), j ? VMM.Element.visible(w.nextBtn, false) : (VMM.Element.visible(w.nextBtn, true), o.timeline && VMM.attachElement(w.nextDate, g[k + 1].date), VMM.attachElement(w.nextTitle, VMM.Util.unlinkify(g[k + 1].title))), d ? VMM.Element.css(u, "left", -(m.left - o.content_padding)) : (VMM.Element.stop(u), VMM.Element.animate(u, h, f, {
			left: -(m.left - o.content_padding)
		})), e && VMM.fireEvent(x, "LOADED"), VMM.Element.height(i[k]) > o.height ? VMM.Element.css(".slider", "overflow-y", "scroll") : (VMM.Element.css(x, "overflow-y", "hidden"), VMM.Element.animate(x, h, f, {
			scrollTop: VMM.Element.prop(x, "scrollHeight") - VMM.Element.height(x)
		}))
	},
	J = function () {
		var a = "<div class='icon'>&nbsp;</div>";
		w.nextBtn = VMM.appendAndGetElement(s, "<div>", "nav-next"), w.prevBtn = VMM.appendAndGetElement(s, "<div>", "nav-previous"), w.nextBtnContainer = VMM.appendAndGetElement(w.nextBtn, "<div>", "nav-container", a), w.prevBtnContainer = VMM.appendAndGetElement(w.prevBtn, "<div>", "nav-container", a), o.timeline && (w.nextDate = VMM.appendAndGetElement(w.nextBtnContainer, "<div>", "date", "1957"), w.prevDate = VMM.appendAndGetElement(w.prevBtnContainer, "<div>", "date", "1957")), w.nextTitle = VMM.appendAndGetElement(w.nextBtnContainer, "<div>", "title", "Title Goes Here"), w.prevTitle = VMM.appendAndGetElement(w.prevBtnContainer, "<div>", "title", "Title Goes Here"), VMM.bindEvent(".nav-next", A), VMM.bindEvent(".nav-previous", B)
	},
	K = function () {
		VMM.attachElement(x, ""), s = VMM.getElement("div.slider"), t = VMM.appendAndGetElement(s, "<div>", "slider-container-mask"), u = VMM.appendAndGetElement(t, "<div>", "slider-container"), v = VMM.appendAndGetElement(u, "<div>", "slider-item-container"), J(), F(g);
		var a = 3e3;
		z(false, true), VMM.Element.visible(w.prevBtn, false), I(0, "easeOutExpo", a, true, true), r = true
	}
});
typeof VMM != "undefined" && typeof VMM.Util == "undefined" && (VMM.Util = {
	init: function () {
		return this
	},
	randomBetween: function (a, b) {
		return Math.floor(Math.random() * (b - a + 1) + a)
	},
	customSort: function (a, b) {
		var c = a,
			d = b;
		return c == d ? 0 : c > d ? 1 : -1
	},
	number2money: function (a, b, c) {
		var b = b !== null ? b : true,
			c = c !== null ? c : false,
			d = VMM.Math2.floatPrecision(a, 2),
			e = this.niceNumber(d);
		return !e.split(/\./g)[1] && c && (e += ".00"), b && (e = "$" + e), e
	},
	wordCount: function (a) {
		var b = a + " ",
			c = /^[^A-Za-z0-9\'\-]+/gi,
			d = b.replace(c, ""),
			e = /[^A-Za-z0-9\'\-]+/gi,
			f = d.replace(e, " "),
			g = f.split(" "),
			h = g.length - 1;
		return b.length < 2 && (h = 0), h
	},
	parseDate: function (a) {
		var b;
		if (a.match(/,/gi)) {
			var c = a.split(",");
			for (var d = 0; d < c.length; d++) c[d] = parseInt(c[d]);
			b = new Date, c[0] && b.setFullYear(c[0]), c[1] > 1 ? b.setMonth(c[1] - 1) : b.setMonth(0), c[2] > 1 ? b.setDate(c[2]) : b.setDate(1), c[3] > 1 ? b.setHours(c[3]) : b.setHours(0), c[4] > 1 ? b.setMinutes(c[4]) : b.setMinutes(0), c[5] > 1 ? b.setSeconds(c[5]) : b.setSeconds(0), c[6] > 1 ? b.setMilliseconds(c[6]) : b.setMilliseconds(0)
		} else a.match("/") ? b = new Date(a) : a.length < 5 ? (b = new Date, b.setFullYear(parseInt(a)), b.setMonth(0), b.setDate(1), b.setHours(0), b.setMinutes(0), b.setSeconds(0), b.setMilliseconds(0)) : b = new Date(parseInt(a.slice(0, 4)), parseInt(a.slice(4, 6)) - 1, parseInt(a.slice(6, 8)), parseInt(a.slice(8, 10)), parseInt(a.slice(10, 12)));
		return b
	},
	ratio: {
		r16_9: function (a, b) {
			if (a !== null && a !== "") return Math.round(b / 16 * 9);
			if (b !== null && b !== "") return Math.round(a / 9 * 16)
		},
		r4_3: function (a, b) {
			if (a !== null && a !== "") return Math.round(b / 4 * 3);
			if (b !== null && b !== "") return Math.round(a / 3 * 4)
		}
	},
	date: {
		month: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		month_abbr: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		day: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
		day_abbr: ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."],
		hour: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		hour_suffix: ["am"],
		prettyDate: function (a, b, c) {
			var d = "";
			return type.of(a) == "date" ? a.getMonth() === 0 && a.getDate() == 1 && a.getHours() === 0 && a.getMinutes() === 0 ? d = a.getFullYear() : a.getDate() <= 1 && a.getHours() === 0 && a.getMinutes() === 0 ? b ? d = VMM.Util.date.month_abbr[a.getMonth()] : d = VMM.Util.date.month[a.getMonth()] + " " + a.getFullYear() : a.getHours() === 0 && a.getMinutes() === 0 ? b ? d = VMM.Util.date.month_abbr[a.getMonth()] + " " + a.getDate() : d = VMM.Util.date.month[a.getMonth()] + " " + a.getDate() + ", " + a.getFullYear() : a.getMinutes() === 0 ? b ? d = VMM.Util.date.get12HRTime(a) : d = VMM.Util.date.get12HRTime(a) + "<br/><small>" + VMM.Util.date.month[a.getMonth()] + " " + a.getDate() + ", " + a.getFullYear() + " </small> " : b ? d = VMM.Util.date.day[a.getDay()] + ", " + VMM.Util.date.month_abbr[a.getMonth()] + " " + a.getDate() + ", " + a.getFullYear() + " at " + VMM.Util.date.get12HRTime(a) : d = VMM.Util.date.get12HRTime(a) + "<br/><small>" + VMM.Util.date.day[a.getDay()] + ", " + VMM.Util.date.month[a.getMonth()] + " " + a.getDate() + ", " + a.getFullYear() + " </small> " : (console.log("NOT A VALID DATE?"), console.log(a)), d
		},
		prettyMonth: function (a, b) {
			var c = "";
			return type.of(t) != "date", c
		},
		get12HRTime: function (a, b) {
			var c = "";
			return type.of(a) == "date" && (c = VMM.Util.date.theHour(a.getHours()) + ":" + VMM.Util.date.minuteZeroFill(a.getMinutes()), b && (c = c + ":" + VMM.Util.date.minuteZeroFill(a.getSeconds())), c += VMM.Util.date.hourSuffix(a.getHours())), c
		},
		theHour: function (a) {
			return a > 0 && a < 13 ? a : a == "0" ? (a = 12, a) : a === 0 ? 12 : a - 12
		},
		minuteZeroFill: function (a) {
			return a > 9 ? "" + a : "0" + a
		},
		hourSuffix: function (a) {
			return a < 12 ? " am" : " pm"
		}
	},
	doubledigit: function (a) {
		return (a < 10 ? "0" : "") + a
	},
	truncateWords: function (a, b, c) {
		b || (b = 30), c || (c = b);
		var d = /^[^A-Za-z0-9\'\-]+/gi,
			e = a.replace(d, ""),
			f = e.split(" "),
			g = [];
		b = Math.min(f.length, b), c = Math.min(f.length, c);
		for (var h = 0; h < b; h++) g.push(f[h]);
		for (var i = b; h < c; h++) {
			var j = f[h];
			g.push(j);
			if (j.charAt(j.length - 1) == ".") break
		}
		return g.join(" ")
	},
	linkify: function (a, b, c) {
		return a ? (a = a.replace(/((https?\:\/\/|ftp\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, function (a) {
			var d = a,
				e = "";
			return a.search("^https?://") < 0 && (a = "http://" + a), e = "onclick = 'void(0)'", c && (e = "onclick = 'void(0)'"), onclick = "void(0)", b === null || b === "" ? '<a href="' + a + " " + e + '">' + a + "</a>" : "<a href='" + a + " " + e + " target='" + b + "'>'" + a + "</a>"
		}), a) : a
	},
	unlinkify: function (a) {
		return a ? (a = a.replace(/<a\b[^>]*>/i, ""), a = a.replace(/<\/a>/i, ""), a) : a
	},
	nl2br: function (a) {
		return a.replace(/(\r\n|[\r\n]|\\n|\\r)/g, "<br/>")
	},
	unique_ID: function (a) {
		var b = function (a) {
			return Math.floor(Math.random() * a)
		},
		c = function () {
			var a = "abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
			return a.substr(b(62), 1)
		},
		d = function (a) {
			var b = "";
			for (var d = 0; d < a; d++) b += c();
			return b
		};
		return d(a)
	},
	isEven: function (a) {
		return a % 2 === 0 ? true : false
	},
	getUrlVars: function (a) {
		var b = [],
			c, d = a.slice(a.indexOf("?") + 1).split("&");
		for (var e = 0; e < d.length; e++) c = d[e].split("="), b.push(c[0]), b[c[0]] = c[1];
		return console.log(b), b
	},
	toHTML: function (a) {
		return a = this.nl2br(a), a = this.linkify(a), a.replace(/\s\s/g, "&nbsp;&nbsp;")
	},
	toCamelCase: function (a, b) {
		b !== false && (b = true);
		var c = (b ? a.toLowerCase() : a).split(" ");
		for (var d = 0; d < c.length; d++) c[d] = c[d].substr(0, 1).toUpperCase() + c[d].substr(1);
		return c.join(" ")
	},
	properQuotes: function (a) {
		return a.replace(/\"([^\"]*)\"/gi, "&#8220;$1&#8221;")
	},
	niceNumber: function (a) {
		var b = String(Math.abs(Number(a))),
			c = b.split(/\./g)[0],
			d = b.split(/\./g)[1],
			e = "",
			f = c.toArray();
		f.reverse();
		for (var g = 1; g <= f.length; g++) g % 3 == 0 && g < f.length ? e = "," + f[g - 1] + e : e = f[g - 1] + e;
		return d != null && d != "" && d != undefined ? e + "." + d : e
	},
	toTitleCase: function (a) {
		var b = {
			__smallWords: ["a", "an", "and", "as", "at", "but", "by", "en", "for", "if", "in", "of", "on", "or", "the", "to", "v[.]?", "via", "vs[.]?"],
			init: function () {
				this.__smallRE = this.__smallWords.join("|"), this.__lowerCaseWordsRE = new RegExp("\\b(" + this.__smallRE + ")\\b", "gi"), this.__firstWordRE = new RegExp("^([^a-zA-Z0-9 \\r\\n\\t]*)(" + this.__smallRE + ")\\b", "gi"), this.__lastWordRE = new RegExp("\\b(" + this.__smallRE + ")([^a-zA-Z0-9 \\r\\n\\t]*)$", "gi")
			},
			toTitleCase: function (a) {
				var b = "",
					c = a.split(/([:.;?!][ ]|(?:[ ]|^)["“])/);
				for (var d = 0; d < c.length; ++d) {
					var e = c[d];
					e = e.replace(/\b([a-zA-Z][a-z.'’]*)\b/g, this.__titleCaseDottedWordReplacer), e = e.replace(this.__lowerCaseWordsRE, this.__lowerReplacer), e = e.replace(this.__firstWordRE, this.__firstToUpperCase), e = e.replace(this.__lastWordRE, this.__firstToUpperCase), b += e
				}
				return b = b.replace(/ V(s?)\. /g, " v$1. "), b = b.replace(/(['’])S\b/g, "$1s"), b = b.replace(/\b(AT&T|Q&A)\b/ig, this.__upperReplacer), b
			},
			__titleCaseDottedWordReplacer: function (a) {
				return a.match(/[a-zA-Z][.][a-zA-Z]/) ? a : b.__firstToUpperCase(a)
			},
			__lowerReplacer: function (a) {
				return a.toLowerCase()
			},
			__upperReplacer: function (a) {
				return a.toUpperCase()
			},
			__firstToUpperCase: function (a) {
				var b = a.split(/(^[^a-zA-Z0-9]*[a-zA-Z0-9])(.*)$/);
				return b[1] = b[1].toUpperCase(), b.join("")
			}
		};
		return b.init(), a = a.replace(/_/g, " "), a = b.toTitleCase(a), a
	}
}.init());
typeof VMM != "undefined" && typeof VMM.Timeline == "undefined" && (VMM.Timeline = function (a, b) {
	function o(a, b) {
		k = b.timeline, type.of(k.era) != "array" && (k.era = []), E()
	}
	function p() {
		A()
	}
	function q() {
		C(), g.setSize(m.feature_width, m.feature_height), h.setSize(m.width, m.height), D()
	}
	function r(a) {
		m.loaded.slider = true, s()
	}
	function s(a) {
		m.loaded.percentloaded = m.loaded.percentloaded + 25, x("加载中..." + m.loaded.percentloaded), m.loaded.slider && m.loaded.timenav && y()
	}
	function t(a) {
		m.loaded.timenav = true, s()
	}
	function u(a) {
		h.setMarker(g.getCurrentNumber(), m.ease, m.duration)
	}
	function v(a) {
		g.setSlide(h.getCurrentNumber())
	}
	var c = VMM.getElement("#timeline"),
		d, e, f = VMM.getElement("#timeline");
	d = VMM.appendAndGetElement(c, "<div>", "feedback", ""), e = VMM.appendAndGetElement(d, "<div>", "messege", "加载中...");
	var g = new VMM.Slider("div.slider", 720, 400, true),
		h = new VMM.Timeline.TimeNav("div.navigation", 720, 400, true),
		i = "private",
		j = {},
		k = {},
		l = [],
		m = {};
	m.interval = 10, m.something = 0, m.width = 960, m.height = 540, m.spacing = 15, m.loaded = {
		slider: false,
		timenav: false,
		percentloaded: 0
	}, m.ease = "easeInOutExpo", m.duration = 1e3,
	a != null && a != "" ? (m.width = a, VMM.Element.width(c, a)) : m.width = VMM.Element.width(c), b != null && b != "" ? (m.height = b, VMM.Element.height(c, b)) : m.height = VMM.Element.height(c), m.nav_width = m.width, m.nav_height = 200, m.feature_width = m.width, m.feature_height = m.height - m.nav_height
	var n = false;
	this.init = function (a) {
		console.log("init"), VMM.bindEvent(global, o, "DATAREADY"), n ? (d = VMM.appendAndGetElement(c, "<div>", "feedback", ""), e = VMM.appendAndGetElement(d, "<div>", "messege", "Internet Explorer 7 is not supported by Timeline.")) : (type.of(a) == "string" ? VMM.Timeline.DataObj.getData(a) : VMM.Timeline.DataObj.getData(f), d = VMM.appendAndGetElement(c, "<div>", "feedback", ""), e = VMM.appendAndGetElement(d, "<div>", "messege", "加载中..."))
	}, this.iframeLoaded = function () {
		console.log("iframeLoaded")
	};
	var w = function (a) {
		VMM.getJSON(a, function (a) {
			k = VMM.Timeline.DataObj.getData(a), VMM.fireEvent(global, "DATAREADY")
		})
	},
		x = function (a) { },
		y = function () {
			VMM.Element.animate(d, m.duration, m.ease * 4, {
				opacity: 0
			}, z)
		},
		z = function () {
			VMM.Element.detach(d)
		},
		A = function () {
			VMM.attachElement(c, ""), VMM.appendElement(c, "<div class='container main'><div class='feature'><div class='slider'></div></div><div class='navigation'></div></div>"), q(), VMM.bindEvent("div.slider", r, "LOADED"), VMM.bindEvent("div.navigation", t, "LOADED"), VMM.bindEvent("div.slider", u, "UPDATE"), VMM.bindEvent("div.navigation", v, "UPDATE"), g.init(l), h.init(l, k.era), VMM.bindEvent(global, q, "resize"), VMM.bindEvent(global, function (a) {
				a.preventDefault()
			}, "touchmove")
		},
		B = function (a, b) {
			C();
			var c = a,
				d = "",
				e = {};
			e._text = "", e._media = "";
			var f = false,
				g = false,
				h = false;
			type.of(b) == "date" && (f = true, a.type != "start" && (e._text += VMM.createElement("h2", VMM.Util.date.prettyDate(b), "date")), c.headline != null && c.headline != "" && c.type != "tweets" && (a.type == "start" ? e._text += VMM.createElement("h2", c.headline, "start") : e._text += VMM.createElement("h3", c.headline)), c.text != null && c.text != "" && (h = true, e._text += VMM.createElement("p", c.text)), e._text = VMM.createElement("div", e._text, "container"), e._text = VMM.createElement("div", e._text, "text")), f && c.asset != null && c.asset != "" && c.asset.media != null && c.asset.media != "" && (g = true, e._media = VMM.MediaElement.create("", c.asset, true, m.feature_width, m.feature_height));
			if (f) {
				var i = "content-container layout";
				h && (i += "-text"), g && (i += "-media"), d = VMM.createElement("div", e._text + e._media, i)
			}
			return d
		},
		C = function () {
			m.width = VMM.Element.width(c), m.height = VMM.Element.height(c), m.nav_width = m.width, m.feature_width = m.width, m.feature_height = m.height - m.nav_height - 3
		},
		D = function () {
			m.width < 500 ? (VMM.Element.hide("div.navigation"), VMM.Element.hide("div.nav-next"), VMM.Element.hide("div.nav-previous"), VMM.Element.height(".slider-container-mask", m.height)) : (VMM.Element.show("div.navigation"), VMM.Element.show("div.nav-next"), VMM.Element.show("div.nav-previous"), VMM.Element.height(".slider-container-mask", m.feature_height)), m.width < 820 && !(m.width < 500)
		},
		E = function () {
			C();
			if (k.headline != null && k.headline != "" && k.text != null && k.text != "") {
				console.log("HAS STARTPAGE");
				var a = {};
				k.type == "google spreadsheet" ? (console.log("google spreadsheet startpage date" + k.startDate), a.startdate = new Date(Date.parse(k.startDate)), console.log(a.startdate)) : a.startdate = VMM.Util.parseDate(k.startDate), a.uniqueid = VMM.Util.unique_ID(5), a.enddate = a.startdate, a.title = k.headline, a.headline = k.headline, a.text = k.text, a.type = "start", a.date = VMM.Util.date.prettyDate(k.startDate), a.asset = k.asset, a.fulldate = a.startdate.getTime(), a.content = B(a, a.startdate), a.content != null && a.content != "" && l.push(a)
			}
			for (var b = 0; b < k.date.length; b++) if (k.date[b].startDate != null && k.date[b].startDate != "") {
				var a = {};
				k.date[b].type == "tweets" ? a.startdate = VMM.ExternalAPI.twitter.parseTwitterDate(k.date[b].startDate) : k.date[b].type == "google spreadsheet" ? (a.startdate = new Date(Date.parse(k.date[b].startDate)), console.log(a.startdate)) : a.startdate = VMM.Util.parseDate(k.date[b].startDate), a.uniqueid = k.date[b].startDate.toString() + "-" + b.toString(), k.date[b].endDate != null && k.date[b].endDate != "" ? k.date[b].type == "tweets" ? a.enddate = VMM.ExternalAPI.twitter.parseTwitterDate(k.date[b].endDate) : k.date[b].type == "google spreadsheet" ? a.enddate = new Date(Date.parse(k.date[b].endDate)) : a.enddate = VMM.Util.parseDate(k.date[b].endDate) : a.enddate = a.startdate, a.title = k.date[b].headline, a.type = k.date[b].type, a.date = VMM.Util.date.prettyDate(a.startdate), a.asset = k.date[b].asset, a.fulldate = a.startdate.getTime(), a.content = B(k.date[b], a.startdate), a.content != null && a.content != "" && l.push(a)
			}
			l.sort(function (a, b) {
				return a.fulldate - b.fulldate
			}), p()
		}
},
VMM.Timeline.TimeNav = function (a, b, c) {
		function I() {
			console.log("onConfigSet")
		}
		function J(a) {
			VMM.Element.css(B, "left", Math.round(r.width / 2) + 2), Y(k, r.ease, r.duration, true, a)
		}
		function K() {
			VMM.fireEvent(H, "UPDATE")
		}
		function L() {
			console.log("CLICK"), VMM.DragSlider.cancelSlide(), r.multiplier > r.min_multiplier && (r.multiplier = r.multiplier - 1, r.multiplier < 0 && (r.multiplier = r.min_multiplier), $())
		}
		function M() {
			console.log("CLICK"), VMM.DragSlider.cancelSlide(), r.multiplier < r.max_multiplier && (r.multiplier = r.multiplier + 1, r.multiplier != r.max_multiplier, $())
		}
		function N(a) {
			VMM.DragSlider.cancelSlide(), Y(0), K()
		}
		function O(a) {
			VMM.DragSlider.cancelSlide(), Y(a.data.number), K()
		}
		function P(a) {
			VMM.Element.toggleClass(a.data.elem, "zFront")
		}
		function Q(a, b) {
			VMM.Element.animate(t, b.time / 2, r.ease, {
				left: b.left
			})
		}
		console.log("VMM.Timeline.TimeNav");
		var d = {},
			e = [],
			f, g = [],
			h = [],
			i = [],
			j = {},
			k = 0,
			l = false,
			m = {
				day: 24,
				month: 12,
				year: 10,
				hour: 60,
				minute: 60,
				second: 1e3,
				decade: 10,
				century: 100,
				millenium: 1e3,
				week: 4.34812141,
				days_in_month: 30.4368499,
				days_in_week: 7,
				weeks_in_month: 4.34812141,
				weeks_in_year: 52.177457,
				days_in_year: 365.242199,
				hours_in_day: 24
			},
			n = {
				day: 864e5,
				week: 7,
				month: 30.4166666667,
				year: 12,
				hour: 24,
				minute: 1440,
				second: 86400,
				decade: 10,
				century: 100,
				millenium: 1e3
			},
			o = {
				type: "year",
				number: 10,
				first: 1970,
				last: 2011,
				multiplier: 100
			},
			p = {
				type: "year",
				number: 10,
				first: 1970,
				last: 2011,
				multiplier: 100
			},
			q = {
				day: {},
				month: {},
				year: {},
				hour: {},
				minute: {},
				second: {},
				decade: {},
				century: {},
				millenium: {},
				week: {}
			},
			r = {
				interval: 10,
				something: 0,
				width: 900,
				height: 150,
				ease: "easeInOutExpo",
				duration: 1e3,
				nav_width: 100,
				nav_height: 200,
				timeline: false,
				spacing: 15,
				marker_width: 150,
				marker_height: 48,
				density: 2,
				timeline_width: 900,
				interval_width: 200,
				rows: [1, 1, 1],
				multiplier: 6,
				max_multiplier: 16,
				min_multiplier: 1,
				has_start_page: false
			};
		r.rows = [r.marker_height, r.marker_height * 2, 1], b != null && b != "" && (r.width = b), c != null && c != "" && (r.height = c);
		var s = "",
			l = false,
			t = "",
			u = "",
			v = "",
			w = "",
			x = "",
			y = "",
			z = "",
			A = "",
			B = "",
			C = "",
			D = "",
			E = "",
			F = "",
			G = {};
		G.nextBtn, G.prevBtn, G.nextDate, G.prevDate, G.nextTitle, G.prevTitle, this.ver = "0.1";
		var H = a;
		this.init = function (a, b) {
			console.log("VMM.Timeline.TimeNav init"), typeof a != "undefined" ? this.setData(a, b) : console.log("WAITING ON DATA")
		}, this.setData = function (a, b) {
			typeof a != "undefined" ? (e = a, f = b, Z()) : console.log("NO DATA")
		}, this.setSize = function (a, b) {
			a != null && (r.width = a), b != null && (r.height = b), l && J()
		}, this.setMarker = function (a, b, c, d) {
			Y(a, b, c)
		}, this.getCurrentNumber = function () {
			return k
		};
		var R = function () {
			var a = 2,
				b = 0,
				c = 0;
			for (var d = 0; d < e.length; d++) {
				var i = "",
					j, k, l, m, n, o;
				j = VMM.appendAndGetElement(u, "<div>", "marker"), k = VMM.appendAndGetElement(j, "<div>", "flag"), l = VMM.appendAndGetElement(k, "<div>", "flag-content"), m = VMM.appendAndGetElement(j, "<div>", "dot"), n = VMM.appendAndGetElement(j, "<div>", "line"), o = VMM.appendAndGetElement(n, "<div>", "event-line"), VMM.appendElement(l, "<h3>" + VMM.Util.unlinkify(e[d].title) + "</h3><h4>" + e[d].date + "</h4>"), VMM.Element.attr(j, "id", e[d].uniqueid.toString()), VMM.bindEvent(k, O, "", {
					number: d
				}), VMM.bindEvent(k, P, "mouseenter mouseleave", {
					number: d,
					elem: k
				});
				var p = {
					marker: j,
					flag: k,
					lineevent: o,
					type: "marker"
				};
				e[d].type == "start" && (console.log("BUILD MARKER HAS START PAGE"), r.has_start_page = true, p.type = "start"), h.push(p)
			}
			for (var q = 0; q < f.length; q++) {
				var i = "",
					s = {
						content: "",
						startdate: "",
						enddate: "",
						headline: "",
						uniqueid: "",
						color: ""
					};
				s.title = f[q].headline, s.uniqueid = VMM.Util.unique_ID(4), s.color = f[q].color, s.content = VMM.appendAndGetElement(u, "<div>", "era"), VMM.Element.attr(s.content, "id", s.uniqueid), VMM.Element.css(s.content, "background", s.color), VMM.appendElement(s.content, "<h3>" + VMM.Util.unlinkify(s.title) + "</h3>"), s.startdate = VMM.Util.parseDate(f[q].startDate), s.enddate = VMM.Util.parseDate(f[q].endDate), g.push(s)
			}
			T()
		},
			S = function (a, b, c) {
				var d = a.type,
					e = a.multiplier,
					f = U(b),
					g = U(c),
					h = b.months,
					i = c.months;
				return d == "millenium" ? (h = b.milleniums, i = c.milleniums) : d == "century" ? (h = f.centuries, i = g.centuries) : d == "decade" ? (h = f.decades, i = g.decades) : d == "year" ? (h = f.years, i = g.years) : d == "month" ? (h = f.months, i = g.months) : d == "week" ? (h = f.weeks, i = g.weeks) : d == "day" ? (h = f.days, i = g.days) : d == "hour" ? (h = f.hours, i = g.hours) : d == "minute" && (h = f.minutes, i = g.minutes), _pos = (h - o.base) * (r.interval_width / r.multiplier), _pos_end = (i - o.base) * (r.interval_width / r.multiplier), pos = {
					begin: _pos,
					end: _pos_end
				}
			},
			T = function (a) {
				var b = o.type,
					c = o.multiplier,
					d = 2,
					f = 0,
					i = 0,
					j = 150,
					l = 6,
					m = 0;
				VMM.Element.removeClass(".flag", "row1"), VMM.Element.removeClass(".flag", "row2"), VMM.Element.removeClass(".flag", "row3");
				for (var n = 0; n < h.length; n++) {
					var p, q = h[n].marker,
						s = h[n].flag,
						u = h[n].lineevent,
						v = S(o, e[n].startdate, e[n].enddate);
					A = v.begin, _pos_end = v.end;
					var w = -2;
					A = Math.round(A + w), _pos_end = Math.round(_pos_end + w), p = Math.round(_pos_end - A), a ? (VMM.Element.stop(q), VMM.Element.animate(q, r.duration / 2, r.ease, {
						left: A
					})) : VMM.Element.css(q, "left", A), n == k && (m = A), p > 5 && (VMM.Element.css(u, "height", l), VMM.Element.css(u, "width", p), VMM.Element.css(u, "top", j)), A - f < r.marker_width + r.spacing ? d < r.rows.length - 1 ? d++ : (d = 0, i++) : (i = 0, d = 0), f = A, a ? (VMM.Element.stop(s), VMM.Element.animate(s, r.duration, r.ease, {
						top: r.rows[d]
					})) : VMM.Element.css(s, "top", r.rows[d]), r.has_start_page && h[n].type == "start" && VMM.Element.visible(q, false)
				}
				for (var x = 0; x < g.length; x++) {
					var p, y = g[x],
						z = y.content,
						A = S(o, y.startdate, y.enddate),
						B = A.end - A.begin,
						C = 25;
					VMM.Element.css(z, "left", A.begin), VMM.Element.css(z, "width", B)
				}
				a && (VMM.Element.stop(t), VMM.Element.animate(t, r.duration / 2, r.ease, {
					left: r.width / 2 - m
				}))
			},
			U = function (a, b) {
				var c = {};
				return c.days = a / n.day, c.weeks = c.days / n.week, c.months = c.days / n.month, c.years = c.months / n.year, c.hours = c.days * n.hour, c.minutes = c.days * n.minute, c.seconds = c.days * n.second, c.decades = c.years / n.decade, c.centuries = c.years / n.century, c.milleniums = c.years / n.millenium, c
			},
			V = function () {
				var a = U(e[0].startdate),
					b = U(e[e.length - 1].enddate);
				q.millenium.type = "millenium", q.millenium.first = a.milleniums, q.millenium.base = Math.floor(a.milleniums), q.millenium.last = b.milleniums, q.millenium.number = j.milleniums, q.millenium.multiplier = m.millenium, q.millenium.minor = m.millenium, q.century.type = "century", q.century.first = a.centuries, q.century.base = Math.floor(a.centuries), q.century.last = b.centuries, q.century.number = j.centuries, q.century.multiplier = m.century, q.century.minor = m.century, q.decade.type = "decade", q.decade.first = a.decades, q.decade.base = Math.floor(a.decades), q.decade.last = b.decades, q.decade.number = j.decades, q.decade.multiplier = m.decade, q.decade.minor = m.decade, q.year.type = "year", q.year.first = a.years, q.year.base = Math.floor(a.years), q.year.last = b.years, q.year.number = j.years, q.year.multiplier = 1, q.year.minor = m.month, q.month.type = "month", q.month.first = a.months, q.month.base = Math.floor(a.months), q.month.last = b.months, q.month.number = j.months, q.month.multiplier = 1, q.month.minor = Math.round(m.week), q.week.type = "week", q.week.first = a.weeks, q.week.base = Math.floor(a.weeks), q.week.last = b.weeks, q.week.number = j.weeks, q.week.multiplier = 1, q.week.minor = 7, q.day.type = "day", q.day.first = a.days, q.day.base = Math.floor(a.days), q.day.last = b.days, q.day.number = j.days, q.day.multiplier = 1, q.day.minor = 24, q.hour.type = "hour", q.hour.first = a.hours, q.hour.base = Math.floor(a.hours), q.hour.last = b.hours, q.hour.number = j.hours, q.hour.multiplier = 1, q.hour.minor = 60, q.minute.type = "minute", q.minute.first = a.minutes, q.minute.base = Math.floor(a.minutes), q.minute.last = b.minutes, q.minute.number = j.minutes, q.minute.multiplier = 1, q.minute.minor = 60, q.second.type = "decade", q.second.first = a.seconds, q.second.base = Math.floor(a.seconds), q.second.last = b.seconds, q.second.number = j.seconds, q.second.multiplier = 1, q.second.minor = 10
			},
			W = function () {
				VMM.attachElement(x, ""), VMM.attachElement(y, ""), o.date = new Date(e[0].startdate.getFullYear(), 0, 1, 0, 0, 0), p.date = new Date(e[0].startdate.getFullYear(), 0, 1, 0, 0, 0);
				var a = 0,
					b = 0,
					c = true,
					d = 0,
					f = 0,
					g = 0;
				for (var h = 0; h < o.number + 1; h++) {
					var i;
					o.type == "century" ? (c && o.date.setFullYear(Math.floor(e[0].startdate.getFullYear() / 100) * 100), o.date.setFullYear(o.date.getFullYear() + a * 100), i = Math.floor(o.date.getFullYear() / 100) * 100) : o.type == "decade" ? (c && o.date.setFullYear(Math.floor(e[0].startdate.getFullYear() / 10) * 10), o.date.setFullYear(o.date.getFullYear() + a * 10), i = Math.floor(o.date.getFullYear() / 10) * 10) : o.type == "year" ? (!c, o.date.setFullYear(o.date.getFullYear() + a), i = VMM.Util.date.prettyDate(o.date, true, o.type)) : o.type == "month" ? (c && o.date.setMonth(e[0].startdate.getMonth()), o.date.setMonth(o.date.getMonth() + a), i = VMM.Util.date.prettyDate(o.date, true, o.type)) : o.type == "week" ? (c && (o.date.setMonth(e[0].startdate.getMonth()), o.date.setDate(Math.floor(e[0].startdate.getDate() * 7))), o.date.setDate(o.date.getDate() + a * 7), i = VMM.Util.date.day_abbr[o.date.getDay()] + " " + VMM.Util.date.month_abbr[o.date.getMonth()] + " " + o.date.getDate()) : o.type == "day" ? (c && (o.date.setMonth(e[0].startdate.getMonth()), o.date.setDate(e[0].startdate.getDate())), o.date.setDate(o.date.getDate() + a), i = VMM.Util.date.prettyDate(o.date, true, o.type)) : o.type == "hour" ? (c && (o.date.setMonth(e[0].startdate.getMonth()), o.date.setDate(e[0].startdate.getDate()), o.date.setHours(e[0].startdate.getHours())), o.date.setHours(o.date.getHours() + a), i = VMM.Util.date.prettyDate(o.date, true, o.type)) : o.type == "minute" ? (c && (o.date.setMonth(e[0].startdate.getMonth()), o.date.setDate(e[0].startdate.getDate()), o.date.setHours(e[0].startdate.getHours()), o.date.setMinutes(e[0].startdate.getMinutes())), o.date.setMinutes(o.date.getMinutes() + a), i = VMM.Util.date.prettyDate(o.date, true, o.type)) : o.type == "second" && (c && (o.date.setMonth(e[0].startdate.getMonth()), o.date.setDate(e[0].startdate.getDate()), o.date.setHours(e[0].startdate.getHours()), o.date.setMinutes(e[0].startdate.getMinutes()), o.date.setSeconds(e[0].startdate.getSeconds())), o.date.setSeconds(o.date.getSeconds() + a), i = VMM.Util.date.prettyDate(o.date, true, o.type)), a = 1, c && (d = k), c = false;
					var j = S(o, o.date, o.date),
						k = j.begin;
					$interval_date = VMM.appendAndGetElement(x, "<div>", "_idd"), VMM.appendElement($interval_date, i), VMM.Element.css($interval_date, "left", k), VMM.Element.css($interval_date, "text-indent", -(VMM.Element.width($interval_date) / 2)), k - f < 65 ? k - f < 35 ? h % 4 == 0 ? k == 0 ? VMM.Element.css($interval_date, "display", "none") : VMM.Element.css($interval_date, "display", "") : VMM.Element.css($interval_date, "display", "none") : VMM.Util.isEven(h) ? VMM.Element.css($interval_date, "display", "none") : VMM.Element.css($interval_date, "display", "") : VMM.Element.css($interval_date, "display", ""), f = k
				}
				c = true, _major_first_pos = 0, _major_last_pos = 0;
				for (var h = 0; h < Math.ceil(p.number) + 1; h++) {
					var i;
					p.type == "century" ? (c && p.date.setFullYear(Math.floor(e[0].startdate.getFullYear() / 100) * 100), p.date.setFullYear(p.date.getFullYear() + b * 100), i = Math.floor(p.date.getFullYear() / 100) * 100) : p.type == "decade" ? (c && p.date.setFullYear(Math.floor(e[0].startdate.getFullYear() / 10) * 10), p.date.setFullYear(p.date.getFullYear() + b * 10), i = Math.floor(p.date.getFullYear() / 10) * 10) : p.type == "year" ? (!c, p.date.setFullYear(p.date.getFullYear() + b), i = p.date.getFullYear()) : p.type == "month" ? (c && p.date.setMonth(e[0].startdate.getMonth()), p.date.setMonth(p.date.getMonth() + b), i = VMM.Util.date.month[p.date.getMonth()] + " " + p.date.getFullYear()) : p.type == "week" ? (c && (p.date.setMonth(e[0].startdate.getMonth()), p.date.setDate(Math.floor(e[0].startdate.getDate() * 7))), p.date.setDate(p.date.getDate() + b * 7), i = VMM.Util.date.day_abbr[p.date.getDay()] + " " + VMM.Util.date.month_abbr[p.date.getMonth()] + " " + p.date.getDate()) : p.type == "day" ? (c && (p.date.setMonth(e[0].startdate.getMonth()), p.date.setDate(e[0].startdate.getDate())), p.date.setDate(p.date.getDate() + b), i = VMM.Util.date.prettyDate(p.date, true, p.type)) : p.type == "hour" ? (c && (p.date.setMonth(e[0].startdate.getMonth()), p.date.setDate(e[0].startdate.getDate()), p.date.setHours(e[0].startdate.getHours())), p.date.setHours(p.date.getHours() + b), i = VMM.Util.date.prettyDate(p.date, true, p.type)) : p.type == "minute" ? (c && (p.date.setMonth(e[0].startdate.getMonth()), p.date.setDate(e[0].startdate.getDate()), p.date.setHours(e[0].startdate.getHours()), p.date.setMinutes(e[0].startdate.getMinutes())), p.date.setMinutes(p.date.getMinutes() + b), i = VMM.Util.date.prettyDate(p.date, true, p.type)) : p.type == "second" && (c && (p.date.setMonth(e[0].startdate.getMonth()), p.date.setDate(e[0].startdate.getDate()), p.date.setHours(e[0].startdate.getHours()), p.date.setMinutes(e[0].startdate.getMinutes()), p.date.setSeconds(e[0].startdate.getSeconds())), p.date.setSeconds(p.date.getSeconds() + b), i = VMM.Util.date.prettyDate(p.date, true, p.type)), console.log("interval_major.type " + p.type), b = 1;
					var j = S(o, p.date, p.date),
						k = j.begin;
					$interval_date = VMM.appendAndGetElement(y, "<div>", "major"), VMM.appendElement($interval_date, i), VMM.Element.css($interval_date, "left", k), VMM.Element.css($interval_date, "left", k), VMM.Element.css($interval_date, "text-indent", -(VMM.Element.width($interval_date) / 2)), c && (_major_first_pos = k), c = false, g = k, _major_last_pos = k
				}
				VMM.Element.width(u, o.number * (r.interval_width / r.multiplier)), _minor_pos_offset = 50;
				var l = _major_last_pos - _major_first_pos + _minor_pos_offset * 6,
					m = f + _minor_pos_offset * 6;
				l < m ? VMM.Element.width(C, m) : VMM.Element.width(C, l), VMM.Element.css(C, "left", _major_first_pos - _minor_pos_offset), r.timeline_width = VMM.Element.width(x)
			},
			X = function () {
				j = U(e[e.length - 1].enddate - e[0].startdate, true), V(), j.milleniums > e.length / r.density ? o = q.millenium : j.centuries > e.length / r.density ? o = Math.ceil(q.century) : j.decades > e.length / r.density ? o = q.decade : j.years > e.length / r.density ? o = q.year : j.months > e.length / r.density ? o = q.month : j.days > e.length / r.density ? o = q.day : j.hours > e.length / r.density ? o = q.hour : j.minutes > e.length / r.density ? o = q.minute : j.seconds > e.length / r.density ? o = q.second : (console.log("NO FUCKING IDEA WHAT THE TYPE SHOULD BE"), o.type = "unknown"), j.milleniums >= 1 ? p = q.millenium : j.centuries >= 1 ? p = q.century : j.decades >= 1 ? p = q.decade : j.years >= 1 ? p = q.year : j.months > 1 ? p = q.month : j.weeks > 1 ? p = q.month : j.days > 1 ? p = q.day : j.hours > 1 ? p = q.hour : j.minutes > 1 ? p = q.minute : j.seconds > 1 ? p = q.minute : (console.log("NO FUCKING IDEA WHAT THE TYPE SHOULD BE"), p.type = "unknown"), C = VMM.appendAndGetElement(w, "<div>", "minor"), W()
			},
			Y = function (a, b, c, d, e) {
				k = a;
				var f = r.ease,
					g = r.duration,
					i = false,
					j = false;
				k == 0 && (j = true), k + 1 == h.length && (i = true), b != null && b != "" && (f = b), c != null && c != "" && (g = c);
				var l = VMM.Element.position(h[k].marker);
				for (var m = 0; m < h.length; m++) VMM.Element.removeClass(h[m].marker, "active");
				r.has_start_page && h[k].type == "start" && (VMM.Element.visible(h[k].marker, false), VMM.Element.addClass(h[k].marker, "start")), VMM.Element.addClass(h[k].marker, "active"), !j, !i, VMM.Element.stop(t), VMM.Element.animate(t, g, f, {
					left: r.width / 2 - l.left
				})
			},
			Z = function () {
				VMM.attachElement(H, ""),
				t = VMM.appendAndGetElement(H, "<div>", "timenav"),
				u = VMM.appendAndGetElement(t, "<div>", "content"),
				v = VMM.appendAndGetElement(t, "<div>", "time"),
				w = VMM.appendAndGetElement(v, "<div>", "time-interval-minor"),
				y = VMM.appendAndGetElement(v, "<div>", "time-interval-major"),
				x = VMM.appendAndGetElement(v, "<div>", "time-interval"),
				z = VMM.appendAndGetElement(H, "<div>", "timenav-background"),
				B = VMM.appendAndGetElement(z, "<div>", "timenav-line"),
				A = VMM.appendAndGetElement(z, "<div>", "timenav-interval-background", "<div class='top-highlight'></div>"),
				X(),
				R(),
				J(true),
				VMM.fireEvent(H, "LOADED"),
				D = VMM.appendAndGetElement(H, "<div>", "toolbar"),
				r.has_start_page && (VMM.Element.css(D, "top", 27)),
				E = VMM.appendAndGetElement(D, "<div>", "zoom-in", "<div class='icon'></div>"),
				F = VMM.appendAndGetElement(D, "<div>", "zoom-out", "<div class='icon'></div>"),
				VMM.bindEvent(".zoom-in", L, "click"),
				VMM.bindEvent(".zoom-out", M, "click"),
				VMM.DragSlider.createPanel(H, t, r.width, r.spacing, false), l = true
			},
			$ = function () {
				W(), T(true)
			}
}, VMM.Timeline.DataObj = {
		data_obj: {},
		model_array: [],
		getData: function (a) {
			data = VMM.Timeline.DataObj.data_obj, type.of(a) != "string" ? (console.log("DATA SOURCE: NOT JSON"), console.log("TRYING HTML PARSE"), VMM.Timeline.DataObj.parseHTML(a)) : a.match("%23") ? (console.log("DATA SOURCE: TWITTER SEARCH"), VMM.Timeline.DataObj.model_Tweets.getData("%23medill")) : a.match("spreadsheet") ? (console.log("DATA SOURCE: GOOGLE SPREADSHEET"), VMM.Timeline.DataObj.model_GoogleSpreadsheet.getData(a)) : (console.log("DATA SOURCE: JSON"), VMM.getJSON(a, VMM.Timeline.DataObj.parseJSON))
		},
		parseHTML: function (a) {
			console.log("parseHTML");
			var b = VMM.Timeline.DataObj.data_template_obj;
			if (VMM.Element.find("#timeline section", "time")[0]) {
				b.timeline.startDate = VMM.Element.html(VMM.Element.find("#timeline section", "time")[0]), b.timeline.headline = VMM.Element.html(VMM.Element.find("#timeline section", "h2")), b.timeline.text = VMM.Element.html(VMM.Element.find("#timeline section", "article"));
				var c = false;
				VMM.Element.find("#timeline section", "figure img").length != 0 ? (c = true, b.timeline.asset.media = VMM.Element.attr(VMM.Element.find("#timeline section", "figure img"), "src")) : VMM.Element.find("#timeline section", "figure a").length != 0 && (c = true, b.timeline.asset.media = VMM.Element.attr(VMM.Element.find("#timeline section", "figure a"), "href")), c && (VMM.Element.find("#timeline section", "cite").length != 0 && (b.timeline.asset.credit = VMM.Element.html(VMM.Element.find("#timeline section", "cite"))), VMM.Element.find(this, "figcaption").length != 0 && (b.timeline.asset.caption = VMM.Element.html(VMM.Element.find("#timeline section", "figcaption"))))
			}
			VMM.Element.each("#timeline li", function (a, c) {
				var d = false,
					e = {
						type: "default",
						startDate: "",
						headline: "",
						text: "",
						asset: {
							media: "",
							credit: "",
							caption: ""
						},
						tags: "Optional"
					};
				if (VMM.Element.find(this, "time") != 0) {
					d = true, e.startDate = VMM.Element.html(VMM.Element.find(this, "time")[0]), VMM.Element.find(this, "time")[1] && (e.endDate = VMM.Element.html(VMM.Element.find(this, "time")[0])), e.headline = VMM.Element.html(VMM.Element.find(this, "h3")), e.text = VMM.Element.html(VMM.Element.find(this, "article"));
					var f = false;
					VMM.Element.find(this, "figure img").length != 0 ? (f = true, e.asset.media = VMM.Element.attr(VMM.Element.find(this, "figure img"), "src")) : VMM.Element.find(this, "figure a").length != 0 && (f = true, e.asset.media = VMM.Element.attr(VMM.Element.find(this, "figure a"), "href")), f && (VMM.Element.find(this, "cite").length != 0 && (e.asset.credit = VMM.Element.html(VMM.Element.find(this, "cite"))), VMM.Element.find(this, "figcaption").length != 0 && (e.asset.caption = VMM.Element.html(VMM.Element.find(this, "figcaption")))), console.log(e), b.timeline.date.push(e)
				}
			}), VMM.fireEvent(global, "DATAREADY", b)
		},
		parseJSON: function (a) {
			a.timeline.type == "default" ? (console.log("DATA SOURCE: JSON STANDARD TIMELINE"), VMM.fireEvent(global, "DATAREADY", a)) : a.timeline.type == "twitter" ? (console.log("DATA SOURCE: JSON TWEETS"), VMM.Timeline.DataObj.model_Tweets.buildData(a)) : (console.log("DATA SOURCE: NO IDEA"), console.log(type.of(a.timeline)))
		},
		data_template_obj: {
			timeline: {
				headline: "",
				description: "",
				asset: {
					media: "",
					credit: "",
					caption: ""
				},
				date: []
			}
		},
		date_obj: {
			startDate: "2012,2,2,11,30",
			headline: "",
			text: "",
			asset: {
				media: "",
				credit: "",
				caption: ""
			},
			tags: "Optional"
		}
	})