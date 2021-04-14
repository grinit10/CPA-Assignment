using System.IO;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace Dal
{
    public class JsonDal: IJsonDal
    {
        public async Task<T> LoadJson<T>(string fileName) =>
            JsonConvert.DeserializeObject<T>(await new StreamReader(fileName).ReadToEndAsync());
    }
}
