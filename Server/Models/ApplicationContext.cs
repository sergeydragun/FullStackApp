using Microsoft.EntityFrameworkCore;

namespace WebFullStackSecondTry.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Department> Department { get; set; } = null!;
        public DbSet<Employee> Employee { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var dep1 = new Department { DepartmentId = 1, DepartmentName = "IT" };
            var dep2 = new Department { DepartmentId = 2, DepartmentName = "Support" };
            modelBuilder.Entity<Department>().HasData(dep1, dep2);

            modelBuilder.Entity<Employee>().HasData
                (
                    new Employee 
                    { 
                        EmployeeId = 1, 
                        EmployeeName = "Sergey", 
                        DepartmentId = dep1.DepartmentId, 
                        DateOfJoining = new DateTime(2023, 3, 15)
                    },
                        
                    new Employee
                    {
                        EmployeeId = 2,
                        EmployeeName = "Kirill",
                        DepartmentId = dep2.DepartmentId,
                        DateOfJoining = new DateTime(2021, 4, 11)
                    }
                );
        }
    }
}
