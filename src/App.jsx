import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUser = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch("https://api.github.com/users/octocat")
      if (!response.ok) {
        throw new Error(`HTTP :${response.status}`);
      }

      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false)
    }
  }

  return (<div>
    <h1>User Loading</h1>
    <button onClick={loadUser}>Load User</button>
    {loading && <p>Loading ...</p>}
    {error && <p style={{ color: "red" }} >{error}</p>}
    {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
  </div>);
}

export default App;