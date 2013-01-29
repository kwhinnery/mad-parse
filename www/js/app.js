(function() {
    var config = {};

    //Grab configuration info and fade in site content
    $.getJSON('/config.json', function(data) {
        config = data;

        //populate app download links
        $('#androidLink').attr('href', config.androidLink);
        $('#iosLink').attr('href', config.iosLink);

        //Initialize Parse JS SDK
        Parse.initialize(config.parseAppId, config.parseJavaScriptKey);
    });

    //Do a bit of form validation and double submit protection
    var $submit = $('#submit'),
        $dummy = $('#dummy'),
        $phoneNumber = $('#phoneNumber'),
        $info = $('#info');

    var validator = $phoneNumber.on('focus', function() {
        return setInterval(function() {
            if ($phoneNumber.val() === '') {
                $submit.attr('disabled', true);
            }
            else {
                $submit.attr('disabled', false);
            }
        },100);
    });

    //handle button UI changes
    function toggle(on) {
        if (on) {
            $dummy.hide();
            $submit.show();
            setTimeout(function() {
                $info.fadeOut();
            },7000);
        }
        else {
            $dummy.show();
            $submit.hide();
        }
    }

    //Handle the SMS form
    $submit.on('click', function(e) {
        toggle(false);

        var $info = $('#info');

        //execute Parse cloud code to send an SMS
        Parse.Cloud.run('sendLink', {
            phoneNumber:$phoneNumber.val()
        }, {
            success:function(response) {
                $info.removeClass('error')
                    .addClass('info')
                    .html('Awesome! The link should be on it\'s way.')
                    .fadeIn();

                toggle(true);
            },
            error: function(response) {
                $info.removeClass('info')
                    .addClass('error')
                    .html('There was a problem sending the link - please check your number and try again')
                    .fadeIn();

                toggle(true);
            }
        });

        //don't submit the form
        e.preventDefault();
    });
})();