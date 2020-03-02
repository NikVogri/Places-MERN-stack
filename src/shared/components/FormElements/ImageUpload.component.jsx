import React, { useRef, useState, useEffect } from "react";

import Button from "./Button.component";
import "./ImageUpload.css";

const ImageUpload = ({ id, center, onInput, errorText }) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  const filePickerRef = useRef();

  const pickImageHandler = () => {
    // on click
    filePickerRef.current.click();
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    // read file with browser API
    const fileReader = new FileReader();
    // this executes after readasdataurl is finished
    fileReader.onload = () => {
      // set state to url
      setPreviewUrl(fileReader.result);
    };
    // this isnt a promise, so it execues ^ function after completing
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = e => {
    e.preventDefault();
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  return (
    <div className="form-control">
      <input
        type="file"
        id={id}
        style={{ display: "none" }}
        accept=".jpg, .png, .jpeg"
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick image
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default ImageUpload;
