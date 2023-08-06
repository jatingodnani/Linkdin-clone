
import { Route,Routes} from 'react-router-dom';

import Registercomponent from './components/Registercomponent';

import { Login } from './pages1/loginpages';
import { Home } from './pages1/home';
import Profilepage from './pages1/Profilepage';
import Connection from "./pages1/Connection";


function App() {
 
  return (
<>

    
    <Routes>
    <Route  path="/" element={<Login/>} />
    <Route path="/register" element={<Registercomponent />} />
    <Route path="/home" element={<Home />} />
    <Route path="/Profile" element={<Profilepage />} />
    <Route path="/Connections" element={<Connection />} />
    </Routes>

    </>
  )
}

export default App
