using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc; //Cho phép dùng: ControllerBase, IActionResult, Ok()

namespace BackendAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TestItemsController : ControllerBase
{
    private readonly ITestItemService _items; // là gì dị ??

    public TestItemsController(ITestItemService items)
    {
        _items = items;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var items = await _items.GetAllAsync(cancellationToken);
        return Ok(items.Select(i => new TestItemDTO { Id = i.Id, Name = i.Name }));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var item = await _items.GetByIdAsync(id, cancellationToken);
        if (item == null) return NotFound();
        return Ok(new TestItemDTO { Id = item.Id, Name = item.Name });
    }

    [HttpPost]
    public async Task<IActionResult> Create(TestItemDTO model, CancellationToken cancellationToken)
    {
        var item = await _items.CreateAsync(model.Name, cancellationToken); 
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, new TestItemDTO { Id = item.Id, Name = item.Name }); // trả về 201 Created
        //nameof(GetById) : trả về chuỗi string "GetById" ---> đi tìm api tên GetById
    }

    // [HttpPut("{id}")]
    // public async Task<IActionResult> Update(int id, TestItemDTO model)
    // {
    //     if (id != model.Id)
    //         return BadRequest();

    //     await _repository.UpdateAsync(_mapper.Map<TestItemModel>(model));
    //     return NoContent();
    // }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var ok = await _items.DeleteAsync(id, cancellationToken);
        return ok ? NoContent() : NotFound(); // hàm của ControllerBase trả về 204 No Content, 404 Not Found
    }

    // private static TestItemDTO MapToDto(TestItemModel model) => new()
    // {
    //     Name = model.Name
    // };

    // private static TestItemModel MapToModel(TestItemDTO dto) => new()
    // {
    //     Id = dto.Id,
    //     Name = dto.Name
    // };
}
