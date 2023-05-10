"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";

export function InterceptionModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Modal
      isOpen={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={onDismiss}
      style={{
        content: {
          height: "fit-content",
          padding: "0",
          margin: "auto auto",
        },
      }}
    >
      {children}
    </Modal>
  );
}
