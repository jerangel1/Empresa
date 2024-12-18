import { subDays, subHours, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, eachHourOfInterval, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, format } from 'date-fns';
import { es } from 'date-fns/locale';

interface FinancialData {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  incomeData: { name: string; ingresos: number; egresos: number }[];
  branchesData: { id: string; name: string; income: number; expenses: number; balance: number }[];
  expensesData: { name: string; value: number; color: string }[];
  salesData: { name: string; value: number; color: string }[];
}

const generateHourlyData = (start: Date, end: Date): FinancialData['incomeData'] => {
  return eachHourOfInterval({ start, end }).map(date => ({
    name: format(date, 'HH:mm', { locale: es }),
    ingresos: Math.floor(Math.random() * 1000) + 500,
    egresos: Math.floor(Math.random() * 800) + 300,
  }));
};

const generateDailyData = (start: Date, end: Date): FinancialData['incomeData'] => {
  return eachDayOfInterval({ start, end }).map(date => ({
    name: format(date, 'dd MMM', { locale: es }),
    ingresos: Math.floor(Math.random() * 10000) + 5000,
    egresos: Math.floor(Math.random() * 8000) + 3000,
  }));
};

const generateWeeklyData = (start: Date, end: Date): FinancialData['incomeData'] => {
  return eachDayOfInterval({ start, end }).map(date => ({
    name: format(date, 'EEE', { locale: es }),
    ingresos: Math.floor(Math.random() * 10000) + 5000,
    egresos: Math.floor(Math.random() * 8000) + 3000,
  }));
};

const generateMonthlyData = (start: Date, end: Date): FinancialData['incomeData'] => {
  return eachMonthOfInterval({ start, end }).map(date => ({
    name: format(date, 'MMM', { locale: es }),
    ingresos: Math.floor(Math.random() * 200000) + 100000,
    egresos: Math.floor(Math.random() * 150000) + 80000,
  }));
};

const generateYearlyData = (years: number): FinancialData => {
  const end = new Date();
  const start = subYears(end, years - 1);
  const yearlyData = eachYearOfInterval({ start, end }).map(date => {
    const ingresos = Math.floor(Math.random() * 2000000) + 1000000;
    const egresos = Math.floor(Math.random() * 1500000) + 800000;
    return {
      name: date.getFullYear().toString(),
      ingresos,
      egresos,
    };
  });

  const totalIncome = yearlyData.reduce((sum, year) => sum + year.ingresos, 0);
  const totalExpenses = yearlyData.reduce((sum, year) => sum + year.egresos, 0);
  const netProfit = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    netProfit,
    incomeData: yearlyData,
    branchesData: generateBranchesData(totalIncome, totalExpenses, netProfit),
    expensesData: generateExpensesData(totalExpenses),
    salesData: generateSalesData(totalIncome),
  };
};

const generateBranchesData = (totalIncome: number, totalExpenses: number, netProfit: number) => {
  const branches = [
    { id: '#01', name: 'Sucursal Norte' },
    { id: '#02', name: 'Sucursal Sur' },
    { id: '#03', name: 'Sucursal Este' },
    { id: '#04', name: 'Sucursal Oeste' },
    { id: '#05', name: 'Sucursal Centro' },
  ];

  let remainingIncome = totalIncome;
  let remainingExpenses = totalExpenses;
  let remainingBalance = netProfit;

  return branches.map((branch, index) => {
    const isLast = index === branches.length - 1;
    const income = isLast ? remainingIncome : Math.floor(Math.random() * (remainingIncome / 2)) + (remainingIncome / 10);
    const expenses = isLast ? remainingExpenses : Math.floor(Math.random() * (remainingExpenses / 2)) + (remainingExpenses / 10);
    const balance = isLast ? remainingBalance : income - expenses;

    remainingIncome -= income;
    remainingExpenses -= expenses;
    remainingBalance -= balance;

    return {
      ...branch,
      income,
      expenses,
      balance,
    };
  });
};

const generateExpensesData = (totalExpenses: number) => {
  const categories = [
    { name: 'Nómina', color: '#FF6B6B' },
    { name: 'Agua', color: '#4ECDC4' },
    { name: 'Carne', color: '#45B7D1' },
    { name: 'Luz', color: '#96CEB4' },
    { name: 'Gasolina', color: '#FFEEAD' },
    { name: 'Internet', color: '#D4A5A5' },
  ];

  return categories.map(category => ({
    ...category,
    value: Math.floor(Math.random() * (totalExpenses / 2)) + (totalExpenses / 10),
  }));
};

const generateSalesData = (totalIncome: number) => {
  const categories = [
    { name: 'Productos A', color: '#FF6B6B' },
    { name: 'Productos B', color: '#4ECDC4' },
    { name: 'Productos C', color: '#45B7D1' },
    { name: 'Productos D', color: '#96CEB4' },
    { name: 'Productos E', color: '#FFEEAD' },
  ];

  return categories.map(category => ({
    ...category,
    value: Math.floor(Math.random() * (totalIncome / 3)) + (totalIncome / 10),
  }));
};

export const getFinancialData = (period: 'day' | 'week' | 'month' | 'year' | 'custom', from?: Date, to?: Date): FinancialData => {
  const end = to || new Date();
  let start: Date;
  let incomeData: FinancialData['incomeData'];

  switch (period) {
    case 'day':
      start = startOfDay(end);
      incomeData = generateHourlyData(start, end);
      break;
    case 'week':
      start = startOfWeek(end, { weekStartsOn: 1 });
      incomeData = generateWeeklyData(start, end);
      break;
    case 'month':
      start = startOfMonth(end);
      incomeData = generateMonthlyData(start, end);
      break;
    case 'year':
      start = startOfYear(end);
      incomeData = generateMonthlyData(start, end);
      break;
    case 'custom':
      start = from || subDays(end, 30);
      incomeData = generateDailyData(start, end);
      break;
    default:
      start = startOfDay(end);
      incomeData = generateHourlyData(start, end);
  }

  const totalIncome = incomeData.reduce((sum, item) => sum + item.ingresos, 0);
  const totalExpenses = incomeData.reduce((sum, item) => sum + item.egresos, 0);
  const netProfit = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    netProfit,
    incomeData,
    branchesData: generateBranchesData(totalIncome, totalExpenses, netProfit),
    expensesData: generateExpensesData(totalExpenses),
    salesData: generateSalesData(totalIncome),
  };
};

