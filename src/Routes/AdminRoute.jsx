import { useState, useEffect } from "react";
import { useAuth } from "../context/auth.jsx";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner.jsx";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "https://vision-backend-lx5i.onrender.com/api/v1/auth/admin-auth",
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
