using RaceTrack.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RaceTrack.Domain.IRepositories
{
    public interface IRaceEventLogRepository
    {
        Task<int> Create(RaceEventLog raceEventLog);

        Task SaveChanges();
    }
}
