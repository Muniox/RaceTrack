using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RaceTrack.Application.Messaging;
using RaceTrack.Application.RaceEvents.Commands.CreateRaceEventLog;
using FluentValidation;

namespace RaceTrack.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RaceTrackController : ControllerBase
    {
        private readonly ISender _sender;
        private readonly IValidator<CreateRaceEventLogCommand> _validator;

        public RaceTrackController(ISender sender, IValidator<CreateRaceEventLogCommand> validator)
        {
            _sender = sender;
            _validator = validator;
        }

        [HttpGet("status")]
        public IActionResult GetStatus()
        {
            return Ok(new { status = "RaceTrack API is running." });
        }

        [HttpPost("race-events")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateRaceEventLog([FromBody] CreateRaceEventLogCommand command, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(command, cancellationToken);

            if (!validationResult.IsValid)
            {
                foreach (var error in validationResult.Errors)
                {
                    ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
                }
                return ValidationProblem(ModelState);
            }

            var id = await _sender.Send(command, cancellationToken);

            return CreatedAtAction(nameof(CreateRaceEventLog), new { id }, new { id });
        }
    }
}
