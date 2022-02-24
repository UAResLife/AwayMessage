(function () {
    "use strict";
    var connection = new signalR.HubConnectionBuilder().withUrl("/serverHub?client=1").build();

    connection.start().then(function () {}).catch(function (err) {
        return console.error(err.toString());
    });

    connection.on('GetCurrentDisplayInfo', function () {
        connection.invoke("UpdateCurrentDisplayInfo", $('#pageTitle').html(), $('#pageSubtitle').html(), $('#message').html());
    });
        
    connection.on('StartTimer', function (milliseconds) {
        $("#clockWrapper").removeClass("hide");
        startTimer(milliseconds, true);
    });

    connection.on('PageReload', function () {
        location = location;
    });

    connection.on('ChangeValues', function (txt) {
        $('#pageTitle').html(txt.title);
        $('#pageSubtitle').html(txt.subtitle);
        $('#message').html(txt.message);
    });

    function startTimer(milliseconds, autoStart) {
        $('.clock').FlipClock(milliseconds, {
            clockFace: 'HourCounter',
            countdown: true,
            autoStart: autoStart
        });
    };
})();