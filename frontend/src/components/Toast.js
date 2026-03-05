import React from "react";

const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div style={{
      position: "fixed", top: 20, right: 20, zIndex: 100,
      background: toast.type === "success" ? "#1a2a1a" : toast.type === "error" ? "#2a1a1a" : "#1a1a1a",
      border: `1px solid ${toast.type === "success" ? "#3a6a3a" : toast.type === "error" ? "#6a3a3a" : "#333"}`,
      color: toast.type === "success" ? "#7ae07a" : toast.type === "error" ? "#e07a7a" : "#aaa",
      padding: "12px 18px",
      borderRadius: 8,
      fontSize: 13,
      maxWidth: 280,
      boxShadow: "0 8px 32px #00000088",
    }}>
      {toast.msg}
    </div>
  );
};

export default Toast;