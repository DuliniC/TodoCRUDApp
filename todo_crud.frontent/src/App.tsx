import './App.css';
import Header from './components/Header';
import LeftTab from './components/HomePage';

function App() {
  return (
    <div>
      <header className='App-header'>
        <Header/>
      </header>
      <section>
        <LeftTab/>
      </section>
    </div>
  );
}

export default App;
