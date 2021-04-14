using System.Threading.Tasks;

namespace Dal
{
    public interface IJsonDal
    {
        Task<T> LoadJson<T>(string fileName);
    }
}
