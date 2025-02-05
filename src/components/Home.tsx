import {
  Avatar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Friend } from "../entity/Friend";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getFriends = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.log("ユーザーがログインしていません");
        return;
      }

      const q = query(
        collection(db, "friends"),
        where("author.id", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Friend),
        id: doc.id,
      }));

      data.sort((a, b) => a.name.localeCompare(b.name));
      setFriendList(data);
    };

    getFriends();
  }, [auth.currentUser]); // ユーザーが変わったときに再取得

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "friends", id));
      setFriendList((prev) => prev.filter((friend) => friend.id !== id)); // 削除後にリスト更新
    } catch (error) {
      console.error("削除エラー:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ p: 3 }}>
      <List sx={{ width: "100%" }}>
        {friendList.map((friend) => (
          <ListItem
            key={friend.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(friend.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={() => navigate(`/friend/${friend.id}`)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={friend.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Home;
