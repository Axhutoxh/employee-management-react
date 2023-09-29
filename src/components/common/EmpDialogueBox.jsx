import { useId, useRef} from "react"



const EmpDialog = ({lable,lastId,addEmpData,closeDialog}) =>{
    console.log('aaaaa')
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()

    function addEmp(event){
       let newEmp ={
        id:Date.now(),
        name:firstName.current.value + ' ' + lastName.current.value,
        email:email.current.value
       }
       addEmpData({...newEmp})
       closeDialog(prev=>!prev)
       event.preventDefault();
    }
    return(
        <div className="dialogue">
            <h4 style={{textAlign:'center'}}>{lable}</h4>
            <form className="center-box" onSubmit={addEmp}>
                <div className='field-box'>
                    <label className="label" for="fname">First name:</label>
                    <input className="input-field" type="text" id="fname" name="fname" placeholder="John" ref={firstName} />
                </div>

                <div className='field-box'>
                    <label className="label" for="lname">Last name:</label>
                    <input className="input-field" type="text" id="lname" name="lname" placeholder="Doe" ref={lastName} />
                </div>

                <div className='field-box'>
                    <label className="label" for="lemail">Email</label>
                    <input className="input-field" type="email" id="lemail" name="lemail" placeholder="Doe" ref={email}/>
                </div>


                <button style={{marginTop:'25px'}} type="submit">Add Employee</button>
            </form> 
        </div>
    )
}


export default EmpDialog