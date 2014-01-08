$(function() {
	$('.search input').bind('focus', function() {
		$(this).popover('Все результаты',
			'<dl><dt>В тексте:</dt><dd><strong>Desire For A Beter </strong><a>стр. 61</a></dd><dd><strong>Desire For A Beter </strong><a>стр. 121</a></dd><dd><strong>Desire For A Beter </strong><a>стр. 139</a></dd></dl><dl><dt>В заголовках:</dt><dd><strong>Desire For A Beter </strong><a>стр. 61</a></dd></dl><dl><dt>В подписях:</dt><dd><strong>Desire For A Beter </strong><a>стр. 115</a></dd></dl>',
			'top', 'search-result', true);
	});

	$('.search input').bind('blur', function() {
		// $('.popover').remove();
	});

	$('.media ul li').click(function() {

		$(this).popover(null,
				'<div class="dir"><ul><li class="active"><span>Photobank</span><ul><li class="active"><div class="stick"></div><span>Sunlowers</span></li><li><div class="stick"></div><span>Sky</span></li></ul></li><li><span>Book Photos</span><ul><li><div class="stick"></div><span>Graphics</span></li><li><div class="stick"></div><span>Minimal</span></li></ul></li><li><span>Book Photos</span></li><li><span>Photobank</span><ul><li><div class="stick"></div><span>Graphics</span></li><li><div class="stick"></div><span>Photos</span></li><li><div class="stick"></div><span>Pics</span></li></ul></li><li><span>Fotolia</span><ul><li><div class="stick"></div><span>Book Photos</span></li></ul></li><li><span>Photobank</span><ul><li><div class="stick"></div><span>Graphics</span></li><li><div class="stick"></div><span>Photos</span></li><li><div class="stick"></div><span>Pics</span></li></ul></li><li><span>Photobank</span><ul><li><div class="stick"></div><span>Graphics</span></li><li><div class="stick"></div><span>Photos</span></li><li><div class="stick"></div><span>Pics</span></li></ul></li></ul></div><div class="main"><ul class="filter"><li><a class="active">По имени</a></li><li><a>По дате</a></li><li><a>По размеру</a></li></ul><ul class="select-media"><li><img src="./img/example.jpg"><input hidden="hidden" id="media-pic-0" name="media-pic" type="radio"><label for="media-pic-0">1.jpg</label></li><li><img src="./img/example.jpg"><input hidden="hidden" id="media-pic-1" name="media-pic" type="radio"><label for="media-pic-1">2.jpg</label></li></ul></div>',
				'left', 'medialib pic');
	});
});

/**
 * create popover for element
 * @param  {string} title
 * @param  {string} content
 * @param  {string} placement положение относительно элемента left|right|top|bottom
 * @param  {string} add_class дополнительный класс
 * @param  {bool} blue для голубого заголовка !TODO -> check arrow placement, for 'top' is OK
 * @return void
 */
(function($) {
	$.extend($.fn, {
		popover: function(title, content, placement, add_class, blue) {

			$('.popover').remove();

			// Toggle
			if ($(this).attr('data-popover') == 1) {

				$('.popover').remove();
				$(this).attr('data-popover',0);

			} else {

				$('[data-popover="1"]').attr('data-popover',0);
				

				var placement = placement || 'top', // default top
					popover = $('<div class="popover ' + placement + '"><div class="arrow"></div><div class="popover-content"></div></div>'),
					offset = $(this).offset();


				if (content) $('.popover-content', popover).append(content);
				if (title) popover.append('<h3 class="popover-title">' + title + '</h3>');
				if (blue) popover.addClass('blue-title');
				if (add_class) popover.addClass(add_class);

				$('body').append(popover);

				if (title) $('.popover-content', popover).css('padding-bottom' , $('.popover-title', popover).height());

				var actualWidth = popover.width(),
					actualHeight = popover.height(),
					calculatedOffset = this.getCalculatedOffset(placement, offset, actualWidth, actualHeight);

				if (calculatedOffset.top < 5) {
					$('.arrow', popover).css({
						top: calculatedOffset.top < 0 ? actualHeight/2 + calculatedOffset.top - 5 : actualHeight/2 - calculatedOffset.top
					});

					calculatedOffset.top = 5;
				}

				popover.css(calculatedOffset);
				$(this).attr('data-popover',1);
			}
		},
		getCalculatedOffset: function(placement, pos, actualWidth, actualHeight) {
			return	placement == 'bottom'	? { top: pos.top + pos.height, left: pos.left + pos.width/2 - actualWidth/2} :
					placement == 'left'		? {	top: pos.top + pos.height/2 - actualHeight/2, left: pos.left - actualWidth} :
					placement == 'right'	? {	top: pos.top + pos.height/2 - actualHeight/2, left: pos.left + pos.width} :
					/*placement == 'top'*/	  {	top: pos.top - actualHeight, left: pos.left + pos.width/2 - actualWidth/2};
		}
	})
})(Zepto)