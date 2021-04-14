using Bl;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectResultController : ControllerBase
    {
        private readonly ISubjectResultService _subjectResultService;

        public SubjectResultController(ISubjectResultService subjectResultService)
        {
            _subjectResultService = subjectResultService;
        }

        [HttpGet("result", Name = nameof(GetSubjectResultAsync))]
        public async Task<IActionResult> GetSubjectResultAsync()
            => Ok(await _subjectResultService.GetSubjectResultAsync());
    }
}
