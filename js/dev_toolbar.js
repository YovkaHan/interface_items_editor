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
            if(this.opened) {
                this.opened = false;
                if(this.pos_bt) {
                    this.object.animate({
                        bottom: "-=180"
                    }, this.speed, function () {
                        // Animation complete.
                    });
                }
                else if(this.pos_top) {
                    this.object.animate({
                        top: "-=180"
                    }, this.speed, function () {
                        // Animation complete.
                    });
                }
            }
        };
        this.show = function () {
            if(!this.opened) {
                this.opened = true;
                if(this.pos_bt) {
                    this.object.animate({
                        bottom: "+=180"
                    }, this.speed, function () {
                        // Animation complete.
                    });
                }
                else if(this.pos_top) {
                    this.object.animate({
                        top: "+=180"
                    }, this.speed, function () {
                        // Animation complete.
                    });
                }
            }
        };
        this.show_top = function () {
            if(this.pos_top){}
            else if(this.pos_bt) {
                this.opened = false;
                this.pos_bt = false;
                this.pos_top = true;
                this.object.animate({
                    bottom: "-=200"
                }, this.speed, (function () {
                }
                ));
                this.object.delay.bind(this.show(),1);
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
       // toolbar.find(".buttons").before(toolbar.find(".content"));
    });
    show_toolbar.click( function(){
        toolbar_obj.show();
    });
    show_top_tb.click( function(){
        toolbar_obj.show_top();
        //toolbar.find(".buttons").before(toolbar.find(".content"));
    });
    show_bottom_tb.click( function(){
        toolbar_obj.show_bt();
    });


})();