import { Navigate, Route, Routes } from "react-router-dom"
import { SignupPage } from "./pages/SignupPage"
import { CreateTodoPage } from "./pages/CreateTodoPage"
import { LoginPage } from "./pages/LoginPage"
import { LogoutPage } from "./pages/LogoutPage"
import { DeletePage } from "./pages/DeletePage"
import { PageNotFound } from "./pages/PageNotFound"
import { PrivateRoute } from "./route/PrivateRoute"
import { PublicRoute } from "./route/PublicRoute"



function App() {

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={"/home"} replace />}
        />

        <Route path="/home" element={
          <PrivateRoute>
            <CreateTodoPage />
          </PrivateRoute>
        } />

        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
        />
        <Route path="/signup" element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        } />
        
        <Route path="/logout" element={<LogoutPage />} />

        <Route path="/delete/user" element={
          <PrivateRoute>
            <DeletePage />
          </PrivateRoute>

        } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
