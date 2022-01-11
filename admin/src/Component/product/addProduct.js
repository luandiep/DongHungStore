import React, { useState } from "react";
import "../../css/product/productAdd.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import CardMedia from "@mui/material/CardMedia";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { listcatelog } from "../../action/catalogActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import Addcatelog from "../Catelog/addCatelog";
import { useDropzone } from "react-dropzone";
import { UploadImageAction } from "../../action/imageActions";
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

export default function AddProduct(props) {
  const dispatch = useDispatch();
  const [itemProduct, setitemProduct] = useState({ name: "", catalog_id: "" });
  const [fileImage, setfileImage] = useState({});
  const [open, setOpen] = React.useState(false);
  //lỗi của lấy product
  const error = useSelector((state) => state.catelogList).error;
  //lỗi của thêm product
  const errors = useSelector((state) => state.catelogAdd).error;
  const imagelink = useSelector((state) => state.uploadImages).image;
  //loading trang và danh sách sản phẩm
  const { loading, catelog } = useSelector((state) => state.catelogList);

  useEffect(() => {
    dispatch(listcatelog());
  }, []);
  const onSave = () => {
    console.log(itemProduct);
  };

  const UploadImage = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("image", fileImage[0]);
    dispatch(UploadImageAction(data));
    setitemProduct((itemProduct) => ({
      ...itemProduct,
      image_link: imagelink,
    }));
  };

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
      console.log("accepted", acceptedFiles);
      setfileImage(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      // $("#imgSubmit").on("submit", function() {
      //   alert();
      // });
    },
  });
  $("#imgSubmit").on("submit", function() {});
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
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : errors ? (
        <MessageBox variant="danger">{errors}</MessageBox>
      ) : (
        <div>
          <h2>Thêm sản phẩm</h2>
          <div>
            <div className="row box-right">
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={12} sm={12} md={9} key={1}>
                    <Paper sx={{ p: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid item xs={12} sm={12} md={6} key={1}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                "& > :not(style)": { m: 1 },
                              }}
                            >
                              <TextField
                                size="small"
                                helperText="Vui lòng nhập tên sản phẩm"
                                fullWidth
                                label="Nhập tên sản phẩm"
                                id="fullWidth"
                                name="name"
                                onChange={(e) => {
                                  setitemProduct((itemProduct) => ({
                                    ...itemProduct,
                                    name: e.target.value,
                                  }));
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} key={2}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                "& > :not(style)": { m: 1 },
                              }}
                            >
                              <FormControl fullWidth sx={{ m: 1, mt: 3 }}>
                                <Select
                                  size="small"
                                  displayEmpty
                                  open={open}
                                  onClose={() => setOpen(false)}
                                  onOpen={() => setOpen(true)}
                                  value={itemProduct.catalog_id}
                                  onChange={(e) => {
                                    setitemProduct((itemProduct) => ({
                                      ...itemProduct,
                                      catalog_id: catelog.find(
                                        (x) => x.name === e.target.value
                                      ).id,
                                    }));
                                    console.log(e);
                                  }}
                                >
                                  <MenuItem disabled value="">
                                    <em>Chọn danh mục</em>
                                  </MenuItem>
                                  {catelog.map((item, index) => (
                                    <MenuItem
                                      name={item.id}
                                      key={item.id}
                                      value={item.name}
                                    >
                                      {item.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <Addcatelog />
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={12} md={12} key={3}>
                            <Box
                              sx={{
                                alignItems: "center",
                                "& > :not(style)": { m: 1 },
                              }}
                            >
                              <CKEditor
                                editor={ClassicEditor}
                                onReady={(editor) => {
                                  // You can store the "editor" and use when it is needed.
                                  console.log(
                                    "Editor is ready to use!",
                                    editor
                                  );
                                }}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  console.log({ event, editor, data });
                                  setitemProduct((itemProduct) => ({
                                    ...itemProduct,
                                    content: data,
                                  }));
                                }}
                                onBlur={(event, editor) => {
                                  console.log("Blur.", editor);
                                }}
                                onFocus={(event, editor) => {
                                  console.log("Focus.", editor);
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} key={4}>
                            <Box
                              sx={{
                                alignItems: "center",
                                "& > :not(style)": { m: 1 },
                              }}
                            >
                              <Button
                                onClick={() => onSave()}
                                variant="contained"
                              >
                                Lưu
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} key={2}>
                    <Paper sx={{ p: 2 }}>
                      <Grid item xs={12} sm={12} md={12} key={1}>
                        <Box>
                          <form
                            id="imgSubmit"
                            name="myform"
                            className="create-post-form"
                            enctype="multipart/form-data"
                          >
                            <section className="container">
                              <aside style={thumbsContainer}>{thumbs}</aside>
                              <div
                                {...getRootProps({
                                  className: "dropzone",
                                  style,
                                })}
                              >
                                <input
                                  type="file"
                                  name="image"
                                  {...getInputProps()}
                                />

                                {isDragActive ? (
                                  <p>Drop the files here ...</p>
                                ) : (
                                  <p>
                                    Drag 'n' drop some files here, or click to
                                    select files
                                  </p>
                                )}
                              </div>
                            </section>
                          </form>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} key={2}>
                        <Box
                          sx={{
                            alignItems: "center",
                            "& > :not(style)": { m: 1 },
                          }}
                        >
                          {/* <form
                            onSubmit={(e) => UploadImage(e)}
                            className="create-post-form"
                            enctype="multipart/form-data"
                          >
                            <input
                              onChange={(e) => setfileImage(e.target.files[0])}
                              type="file"
                              name="image"
                            />
                            <input type="submit" />
                          </form> */}
                        </Box>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
