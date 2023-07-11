import { useState } from "react";
import Form from "./components/Form/Form";
import List from "./components/List/List";
function App() {
  const [data, setData] = useState([]);

  return (
    <main>
      <Form setData={setData} />
      <List data={data} />
    </main>
  );
}

export default App;
