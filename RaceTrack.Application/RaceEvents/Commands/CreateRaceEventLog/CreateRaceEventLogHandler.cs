using RaceTrack.Application.Messaging;
using RaceTrack.Domain.Entities;
using RaceTrack.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RaceTrack.Application.RaceEvents.Commands.CreateRaceEventLog
{
    public class CreateRaceEventLogHandler : IRequestHandler<CreateRaceEventLogCommand, int>
    {
        private readonly IRaceEventLogRepository _repository;

        public CreateRaceEventLogHandler(IRaceEventLogRepository repository)
        {
            _repository = repository;
        }

        public async Task<int> Handle(CreateRaceEventLogCommand request, CancellationToken cancellationToken)
        {
            var raceEventLog = new RaceEventLog
            {
                PositionX = request.PositionX!.Value,
                PositionY = request.PositionY!.Value,
                Timestamp = DateTime.UtcNow
            };

            return await _repository.Create(raceEventLog);
        }
    }
}
