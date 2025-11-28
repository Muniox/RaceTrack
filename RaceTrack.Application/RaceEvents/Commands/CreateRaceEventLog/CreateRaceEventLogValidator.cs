using FluentValidation;

namespace RaceTrack.Application.RaceEvents.Commands.CreateRaceEventLog
{
    public class CreateRaceEventLogValidator : AbstractValidator<CreateRaceEventLogCommand>
    {
        public CreateRaceEventLogValidator()
        {
            RuleFor(x => x.PositionX)
                .NotNull()
                .WithMessage("Position X is required.");

            RuleFor(x => x.PositionY)
                .NotNull()
                .WithMessage("Position Y is required.");
        }
    }
}
