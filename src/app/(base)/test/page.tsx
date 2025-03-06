"use client";

import { useEffect, useState } from "react";

interface Data {
  _id: string;
  name: string;
  value: string;
}

const Test = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/test");
      const result = await response.json();
      setData(result);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data from MongoDB</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.name}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
