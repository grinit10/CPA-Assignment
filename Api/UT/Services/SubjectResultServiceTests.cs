using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bl;
using Dal;
using Domain;
using Domain.AppSettings;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;

namespace UT.Services
{
    [TestFixture]
    public class SubjectResultServiceTests
    {
        private readonly ISubjectResultService _subjectResultService;
        private readonly string _subject = "Test Subject";
        private readonly string _grade = "PASS";
        private readonly int _year = 2021;

        public SubjectResultServiceTests()
        {
            var mockJsonDal = new Mock<IJsonDal>();
            mockJsonDal.Setup(mj => mj.LoadJson<List<SubjectResult>>(It.IsAny<string>())).Returns(Task.FromResult(new List<SubjectResult>
            {
                new()
                {
                    Subject = _subject,
                    Results = new List<Result>
                    {
                        new Result
                        {
                            Grade = _grade,
                            Year = _year
                        }
                    }
                }
            }));

            var mockJsonDataSource = Options.Create(new JsonDataSource
            {
                SubjectResult = string.Empty
            });

            _subjectResultService = new SubjectResultService(mockJsonDal.Object, mockJsonDataSource);
        }

        [TestCase]
        public async Task ShouldGetData()
        {
            var result = await _subjectResultService.GetSubjectResultAsync();
            Assert.NotNull(result);
            Assert.AreEqual(1, result.Count);
            Assert.AreEqual(_subject, result.First().Subject);
            Assert.AreEqual(_grade, result.First().Results.First().Grade);
            Assert.AreEqual(_year, result.First().Results.First().Year);
        }
    }
}
