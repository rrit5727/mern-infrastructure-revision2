import SignUpForm from "../../../Components/SignUpForm/SignUpForm";
import LoginForm from "../../../components/LoginForm/LoginForm";

function AuthPage({setUser}) {

  return(
    <main>
      <h1>AuthPage</h1>
      <SignUpForm setUser={setUser}/>
      <LoginForm setUser={setUser}/>
    </main>
  )

}

export default AuthPage