(function() {
    var toolbar = $('.dev_toolbar');
    var toolbar_obj = new Toolbar(toolbar);
    /* Dev_toolbar */

    /* -----------Toolbar Class----------- */

    function Toolbar(object) {
        Toolbar.prototype.speed = 1000;
        Toolbar.prototype.constructor = Toolbar;
        this.opened = true;
        this.pos_bt = true;
        this.pos_top = false;
        this.object = object;
        this.hide_toolbar = object.find('.hide_tb');
        this.show_toolbar = object.find('.show_tb');
        this.show_top_tb =object.find('.show_top_tb');
        this.show_bottom_tb = object.find('.show_bottom_tb');
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
                    }, speed, function () {
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
                    }, speed, function () {
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
                this.opened = true;
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
        this.hide_toolbar.on('click', function() {
            toolbar_obj.hide();
        });
        this.show_toolbar.on('click', function() {
            toolbar_obj.show()
        });
        this.show_top_tb.on('click', function() {
            toolbar_obj.show_top()
        });
        this.show_bottom_tb.on('click', function() {
            toolbar_obj.show_bt()
        });
    }
    /* --------------------------------------- */

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