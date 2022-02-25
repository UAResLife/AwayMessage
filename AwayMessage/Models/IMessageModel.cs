namespace AwayMessage.Models
{
    public interface IMessageModel
    {
        string Message { get; set; }
        string Subtitle { get; set; }
        string Title { get; set; }
        /// <summary>
        /// UTC time
        /// </summary>
        public DateTime TimerStartTime { get; set; }
        public int TimerSeconds { get; set; }
    }
}