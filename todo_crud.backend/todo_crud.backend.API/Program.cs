using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using todo_crud.backend.Business;
using todo_crud.backend.DataAccess;
using todo_crud.backend.DataAccess.Repository;
using todo_crud.backend.DataAccess.UnitOfWork;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Add Dbcontext
builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SqliteDb")));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<ITodoTaskRepository, TodoTaskRepository>();
builder.Services.AddScoped<ITodoTaskBusinessLogic, TodoTaskBusinessLogic>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors( options => {
    options.AddPolicy("AllowCors",
            builder => builder.WithOrigins("https://localhost:3000")
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
});    

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowCors");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
