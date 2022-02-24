(function () {
    "use strict";
    var connection = new signalR.HubConnectionBuilder().withUrl("/serverHub?client=0").build();

    connection.start().then(function () {}).catch(function (err) {
        return console.error(err.toString());
    });

    connection.on('ChangeValues', function (txt) {
        $('#txtTitle').val(txt.title);
        $('#txtSubtitle').val(txt.subtitle);
        $('#txtMessage').val(txt.message);
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

    $('#btnSubmit').click(function () {
        connection.invoke('ChangeValues', $('#txtTitle').val(), $('#txtSubtitle').val(), $('#txtMessage').val()).catch(function (err) {
            return console.error(err.toString());
        });
    });

})();