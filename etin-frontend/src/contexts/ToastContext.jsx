import { createContext, useContext, useCallback } from "react";
import { Toaster, toast } from "sonner";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const showSuccess = useCallback((message) => {
        toast.success(message, {
            duration: 3000,
            position: "top-right",
        });
    }, []);

    const showError = useCallback((message) => {
        toast.error(message, {
            duration: 4000,
            position: "top-right",
        });
    }, []);

    const showInfo = useCallback((message) => {
        toast.info(message, {
            duration: 3000,
            position: "top-right",
        });
    }, []);

    const showWarning = useCallback((message) => {
        toast.warning(message, {
            duration: 3000,
            position: "top-right",
        });
    }, []);

    const showLoading = useCallback((message) => {
        return toast.loading(message, {
            position: "top-right",
        });
    }, []);

    const dismissToast = useCallback((toastId) => {
        toast.dismiss(toastId);
    }, []);

    return (
        <ToastContext.Provider
            value={{
                showSuccess,
                showError,
                showInfo,
                showWarning,
                showLoading,
                dismissToast,
            }}
        >
            {children}
            <Toaster
                richColors
                closeButton
                toastOptions={{
                    style: {
                        fontSize: "14px",
                    },
                }}
            />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
