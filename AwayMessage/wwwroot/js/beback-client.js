(function () {
    "use strict";

    var connection = new signalR.HubConnectionBuilder().withUrl("/serverHub").build();

    var clock;
    var calendarRefreshId = null;

    //var connection = $.hubConnection(),
    //    hub = connection.createHubProxy('serverHub');

    connection.start().then(function () { }).catch(function (err) {
        return console.error(err.toString());
    });
        
    connection.on('StartTimer', function (milliseconds) {
        $("#clockWrapper").removeClass("hide");
        startTimer(milliseconds, true);
    });

    connection.on('PageReload', function () {
        location = location;
    });

    connection.on('ChangeTitle', function (txt) {
        $('#pageTitle').html(txt);
    });

    connection.on('ChangeSubtitle', function (txt) {
        $('#pageSubtitle').html(txt);
    });

    connection.on('ChangeMessage', function (txt) {
        $('#message').html(txt);
    });

    function blackOutScreen(opacity, milliseconds, height, width) {
        $('#overlay').animate({
            opacity: opacity,
            height: height,
            width: width
        }, milliseconds, function () {
            // Animation complete.
        });
    };

    function startTimer(milliseconds, autoStart) {
        $('.clock').FlipClock(milliseconds, {
            clockFace: 'HourCounter',
            countdown: true,
            autoStart: autoStart
        });
    };


})();