import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './components/App/App';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/Chat' element={<Chat/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
