"use client";

export default function PrintButton() {
  return (
    <button
      className="primary-action"
      onClick={() => window.print()}
    >
      Print / Save PDF
    </button>
  );
}