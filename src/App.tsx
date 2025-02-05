import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { SidebarItems } from "./entity/Sidebar";
import AddFriend from "./components/AddFriend";
import MainAppBar from "./components/MainAppBar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import FriendDetail from "./components/FriendDetail";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user); // ユーザーが認証されていれば true, されていなければ false
    });

    return () => unsubscribe(); // コンポーネントがアンマウントされたときにリスナーを解除
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {isAuth ? (
          <>
            <MainAppBar
              open={open}
              title={"フレンドリスト"}
              onDrawerOpen={handleDrawerOpen}
            />
            <Sidebar
              open={open}
              listItem={SidebarItems}
              onClose={handleDrawerClose}
            />
            <Box
              pt={8}
              sx={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "lightblue",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addfriend" element={<AddFriend />} />
                <Route
                  path="/login"
                  element={<Login setIsAuth={setIsAuth} />}
                />
                <Route
                  path="/logout"
                  element={<Logout setIsAuth={setIsAuth} />}
                />
                <Route path="/friend/:id" element={<FriendDetail />} />
              </Routes>
            </Box>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            </Routes>
          </>
        )}
      </Box>
    </Router>
  );
}

export default App;
