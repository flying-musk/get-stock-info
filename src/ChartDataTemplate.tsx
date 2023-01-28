import pattern from 'patternomaly';
const todayStock = [null, null, null, 25];
const actualStock = [53, 44, 35];
const projectedStock = [
  null,
  null,
  null,
  null,
  19,
  17,
  6,
  53,
  33,
  25,
  16,
  13,
  6,
  4,
];
const demand = [21, 16, 12];
const projectedDemand = [
  null,
  null,
  null,
  10,
  12,
  9,
  4,
  19,
  13,
  19,
  13,
  7,
  5,
  2,
];
const labels = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
];

export const chartDataTemplate = {
  labels,
  datasets: [
    {
      order: 3,
      type: 'bar' as const,
      label: 'Actual Stocks',
      data: actualStock,
      backgroundColor: '#d9d9d9',
    },
    {
      order: 2,
      type: 'bar' as const,
      label: 'Projected Stocks',
      data: projectedStock,
      backgroundColor: pattern.draw('line', '#f0f0f0'),
    },
    {
      order: 2,
      type: 'bar' as const,
      label: 'Today Stocks',
      data: todayStock,
      backgroundColor: pattern.draw('line', '#9f9f9f'),
    },
    {
      type: 'line' as const,
      label: 'Demand',
      data: demand,
      backgroundColor: '#000000',
      borderColor: '#000000',
      borderWidth: 1,
      fill: false,
    },
    {
      type: 'line' as const,
      label: 'Projected Demand',
      data: projectedDemand,
      borderColor: '#222222',
      borderDash: [3, 2],
      borderWidth: 1,
      fill: false,
    },
  ],
};
