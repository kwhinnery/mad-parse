(function() {
    //Grab configuration info and fade in site content
    $.getJSON('/config.json', function(data) {
        $('#androidLink').attr('href', data.androidLink);
        $('#iosLink').attr('href', data.iosLink);
    });
})();