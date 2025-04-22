import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({ data }) {
  
  
  if (!data || data.length === 0) {
    return <p>No expense data to show</p>;
  }

  const groupedData = data.reduce((acc, item) => {
    const existing = acc.find(i => i.label === item.itemname);
    if (existing) {
      existing.value += (item.qty * item.kgprice);
    } else {
      acc.push({
        label: item.itemname,
        value: (item.qty * item.kgprice), 
      });
    }
    return acc;
  }, []);

  // Add id to each item for PieChart
  const finalData = groupedData.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <PieChart
      series={[{ data: finalData }]}
      width={200}
      height={200}
    />
  );
}
