import { Routes, Route } from 'react-router-dom';
import Main from "./pages/Main";
import PostDetails from './pages/PostDetails/PostDetails';


const App = () => { 
    return (
      <Routes>
         <Route path="/" element={ <Main/> }/>
         <Route path="/:id" element={ <PostDetails/> }/>
      </Routes>
  
    );
  }
  
  export default App;
