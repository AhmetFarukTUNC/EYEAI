using EyeAI.API.Data;

using EyeAIBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace EyeAIBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            contact.CreatedDate = DateTime.UtcNow;

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Your message has been sent successfully."
            });
        }
    }
}