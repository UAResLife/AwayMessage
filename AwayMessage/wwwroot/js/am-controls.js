(function () {
    "use strict";
    var connection = new signalR.HubConnectionBuilder().withUrl("/serverHub?client=0").build();

    connection.start().then(function () {}).catch(function (err) {
        return console.error(err.toString());
    });

    connection.on('UpdateScreen', function (msg) {
        $('#txtTitle').val(msg.title);
        $('#txtSubtitle').val(msg.subtitle);
        $('#txtMessage').val(msg.message);
    });

    $('#btn15').click(function (e) {
        $("#txtCustom").val(900);
    });

    $('#btn30').click(function (e) {
        $("#txtCustom").val(1800);
    });

    $('#btn60').click(function (e) {
        $("#txtCustom").val(3600);     
    });

    $('#btnPageReload').click(function () {
        var msg = {
            Message: "",
            Subtitle: "",
            Title: "",
            TimerStartTime: new Date(),
            TimerSeconds: 0
        }

        connection.invoke('UpdateScreen', JSON.stringify(msg)).catch(function (err) {
            return console.error(err.toString());
        });
    });

    $('#btnSubmit').click(function () {
        var msg = {
            Message: $('#txtMessage').val(),
            Subtitle: $('#txtSubtitle').val(),
            Title: $('#txtTitle').val(),
            TimerStartTime: new Date(),
            TimerSeconds: parseInt($("#txtCustom").val() == "" ? 0 : $("#txtCustom").val())
        }

        connection.invoke('UpdateScreen', JSON.stringify(msg) ).catch(function (err) {
            return console.error(err.toString());
        });
    });



})();