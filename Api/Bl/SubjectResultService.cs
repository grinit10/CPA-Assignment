using Dal;
using Domain;
using Domain.AppSettings;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Extensions.Options;

namespace Bl
{
    public class SubjectResultService: ISubjectResultService
    {
        private readonly IJsonDal _jsonDal;
        private readonly JsonDataSource _jsonDataSource;

        public SubjectResultService(IJsonDal jsonDal, IOptions<JsonDataSource> jsonDataSource)
        {
            _jsonDal = jsonDal;
            _jsonDataSource = jsonDataSource.Value;
        }

        public async Task<List<SubjectResult>> GetSubjectResultAsync() =>
            await _jsonDal.LoadJson<List<SubjectResult>>(_jsonDataSource.SubjectResult);
    }
}
