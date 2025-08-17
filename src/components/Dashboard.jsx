import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // import your existing Sidebar

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  const [topInquiries, setTopInquiries] = useState([]);
  const [topMessages, setTopMessages] = useState([]);
  const [topSales, setTopSales] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentSession = data?.session;

      if (!currentSession) {
        navigate("/login");
        return;
      }

      const user = currentSession.user;
      const hasPassword =
        user.app_metadata?.provider === "email" &&
        user.user_metadata?.password_set;

      if (!hasPassword) {
        navigate("/set-password");
        return;
      }

      setSession(currentSession);
      setLoading(false);
    };

    getSession();
  }, [navigate]);

  // Fetch top 5 inquiries, messages, sales
  useEffect(() => {
    const fetchTopData = async () => {
      // Top 5 inquiries
      const { data: inquiries } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      setTopInquiries(inquiries || []);

      // Top 5 messages
      const { data: messages } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      setTopMessages(messages || []);

      // Top 5 sales
      const { data: sales } = await supabase
        .from("sales")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      setTopSales(sales || []);
    };

    fetchTopData();

    // Realtime subscriptions
    const inquirySub = supabase
      .channel("inquiries")
      .on("postgres_changes", { event: "*", schema: "public", table: "inquiries" }, fetchTopData)
      .subscribe();

    const messagesSub = supabase
      .channel("messages")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, fetchTopData)
      .subscribe();

    const salesSub = supabase
      .channel("sales")
      .on("postgres_changes", { event: "*", schema: "public", table: "sales" }, fetchTopData)
      .subscribe();

    return () => {
      supabase.removeChannel(inquirySub);
      supabase.removeChannel(messagesSub);
      supabase.removeChannel(salesSub);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <h1 id="insights" className="text-2xl font-bold mb-6">Top 5 Dashboard Insights</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Inquiries */}
          <div id="inquiries" className="bg-white shadow rounded-xl p-4">
            <h2 className="font-semibold mb-2">Inquiries</h2>
            <ol className="list-decimal ml-4">
              {topInquiries.length === 0 && <p>No inquiries yet.</p>}
              {topInquiries.map((i) => (
                <li key={i.id}>
                  {i.name} ({i.email}): {i.message.slice(0, 30)}...
                </li>
              ))}
            </ol>
          </div>

          {/* Messages */}
          <div id="messages" className="bg-white shadow rounded-xl p-4">
            <h2 className="font-semibold mb-2">Messages</h2>
            <ol className="list-decimal ml-4">
              {topMessages.length === 0 && <p>No messages yet.</p>}
              {topMessages.map((m) => (
                <li key={m.id}>
                  <strong>{m.sender_email}</strong>: {m.content.slice(0, 30)}...
                </li>
              ))}
            </ol>
          </div>

          {/* Sales */}
          <div id="sales" className="bg-white shadow rounded-xl p-4">
            <h2 className="font-semibold mb-2">Sales</h2>
            <ol className="list-decimal ml-4">
              {topSales.length === 0 && <p>No sales yet.</p>}
              {topSales.map((s) => (
                <li key={s.id}>
                  Work ID: {s.work_id}, {s.price} {s.currency} – {s.buyer_email}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
