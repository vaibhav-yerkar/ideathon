import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const userData = {
  accountName: "John Doe",
  accountNumber: "123456789012",
  type: "Savings",
  balance: 25000,
  transactions: [
    { id: 1, type: "Deposit", amount: 1200, date: "2023-09-01" },
    { id: 2, type: "Withdrawal", amount: -350, date: "2023-09-05" },
    { id: 3, type: "Payment", amount: -600, date: "2023-09-10" },
    { id: 4, type: "Salary Credit", amount: 5000, date: "2023-09-15" },
    { id: 5, type: "Bill Payment", amount: -120, date: "2023-09-20" },
  ],
};

const balanceData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Balance",
      data: [8000, 12000, 9500, 15000, 20000, 25000],
      borderColor: "rgba(75,192,192,1)",
      backgroundColor: "rgba(75,192,192,0.2)",
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      display: false,
    },
  },
};

export default function Dashboard() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Account Overview */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white shadow-lg transition-all hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium">{userData.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number</span>
                  <span className="font-medium">{userData.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium">{userData.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Balance</span>
                  <span className="text-lg font-bold text-green-600">
                    ${userData.balance.toLocaleString()}
                  </span>
                </div>
                <div className="pt-20">
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Chart */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Balance History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full">
                  <Line data={balanceData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userData.transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell
                        className={
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {transaction.amount > 0 ? "+" : "-"}$
                        {Math.abs(transaction.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={transaction.amount > 0 ? "success" : "error"}
                          className={`${
                            transaction.amount > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.amount > 0 ? "Credit" : "Debit"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
