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
import { UploadImageAction } from "../../action/imageActions";
import { isEmpty } from "lodash";
import ViewImage from "./viewImage";
import { addproduct } from "../../action/productActions";

export default function AddProduct(props) {
  const dispatch = useDispatch();
  const [itemProduct, setitemProduct] = useState({
    name: "",
    catalog_name: "",
  });

  const [open, setOpen] = React.useState(false);
  //lỗi khi  lấy danh sách product
  const error = useSelector((state) => state.catelogList).error;
  //lỗi khi thêm catelog
  const errorCatelog = useSelector((state) => state.catelogAdd).error;

  //loading danh sách sản phẩm
  const { loading, catelog } = useSelector((state) => state.catelogList);

  const { imageLink, errorImage } = useSelector((state) => state.uploadImages);
  const addProduct = useSelector((state) => state.addProduct);

  useEffect(() => {
    dispatch(listcatelog());
  }, []);

  useEffect(() => {
    setitemProduct((itemProduct) => ({
      ...itemProduct,
      image_link: imageLink,
    }));
  }, [imageLink]);

  useEffect(() => {
    if (!isEmpty(addProduct)) {
      if (!isEmpty(addProduct.response)) {
        alert(addProduct.response);
      } else if (!isEmpty(addProduct.error)) {
        alert(addProduct.error);
      }
    }
  }, [addProduct]);

  const onSave = () => {
    dispatch(addproduct(itemProduct));
  };

  function UploadImage(acceptedFiles) {
    let data = new FormData();
    data.append("image", acceptedFiles[0]);
    dispatch(UploadImageAction(data));
  }

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : errorCatelog ? (
        <MessageBox variant="danger">{errorCatelog}</MessageBox>
      ) : errorImage ? (
        <MessageBox variant="danger">{errorImage}</MessageBox>
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
                                  value={itemProduct.catalog_name}
                                  onChange={(e) => {
                                    setitemProduct((itemProduct) => ({
                                      ...itemProduct,
                                      catalog_id: catelog.find(
                                        (x) => x.name === e.target.value
                                      ).id,
                                      catalog_name: catelog.find(
                                        (x) => x.name === e.target.value
                                      ).name,
                                    }));
                                    console.log(e);
                                  }}
                                >
                                  <MenuItem disabled value="">
                                    <em>Chọn danh mục</em>
                                  </MenuItem>
                                  {catelog.map((item, index) => (
                                    <MenuItem
                                      name={item.name}
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
                          <ViewImage uploadhanld={UploadImage} />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} key={2}>
                        <Box
                          sx={{
                            alignItems: "center",
                            "& > :not(style)": { m: 1 },
                          }}
                        ></Box>
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
