import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Header/>
      </header>
      <section>
        <HomePage/>
      </section>
    </div>
  );
}

export default App;
