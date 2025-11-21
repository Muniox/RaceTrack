using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RaceTrack.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

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
        }
    }
}
