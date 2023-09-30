import { useEffect, useState } from 'react'
import noData from '../../assets/noData.svg'
import LoadingSpinner from '../common/LoadingSpinner';
import EmpDialog from '../common/EmpDialogueBox';
const UserDetails = ()=>{


    const [employeeList,setEmployeeList] =useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [dialogueFlag,setDialogFlag] = useState(false)
    const [search,setSearch] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [newEmployee,setNewEmployee] = useState({})

    const [selectedEmp,setSelectedEmp] = useState({})




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

   
    function searchFilter(){
        const searchedList = employeeList.filter((data)=>{
  
            if(data.name.toLowerCase().includes(search.toLowerCase())){
                return data
            }
          
        })
        return searchedList
    }

    function handleSearch(e){
       
       setSearch(e.target.value)
     
    }


    function handleEdit(empData){
        setSelectedEmp({...empData})
        setDialogFlag(prev=>!prev)
        
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

    const handleEditEmployee = (updatedEmpData)=>{
        let updatedList =[]
        for(let i=0; i<employeeList.length; i++){ 
            if(employeeList[i].id==updatedEmpData.id){
                updatedList.push(updatedEmpData)
            }
            else{
                updatedList.push(employeeList[i])
            }
        }
        setEmployeeList(updatedList)
    }

    return (
       <div>


        <div className="sub-header">
            <div>
            {employeeList.length ? <input className="search-field" type="text" placeholder="Search Employee" value={search} onChange={handleSearch}  /> :''}    
            </div>
            <button  className="getEmpBtn" onClick={employeeList.length ? addNewEmployeeData:getEmployeeData}>{employeeList.length ? 'Add New Employee Data':'Get Employee Data'}</button>
        </div>

      
            {isLoading?<LoadingSpinner  />:employeeList?.length 
            ? 
                <table className="customers" >
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    {searchFilter().map((employee,i) =>{
                        return (
                    <tr key={employee.id}>
                        <td>{i+1}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>
                            <div className='actions'>
                                <div  className='edit' onClick={()=>handleEdit(employee)}>✏️</div>
                                <div className='delete' onClick={()=>handleDelete(employee.id)}>🗑️</div>
                            </div>
                        </td>
                    </tr>)
                    })
                }
                </tbody>
            </table> 
            :            
                <div className="noData">
                    <img src={noData} width="40%" style={{minWidth:'400px',maxHeight:'400px'}} />
                    <h3 className='noDataHeading' >No Users Yet</h3>
                </div>}
          {!newEmployee?newEmployee:''}
 

       
      {
        dialogueFlag
        ?
        <EmpDialog 
            lable={selectedEmp.id ?'Edit Employee':'Add New Employee'} 
            lastId={employeeList.length} 
            addEmpData={handleAddEmployee} 
            editEmpData={handleEditEmployee}
            closeDialog={setDialogFlag} 
            selectedEmp = {selectedEmp}
            />
            :''
        }
        

        {/* <Child /> */}

       </div>
    )
}

export default (UserDetails)

// reference equility