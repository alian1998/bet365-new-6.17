import { toast } from "react-toastify";

export const ToastAlert = (message: string) => {
  toast(message, {
    progressClassName: "custom-toast-class",
    bodyClassName: "custom-body-class",
    hideProgressBar: true,
    closeButton: false,
    className: "custom-toast-class",
    position: "top-center",
  });
};
export const ErrorToastAlert = (message: string) => {
  toast(message, {
    progressClassName: "custom-toast-class-error",
    bodyClassName: "custom-body-class",
    hideProgressBar: true,
    closeButton: false,
    className: "custom-toast-class-error",
    position: "top-center",
  });
};
