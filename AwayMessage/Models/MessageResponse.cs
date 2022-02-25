namespace AwayMessage.Models
{
    public class MessageModel : IMessageModel
    {
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string Message { get; set; }
        public DateTime TimerStartTime { get; set; }
        public int TimerSeconds { get; set; }
    }
}
