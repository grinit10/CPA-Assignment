using System.Collections.Generic;
using System.Threading.Tasks;
using Dal;
using Domain;
using NUnit.Framework;

namespace UT.Dal
{
    [TestFixture]
    public class JsonDalTests
    {
        private readonly IJsonDal _jsonDal;

        public JsonDalTests()
        {
            _jsonDal = new JsonDal();
        }

        [TestCase]
        public async Task ShouldReadJsonSuccessfully()
        {
            var result = await _jsonDal.LoadJson<List<SubjectResult>>("SubjectResult.json");
            Assert.NotNull(result);
            Assert.AreEqual(5, result.Count);
        }
    }
}
