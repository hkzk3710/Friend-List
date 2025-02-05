import { Box, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

interface LogoutProps {
  setIsAuth: (isAuth: boolean) => void;
}

const Logout = ({ setIsAuth }: LogoutProps) => {
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "lightblue",
      }}
    >
      <Box>
        <Button fullWidth size="large" variant="contained" onClick={logout}>
          ログアウト
        </Button>
      </Box>
    </Box>
  );
};

export default Logout;
