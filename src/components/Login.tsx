import { Box, Button } from "@mui/material";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface LoginProps {
  setIsAuth: (isAuth: boolean) => void;
}

const Login = ({ setIsAuth }: LoginProps) => {
  const navigate = useNavigate();

  // Firebase の認証状態を監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });

    return () => unsubscribe(); // コンポーネントがアンマウントされたら監視を解除
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("ログイン成功:", result.user);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "lightblue",
      }}
    >
      <Box>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={signInWithGoogle}
        >
          Googleでログイン
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
