"use client";
import "./test.css";

export default function TestPage() {
  const handleSubscribe = async () => {
    const res = await fetch("/api/proxy?path=/api/subscriptions/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // 标准做法，格式是 Bearer + 空格 + token
      },
      body: JSON.stringify({ userId: 1, sourceId: 13 }),
    });

    const result = await res.json();
    console.log("🚀 ~ handleSubscribe ~ result:", result);
  };
  const handleSubscribe2 = async () => {
    const res = await fetch("/api/proxy?path=/api/subscriptions/unsubscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // 标准做法，格式是 Bearer + 空格 + token
      },
      body: JSON.stringify({ userId: 1, sourceId: 13 }),
    });

    const result = await res.json();
    console.log("🚀 ~ handleSubscribe ~ result:", result);
  };
  const handleSubscribe3 = async () => {
    const res = await fetch("/api/proxy?path=/api/subscriptions/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // 标准做法，格式是 Bearer + 空格 + token
      },
      body: JSON.stringify({ userId: 1, sourceId: 13 }),
    });

    const result = await res.json();
    console.log("🚀 ~ handleSubscribe ~ result:", result);
  };
  return (
    <div className="test">
      <div>
        <button onClick={handleSubscribe}>Subscribe</button>
        <button onClick={handleSubscribe2}>UnSubscribe</button>
        <button onClick={handleSubscribe3}>List</button>
      </div>

      <div className="torn-paper">
        <div className="content">
          <h2>纸质清单</h2>
          <ul>
            <li>牛奶</li>
            <li>面包</li>
            <li>鸡蛋</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
