import { useState } from 'react'
import noData from '../../assets/noData.svg'
const UserDetails = ()=>{

    const [employeeList,setEmployeeList] =useState([])

    async function getEmployeeData(){
       await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(d => setEmployeeList(d))
    }

    return (
       <div>

            <button style={employeeList?.length?{display: 'none'}:{display: 'block'}} className="getEmpBtn" onClick={getEmployeeData}>Get Employee Data</button>
            {employeeList?.length ? 
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
          </tr>
         
                   
                )
                    
              
            })}  </table>   :            
            <div className="noData">
                <img src={noData} width="40%" style={{minWidth:'400px',maxHeight:'400px'}} />
                <h3 className='noDataHeading' >No Users Yet</h3>
            </div>}   

       
      

       </div>
    )
}

export default UserDetails