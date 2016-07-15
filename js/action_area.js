(function() {
    var active_area = $('.action_area');
    var color = ["rgb(45, 212, 41)", "rgb(21, 22, 68)", "rgb(212, 45, 56)", "rgb(212, 0, 155)", "rgb(1, 0, 200)"];
    console.log(active_area);

    active_area.hover(function(){
        var position = $(this).css('box-shadow').indexOf(')');
        var buf = ($(this).css('box-shadow').slice( position+1));
        var index =  color.indexOf($(this).css('box-shadow').slice(0, position+1));

        if (index == color.length-1) index = -1;
        else if(index == -1) console.log("Error");
        index+=1;
        $(this).css('box-shadow', color[index]+buf);
        $(this).unbind('mouseleave');
    });

// на каждый объект active_area завести счетчик для смены цветв границы

// функция смены цвета объекта

// применить фунцию на :hover объектах
})();