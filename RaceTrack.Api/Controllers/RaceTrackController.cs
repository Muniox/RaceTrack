using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RaceTrack.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RaceTrackController : ControllerBase
    {
        [HttpGet("status")]
        public IActionResult GetStatus()
        {
            return Ok(new { status = "RaceTrack API is running." });
        }
    }
}
