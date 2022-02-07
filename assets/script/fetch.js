function fetchData() {
    $('#iconSection').html("");
    $.getJSON("/assets/script/data.json", function (data) {
        var html = '';
        $.each(data, function (key, value) {
            html += "<div class='iconSectionItem'> <input type='radio' name='radio' id=" + value.id + " value=" + value.id + " hidden><label for=" + value.id + "><i data-feather=" + value.id + "></i></label></div>"
        });
        $('#iconSection').append(html);
        feather.replace();
    });
}