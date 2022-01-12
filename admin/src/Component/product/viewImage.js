import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import $ from "jquery";
const thumbsContainer = {
  display: "block",
  marginTop: 16,
};

const thumb = {
  display: "block",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  width: "100%",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "block",
  height: 200,
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
};

const baseStyle = {
  display: "block",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function ViewImage(props) {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    // accept: "image/*",
    onDrop: (acceptedFiles) => {
      $("#imgSubmit").submit((e) => e.preventDefault());
      props.uploadhanld(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img alt="selected" src={file.preview} style={img} />
      </div>
    </div>
  ));
  return (
    <form
      id="imgSubmit"
      name="myform"
      className="create-post-form"
      encType="multipart/form-data"
    >
      <section className="container">
        <aside style={thumbsContainer}>{thumbs}</aside>
        <div
          {...getRootProps({
            className: "dropzone",
            style,
          })}
        >
          <input type="file" name="image" {...getInputProps()} />

          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Chọn ảnh sản phẩm ...</p>
          )}
        </div>
      </section>
    </form>
  );
}
