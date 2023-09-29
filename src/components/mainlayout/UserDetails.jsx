import { useState } from 'react'
import noData from '../../assets/noData.svg'
import LoadingSpinner from '../common/LoadingSpinner';
import EmpDialog from '../common/EmpDialogueBox';
const UserDetails = ()=>{


    const [employeeList,setEmployeeList] =useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [dialogueFlag,setDialogFlag] = useState(false)
    const [newEmployee,setNewEmployee] = useState({})



    async function getEmployeeData(){
        setIsLoading(true);
       await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(d => {
            setEmployeeList(d)
            setIsLoading(false);});
    }

   const addNewEmployeeData =()=>{
        setDialogFlag(per=>!per)
    
    }

    function handleEdit(){
        console.log('edit')
    }

    function handleDelete(id){
        const list  = employeeList.filter(list => list.id !==id)
      
      
         setEmployeeList([...list])
    }

    const handleAddEmployee = (dataFromChild)=>{
        const list = employeeList
        list.push({...dataFromChild})
        setEmployeeList(list)
    }

    return (
       <div >
        <button  className="getEmpBtn" onClick={employeeList.length ? addNewEmployeeData:getEmployeeData}>{employeeList.length ? 'Add New Employee Data':'Get Employee Data'}</button>
            {isLoading?<LoadingSpinner  />:employeeList?.length ? 
             <table className="customers" >
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                 </tr>
            {employeeList.map((employee) =>{
                return (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>
                <div className='actions'>
                    <div  className='edit' onClick={handleEdit}>✏️</div>
                    <div className='delete' onClick={()=>handleDelete(employee.id)}>🗑️</div>
                    </div>
                </td>
          </tr>)
            })} </table>   :            
            <div className="noData">
                <img src={noData} width="40%" style={{minWidth:'400px',maxHeight:'400px'}} />
                <h3 className='noDataHeading' >No Users Yet</h3>
            </div>}
            {!newEmployee?newEmployee:''}
 

       
      {
        dialogueFlag
        ?
        <EmpDialog 
            lable={'Add New Employee'} 
            lastId={employeeList.length} 
            addEmpData={handleAddEmployee} 
            closeDialog={setDialogFlag} 
            />
            :''
        }

       </div>
    )
}

export default (UserDetails)