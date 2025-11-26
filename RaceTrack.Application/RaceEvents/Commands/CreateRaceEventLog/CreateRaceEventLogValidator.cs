using FluentValidation;

namespace RaceTrack.Application.RaceEvents.Commands.CreateRaceEventLog
{
    public class CreateRaceEventLogValidator : AbstractValidator<CreateRaceEventLogCommand>
    {
        public CreateRaceEventLogValidator()
        {
            RuleFor(x => x.PositionX)
                .NotEmpty()
                .WithMessage("Position X is required.");

            RuleFor(x => x.PositionY)
                .NotEmpty()
                .WithMessage("Position Y is required.");
        }
    }
}
