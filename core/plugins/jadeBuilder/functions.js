/** @var {Array} contains relation around css property «font-size» and
 *  html attribute «size».
 */
var instance = {};
instance._ = require('lodash');
instance.synonymsFont = [0, 9, 12, 15, 19, 23, 26, 32];
//instance.bgPad = (size.letter-size.layout) / 2;

//	* @var {Number} redefined by block mixinis size of block containing text
//instance.typesetting = size.layout;

instance.isColor = function(value) {
	return !!value.match(/#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3}|[0-9A-Fa-f]{8})/)
};

instance.getAlign = function(param) {
	var vertical, horizontal;
	if (param.split('').length < 3) {
		vertical = param.split('')[0];
		horizontal = param.split('')[1];

		switch(vertical) {
			case 't': vertical = 'top'; break;
			case 'm': vertical = 'middle'; break;
			case 'b': vertical = 'bottom'; break;
			default: throw Error('cant parse alignment for "' + param + '" value.');

		}
		switch(horizontal) {
			case 'l': horizontal = 'left'; break;
			case 'c': horizontal = 'center'; break;
			case 'r': horizontal = 'right'; break;
			default: throw Error('cant parse alignment for "' + param + '" value.');

		}

	}
	if (param.match(/(top|middle|bottom)\-(left|center|right)/)) {
		vertical = param.split('-')[0];
		horizontal = param.split('-')[1];

	}
	if (!vertical || !horizontal) return false;
	return {valign: vertical, align: horizontal};

};


instance.addLeadingZero = function (number, length) {
	var str = (number > 0 ? number : -number) + "";
	var zeros = "";
	for (var i = length - str.length; i > 0; i--) {
		zeros += "0";
	}
	zeros += str;
	return number >= 0 ? zeros : "-" + zeros;

};

/** @var {Array} target screens to images in vml (http://www.datypic.com/sc/ooxml/a-o_targetscreensize.html) */
instance._vts = [[544, 376],[640,480],[720,512],[800,600],[1024,768],[1152,862]];

instance.vmlTargetScreen = false;
instance.getVmlTargetScreen = function () {
	for(var target in _vts) {
		if (target < size.letter) {
			continue;
		} else {
			vmlTargetScreen = target;
		}
	}
	return false;

};

/** Create font data from integer number, using
* typography rules and data about current letter (from JSON file)
*
* @param        {Number} value          integer value relative to synonymsFont
*                                       variable
*
* @return       {Object}
*   synonyms      {Array}               current list of font synonims
*   html          {Number}              value for html attribute  «size»
*   css           {Number}              css value for «font-size» property
*   columnWidth   {Number}              typesetting width (width of containing
*                                       block)
*/
instance.convertFontSize = function(value) {
	if (!(value > -1)) {
		if (value.match('px') || value.match('pt')) {
			value = value.split('p')[0];
			var html = 0;
			for (var i = synonymsFont.length; i >= 0; i--) {
				if (value >= synonymsFont[i]) {
					html = synonymsFont[i];
				}
			}
			var css = value;
		} else {
			console.log('\n=====================================================');
			console.log('\t>> Unexpexted "' + value + '" value "size"! <<');
			console.log('=====================================================\n');
		}
	}
	if (value === parseInt(value)) {
		if (value < 0) {
			var iteration = Math.abs(value);
			value = value - iteration;

		}
		var css = synonymsFont[value];
		var html = value;

	}

	return {synonyms: synonymsFont, html: html, css: css, columnWidth: columnWidth }

};


instance.getLineHeight = function(fontSize, columnWidth) {
	if (typeof fontSize == 'undefined' || fontSize < 1) {
		var cssSize = convertFontSize(font.size).css;

	} else {
		var cssSize = convertFontSize(fontSize).css;

	}
	if (!cssSize) return false;
	if (typesetting < 2) { typesetting = size.layout; }
	columnWidth = columnWidth || typesetting;
	var picaTypesetting = columnWidth / 11.59999988;
	return cssSize + Math.round(picaTypesetting / cssSize);

};


instance.convertImgSrc = function(value) {
	if (!value) return false;
	if (!(value > -1)) {
		if (value == 'spacer.gif') {
			var src = 'http://fabrikaonline.ru/newsletters/images/spacer.gif';

		} else if (value.match(/https*\:\/\//)) {
			var src = value;

		} else {
			var src = path + value;

		}
	} else {
		var src = path + project.ambiance + project.key + value + '.jpg';

	}
	return src;

};


instance._lc = function(url) {
	if (typeof url === 'undefined') {
		return false;

	}
	if (!url.match(/(http(s?))/)) {
		if (url.charAt[0] === '.') {
			return url;

		}
		url = 'http://' + url;

	}
	if (link.pid) {
		if (!url.match(/(.exe|.pdf|.doc|.torrent)/)) {
			var catcher = false;
			for(var c = 0; c < pid_catcher.length; c++) {
				if (url.match(pid_catcher[c])) {
					catcher = true;

				}

			}

			if (catcher) {
				if (!url.match(/\?/)) {
					url += '?';

				} else {
					if (url.charAt[url.length-1] !== '&') url += '&';

				}
				for(var i = 0; i < link.pid.length; i++) {
					if (link.pid[i].length < 1) continue;
					url += link.pid[i][0] + '=' + link.pid[i][1];
					if(i < link.pid.length - 1) url += '&';

				}

			}

		}

	}

	return url;

};


instance.bgAttrParser = function(image, attr) {
	var style = '', defaults = { tile: false, align: false, valign: false, scroll: false };
	attr = attr || defaults;
	style = style.concat('position:relative;overflow:hidden;background-image:url(' + convertImgSrc(image) + ');');
	if (!attr.tile) { style  = style.concat('background-repeat: no-repeat;'); }
	if (attr.align) { style  = style.concat('background-position: ' + (attr.align == attr.valign ? attr.valign : attr.align + ' ' + attr.valign) + ';'); }
	if (attr.scroll) { style = style.concat('background-attachment: fixed;'); }
	if (attr.valign) { style   = style.concat('vertical-align: ' + attr.valign + ';'); }

	return { style: style, valign: attr.valign||false }

};


instance.getPadding = function(value) {
	var defPad = size.textPad;
	if (typeof value == 'number') {
			value = [value, value];

	}
	if (typeof value != 'undefined') {
		for (var i = 0; i < value.length; i++) {
			if (typeof parseInt(value[i]) == 'number') {
				var valInt = parseInt(value[i]);

				if (valInt < 0) {
					value[i] = 0;

				} else if (valInt == 0) {
					value[i] = defPad;

				} else {
					value[i] = valInt;

				}

			} else if (typeof value[i] == 'undefined') {
				value[i] = defPad;

			}
		}
	} else {
		value = [defPad,defPad];
	}
	return value;

};
instance.vmlAttrParser = function (tag, attr) {
	var attributes = {};
	if (attr.tile) { attributes['type'] = 'tile'; }
};


instance.setTypesetting = function(width) {
	typesetting = width || typesetting || size.layout;
};

module.exports = instance;
