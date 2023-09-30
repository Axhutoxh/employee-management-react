import {   useEffect, useRef} from "react"

// eslint-disable-next-line react/prop-types
const EmpDialog = ({lable,addEmpData,closeDialog,selectedEmp,editEmpData}) =>{
    console.log('aaaaa')
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()


    useEffect(()=>{
        const nameSplitter = selectedEmp.name.split(' ')
        email.current.value  = selectedEmp.email
        firstName.current.value = nameSplitter[0]
        lastName.current.value = nameSplitter[1]
       
    },[selectedEmp])

    function handleEmp(event){
       let newEmp ={
        id:selectedEmp.id?selectedEmp.id:Date.now(),
        name:firstName.current.value + ' ' + lastName.current.value,
        email:email.current.value
       }
       selectedEmp.id ?editEmpData({...newEmp}) :addEmpData({...newEmp})
       closeDialog(prev=>!prev)
       event.preventDefault();
    }



    return(
        <div className="dialogue">
            <h4 style={{textAlign:'center'}}>{lable}</h4>
            <form className="center-box" onSubmit={handleEmp}>
                <div className='field-box'>
                    <label className="label" htmlFor="fname">First name:</label>
                    <input className="input-field" type="text" id="fname" name="fname" placeholder="John" ref={firstName}  />
                </div>

                <div className='field-box'>
                    <label className="label" htmlFor="lname">Last name:</label>
                    <input className="input-field" type="text" id="lname" name="lname" placeholder="Doe" ref={lastName} />
                </div>

                <div className='field-box'>
                    <label className="label" htmlFor="lemail">Email</label>
                    <input className="input-field" type="email" id="lemail" name="lemail" placeholder="Doe" ref={email}/>
                </div>


                <button style={{marginTop:'25px'}} type="submit">{selectedEmp.id?'Edit Employee':'Add Employee'}</button>
            </form> 
        </div>
    )
}


export default (EmpDialog)