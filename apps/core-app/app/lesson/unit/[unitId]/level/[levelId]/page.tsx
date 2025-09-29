"use client"

import { useParams } from 'next/navigation';

export default function LevelPage() {
  const { unitId, levelId } = useParams();

  return (
    <div>
      <h1>Unit: {unitId}</h1>
      <h2>Level: {levelId}</h2>
    </div>
  );
}
