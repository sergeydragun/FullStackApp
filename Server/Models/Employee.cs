﻿namespace WebFullStackSecondTry.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }
        public DateTime? DateOfJoining { get; set; }
        public string? PhotoFileName { get; set; } = "kitten.png";

    }
}
