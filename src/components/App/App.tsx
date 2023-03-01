import "./App.scss";
import { Excel } from "../Excel/Excel";
import { Provider } from "react-redux";
import { store } from '../../redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Excel />
      </Provider>
    </div>
  );
}

export default App;
