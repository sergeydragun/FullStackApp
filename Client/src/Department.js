import React,{Component} from 'react';
import { variables } from './Variables';

export class Department extends Component{

    constructor(props){
        super(props)

        this.state={
            departments:[],
            modalTitle:"",
            DepartmentName:"",
            DepartmentId:0
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
        
    }

    componentDidMount(){
        this.refreshList();
    }

    changeDepartmentName = (e) => {
        this.setState({DepartmentName:e.target.value})
    }

    addClick(){
        this.setState({
            modalTitle:"Add Department",
            DepartmentId:0,
            DepartmentName:""
        });
    }

    editClick(dep){
        this.setState({
            modalTitle:"Edit Department",
            DepartmentId:dep.DepartmentId,
            DepartmentName:dep.DepartmentName
        });
    }

    createClick(){
        fetch(variables.API_URL+'department', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                DepartmentName:this.state.DepartmentName
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
        fetch(variables.API_URL+'department', {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                DepartmentId:this.state.DepartmentId,
                DepartmentName:this.state.DepartmentName
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

    deleteClick(dep){
        fetch(variables.API_URL+'department', {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                DepartmentId:dep.DepartmentId,
                DepartmentName:dep.DepartmentName
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

    render(){
        const {
            departments,
            modalTitle,
            DepartmentName,
            DepartmentId
        }=this.state;

        return(
<div>
    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Department
    </button>
    <table className='table table-striped'>
        <thead>
            <tr>
                <th>
                    Department Id
                </th>
                <th>
                    Department Name
                </th>
                <th>
                    Options
                </th>
            </tr>
        </thead>
        <tbody>
            {departments.map(dep=>
                <tr key={dep.DepartmentId}>
                    <td>{dep.DepartmentId}</td>
                    <td>{dep.DepartmentName}</td>
                    <td>
                    <button type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.editClick(dep)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>

                        <button type="button"
                        onClick={()=>this.deleteClick(dep)}
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
                <div className='input-group mb-3'>
                    <span className='input-group-text'>DepartmentName</span>
                    <input type="text" className='form-control'
                    value={DepartmentName}
                    onChange={this.changeDepartmentName}/>
                </div>

                {DepartmentId==0?
                <button type="button"
                className="btn btn-primary float-start"
                onClick={()=>this.createClick()}>
                    Create
                </button>:null }

                {DepartmentId!=0?
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