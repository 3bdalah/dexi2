import { Suspense, lazy } from "react";
import "./App.css";

// Lazy load the TableUsers component
const LazyTableUsers = lazy(() => import("./Components/Table/TableUsers"));

function App() {
  return (
    <>
      {/* Wrap the lazy-loaded component with Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyTableUsers />
      </Suspense>
    </>
  );
}

export default App;
