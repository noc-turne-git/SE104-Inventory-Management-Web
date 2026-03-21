using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.API.DTO;
using Microsoft.AspNetCore.Mvc;
using TestItemModel = BackendAPI.BE.DAL.Entities.TestItem;

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
        var items = await _repository.GetAllAsync();
        return items.Select(MapToDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TestItem>> GetById(int id)
    {
        var item = await _repository.GetByIdAsync(id);

        if (item == null)
            return NotFound();

        return MapToDto(item);
    }

    [HttpPost]
    public async Task<ActionResult<TestItem>> Create(TestItem model)
    {
        var item = await _repository.AddAsync(MapToModel(model));
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, MapToDto(item));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TestItem model)
    {
        if (id != model.Id)
            return BadRequest();

        await _repository.UpdateAsync(MapToModel(model));
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }

    private static TestItem MapToDto(TestItemModel model) => new()
    {
        Id = model.Id,
        Name = model.Name
    };

    private static TestItemModel MapToModel(TestItem dto) => new()
    {
        Id = dto.Id,
        Name = dto.Name
    };
}
