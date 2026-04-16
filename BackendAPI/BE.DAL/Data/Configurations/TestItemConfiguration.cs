namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class TestItemConfiguration : IEntityTypeConfiguration<TestItem>
{
    public void Configure(EntityTypeBuilder<TestItem> builder)
    {
        builder.HasData(
            new TestItem { Id = 1, Name = "Sample item 1" },
            new TestItem { Id = 2, Name = "Sample item 2" }
        );
    }
}
