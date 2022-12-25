import { useState } from "react";
import LoginForm from "./auth/login-form";
import SignupForm from "./auth/signup-form";

interface UserSwitchProps {
  
}

enum UserFormMode {
  Login,
  Signup
}

export const UserSwitch = (props: UserSwitchProps) => {

  const [mode, setMode] = useState<UserFormMode>(UserFormMode.Signup);

  const goToSignup = () => {
    setMode(UserFormMode.Signup);
  }

  const goToLogin = () => {
    setMode(UserFormMode.Login);
  }

  return (
    <div>
      {mode === UserFormMode.Login && <LoginForm goToSignup={goToSignup} />}
      {mode === UserFormMode.Signup && <SignupForm goToLogin={goToLogin} />}
    </div>
  )
}

export default UserSwitch;