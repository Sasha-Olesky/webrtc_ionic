cordova.define("com.dooble.audiotoggle.AudioToggle", function(require, exports, module) { var exec = require('cordova/exec');

exports.SPEAKER = 'speaker';
exports.EARPIECE = 'earpiece';

exports.setAudioMode = function (mode) {
	cordova.exec(null, null, 'AudioTogglePlugin', 'setAudioMode', [mode]);
};

});
