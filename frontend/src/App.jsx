import { Navigate, Route, Routes } from "react-router-dom"
import { SignupPage } from "./pages/SignupPage"
import { CreateTodoPage } from "./pages/CreateTodoPage"
import { LoginPage } from "./pages/LoginPage"
import { LogoutPage } from "./pages/LogoutPage"
import { DeletePage } from "./pages/DeletePage"
import { PageNotFound } from "./pages/PageNotFound"
import { AuthenticationContext } from "./contextApi/AuthenticationContext"
import { useContext } from "react"



function App() {

  const { loginState } = useContext(AuthenticationContext);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={loginState ? "/home" : "/login"} replace />}
        />
        <Route path="/home" element={<CreateTodoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/delete/user" element={<DeletePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
