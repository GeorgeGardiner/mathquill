/**
 * MathQuill Soft Keyboard Demo: http://commonmode.co.uk/project/mathquillKeyboard/
 * by George Gardiner (george.gardiner@commonmode.co.uk)
 *
 * This Source Code Form is subject to the terms of the
 * Mozilla Public License, v. 2.0. If a copy of the MPL
 * was not distributed with this file, You can obtain
 * one at http://mozilla.org/MPL/2.0/.
 */

$(document).ready(function() {
	var $mqFocused;
	
	$('#mathquill-keyboard').each(function() { 
		if (typeof this.onselectstart != 'undefined') {
			this.onselectstart = function() { return false; };
        } else if (typeof this.style.MozUserSelect != 'undefined') {
			this.style.MozUserSelect = 'none';
        } else {
			this.onmousedown = function() { return false; };
        }
    }); 

	// The reliability of this function is liable to change as touch / mobile devices evolve.
	function is_touch_device() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	};
	
	// Disable the standard keyboard on those devices that use a soft onscreen keyboard.
	if(is_touch_device()) {
		$('.mathquill-editable').each(function() {
			$(this).find('textarea').attr('readonly', 'readonly');
		});
	}

	var bindEvent = "focusin";
	if(is_touch_device() == true) {
		bindEvent = "click";
	}
	
	$('.mathquill-editable').on(bindEvent, '.mathquill-rendered-math', function() {
		$mqFocused = $(this);
		$('#mathquill-keyboard').addClass('active');
	});
		
	$('.mathquill-editable').on('click', function() {
		$mqFocused = $(this);
		$('#mathquill-keyboard').addClass('active');
	});

    $('#mathquill-keyboard').on('click', '#mathquill-keyboard-toggle', function () {
    	$('#mathquill-keyboard').toggleClass('active');
    });

	$('#mathquill-keyboard').on('click', '.key', function(e) {	
		if($(this).hasClass('math')) {
			$('.qwerty-kb').hide();
			$('.math-kb').show();			
		}
		if($(this).hasClass('qwerty')) {
			$('.qwerty-kb').show();
			$('.math-kb').hide();
		}
		
		var chars = $(this).attr('data-chars');
		var cmd = $(this).attr('data-cmd');
		if(chars && $mqFocused) {
			$mqFocused.mathquill('cmd', chars);
		}
		if(cmd && $mqFocused) {
			$mqFocused.mathquill('onKey', cmd);
		}
		$mqFocused.find('textarea').triggerHandler('focus');
		$mqFocused.focus();
	});
});