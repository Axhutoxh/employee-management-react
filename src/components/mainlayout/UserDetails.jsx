import { useEffect, useState } from 'react'
import noData from '../../assets/noData.svg'
import LoadingSpinner from '../common/LoadingSpinner';
import EmpDialog from '../common/EmpDialogueBox';
const UserDetails = ()=>{

    const [employeeList,setEmployeeList] =useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [dialogueFlag,setDialogFlag] = useState(false)
    const [newEmployee,setNewEmployee] = useState({})

    useEffect(()=>{
        console.log(newEmployee)
    },[newEmployee])

    async function getEmployeeData(){
        setIsLoading(true);
       await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(d => {setEmployeeList(d)
            setIsLoading(false);});
    }

    function addNewEmployeeData(){
        setDialogFlag(per=>!per)
    
    }

    return (
       <div style={{height: '600px'}}>
        <button  className="getEmpBtn" onClick={employeeList.length ? addNewEmployeeData:getEmployeeData}>{employeeList.length ? 'Add New Employee Data':'Get Employee Data'}</button>
            {isLoading?<LoadingSpinner  />:employeeList?.length ? 
             <table className="customers" >
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                 </tr>
            {employeeList.map((employee) =>{
                return (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
          </tr>)
            })} </table>   :            
            <div className="noData">
                <img src={noData} width="40%" style={{minWidth:'400px',maxHeight:'400px'}} />
                <h3 className='noDataHeading' >No Users Yet</h3>
            </div>}
            {!newEmployee?newEmployee:''}
 

       
      {dialogueFlag?<EmpDialog lable={'Add New Employee'} lastId={employeeList.length} addEmpData={setNewEmployee} closeDialog={setDialogFlag} />:''}

       </div>
    )
}

export default UserDetails