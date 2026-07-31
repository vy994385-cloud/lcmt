import "./LoginCard.css"


interface LoginCardProps{

email:string

password:string

setEmail:(value:string)=>void

setPassword:(value:string)=>void

showPassword:boolean

setShowPassword:(value:boolean)=>void

handleSubmit:(e:React.FormEvent)=>void

loading:boolean

}



function LoginCard({

  email,
  password,
  setEmail,
  setPassword,
  showPassword,
  setShowPassword,
  handleSubmit,
  loading

}: LoginCardProps) {


return(


<section className="login-card">



<div className="brand">


<h2>

LCMT

</h2>


<p>

Love Creates Magic Together

</p>


</div>





<h3>

Welcome Back 👋

</h3>



<p className="subtitle">

Continue the conversations waiting for you.

</p>







<form onSubmit={handleSubmit}>


<label>

Email

</label>


<input

type="email"

placeholder="Enter your email"

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

required

/>






<label>

Password

</label>


<input

type={
showPassword
?
"text"
:
"password"
}

placeholder="Enter your password"

value={password}

onChange={(e)=>
setPassword(e.target.value)
}

required

/>







<button

type="button"

className="password-toggle"

onClick={()=>
setShowPassword(!showPassword)
}

>

{

showPassword

?

"Hide Password"

:

"Show Password"

}


</button>








<button
type="submit"
className="login-button"
disabled={loading}
>
{
loading
?
"Signing in..."
:
"Continue →"
}
</button>





</form>






<div className="login-trust">


<div>

✓ Secure login

</div>


<div>

✓ Privacy first

</div>


<div>

✓ Communities for everyone

</div>


</div>





<p className="signup-link">


Don't have an account?


<a href="/signup">

Create one

</a>


</p>




</section>


)


}


export default LoginCard