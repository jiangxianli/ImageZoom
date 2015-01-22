/**
 * Author : Aaron_JXL
 * Email : 997204035@qq.com
 * Date ： 2015/01/10
 * Site : http://www.jxljxl.1366.co
 */

(function($) {
    $.fn.imageZoom = function(options) {
        var defaults = {
            foreground: 'red',
            background: 'yellow'
        };
        // Extend our default options with those provided.
        var opts = $.extend(defaults, options);

        $overlayer = $('<div id="over_laryer"><div class="arrow arrow_prev"><span></span></div><div class="arrow arrow_next"><span></span></div></div>');
        $image_zoom = $('<div id="image_zoom"><div class="image_zoom_wrapper"><img src="" class="preview"/><span class="close"></span></div> </div>');
        $('body').append($overlayer).append($image_zoom);
        var image_count = $(this).size();
        var cur_index  = 0;
        var image_list = $(this);
        $(this).each(function(){
            //console.info(this)
            $(this).css({'cursor':'pointer'});
            $(this).click(function(){
                cur_index = image_list.index(this);
                $image_zoom.show();
                $overlayer.show()
                $('#image_zoom img.preview').attr('src',$(this).attr('src'));
                var widowWidth = $(window).width() * 0.8;
                var windowHeight = $(window).height() * 0.8;
                //console.info(widowWidth+"--"+windowHeight)
                $("#image_zoom img.preview").attr("src",$(this).attr("src")).load(function(){
                    var realWidth = $(this).width()
                    var realHeight = $(this).height()
                    //console.info(realWidth +" == "+ realHeight);
                    if(realHeight > windowHeight){
                        var autoHeight = windowHeight;
                        var autoWidth  = (autoHeight/realHeight)*realWidth;
                    }
                    else{
                        var autoHeight = realHeight;
                        var autoWidth = realWidth;
                    }
                    $(this).css({"width":autoWidth,"height":autoHeight});
                    $image_zoom.css({"width":autoWidth,"height":autoHeight,"margin-left":-1*autoWidth/2,"margin-top":-1*autoHeight/2});

                });
            })
        });

        $image_zoom.find('span.close').click(function(){
            $image_zoom.hide();
            $overlayer.hide()
        });

        $overlayer.find('.arrow_prev span').click(function(){
            showNextImage(-1);
        });

        $overlayer.find('.arrow_next span').click(function(){
            showNextImage(1);
        });
        function showNextImage(step){
            cur_index += step ;
            cur_index =  (cur_index >= image_count) ? 0:cur_index;
            cur_index = (cur_index < 0) ? image_count -1 :cur_index;
            image_list.eq(cur_index).trigger('click');
        }
        $('body').bind('mousewheel', function(event, delta) {
            event = event || window.event;
            event.wheelDelta > 0 ? showNextImage(-1) :showNextImage(1);
            return false;
        });
        document.body.addEventListener("DOMMouseScroll", function(event) {
            event = event || window.event;
            event.detail > 0 ? showNextImage(1) :showNextImage(-1);
        });

    };
})(jQuery);
