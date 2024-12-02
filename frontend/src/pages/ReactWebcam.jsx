import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capturePhoto = () => {
    const photo = webcamRef.current.getScreenshot();
    setImage(photo); // Save the captured photo as Base64
  };

  const uploadPhoto = async () => {
    if (!image) return;

    // Replace with your API endpoint
    const response = await fetch("https://your-upload-api.com/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });

    if (response.ok) {
      alert("Photo uploaded successfully!");
    } else {
      alert("Failed to upload photo.");
    }
  };

  return (
    <div>
      {!image ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={400}
        />
      ) : (
        <img src={image} alt="Captured" width={400} />
      )}
      <div>
        {!image ? (
          <button onClick={capturePhoto} className="px-4 py-2 bg-black text-white">Capture Photo</button>
        ) : (
          <>
            <button onClick={uploadPhoto}>Upload Photo</button>
            <button onClick={() => setImage(null)}>Retake</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
