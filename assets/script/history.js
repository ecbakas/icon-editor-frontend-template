function fetchHistory() {
    $('#historySection').html("");
    console.log(localStorage.getItem("history"))
    console.log(JSON.parse(localStorage.getItem("history")))
    console.log($.getJSON("assets/script/history.json"))
    xx(JSON.parse(localStorage.getItem("history")));

    // xx(localStorage.getItem("history")[0]);
    function xx (data) {
        var html = '';
        $.each(data, function (key, value) {
                html +="<a href='xx' class='historyItem' data-icon="+value.id+">\
                <div class='icon'><i data-feather="+value.iconName+"></i></div>\
                <div class='iconDetails'>\
                    <div class='iconName'><b>Icon Name</b>"+value.iconName+"</div>`\
                    <div class='iconSize'><b>Icon Size</b>"+value.iconSize+"x"+value.iconSize+"</div>\
                    <div class='iconRotation'><b>Icon Rotation</b>"+value.iconRotation+"deg</div>\
                    <div class='iconStroke'><b>Icon Stroke</b>"+value.iconStroke+"px</div>\
                    <div class='iconColor'><b>Icon Color</b>"+value.iconColor+"<div class='colorRect'></div></div>\
                    <div class='iconOpacity'><b>Icon Opacity</b>"+value.iconOpacity+"%</div>\
                </div>\
            </a>"
        });
        $('#historySection').append(html);
        feather.replace();
    };
}

$(window).on('load',function(){
    fetchHistory();
})