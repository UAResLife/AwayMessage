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
        private static Dictionary<string, bool> _connections = new Dictionary<string, bool>();
        private static IMessageModel _message = new MessageModel();

        
        public override async Task OnConnectedAsync()
        {
            var isClient = Context.GetHttpContext().Request.Query["client"][0] == "1" ? true : false;
            _connections.Add(Context.ConnectionId, isClient);

            var liveClient = _connections.Where(client => client.Value).FirstOrDefault();
            //            var x = GlobalHost.DependencyResolver.Resolve<ITransportHeartbeat>().GetConnections().Count;

            // We only get data from whiteboard because the controls screen may have not ready to publish data
            // await Clients.Client(liveClient.Key).SendAsync("GetCurrentDisplayInfo");

            await Clients.Client(_connections.LastOrDefault().Key).SendAsync("UpdateScreen", _message);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _connections.Remove(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
        public async Task UpdateCurrentDisplayInfo(string title, string subtitle, string message) {
            var txt = new MessageModel()
            {
                Title = title,
                Subtitle = subtitle,
                Message = message
            };
            await Clients.Client(_connections.LastOrDefault().Key).SendAsync("ChangeValues", txt);
        }
        public async Task GetCurrentDisplayInfo() {
            await Clients.All.SendAsync("GetCurrentDisplayInfo");
        }
        public async Task StartTimer(int seconds)
        {
            await Clients.All.SendAsync("StartTimer", seconds);
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