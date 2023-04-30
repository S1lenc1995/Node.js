import { Routes, Route } from 'react-router-dom';
import Main from "./pages/Main";
import PostDetails from './pages/PostDetails/PostDetails';
import CreatePost from './pages/CreatePost/CreatePost';
import EditPost from './pages/EditPost/EditPost';


const App = () => { 
    return (
      <Routes>
         <Route path="/" element={ <Main/> }/>
         <Route path="/create_post" element={ <CreatePost/> }/>
         <Route path="/post/:id" element={ <PostDetails/> }/> 
         <Route path="/editPost/:id" element={ < EditPost/> }/> 
      </Routes>
  
    );
  }
  
  export default App;
