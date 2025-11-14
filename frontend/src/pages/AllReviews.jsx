import React, { useEffect, useState } from "react";
import api from "../api/api";
import { BiStar } from "react-icons/bi";

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/reviews/all")
      .then((res) => setReviews(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="container">
      <h2>All Reviews</h2>

      {reviews.map((r) => (
        <div
          key={r.id}
          className="card"
          style={{
            marginBottom: "20px",
            padding: "20px",
            borderRadius: "8px"
          }}
        >
          {/* Top Row: Title + Rating */}
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <h3 style={{ margin: 0 }}>{r.title}</h3>

            {/* Rating Badge */}
            <div
              style={{
                background: "#1E90FF",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "14px",
                display:"flex",
                alignItems:"center",
                gap:"4px"
              }}
            >
              <BiStar size={16} color="white" />
              {r.rating}/5
            </div>
          </div>

          {/* Reviewer */}
          <p className="small" style={{ margin: "8px 0" }}>
            Reviewed by: <strong>{r.User?.username}</strong>
          </p>

          {/* Review Content */}
          <p style={{ marginBottom: "10px" }}>
            {r.content}
          </p>

          {/* Last Updated */}
          <p className="small" style={{ color: "#777" }}>
            Last updated: {r.updatedAt.slice(0, 10)}
          </p>
        </div>
      ))}
    </div>
  );
}
