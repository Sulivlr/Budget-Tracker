import Appbar from './components/Appbar/Appbar';
import {Route, Routes} from 'react-router-dom';
import Tracker from './Containers/Tracker/Tracker';
import Catergories from './Containers/Categories/Catergories';
import Income from './Containers/income/income';

const App = () => (
    <>
      <header>
        <Appbar />
      </header>
      <main>
        <Routes >
          <Route path="/" element={<Tracker />} />
          <Route path="/categories" element={<Catergories />} />
          <Route path="/income" element={<Income />} />
          <Route path="*" element={<h1>NOT FOUND!</h1>} />
        </Routes>
      </main>

    </>
);

export default App;
