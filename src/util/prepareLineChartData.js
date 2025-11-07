// utils/prepareIncomeLineChartData.js
import moment from 'moment';

export const prepareLineChartData = (transactions) => {
  if (!transactions || transactions.length === 0) return [];

  const currentMonth = moment().format('YYYY-MM');

  const thisMonth = transactions
    .filter(t => moment(t.date).format('YYYY-MM') === currentMonth)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (thisMonth.length === 0) return [];

  const grouped = thisMonth.reduce((acc, t) => {
    const dateKey = moment(t.date).format('YYYY-MM-DD');
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: t.date,
        total: 0,
        items: [],
      };
    }
    acc[dateKey].total += Number(t.amount);
    acc[dateKey].items.push({
      name: t.name,
      amount: Number(t.amount),
      
    });
    return acc;
  }, {});

  return Object.values(grouped).map(item => ({
    date: moment(item.date).format('D MMM'),
    value: item.total,
    dailyTotal: item.total,
    items: item.items,
  }));
};