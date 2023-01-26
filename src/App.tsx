import "./App.css";
import {
  ExampleMoviePoster,
  ExampleResponsive,
  ExampleSimple,
  ExampleWithGaps,
} from "./examples";

function App() {
  return (
    <div>
      <p
        style={{ textAlign: "center", fontSize: "2.4rem", fontWeight: "bold" }}
      >
        React Infinite horizontal scroller
      </p>
      <ExampleSimple />
      <div style={{ padding: "2rem 0" }}></div>
      <ExampleMoviePoster />
      <div style={{ padding: "2rem 0" }}></div>
      <ExampleWithGaps />
      <div style={{ padding: "2rem 0" }}></div>
      <ExampleResponsive />
      <div style={{ padding: "2rem 0" }}></div>
    </div>
  );
}

export default App;
