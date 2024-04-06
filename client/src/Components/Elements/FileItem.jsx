import React from "react";
import Button from "./Button";
import "../../css/fileItem.css";

export default function FileItem({ file, onDelete }) {
  const convertBytesToMB = (bytes) => {
    if (bytes < 100 * 1024) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }
  };

  const dateObj = new Date(file.uploadedDate);
  const uploadDated = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const downloadFile = async () => {
    try {
      const response = await fetch(file.filePath);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");

      downloadLink.href = blobUrl;
      downloadLink.download = file.fileName;
      downloadLink.click();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="file-item-container">
      <div className="file-content">
        <div className="file-preview-container">
          {file.fileType.includes("image") &&
          !file.fileType.includes("image/svg+xml") ? (
            <img src={file.filePath} alt="Uploaded file" />
          ) : (
            <i className="fa-solid fa-file fa-lg"></i>
          )}
        </div>
        <div className="file-info-container">
          <div className="file-info">
            <p className="text-size-4 text-weight-semibold text-style-neutral">
              {file.fileName}{" "}
            </p>
            <p className="text-size-3 text-weight-regular text-style-grey">
              {convertBytesToMB(file.fileSize)} - {uploadDated}{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="actions">
        <Button
          className="variant-ghost-danger size-3"
          type="button"
          onClick={() => onDelete(file._id)}
        >
          Delete
        </Button>
        <Button
          className="variant-soft-neutral size-3"
          type="button"
          onClick={downloadFile}
        >
          Download
        </Button>
      </div>
    </div>
  );
}
