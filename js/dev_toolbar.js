(function() {
    /* Dev_toolbar */

    /* -----------Toolbar Class----------- */
    function Toolbar(object) {
        this.speed = 1000;
        this.opened = true;
        this.pos_bt = true;
        this.pos_top = false;
        this.object = object;
        this.hide = function () {
            if (this.opened) {
                this.opened = false;
                if (this.pos_bt) {
                    this.object.animate({
                        bottom: "-=175"
                    }, this.speed, function () {
                        // Animation complete.
                    });
                }
                else if (this.pos_top) {
                    this.object.animate({
                        top: "-=175"
                    }, this.speed, function () {
                        // Animation complete.
                    });
                }
            }
        };
        this.show = function () {
            if (!this.opened) {
                this.opened = true;
                if (this.pos_bt) {
                    this.object.animate({
                        bottom: "+=175"
                    }, this.speed, function () {
                        // Animation complete.
                    });
                }
                else if (this.pos_top) {
                    this.object.animate({
                        top: "+=175"
                    }, this.speed, function () {
                        // Animation complete.
                    });
                }
            }
        };
        this.show_top = function () {
            if (this.pos_top) {
            }
            else if (this.pos_bt) {
                this.pos_bt = false;
                this.pos_top = true;
                this.object.fadeIn()
                    .css({top: -175})
                    .animate({top: 0}, 1000, function () {
                        //callback
                    });
                this.object.find(".buttons").before(toolbar.find(".content"));
            }
        };
        this.show_bt = function () {
            if (this.pos_top) {
                this.pos_bt = true;
                this.pos_top = false;
                this.opened = false;
                this.object.css("top", "");
                this.object.fadeIn()
                    .css({bottom: -175});
                this.show();
                this.object.find(".content").before(toolbar.find(".buttons"));
            }
        };
    }
    /* --------------------------------------- */

    var hide_toolbar = $('.hide_tb');
    var show_toolbar = $('.show_tb');
    var show_top_tb = $('.show_top_tb');
    var show_bottom_tb = $('.show_bottom_tb');
    var toolbar = $('.dev_toolbar');
    var toolbar_obj = new Toolbar(toolbar);

    hide_toolbar.click( function(){
        toolbar_obj.hide();
       //
    });
    show_toolbar.click( function(){
        toolbar_obj.show();
    });
    show_top_tb.click( function(){
        toolbar_obj.show_top();
    });
    show_bottom_tb.click( function(){
        toolbar_obj.show_bt();
    });

    /* Sliders */
    $(".slider").slider();

    var width_slider =  $(".slider#width_s");
    var height_slider =  $(".slider#height_s");

    width_slider.slider( "option", "value", $("input#width").val());
    height_slider.slider( "option", "value", $("input#height").val());

    width_slider.slider({
        change: function( event, ui ) {
            $("input#width").val(width_slider.slider("value"));
        }
    });

    height_slider.slider({
        change: function( event, ui ) {
            $("input#height").val(height_slider.slider("value"));
        }
    });

    /*  -- -- --  */
    $("input#width").change(function() {
        width_slider.slider( "option", "value", $("input#width").val());
    });

    $("input#height").change(function() {
        height_slider.slider( "option", "value", $("input#height").val());
    });

})();