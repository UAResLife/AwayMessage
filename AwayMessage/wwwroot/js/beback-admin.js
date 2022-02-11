(function () {
    "use strict";
    var connection = new signalR.HubConnectionBuilder().withUrl("/serverHub").build();

    var clock;

    //var connection = $.hubConnection(),
    //    hub = connection.createHubProxy('serverHub');

    connection.start().then(function () { }).catch(function (err) {
        return console.error(err.toString());
    });



    $('#btn15').click(function (e) {
        connection.invoke('StartTimer', 900).catch(function (err) {
            return console.error(err.toString());
        });
    });

    $('#btn30').click(function (e) {
        connection.invoke('StartTimer', 1800).catch(function (err) {
            return console.error(err.toString());
        });
    });

    $('#btn60').click(function (e) {
        connection.invoke('StartTimer', 3600).catch(function (err) {
            return console.error(err.toString());
        });
        
    });

    $('#btnCustom').click(function (e) {
        var milliseconds = $("#txtCustom").val();
        connection.invoke('StartTimer', milliseconds).catch(function (err) {
            return console.error(err.toString());
        });
    });

    $('#btnHideClock').click(function () {
        connection.invoke('HideClock').catch(function (err) {
            return console.error(err.toString());
        });
    });

    $('#btnPageReload').click(function () {
        connection.invoke('PageReload').catch(function (err) {
            return console.error(err.toString());
        });
    });

    $('#btnTitle').click(function () {
        connection.invoke('ChangeTitle', $('#txtTitle').val()).catch(function (err) {
            return console.error(err.toString());
        });
    });

    $('#btnSubtitle').click(function () {
        connection.invoke('ChangeSubtitle', $('#txtSubtitle').val()).catch(function (err) {
            return console.error(err.toString());
        });
    });

    $('#btnMessage').click(function () {
        connection.invoke('ChangeMessage', $('#txtMessage').val()).catch(function (err) {
            return console.error(err.toString());
        });
    });

})();