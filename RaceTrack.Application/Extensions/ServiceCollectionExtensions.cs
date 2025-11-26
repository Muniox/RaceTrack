using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using RaceTrack.Application.Messaging;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace RaceTrack.Application.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddApplication(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();

            services.AddMediator(assembly);
            services.AddValidatorsFromAssembly(assembly);

        }
    }
}
