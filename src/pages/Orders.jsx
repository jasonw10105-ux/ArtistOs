import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase.from("orders").select("*").eq("user_id", user.id);
      if (error) console.error(error);
      else setOrders(data || []);
      setLoading(false);
    }
    fetchOrders();
  }, [navigate]);

  async function markFulfilled(id, current) {
    const { error } = await supabase.from("orders").update({ fulfilled: !current }).eq("id", id);
    if (error) alert(error.message);
    else setOrders(orders.map(o => o.id === id ? {...o, fulfilled: !current} : o));
  }

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="orders-page">
      <h1>Orders & Inquiries</h1>
      <ul>
        {orders.map(o => (
          <li key={o.id}>
            <strong>{o.artwork_title}</strong> | Current: {o.current_price} {o.currency} | Previous: {o.previous_price || "-"} | 
            {o.discount ? ` Discount: ${o.discount}%` : ""} | {o.fulfilled ? "Fulfilled" : "Pending"} 
            <button onClick={() => markFulfilled(o.id, o.fulfilled)}>Toggle Fulfilled</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
