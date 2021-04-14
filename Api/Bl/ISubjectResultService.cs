using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;

namespace Bl
{
    public interface ISubjectResultService
    {
        public Task<List<SubjectResult>> GetSubjectResultAsync();
    }
}
