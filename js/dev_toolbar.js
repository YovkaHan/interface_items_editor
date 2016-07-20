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
        this.hide_toolbar = object.find('.hide_tb');               // "Hide" Button
        this.show_toolbar = object.find('.show_tb');               // "Show" Button
        this.show_top_tb = object.find('.show_top_tb');            // "Show at Top" Button
        this.show_bottom_tb = object.find('.show_bottom_tb');      // "Show at bottom" Button
        this.hide = function () {
            if (this.opened) {
                var self = this;                                      // this-copy
                this.opened = false;
                this.object.find('.buttons button').prop('disabled', true);          // disabled all control buttons
                if (this.pos_bt) {
                    this.object.animate({
                        bottom: "-=175"
                    }, this.speed, function () {
                        self.object.find('.buttons button').prop('disabled', false);     // enabled all control buttons
                    });
                }
                else if (this.pos_top) {
                    this.object.animate({
                        top: "-=175"
                    }, this.speed, function () {
                        self.object.find('.buttons button').prop('disabled', false);     // enabled all control buttons
                    });
                }
            }
        };
        this.show = function () {
            if (!this.opened) {
                var self = this;
                this.opened = true;
                this.object.find('.buttons button').prop('disabled', true);          // disabled all control buttons
                if (this.pos_bt) {
                    this.object.animate({
                        bottom: "+=175"
                    }, this.speed, function () {
                        self.object.find('.buttons button').prop('disabled', false);     // enabled all control buttons
                    });
                }
                else if (this.pos_top) {
                    this.object.animate({
                        top: "+=175"
                    }, this.speed, function () {
                        self.object.find('.buttons button').prop('disabled', false);     // enabled all control buttons
                    });
                }
            }
        };
        this.show_top = function () {
            if (this.pos_top) {
            }
            else if (this.pos_bt) {
                var self = this;
                this.pos_bt = false;
                this.pos_top = true;
                this.opened = true;
                this.object.find('.buttons button').prop('disabled', true);     // enabled all control buttons
                this.object.animate({
                    bottom: "-=200"
                }, this.speed, function () {
                    self.object.find(".buttons").before(toolbar.find(".content"));
                    self.object.css({bottom: 0, top: -200});
                    self.object.animate({
                        top: "+=200"
                    }, self.speed, function () {
                        self.object.find('.buttons button').prop('disabled', false);     // enabled all control buttons
                    });
                });
            }
        };
        this.show_bt = function () {
            if (this.pos_top) {
                var self = this;
                this.pos_bt = true;
                this.pos_top = false;
                this.opened = true;
                this.object.find('.buttons button').prop('disabled', true);     // enabled all control buttons
                this.object.animate({
                    top: "-=200"
                }, this.speed, function () {
                    self.object.find(".content").before(toolbar.find(".buttons"));
                    self.object.css({top: '', bottom: -200});
                    self.object.animate({
                        bottom: "+=200"
                    }, self.speed, function () {
                        self.object.find('.buttons button').prop('disabled', false);     // enabled all control buttons
                    });
                });
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