(function() {
    var toolbar = $('.dev_toolbar');
    var circle = $('.dev_toolbar .circle');
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
        this.hide_toolbar = this.object.find('.hide_tb');               // "Hide" Button
        this.show_toolbar = this.object.find('.show_tb');               // "Show" Button
        this.show_top_tb = this.object.find('.show_top_tb');            // "Show at Top" Button
        this.show_bottom_tb = this.object.find('.show_bottom_tb');      // "Show at bottom" Button

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

        /* ----------------------------------------------- */
        object.find(".slider").slider();         // Activate class "slider"

        this.width_slider = object.find(".slider#width_s");
        this.height_slider =  object.find(".slider#height_s");

        this.input_w = object.find("input#width");
        this.input_h = object.find("input#height");

        this.width_slider.slider( "option", "value", this.input_w.val());
        this.height_slider.slider( "option", "value", this.input_h.val());

        this.width_slider.slider({
            change: function( event, ui ) {
                self.input_w.val(self.width_slider.slider("value"));
                if(window.isCreated) {
                    window.ander_c.setWidth(self.width_slider.slider("value"));
                }
            }
        });

        this.height_slider.slider({
            change: function( event, ui ) {
                $("input#height").val(self.height_slider.slider("value"));
                if(window.isCreated)
                {
                    window.ander_c.setWidth(  self.width_slider.slider("value"));
                }
            }
        });

        this.input_w.change(function() {
            self.width_slider.slider( "option", "value", self.input_w.val());
            if(window.isCreated) {
                window.ander_c.setWidth(self.input_w.val());
            }
        });

        this.input_h.change(function() {
            height_slider.slider( "option", "value",  self.input_h.val());
            if(window.isCreated) {
                window.ander_c.setHeight(self.input_h.val());
            }
        });
    }
    /* --------------------------------------- */

/*
    $("input#jscolor_id").change(function() {
        if(window.alreadyB)
        {
            window.ander_c.object.css('background-color', '#'+$("input#jscolor_id").val())
        }
    });*/



    /* Event "Develop" */


    /*          */
    $('.unbind_tb').on('click', function() {
        window.alreadyB = false;
        window.isCreated = false;
        circle.css('background','red');
    });
})();