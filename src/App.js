import { useState, useEffect } from "react";

export default function App() {
  const [from, sFrom] = useState("");
  const [to, sTo] = useState("");
  const [amount, sAmount] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState(null); // Corrected here
  const [loading, setLoading] = useState(false); // Corrected here

  function handleFrom(e) {
    sFrom(e.target.value);
  }

  function handleTo(e) {
    sTo(e.target.value);
  }

  function handleAmount(e) {
    sAmount(e.target.value);
  }

  useEffect(() => {
    if (amount && from && to) {
      // Ensure all values are set before making the fetch call
      setLoading(true); // Set loading to true before starting the fetch

      // URL of the API endpoint you want to fetch data from
      const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;

      const fetchData = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const finalData = await response.json();
          setData(finalData.rates);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false); // Set loading to false after fetch is complete
        }
      };

      fetchData();
    }
  }, [amount, from, to]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={handleAmount}
        placeholder="Amount"
      />
      <select value={from} onChange={handleFrom}>
        <option value="">Select currency</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={handleTo}>
        <option value="">Select currency</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {loading ? <p>Loading...</p> : <p>{JSON.stringify(data)}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
