(function(){
    window.d_a = false;    // Flag for Dev Mode
    window.alreadyB = false;   // Flag for elements bind
    window.ander_c = null;    // Empty null-Object of 'Dev_Edit' class

    var dev_set = $('.dev_set');
    var circle = $('.dev_toolbar .circle');
    var divs_c;                              //  Copy of "divs"
    dev_set.click( function(){
        if(!window.alreadyB) {

            if (window.d_a == true) {                     // Enable Dev_Mode
                console.log("DEV_MODE_ON");

                var circle = $('.dev_toolbar .circle');
                var toolbar_obj = new Toolbar($('.dev_toolbar'));

                $('.unbind_tb').on('click', function () {
                    window.alreadyB = false;
                    window.ander_c.bindOff();
                    circle.css('background', 'red');
                });

                var divs = $(".my_container").find('div').not(".place").not(".dev_set");
                divs_c = divs;
                divs.each(function () {
                        $(this).on('click', function () {
                            circle.css('background', '#04bf04');
                            if (window.alreadyB == false) {
                                window.alreadyB = true;
                                window.ander_c = new Dev_Edit($(this), toolbar_obj);
                                window.ander_c.bindOn();
                            }
                        });
                });
            }
            if (window.d_a == false) {                  // Disable Dev_Mode
                console.log("DEV_MODE_OFF");

                toolbar_obj = null;
                divs_c.each(function () {
                    $(this).unbind('click');
                });
                divs_c = null;
            }
        }
    });

    /* -----------Dev_Edit Class----------- */

    function Dev_Edit(object, toolbar) {
        var self = this;
        this.object = object;
        /*                                      --Getters--                                     */
        this.getParentWidth = function() {
            var res =  self.object.parent().css('width');
            if (res.indexOf('px') != -1) {
                return res.slice(0,res.indexOf('px'));
            } else {
                return res;
            }
        };
        this.getParentHeight= function() {
            var res =  self.object.parent().css('height');
            if (res.indexOf('px') != -1) {
                return res.slice(0,res.indexOf('px'));
            } else {
                return res;
            }
        };
        this.getWidth = function() {
            var res =  self.object.css('width');
            if (res.indexOf('px') != -1) {
                return res.slice(0,res.indexOf('px'));
            } else {
                return res;
            }
        };
        this.getHeight = function() {
            var res =  self.object.css('height');
            if (res.indexOf('px') != -1) {
                return res.slice(0,res.indexOf('px'));
            } else {
                return res;
            }
        };
        this.getLeft = function() {
            var res =  self.object.css('left');
            if (res.indexOf('px') != -1) {
                return res.slice(0,res.indexOf('px'));
            } else {
                return res;
            }
        };
        this.getTop = function() {
            var res =  self.object.css('top');
            if (res.indexOf('px') != -1) {
                return res.slice(0,res.indexOf('px'));
            } else {
                return res;
            }
        };
        this.getZ_index = function() {
            var res =  self.object.css('z-index');
            if (res.indexOf('px') != -1) {
                return res.slice(0,res.indexOf('px'));
            } else {
                return res;
            }
        };
        this.getBGColor = function() {return self.object.css('background-color')};
        /*                                      --Setters--                                     */
        this.setWidth = function(width) {self.object.css('width', width)};
        this.setHeight = function(height) {self.object.css('height', height)};
        this.setLeft = function(left) {
            self.object.css('left', left)
        };
        this.setTop = function(top) {
            self.object.css('top', top);
        };
        this.setZ_index = function(z_index) {
            self.object.css('z-index', z_index);
        };

        this.bindOn = function() {
            toolbar.activateBind(true);
        };
        this.bindOff = function() {
            toolbar.activateBind(false);
        };
        /*                                      --Set binding--                                 */
        toolbar.setWidth_slider(self.getWidth(),self.getParentWidth());
        toolbar.setHeight_slider(self.getHeight(),self.getParentHeight());
        toolbar.setLeft_slider(self.getLeft(),(self.getParentWidth()-self.getWidth()));
        toolbar.setTop_slider(self.getTop(),self.getParentHeight());
        toolbar.setZ_index_slider(self.getZ_index());
        toolbar.setInput_w(self.getWidth());
        toolbar.setInput_h(self.getHeight());
        toolbar.setInput_l(self.getLeft());
        toolbar.setInput_t(self.getTop());
        toolbar.setInput_z_i(self.getZ_index());
        toolbar.setJsColor(self.getBGColor());

    }

    /* -----------Toolbar Class----------- */

    function Toolbar(object) {
        var self = this; // this-copy
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
                this.opened = false;
                this.object.find('.buttons button').prop('disabled', true);          // disabled all control buttons
                if (this.pos_bt) {
                    this.object.stop(true).animate({
                        bottom: "-=175"
                    }, this.speed, function () {
                        self.object.find('.buttons button').prop('disabled', false);     // enabled all control buttons
                    });
                }
                else if (this.pos_top) {
                    this.object.stop(true).animate({
                        top: "-=175"
                    }, this.speed, function () {
                        self.object.find('.buttons button').prop('disabled', false);     // enabled all control buttons
                    });
                }
            }
        };
        this.show = function () {
            if (!this.opened) {
                this.opened = true;
                this.object.find('.buttons button').prop('disabled', true);          // disabled all control buttons
                if (this.pos_bt) {
                    this.object.stop(true).animate({
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
                this.pos_bt = false;
                this.pos_top = true;
                this.opened = true;
                this.object.find('.buttons button').prop('disabled', true);     // enabled all control buttons
                this.object.stop(true).animate({
                    bottom: "-=200"
                }, this.speed, function () {
                    self.object.find(".buttons").before(self.object.find(".content"));
                    self.object.css({bottom: 0, top: -200});
                    self.object.stop(true).animate({
                        top: "+=200"
                    }, self.speed, function () {
                        self.object.find('.buttons button').prop('disabled', false);     // enabled all control buttons
                    });
                });
            }
        };
        this.show_bt = function () {
            if (this.pos_top) {
                this.pos_bt = true;
                this.pos_top = false;
                this.opened = true;
                this.object.find('.buttons button').prop('disabled', true);     // enabled all control buttons
                this.object.stop(true).animate({
                    top: "-=200"
                }, this.speed, function () {
                    self.object.find(".content").before(self.object.find(".buttons"));
                    self.object.css({top: '', bottom: -200});
                    self.object.stop(true).animate({
                        bottom: "+=200"
                    }, self.speed, function () {
                        self.object.find('.buttons button').prop('disabled', false);     // enabled all control buttons
                    });
                });
            }
        };
        this.hide_toolbar.on('click', function() {
            self.hide();
        });
        this.show_toolbar.on('click', function() {
            self.show()
        });
        this.show_top_tb.on('click', function() {
            self.show_top()
        });
        this.show_bottom_tb.on('click', function() {
            self.show_bt()
        });

        object.find(".slider").slider();         // Activate class "slider"

        this.width_slider = object.find(".slider#width_s");
        this.height_slider =  object.find(".slider#height_s");
        this.left_slider =  object.find(".slider#left_s");
        this.top_slider =  object.find(".slider#top_s");
        this.z_index_slider =  object.find(".slider#z_index_s");

        this.input_w = object.find("input#width");
        this.input_h = object.find("input#height");
        this.input_l = object.find("input#left");
        this.input_t = object.find("input#top");
        this.input_z_i = object.find("input#z_index");

        this.jscolor = object.find("input#jscolor_id");

        this.width_slider.slider( "option", "value", 0);
        this.height_slider.slider( "option", "value", 0);
        this.left_slider.slider( "option", "value", 0);
        this.top_slider.slider( "option", "value", 0);
        this.z_index_slider.slider( "option", "value", 0);
        this.input_w.val(0);
        this.input_h.val(0);
        this.input_l.val(0);
        this.input_t.val(0);
        this.input_z_i.val(0);
        /*--                                    Setters                                 --*/
        this.setWidth_slider = function(num) {
            if(arguments[1])
            {
                self.width_slider.slider({
                    value: num,
                    max: arguments[1]
                });
            }
            self.width_slider.slider({
                value: num
            });
        };
        this.setHeight_slider = function(num) {
            if(arguments[1])
            {
                self.height_slider.slider({
                    value: num,
                    max: arguments[1]
                });
            }
            self.height_slider.slider({
                value: num
            });
        };
        this.setLeft_slider = function(num) {
            if(arguments[1])
            {
                self.left_slider.slider({
                    value: num,
                    max: arguments[1]
                });
            }
            self.left_slider.slider({
                value: num
            });
        };
        this.setTop_slider = function(num) {
            if(arguments[1])
            {
                self.top_slider.slider({
                    value: num,
                    max: arguments[1]
                });
            }
            self.top_slider.slider({
                value: num
            });
        };
        this.setZ_index_slider = function(num) {
            self.z_index_slider.slider({
                value: num
            });
        };
        this.setInput_w = function(num) {
            self.input_w.val(num);
        };
        this.setInput_h = function(num) {
            self.input_h.val(num);
        };
        this.setInput_l = function(num) {
            self.input_l.val(num);
        };
        this.setInput_t = function(num) {
            self.input_t.val(num);
        };
        this.setInput_z_i = function(num) {
            self.input_z_i.val(num);
        };

        this.setJsColor = function (color_str) {
            self.jscolor.val(color_str);
        };

        this.setActive = false;          // PROPERTY : Is toolbar been binded to element ?

        this.activateBind = function(setActive) {
            this.setActive = setActive;
        };

        this.width_slider.slider({
            change: function( event, ui ) {
                if(self.setActive){
                    self.input_w.val(self.width_slider.slider("value"));
                    window.ander_c.setWidth(self.width_slider.slider("value"));
                    self.setLeft_slider(self.input_l.val(), (window.ander_c.getParentWidth()-window.ander_c.getWidth() > 0)  ? window.ander_c.getParentWidth()-window.ander_c.getWidth() :0);
                }
            }
        });

        this.height_slider.slider({
            change: function( event, ui ) {
                if(self.setActive){
                    self.input_h.val(self.height_slider.slider("value"));
                    window.ander_c.setHeight( self.height_slider.slider("value"));
                }
            }
        });

        this.left_slider.slider({
            change: function( event, ui ) {
                if(self.setActive){
                    self.input_l.val(self.left_slider.slider("value"));
                    window.ander_c.setLeft( self.left_slider.slider("value"));
                }
            }
        });

        this.top_slider.slider({
            change: function( event, ui ) {
                if(self.setActive){
                    self.input_t.val(self.top_slider.slider("value"));
                    window.ander_c.setTop( self.top_slider.slider("value"));
                }
            }
        });
        this.z_index_slider.slider({
            change: function( event, ui ) {
                if(self.setActive){
                    self.input_z_i.val(self.z_index_slider.slider("value"));
                    window.ander_c.setZ_index( self.z_index_slider.slider("value"));
                }
            }
        });

        this.input_w.change(function() {
            if(self.setActive){
                self.setWidth_slider(self.input_w.val());
                window.ander_c.setWidth(self.input_w.val());
            }
        });

        this.input_h.change(function() {
            if(self.setActive){
                self.setHeight_slider(self.input_h.val());
                window.ander_c.setHeight(self.input_h.val());
            }
        });

        this.input_l.change(function() {
            if(self.setActive){
                self.setLeft_slider(self.input_l.val(), (window.ander_c.getParentWidth()-window.ander_c.getWidth()));
                window.ander_c.setLeft(self.input_l.val());
            }
        });

        this.input_t.change(function() {
            if(self.setActive){
                self.setTop_slider(self.input_t.val());
                window.ander_c.setTop(self.input_t.val());
            }
        });
        this.input_z_i.change(function() {
            if(self.setActive){
                self.setZ_index_slider(self.input_z_i.val());
                window.ander_c.setZ_index(self.input_z_i.val());
            }
        });

        this.jscolor.change(function() {
            if(self.setActive)
            {
                window.ander_c.object.css('background-color', '#'+self.jscolor.val())
            }
        });
    }

})();