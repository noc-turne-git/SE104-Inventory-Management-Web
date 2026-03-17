using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.BLL.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TestItemsController : ControllerBase
{
    private readonly ITestItemRepository _repository;

    public TestItemsController(ITestItemRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IEnumerable<TestItem>> GetAll()
    {
        return await _repository.GetAllAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TestItem>> GetById(int id)
    {
        var item = await _repository.GetByIdAsync(id);

        if (item == null)
            return NotFound();

        return item;
    }

    [HttpPost]
    public async Task<ActionResult<TestItem>> Create(TestItem model)
    {
        var item = await _repository.AddAsync(model);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TestItem model)
    {
        if (id != model.Id)
            return BadRequest();

        await _repository.UpdateAsync(model);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}
