using RaceTrack.Application.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RaceTrack.Application.RaceEvents.Commands.CreateRaceEventLog
{
    public record CreateRaceEventLogCommand(
        double PositionX,
        double PositionY
        ) : IRequest<int>;
}
