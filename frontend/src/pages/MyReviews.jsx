import React, { useEffect, useState } from 'react'
import api from '../api/api'
import ReviewForm from '../components/ReviewForm'
import { BiShare, BiEdit, BiTrash ,BiStar} from "react-icons/bi";


export default function MyReviews({ user }) {
  const [reviews, setReviews] = useState([])
  const [editing, setEditing] = useState(null)
  const [users, setUsers] = useState([])
  const [showShare, setShowShare] = useState({})
  const [deleteReview, setDeleteReview] = useState(null);

  

  const load = () => {
    api.get('/reviews/mine').then(r => setReviews(r.data)).catch(() => {})
    api.get('/auth/users').then(r => setUsers(r.data)).catch(() => {})
  }

  useEffect(() => { load() }, [])

  const save = async (id, payload) => {
    try {
      if (id) await api.put(`/reviews/${id}`, payload)
      else await api.post('/reviews', payload)
      setEditing(null)
      load()
    } catch (err) {
      alert('Save failed')
    }
  }

  const del = async (id) => {
    if (!confirm('Delete review?')) return
    await api.delete(`/reviews/${id}`)
    load()
  }

  const share = async (reviewId, sharedWithUserId) => {
    try {
      await api.post(`/reviews/${reviewId}/share`, { sharedWithUserId })
      alert('Shared!')
    } catch (err) {
      alert(err?.response?.data?.msg || 'Share failed')
    }
  }

  return (
    <div className="container">
      <h2>My Reviews</h2>

      {reviews.map(r => (
        <div key={r.id} className="card" style={{ marginBottom: 10 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: "center"
          }}>
            <strong>{r.title}</strong>

            {/* BUTTONS SECTION */}
            <div style={{ display: "flex", gap: "8px" }}>

  {/* SHARE BUTTON */}
  <button
    style={{ background: "#28a745", color: "white", display: "flex", alignItems: "center", gap: "6px" }}
    className="button"
    onClick={() =>
      setShowShare(prev => ({ ...prev, [r.id]: !prev[r.id] }))
    }
  >
    <BiShare size={18} />
    Share
  </button>

  {/* EDIT BUTTON */}
  <button
    style={{ background: "#007bff", color: "white", display: "flex", alignItems: "center", gap: "6px" }}
    className="button"
    onClick={() => setEditing(r)}
  >
    <BiEdit size={18} />
    Edit
  </button>

  {/* DELETE BUTTON */}
  <button
  style={{ background: "#dc3545", color: "white" }}
  className="button"
  onClick={() => setDeleteReview(r)}
>
  Delete
</button>


</div>

          </div>

          <div className="Medium" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
  <span>
    Movie: {r.Movie?.title || r.movieId} —
  </span>

  <BiStar size={16} color="#007bff" />   {/* blue icon */}

  <span style={{ fontWeight: 600 }}>
    {r.rating}/5
  </span>
</div>



          <p>{r.content}</p>

          {/* SHARE DROPDOWN */}
          {showShare[r.id] && (
            <div style={{ marginTop: 8 }}>
              <label className="small">Share with:</label>

              <select
                onChange={(e) => share(r.id, Number(e.target.value))}
                defaultValue=""
              >
                <option value="">-- select user --</option>

                {users
                  .filter(u => u.id !== r.userId)
                  .map(u => (
                    <option key={u.id} value={u.id}>
                      {u.username} ({u.email})
                    </option>
                  ))}
              </select>
            </div>
          )}

        </div>
      ))}

      {/* EDIT FORM */}
      {editing && (
        <div style={{ marginTop: 12 }}>
          <h3>Edit Review</h3>
          <ReviewForm
            initial={editing}
            onSubmit={(p) => save(editing.id, p)}
          />
          <button onClick={() => setEditing(null)} className="button">
            Cancel
          </button>
        </div>
      )}

{deleteReview && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}
  >
    <div
      style={{
        width: "500px",
        background: "white",
        borderRadius: "8px",
        overflow: "hidden",
        animation: "fadeIn 0.3s ease"
      }}
    >
      {/* HEADER */}
      <div style={{ background: "#d32f2f", padding: "12px 20px", color: "white" }}>
        <h2 style={{ margin: 0 }}>Delete Review</h2>
      </div>

      {/* BODY */}
      <div style={{ padding: "20px" }}>
        <h3 style={{ marginTop: 0 }}>
          Review for: <i>{deleteReview.Movie?.title}</i>
          <span
            style={{
              background: "#1E90FF",
              color: "white",
              padding: "3px 8px",
              marginLeft: "8px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "700",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {deleteReview.rating}/5
          </span>
        </h3>

        <p>{deleteReview.content}</p>

        {/* WARNING BOX */}
        <div
          style={{
            background: "#fdecea",
            border: "1px solid #f5c2c7",
            padding: "15px",
            borderRadius: "6px",
            margin: "20px 0"
          }}
        >
          <h4 style={{ color: "#b02a37", margin: 0 }}>
            Are you sure you want to delete this review?
          </h4>
          <p style={{ color: "#b02a37", margin: 0 }}>
            This action cannot be undone. All shares of this review will also be deleted.
          </p>
        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px"
          }}
        >
          <button
            className="button"
            style={{ background: "#6c757d", color: "white" }}
            onClick={() => setDeleteReview(null)}
          >
            Cancel
          </button>

          <button
            className="button"
            style={{ background: "#d32f2f", color: "white" }}
            onClick={async () => {
              await api.delete(`/reviews/${deleteReview.id}`);
              
              setDeleteReview(null);
              load();
            }}
          >
            Confirm Delete
          </button>
        </div>

      </div>
    </div>
  </div>
)}

    </div>
  )
}
