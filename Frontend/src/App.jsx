import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [getKey, setGetKey] = useState("");
  const [getValue, setGetValue] = useState(null);
  const [cache, setCache] = useState([]); // store as array to preserve order
  const [mruKey, setMruKey] = useState(null);

  const baseURL = "http://localhost:8080/api/cache";

  // Fetch all cache entries from backend
  const fetchAll = async () => {
    try {
      const res = await axios.get(`${baseURL}/all`);
      const entries = Object.entries(res.data)
        .map(([k, v]) => ({ key: Number(k), value: v }));
      setCache(entries);
    } catch (err) {
      console.error(err);
    }
  };

  // Add or update cache
  const handlePut = async () => {
    if (key === "" || value === "") return;

    try {
      await axios.post(`${baseURL}/put`, null, {
        params: { key: Number(key), value: Number(value) }
      });
      setMruKey(Number(key));      // mark MRU
      setKey("");
      setValue("");
      fetchAll();                  // refresh cache
    } catch (err) {
      console.error(err);
    }
  };

  // Get value by key
  const handleGet = async () => {
    if (getKey === "") return;

    try {
      const res = await axios.get(`${baseURL}/get/${getKey}`);
      setGetValue(res.data);
      if (res.data !== -1) setMruKey(Number(getKey)); // MRU if exists
      fetchAll(); // refresh list to reflect MRU change
    } catch (err) {
      console.error(err);
    }
  };

  // Load cache on mount
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="container">
      <h1>LRU Cache Dashboard</h1>

      <div className="section">
        <h3>Add / Update Cache</h3>
        <input
          type="number"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handlePut}>Add / Update</button>
      </div>

      <div className="section">
        <h3>Get Value by Key</h3>
        <input
          type="number"
          placeholder="Key"
          value={getKey}
          onChange={(e) => setGetKey(e.target.value)}
        />
        <button onClick={handleGet}>Get</button>
        {getValue !== null && (
          <p>Value: {getValue === -1 ? "Not Found" : getValue}</p>
        )}
      </div>

      <div className="section">
        <h3>Cache Contents (Most Recent → Least Recent)</h3>
        <button onClick={fetchAll}>Refresh</button>
        <ul>
          {cache.map((item) => (
            <li
              key={item.key}
              style={{
                fontWeight: item.key === mruKey ? "bold" : "normal",
                color: item.key === mruKey ? "green" : "black",
              }}
            >
              Key: {item.key}, Value: {item.value} {item.key === mruKey ? "(MRU)" : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
