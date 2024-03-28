import React, { useState, useEffect, useContext, useRef } from "react";
import Alert from "../Elements/Alert";
import Button from "../Elements/Button";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export default function UpdateAvatar() {
  const { user, fetchData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [initialAvatar, setInitialAvatar] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setInitialAvatar(user?.avatar || "");
    setAvatar(user?.avatar || "");
    if (updated) {
      fetchData();
      setUpdated(false);
    }
  }, [user, updated, fetchData]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreviewURL(URL.createObjectURL(file)); // Set preview URL
  };

  async function updateAvatar(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", avatar);

      const response = await axios.post(
        "http://localhost:3232/api/uploadAvatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setError("");
        setSuccess(true);
        setInitialAvatar(previewURL);
      } else {
        setSuccess(false);
        setError("Something went wrong");
      }
      setUpdated(true);
    } catch (err) {
      console.error("Error updating avatar:", err);
      setSuccess(false);
      setError("Something went wrong");
    }
    setIsLoading(false);
  }

  return (
    <div className="settings-form-container">
      <div className="title-text">
        <h1 className="text-size-6 text-weight-semibold text-style-neutral">
          Update avatar
        </h1>
        <p className="text-size-3 text-weight-regular text-style-grey">
          Update your profile image.
        </p>
      </div>
      {error && <Alert className="alert error">{error}</Alert>}
      {success && <Alert className="alert success">Avatar updated!</Alert>}

      <form onSubmit={updateAvatar}>
        <div className="avatar-upload">
          <div className="avatarPreview">
            {previewURL ? (
              <img src={previewURL} alt="user avatar" />
            ) : (
              <img src={initialAvatar} alt="user avatar" />
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            className="variant-soft-neutral size-3"
            type="button"
            onClick={handleClick}
          >
            Choose File
          </Button>
        </div>

        <Button
          type="submit"
          className="variant-solid-neutral size-3"
          isLoading={isLoading}
        >
          Update avatar
        </Button>
      </form>
    </div>
  );
}
