import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';

import Home from './Components/Home';
import PageNotFound from './Components/PageNotFound';
import Profile from './Components/Profile';


function App() {

  return (
    <BrowserRouter>
      <div class="bg-dark">

        <Routes>
          <Route exact path='/' element={<LoginForm />} />
          <Route path='/home' element={<Home />} />
          <Route path='/registro' element={<RegisterForm />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
