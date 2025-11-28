using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RaceTrack.Domain.IRepositories;
using RaceTrack.Infrastructure.Persistence;
using RaceTrack.Infrastructure.Repositories;

namespace RaceTrack.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<RaceTrackDbContext>(options =>
            {
                options.UseNpgsql(connectionString);
                // .EnableSensitiveDataLogging();
            });

            // Rejestracja Repository
            services.AddScoped<IRaceEventLogRepository, RaceEventRepository>();
        }
    }
}
