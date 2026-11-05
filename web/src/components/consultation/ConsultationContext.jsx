"use client";

import { createContext, useContext, useState, useCallback } from "react";
import ConsultationModal from "./ConsultationModal";

const ConsultationContext = createContext(null);

export function ConsultationProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openConsultation = useCallback(() => setOpen(true), []);
  const closeConsultation = useCallback(() => setOpen(false), []);

  return (
    <ConsultationContext.Provider value={{ open, openConsultation, closeConsultation }}>
      {children}
      <ConsultationModal open={open} onClose={closeConsultation} />
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) {
    throw new Error("useConsultation must be used within a ConsultationProvider");
  }
  return ctx;
}
