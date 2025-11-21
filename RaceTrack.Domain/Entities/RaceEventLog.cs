using System;
using System.Collections.Generic;
using System.Text;

namespace RaceTrack.Domain.Entities
{
    public class RaceEventLog
    {
        public int Id { get; set; }
        public required double PositionX { get; set; }
        public required double PositionY { get; set; }
        public required DateTime Timestamp { get; set; }
    }
}
