"use client";

import { useEffect, useState } from "react";
import { Dashboard } from "./_components/dashboard";
import { getDashboardData } from "@/actions/admin";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const result = await getDashboardData(); // ✅ server action
      setData(result);
      setLoading(false);
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Dashboard initialData={data} />
    </div>
  );
}
