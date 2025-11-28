using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace RaceTrack.Application.Messaging
{
    public static class Mediator
    {
        public static IServiceCollection AddMediator(this IServiceCollection services, Assembly? assembly = null)
        {
            assembly ??= Assembly.GetCallingAssembly();

            services.AddScoped<ISender, Sender>();

            var handlerInterfaceType = typeof(IRequestHandler<,>);

            var handlerTypes = assembly.GetTypes()
                .Where(t => !t.IsAbstract && !t.IsInterface)
                .SelectMany(type => type.GetInterfaces()
                    .Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == handlerInterfaceType)
                    .Select(i => new { Interface = i, Implementation = type }));

            foreach (var handler in handlerTypes)
            {
                services.AddScoped(handler.Interface, handler.Implementation);
            }

            return services;
        }
    }
}
