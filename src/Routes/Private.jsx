import { useState, useEffect } from "react";
import { useAuth } from "../context/auth.jsx";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner.jsx";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          "https://vision-backend-328443733915.asia-south2.run.app/api/v1/auth/user-auth",
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
      } catch (error) {
        console.error("Error fetching user authentication:", error);
        // Handle error state or retry mechanism if necessary
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
