using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.SignalR;
using AwayMessage.Models;

namespace AwayMessage.Hubs
{
    public class ServerHub : Hub 
    {
        private static IMessageModel _message = new MessageModel();

        
        public override async Task OnConnectedAsync()
        {
            await Clients.Client(Context.ConnectionId).SendAsync("UpdateScreen", _message);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
        public async Task UpdateScreen(string msg)
        {
            _message = JsonSerializer.Deserialize<MessageModel>(msg);

            await Clients.All.SendAsync("UpdateScreen", _message);
        }
        public async Task PageReload()
        {
            await Clients.All.SendAsync("PageReload");
        }

    }
}