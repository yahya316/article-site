"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/analytics");
        if (!res.ok) {
          throw new Error("Failed to fetch analytics data");
        }
        const json = await res.json();
        // Assuming the API returns an array with a single document
        const analyticsData = Array.isArray(json) && json.length > 0 ? json[0] : null;
        setData(analyticsData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Daily Visitors</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.trafficData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="visitors" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Most Popular Posts</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.popularPosts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="posts" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.trafficSources}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {data.trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold">{data.engagement.sessionTime}</h3>
          <p className="text-gray-500">Avg. Session Time</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold">{data.engagement.bounceRate}</h3>
          <p className="text-gray-500">Bounce Rate</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold">{data.engagement.users}</h3>
          <p className="text-gray-500">Returning vs New Users</p>
        </div>
      </div>
    </div>
  );
}