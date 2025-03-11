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

  useEffect(() => {
    getTeas(userId).then((res) => setTeaList(res.data as Tea[]));
  }, [userId]);
  return (
    <ul>
      {teaList.map((tea) => (
        <li key={tea.id}>
          {tea.tea_name} - {tea.provider}
        </li>
      ))}
    </ul>
  );
};

export default TeaList;
