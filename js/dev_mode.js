(function(){
    var dev_set = $('.dev_set');
    var circle = $('.dev_toolbar .circle');
    var divs_c;
    dev_set.click( function(){

        if(window.d_a == true) {

            console.log("DEV_MODE_ON");
            var divs = $(".my_container").find('div').not(".place").not(".dev_set").not('.left_side_1');
            divs_c = divs;
            divs.each(function () {
                if(window.enter) {
                    $(this).on('click', function () {
                        circle.css('background','#04bf04');
                        if (window.alreadyB == false) {
                            window.alreadyB = true;
                            window.ander_c = new Dev_Edit($(this));
                        }
                    });
                }
                window.enter = true;
            });
        }
        if (window.d_a == false) {
            console.log("DEV_MODE_OFF");
            divs_c.each(function () {
                $(this).unbind('click');
            });
            divs_c = null;
        }
    });

    function Dev_Edit(object) {
        this.object = object;
    }
})();