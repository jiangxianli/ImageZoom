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
        //$overlayer = $('<div id="over_laryer"></div>');

        $image_zoom_wrapper = $('<div id="image_zoom"><div class="image_zoom_wrapper"><img src="" class="preview"/><span class="close"></span></div> </div>');
        $('body').append($overlayer).append($image_zoom_wrapper);
        var image_count = $(this).size();
        var cur_index  = 0;
        var image_list = $(this);
        var widowWidth = $(window).width() * 0.8;
        var windowHeight = $(window).height() * 0.8;
        console.info($(this))
        $(this).each(function(){
            $(this).css({'cursor':'pointer'});
            var cur_img = $(this);
            $('<img />').attr("src",$(cur_img).attr("src")+"?t="+Math.random()).load(function(){
                console.info('e')
                var realWidth = this.width;
                var realHeight = this.height;

                var autoWidth = realWidth;
                var autoHeight = realHeight;
                //console.info(realWidth +" == "+ realHeight);
                if(realHeight > windowHeight){
                    autoHeight = windowHeight;
                    autoWidth  = (autoHeight/realHeight)*realWidth;
                }
                else{
                    autoHeight = realHeight;
                    autoWidth = realWidth;
                }
                $(cur_img).attr('autoWidth',parseInt(autoWidth)).attr('autoHeight',parseInt(autoHeight));
                $(cur_img).click(function(){
                    cur_index = image_list.index(this);
                    $image_zoom_wrapper.show();
                    $overlayer.show()
                    $('#image_zoom img.preview').attr('src',$(this).attr('src'));
                    var autoWidth = parseInt($(this).attr('autoWidth'));
                    var autoHeight = parseInt($(this).attr('autoHeight'));

                    $("#image_zoom img.preview").css({"width":autoWidth+'px',"height":autoHeight+'px'});
                    $image_zoom_wrapper.css({"width":autoWidth+'px',"height":autoHeight+'px',"margin-left":(-1*autoWidth/2)+'px',"margin-top":(-1*autoHeight/2)+'px'});


                })
            });



        });

        $image_zoom_wrapper.find('span.close').click(function(){
            $image_zoom_wrapper.hide();
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
            if($image_zoom_wrapper.is(':visible')){
                event = event || window.event;
                event.wheelDelta > 0 ? showNextImage(-1) :showNextImage(1);
            }

            return false;
        });
        document.body.addEventListener("DOMMouseScroll", function(event) {
            if($image_zoom_wrapper.is(':visible')){
                event = event || window.event;
                event.detail > 0 ? showNextImage(1) :showNextImage(-1);
            }

        });

    };
})(jQuery);
