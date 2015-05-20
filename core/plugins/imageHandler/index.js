var img = require('lwip');


image = { _h: {}};


image._h.getPath = function() {
	var path = require('path');
	return path.join(process.cwd(), 'source/letter/example/images/image.jpg');
};

image.getSize = function(file) {
	var file = this.__h.getPath(file);
};
image.averageColor = function(file) {

};
module.exports = image;