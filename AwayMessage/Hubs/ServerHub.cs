using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.SignalR;

namespace AwayMessage.Hubs
{
    public class ServerHub : Hub 
    {
        public async Task StartTimer(int milliseconds)
        {
            await Clients.All.SendAsync("StartTimer", milliseconds);
        }
        public async Task BlackScreenOutAsync() {
            await Clients.All.SendAsync("BlackScreenOutAsync");
        }

        public async Task RecoverScreen()
        {
            await Clients.All.SendAsync("RecoverScreen");
        }

        public async Task ChangeTitle(string txt)
        {
            await Clients.All.SendAsync("ChangeTitle", txt);
        }

        public async Task ChangeSubtitle(string txt)
        {
            await Clients.All.SendAsync("ChangeSubtitle", txt);
        }

        public async Task ChangeMessage(string txt)
        {
            await Clients.All.SendAsync("ChangeMessage", txt);
        }


        public async Task PageReload()
        {
            await Clients.All.SendAsync("PageReload");
        }

    }
}