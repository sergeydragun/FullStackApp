import React,{Component} from 'react';
import { variables } from './Variables';
import { Department } from './Department';

export class Employee extends Component{
    constructor(props){
        super(props)

        this.state={
            departments:[],
            employees:[],
            modalTitle:"",
            EmplyeeId:0,
            EmployeeName:"",
            DepartmentId: 0,          
            DepartmentName:"",
            DateOfJoining:"",
            PhotoFileName:"kitten.png",
            PhotoPath:variables.PHOTO_URL
        }
    }

    refreshList(){
        fetch(variables.API_URL+'department', {
            method: "GET",
            headers: {"Accept": "application/json"}
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({departments:data});
        });

        fetch(variables.API_URL+'employee', {
            method: "GET",
            headers: {"Accept": "application/json"}
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({employees:data});
        });
        
    }

    componentDidMount(){
        this.refreshList();
    }

    changeDeparment = (e) => {
        let depId = e.target.value
        this.setState({
            DepartmentId:depId,
            DepartmentName:this.state.departments.find(d => d.DepartmentId == depId).DepartmentName
        })
    }

    changeEmployeeName = (e) => {
        this.setState({EmployeeName:e.target.value})
    }

    changeDateOfJoining = (e) => {
        this.setState({DateOfJoining:e.target.value})
    }

    addClick(){
        this.setState({
            modalTitle:"Add Employee",
            EmployeeId:0,
            Department:{},
            EmployeeName:"",
            DepartmentId:0,
            DepartmentName:"",
            DateOfJoining:"",
            PhotoFileName:"kitten.png"
        });
    }

    editClick(emp){
        this.setState({
            modalTitle:"Edit Employee",
            EmployeeId:emp.EmployeeId,
            EmployeeName:emp.EmployeeName,
            DepartmentId:emp.DepartmentId,
            DepartmentName:emp.DepartmentName,
            DateOfJoining:emp.DateOfJoining,
            PhotoFileName:emp.PhotoFileName
        });
    }

    createClick(){
        fetch(variables.API_URL+'employee', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                EmployeeName:this.state.EmployeeName,
                DepartmentId:this.state.DepartmentId,
                DateOfJoining:this.state.DateOfJoining,
                PhotoFileName:this.state.PhotoFileName
            })
        })
        .then(response=>response.json())
        .then(data=>{
            alert(data.message);
            this.refreshList();
        },
        
          (error) => {
            alert("Failed")
          }  
        ); 
    }

    updateClick(){
        fetch(variables.API_URL+'employee', {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                EmployeeId:this.state.EmployeeId,
                EmployeeName:this.state.EmployeeName,
                DepartmentId:this.state.DepartmentId,
                DateOfJoining:this.state.DateOfJoining,
                PhotoFileName:this.state.PhotoFileName
            })
        })
        .then(response=>response.json())
        .then(data=>{
            alert(data.message);
            this.refreshList();
        },
        
          (error) => {
            alert("Failed")
          }  
        ); 
    }

    deleteClick(emp){
        fetch(variables.API_URL+'employee', {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                EmployeeId:emp.EmployeeId,
                EmployeeName:emp.EmployeeName
            })
        })
        .then(response=>response.json())
        .then(data=>{
            alert(data.message);
            this.refreshList();
        },
        
          (error) => {
            alert("Failed")
          }  
        ); 
    }

    imageUpload=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch(variables.API_URL+"employee/savefile", {
            method:"POST",
            body:formData
        }).then(res=>res.json()).then(data => {
            this.setState({PhotoFileName:data})
        })

    }

    render(){
        const {
            departments,
            employees,
            modalTitle,
            EmployeeId,
            EmployeeName,
            DepartmentId,          
            DepartmentName,
            DateOfJoining,
            PhotoFileName,
            PhotoPath
        }=this.state;

        return(
<div>
    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Employee
    </button>
    <table className='table table-striped'>
        <thead>
            <tr>
                <th>
                    EmployeeId
                </th>
                <th>
                    EmployeeName
                </th>
                <th>
                    DepartmentName
                </th>
                <th>
                    DateOfJoining
                </th>
                <th>
                    Options
                </th>
            </tr>
        </thead>
        <tbody>
            {employees.map(emp=>
                <tr key={emp.EmployeeId}>
                    <td>{emp.EmployeeId}</td>
                    <td>{emp.EmployeeName}</td>
                    <td>{emp.DepartmentName}</td>
                    <td>{emp.DateOfJoining.slice(0, 10)}</td>
                    <td>
                    <button type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.editClick(emp)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>

                        <button type="button"
                        onClick={()=>this.deleteClick(emp)}
                        className='btn btn-light mr-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>
                        </button>
                        
                    </td>
                </tr>
            )}
        </tbody>
    </table>
    
<div className='modal fade' id ="exampleModal" tabIndex="-1" aria-hidden="true">
    <div className='modal-dialog modal-lg modal-dialog-centered'>
        <div className='modal-content'>
            <div className='modal-header'>
                <h5 className='modal-title'>{modalTitle}</h5>
                <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className='modal-body'>
            <div className='d-flex flex-row bd-highlight mb-3'>
            <div className='p-2 w-50 bd-highlight'>
                
                <div className='input-group mb-3'>
                    <span className='input-group-text'>EmployeetName</span>
                    <input type="text" className='form-control'
                    value={EmployeeName}
                    onChange={this.changeEmployeeName}/>
                </div>

                 <div className='input-group mb-3'>
                    <span className='input-group-text'>Department</span>
                    <select className='form-select'                   
                    onChange={this.changeDeparment}
                    value={this.state.DepartmentId}>
                        {departments.map(dep =>
                        <option
                            value={dep.DepartmentId}
                            key={dep.DepartmentId}>
                            {dep.DepartmentName}
                        </option>)}w
                    </select>
                </div> 

                <div className='input-group mb-3'>
                    <span className='input-group-text'>DateOfJoining</span>
                    <input type="date" className='form-control'
                    value={DateOfJoining.slice(0, 10)}
                    onChange={this.changeDateOfJoining}/>
                </div>
            </div>

            <div className='p-2 w-50 bd-highlight'>
                <img width="250px" height="250px" 
                src={PhotoPath + PhotoFileName}/>
                <input className='m-2' type="file" onChange={this.imageUpload}/>
            </div>
               
            </div>
                {EmployeeId==0?
                <button type="button"
                className="btn btn-primary float-start"
                onClick={()=>this.createClick()}>
                    Create
                </button>:null }

                {EmployeeId!=0?
                <button type="button"
                className="btn btn-primary float-start"
                onClick={()=>this.updateClick()}>
                    Update
                </button>:null }
            </div>
        </div>
    </div>
</div>

</div>

        )
    }
}