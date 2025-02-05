import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import Person from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

const AddFriend: React.FC = () => {
  const navigate = useNavigate();

  // 各フィールドの値を管理するState
  const [formData, setFormData] = useState<{ [key: string]: string | null }>({
    name: "",
    place: "",
    favorites: "",
    unlike: "",
  });

  // 入力値が変更されたときの処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addFriend = async () => {
    const user = auth.currentUser;
    console.log("ログインユーザー:", user);
    if (!user) {
      console.error("ユーザーがログインしていません");
      alert("ログインしてから追加してください");
      return;
    }

    try {
      await addDoc(collection(db, "friends"), {
        name: formData.name,
        place: formData.place,
        favorites: formData.favorites,
        unlike: formData.unlike,
        author: {
          id: user.uid,
          username: user.displayName || "名無し",
        },
      });
      console.log("フレンドを追加しました");
      alert("フレンドを登録しました");
      navigate("/");
    } catch (error) {
      console.error("Firestore 書き込みエラー:", error);
      alert("エラーが発生しました");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addFriend(); // Firestore 書き込みが終わるまで待つ
  };

  return (
    <Container maxWidth="sm" sx={{ p: 3 }}>
      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64 }}>
          <Person fontSize="large" />
        </Avatar>
      </Box>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        フレンドのプロフィール
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="名前"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="出会った場所"
          name="place"
          value={formData.place}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="好きなもの"
          name="favorites"
          value={formData.favorites}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="苦手なもの"
          name="unlike"
          value={formData.unlike}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            フレンドを登録する
          </Button>
        </Box>
      </form>
    </Container>
  );
};
export default AddFriend;
