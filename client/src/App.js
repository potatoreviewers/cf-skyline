import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home/HomePage';
import UserPage from './user/UserPage';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/" element={<HomePage />} />

          <Route path="/:username/:year" element={<UserPage />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
