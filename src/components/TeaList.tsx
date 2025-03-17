import React, { useEffect, useState } from "react";
import { getTeas } from "../services/api";

interface Tea {
  id: number;
  tea_name: string;
  provider: string;
}

interface TeaListProps {
  userId: number;
}

const TeaList: React.FC<TeaListProps> = ({ userId }) => {
  const [teaList, setTeaList] = useState<Tea[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTeas(userId)
      .then((res) => setTeaList(res.data as Tea[]))
      .catch((err) => {
        console.error('Error fetching teas:', err);
        setError('Failed to load teas');
        setTeaList([]);
      });
  }, [userId]);

  if (error) {
    return <div style={{ color: '#dc3545', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <ul>
      {teaList && teaList.length > 0 ? (
        teaList.map((tea) => (
          <li key={tea.id}>
            {tea.tea_name} - {tea.provider}
          </li>
        ))
      ) : (
        <li>No teas available</li>
      )}
    </ul>
  );
};

export default TeaList;
