using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebFullStackSecondTry.Models;

namespace WebFullStackSecondTry.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        ApplicationContext db;
        private readonly IWebHostEnvironment _enviroment;
        public EmployeeController(ApplicationContext db, IWebHostEnvironment enviroment)
        {
            this.db = db;
            _enviroment = enviroment;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            var emplyees = await db.Employee
                .Include(d => d.Department)
                .Select(e => new
                {
                    e.EmployeeId,
                    e.EmployeeName,
                    e.DepartmentId,
                    e.DateOfJoining,
                    e.PhotoFileName,
                    e.Department.DepartmentName
                })
                .ToListAsync();

            foreach( var emplyee in emplyees )
                Console.WriteLine("PhotoFileName: " + emplyee.PhotoFileName );

            return new JsonResult(emplyees);
        }

        [HttpPost]
        public async Task<JsonResult> Post(Employee employee)
        {
            db.Employee.Add(employee);
            await db.SaveChangesAsync();
            return new JsonResult(new { message = "Succesfuly" });
        }

        [HttpPut]
        public async Task<JsonResult> Put(Employee employee)
        {
            db.Employee.Update(employee);
            await db.SaveChangesAsync();
            return new JsonResult(await db.Employee.ToListAsync());
        }

        [HttpDelete]
        public async Task<JsonResult> Delete(Employee employeeId)
        {
            Employee? employee = await db.Employee.FindAsync(employeeId.EmployeeId);
            if (employee != null)
            {
                db.Employee.Remove(employee);
                await db.SaveChangesAsync();
            }
            return new JsonResult(await db.Employee.ToListAsync());
        }

        [Route("SaveFile")]
        [HttpPost]
        public async Task<JsonResult> SaveFile()
        {
            try
            {
                var httpsRequest = Request.Form;
                var postedFile = httpsRequest.Files.FirstOrDefault();
                string filename = postedFile.FileName;
                var physicalPath = _enviroment.ContentRootPath + "/Photos/" + filename;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    await postedFile.CopyToAsync(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception ex)
            {

                return new JsonResult(ex);
            }
        }
    }
}
