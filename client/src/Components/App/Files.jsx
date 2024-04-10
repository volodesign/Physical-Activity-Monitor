import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../Elements/Button";
import FileItem from "../Elements/FileItem";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Alert from "../Elements/Alert";

export default function Files() {
  const { user } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  const deleteFile = async (fileId) => {
    setError("");
    setSuccess("");
    try {
      await axios.post(
        `http://localhost:3232/api/files/deletefile/${fileId}`,
        {}
      );
      setError("");
      setSuccess("File deleted!");
      setUploaded(true);
    } catch (error) {
      setSuccess("");
      setError("Something went wrong");
      console.error("Error deleting file:", error);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    const file = e.target.files[0];

    if (!file) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:3232/api/files/uploadfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("File uploaded successfully", response.data);
        setUploaded(true);
        setIsLoading(false);
        setError("");
        setSuccess("File uploaded!");
        fileInputRef.current.value = "";
      })
      .catch((error) => {
        console.error("Error uploading file", error);
        setSuccess("");
        setError("Something went wrong");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3232/api/files/filesdata/${user._id}`
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setUploaded(false);
      }
    };
    fetchFiles();
  }, [user, uploaded]);

  return (
    <>
      <div className="app-container">
        <div className="files-title-container">
          <h1 className="text-size-6 text-weight-semibold text-style-neutral">
            My files
          </h1>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            className="variant-solid-neutral size-3"
            type="button"
            isLoading={isLoading}
            onClick={handleClick}
          >
            Upload
          </Button>
        </div>
        <div className="files-list-container">
          {error && <Alert className="alert error">{error}</Alert>}
          {success && <Alert className="alert success">{success}</Alert>}
          {files.length === 0 ? (
            <p className="text-size-4 text-weight-regular text-style-grey">
              You don't have any files yet.
            </p>
          ) : (
            files
              .slice()
              .reverse()
              .map((file, index) => (
                <FileItem
                  key={index}
                  file={file}
                  onDelete={() => deleteFile(file._id)}
                />
              ))
          )}
        </div>
      </div>
    </>
  );
}
