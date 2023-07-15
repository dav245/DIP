import { createSignal } from "solid-js";

function App() {
  const [getValue, setValue] = createSignal(0);
  const getDouble = () => getValue() * 2;
  const increase = () => setValue((value) => value + 1);

  return (<>
    <div>Counter: { getValue() }, Double: { getDouble() }</div>
    <button type="button" onClick={increase}>Increase</button>
  </>);
}

export default App;
