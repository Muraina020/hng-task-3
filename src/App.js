// import './App.css';
// import AuthDetails from './components/AuthDetails';
// import Grid from './components/grid/Grid';
// import SignIn from './components/auth/SignIn';
// import SignUp from './components/auth/SignUp';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Auth from "./pages/authPage/Auth";
import GridPage from "./pages/gridPage/GridPage";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth/>}/>
      <Route path="/grid" element={<GridPage/>}/>
      {/* <Route path="/a" element={<MovieGrid/>}/> */}
      
      {/* <Route path="/movies/:id" element={<Movie/>}/> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
