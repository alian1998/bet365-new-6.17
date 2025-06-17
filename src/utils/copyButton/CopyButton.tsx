// export const copyToClipboard = (textToCopy: string | null) => {
//   navigator.clipboard
//     .writeText(textToCopy || "")
//     .then(() => {})
//     .catch((err) => {
//       console.log(err);
//     });
// };


export const copyToClipboard = (textToCopy: string | null) => {

  navigator?.clipboard?.writeText(textToCopy || "")

  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard
      .writeText(textToCopy || "")
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  } else {
    console.warn("Clipboard API not available.");
  }
};

