import React, { useState } from "react";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const onSubmit = (data) => {
    setLoading(true);
    setStatus("");

    setTimeout(() => {
      if (data.email === "admin@gmail.com" && data.password === "1234") {
        setStatus("success");
      } else {
        setStatus("error");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>Login</h2>

      {status === "success" && <Alert severity="success">Login Successful</Alert>}
      {status === "error" && <Alert severity="error">Invalid Credentials</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" variant="contained" fullWidth>
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </form>
    </div>
  );
}

export default Login;
