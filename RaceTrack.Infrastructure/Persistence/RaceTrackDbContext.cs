using Microsoft.EntityFrameworkCore;
using RaceTrack.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RaceTrack.Infrastructure.Persistence
{
    internal class RaceTrackDbContext : DbContext
    {
        internal DbSet<RaceEventLog> RaceEventLogs { get; set;  }

        public RaceTrackDbContext(DbContextOptions<RaceTrackDbContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<RaceEventLog>()
                .Property(e => e.PositionX)
                .IsRequired();

            modelBuilder.Entity<RaceEventLog>()
                .Property(e => e.PositionY)
                .IsRequired();

            modelBuilder.Entity<RaceEventLog>()
                .Property(e => e.Timestamp)
                .IsRequired();

        }
    }
}
