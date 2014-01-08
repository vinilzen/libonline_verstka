/**
 * create popover for element
 * @param  {string} title
 * @param  {string} content
 * @param  {string} placement положение относительно элемента left|right|top|bottom
 * @param  {string} add_class дополнительный класс
 * @param  {bool} blue для голубого заголовка !TODO -> check arrow placement, for 'top' is OK
 * @return void
 */
(function( $ ){
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
                    
                offset.height = $(this).height();
                offset.width = $(this).width();



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

            return this;
        },
        getCalculatedOffset: function(placement, pos, actualWidth, actualHeight) {
            return  placement == 'bottom'   ? { top: pos.top + pos.height, left: pos.left + pos.width/2 - actualWidth/2} :
                    placement == 'left'     ? { top: pos.top + pos.height/2 - actualHeight/2, left: pos.left - actualWidth} :
                    placement == 'right'    ? { top: pos.top + pos.height/2 - actualHeight/2, left: pos.left + pos.width} :
                    /*placement == 'top'*/    { top: pos.top - actualHeight, left: pos.left + pos.width/2 - actualWidth/2};
        }
    })
})( jQuery );