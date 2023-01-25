import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import { useState } from "react";
import userApi from "../api/modules/user.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const PasswordUpdate = () => {
  const [onRequest, setOnRequest] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const form = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
      newPassword: Yup.string()
        .min(8, "newPassword minimum 8 characters")
        .matches(passwordRules, {
          message: "Please create a stronger password",
        })
        .required("newPassword is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "confirmNewPassword not match")
        .min(8, "confirmNewPassword minimum 8 characters")
        .required("confirmNewPassword is required"),
    }),
    onSubmit: async (values) => onUpdate(values),
  });

  const onUpdate = async (values) => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, err } = await userApi.passwordUpdate(values);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      form.resetForm();
      navigate("/");
      dispatch(setUser(null));
      dispatch(setAuthModalOpen(true));
      toast.success("Update password success! Please re-login");
    }
  };

  //TOGGLE PASSWOD VIEW
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  //TOGGLE PASSWOD VIEW
  const [typeCom, setTypeCom] = useState("password");
  const [iconCom, setIconCom] = useState(eyeOff);

  const handleComToggle = () => {
    if (typeCom === "password") {
      setIconCom(eye);
      setTypeCom("text");
    } else {
      setIconCom(eyeOff);
      setTypeCom("password");
    }
  };

  //TOGGLE NEW PASSWOD VIEW
  const [newCom, setNewCom] = useState("password");
  const [newIconCom, setNewIconCom] = useState(eyeOff);

  const handleNewComToggle = () => {
    if (newCom === "password") {
      setNewIconCom(eye);
      setNewCom("text");
    } else {
      setNewIconCom(eyeOff);
      setNewCom("password");
    }
  };
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="update password">
        <Box component="form" maxWidth="400px" onSubmit={form.handleSubmit}>
          <Stack spacing={2}>
            <span>
              <TextField
                type={type}
                placeholder="password"
                name="password"
                fullWidth
                value={form.values.password}
                onChange={form.handleChange}
                color="success"
                style={{ marginBottom: "-25px" }}
                error={
                  form.touched.password && form.errors.password !== undefined
                }
                helperText={form.touched.password && form.errors.password}
              />
              <span onClick={handleToggle}>
                <Icon
                  icon={icon}
                  size={25}
                  className={
                    form.touched.password && form.errors.password !== undefined
                      ? "eye_icon"
                      : "eye-icons"
                  }
                />
              </span>
            </span>
            <span>
              <TextField
                type={newCom}
                placeholder="new password"
                name="newPassword"
                fullWidth
                value={form.values.newPassword}
                onChange={form.handleChange}
                color="success"
                style={{ marginBottom: "-25px" }}
                error={
                  form.touched.newPassword &&
                  form.errors.newPassword !== undefined
                }
                helperText={form.touched.newPassword && form.errors.newPassword}
              />
              <span onClick={handleNewComToggle}>
                <Icon
                  icon={newIconCom}
                  size={25}
                  className={
                    form.touched.newPassword &&
                    form.errors.newPassword !== undefined
                      ? "eye_icon"
                      : "eye-icons"
                  }
                />
              </span>
            </span>
            <span>
              <TextField
                type={typeCom}
                placeholder="confirm new password"
                name="confirmNewPassword"
                fullWidth
                value={form.values.confirmNewPassword}
                onChange={form.handleChange}
                color="success"
                style={{ marginBottom: "-25px" }}
                error={
                  form.touched.confirmNewPassword &&
                  form.errors.confirmNewPassword !== undefined
                }
                helperText={
                  form.touched.confirmNewPassword &&
                  form.errors.confirmNewPassword
                }
              />
              <span onClick={handleComToggle}>
                <Icon
                  icon={iconCom}
                  size={25}
                  className={
                    form.touched.confirmNewPassword &&
                    form.errors.confirmNewPassword !== undefined
                      ? "eye_icon"
                      : "eye-icons"
                  }
                />
              </span>
            </span>

            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 4 }}
              loading={onRequest}
            >
              update password
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default PasswordUpdate;
