using RaceTrack.Domain.Entities;
using RaceTrack.Domain.IRepositories;
using RaceTrack.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RaceTrack.Infrastructure.Repositories
{
    internal class RaceEventRepository : IRaceEventLogRepository
    {
        private readonly RaceTrackDbContext _dbContext;
        private static readonly TimeZoneInfo PolandTimeZone =
            TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time");

        public RaceEventRepository(RaceTrackDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> Create(RaceEventLog raceEventLog)
        {
            // Ustawienie czasu UTC+2 (Polish time)
            raceEventLog.Timestamp = TimeZoneInfo.ConvertTimeFromUtc(
                DateTime.UtcNow,
                PolandTimeZone
            );

            _dbContext.RaceEventLogs.Add(raceEventLog);
            await _dbContext.SaveChangesAsync();
            return raceEventLog.Id;
        }

        public async Task SaveChanges()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
