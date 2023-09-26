


const Header = ({company})=>{

    return (
       <div className="headerLayout">
            <div>Logo</div>
            <h2>{company}</h2>
            <button>Login</button>
       </div>
    )
}

export default Header