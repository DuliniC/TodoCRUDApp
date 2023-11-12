import './App.css';
import Header from './components/Header';
import LeftTab from './components/HomePage';

function App() {
  return (
    <div className='App'>
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
