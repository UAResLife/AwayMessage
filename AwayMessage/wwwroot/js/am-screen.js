(function () {
    "use strict";
    var connection = new signalR.HubConnectionBuilder().withUrl("/serverHub?client=1").build();

    connection.start().then(function () {}).catch(function (err) {
        return console.error(err.toString());
    });
        
    connection.on('UpdateScreen', function (msg) {
        $('#pageTitle').html(msg.title);
        $('#pageSubtitle').html(msg.subtitle);
        $('#message').html(msg.message);
        if (msg.timerSeconds > 0) {
            startTimer(calculateTimerSeconds(msg.timerStartTime, msg.timerSeconds), true);
        }
        else {
            $('#clock').html('');
        }
    });

    function startTimer(seconds, autoStart) {
        $('#clock').FlipClock(seconds, {
            clockFace: 'HourCounter',
            countdown: true,
            autoStart: autoStart
        });
    };

    function calculateTimerSeconds(timerStartTime, timerSeconds) {
        var now = Math.floor(Date.now() / 1000);
        var timertime = Math.floor(new Date(timerStartTime).getTime() / 1000);
        return timertime - now + timerSeconds;
    }

})();