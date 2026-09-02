using System.Net.Http.Headers;
using System.Text.Json;
using EyeAI.API.Models;


namespace EyeAI.API.Services
{
    public class AIService
    {

        private readonly HttpClient _client;


        public AIService()
        {
            _client = new HttpClient();
        }





        public async Task<AIResult?> Predict(IFormFile image)
        {

            using var content = new MultipartFormDataContent();



            using var stream = image.OpenReadStream();



            var fileContent = new StreamContent(stream);



            fileContent.Headers.ContentType =
                new MediaTypeHeaderValue(
                    image.ContentType
                );



            content.Add(
                fileContent,
                "image",
                image.FileName
            );





            var response =
                await _client.PostAsync(
                    "http://127.0.0.1:5000/predict",
                    content
                );




            var json =
                await response.Content.ReadAsStringAsync();



            // Flask cevabını görmemiz için
            Console.WriteLine("FLASK RESPONSE:");
            Console.WriteLine(json);




            if (!response.IsSuccessStatusCode)
            {
                throw new Exception(
                    "AI API Error: " + json
                );
            }





            var result =
                JsonSerializer.Deserialize<AIResult>(
                    json,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    }
                );



            return result;

        }


    }
}