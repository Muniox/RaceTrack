using RaceTrack.Domain.Entities;
using RaceTrack.Domain.IRepositories;
using RaceTrack.Infrastructure.Persistence;

namespace RaceTrack.Infrastructure.Repositories
{
    internal class RaceEventRepository : IRaceEventLogRepository
    {
        private readonly RaceTrackDbContext _dbContext;

        public RaceEventRepository(RaceTrackDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> Create(RaceEventLog raceEventLog)
        {
            // Timestamp jest już ustawiony na UTC w handlerze
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
