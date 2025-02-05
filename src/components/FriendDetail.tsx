import { useEffect, useState } from "react";
import { db } from "./../firebase";
import { getDoc, doc } from "firebase/firestore"; // getDoc と doc をインポート
import { useParams } from "react-router-dom";
import { Avatar, Box, Container, Typography } from "@mui/material";
import { Friend } from "../entity/Friend";
import Person from "@mui/icons-material/Person";

const FriendDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [friend, setFriend] = useState<Friend | null>(null);

  useEffect(() => {
    const fetchFriend = async () => {
      if (id) {
        // id が存在する場合のみ処理を行う
        const docRef = doc(db, "friends", id); // id は string 型であることが保証される
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFriend(docSnap.data() as Friend);
        }
      }
    };

    fetchFriend();
  }, [id]); // id が変更された時のみ実行

  if (!friend) return <Typography>Loading...</Typography>;

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}
    >
      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64 }}>
          <Person fontSize="large" />
        </Avatar>
      </Box>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        {friend.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        出会った場所　:　 {friend.place}
      </Typography>
      <Typography variant="h6" gutterBottom>
        好きなもの　　:　 {friend.favorites}
      </Typography>
      <Typography variant="h6" gutterBottom>
        苦手なもの　　:　 {friend.unlike}
      </Typography>
    </Container>
  );
};

export default FriendDetail;
