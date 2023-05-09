using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;
using WebFullStackSecondTry.Models;

namespace WebFullStackSecondTry.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        ApplicationContext db;
        public DepartmentController(ApplicationContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            return new JsonResult(await db.Department.ToListAsync());
        }

        [HttpPost]
        public async Task<JsonResult> Post(Department department)
        {
            db.Department.Add(department);
            await db.SaveChangesAsync();
            return new JsonResult(new { message = "Added succesfuly" });
        }

        [HttpPut]
        public async Task<JsonResult> Put(Department department)
        {
            db.Department.Update(department);
            await db.SaveChangesAsync();
            return new JsonResult(new { message = "Updated succesfuly" });
        }

        [HttpDelete]
        public async Task<JsonResult> Delete(Department departmentReq)
        {
            Department? department = await db.Department.FindAsync(departmentReq.DepartmentId);
            if (department != null)
            { 
                db.Department.Remove(department);
                await db.SaveChangesAsync();
                return new JsonResult(new { message = "Deleted succesfuly" });
            }
            return new JsonResult(new { message = "Non deleted" });
        }
    }
}
