import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
function App() {
  console.log(" i am in App");  
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;
