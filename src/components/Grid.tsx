import React from 'react';
export interface ResultItem {
  id: string;
  username: string;
  slug: string;
  trending_datetime: string;
  type: string;
}
export default function Grid({ data }: { data: ResultItem[] }) {
  data = data.slice(0, 4);
  if (!data.length) return null;
  return <table className='grid'><tbody>{data.map(item => <tr key={item.id} className="grid-item">
    <td>{item.username}</td>
    <td>{item.slug}</td>
    <td>{item.trending_datetime}</td>
    <td>{item.type}</td>
  </tr>)}</tbody></table>
}