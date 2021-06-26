import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";


type FirebaseRooms = Record<string, {
  authorId: string;
  title: string;
  closedAt?: string;
  questions: Record<string, {}>
}>

type RoomType = {
  code: string;
  title: string;
  questionsCount: number;
}


export function useMyRooms(){
  const { user } = useAuth();
  const [rooms, setRooms] = useState<RoomType[]>([]);
  
  useEffect(() => {
    const roomsRef = database.ref(`rooms`);
    roomsRef.once('value', lista => {

      const firebaseRooms: FirebaseRooms = lista.val() ?? {};

      const parsedRooms = Object.entries(firebaseRooms).filter(([key, value]) => (user?.id == value.authorId && !value.closedAt)).map(([key, value]) => {
          return {
            code: key,
            title: value.title,
            questionsCount: Object.values(value.questions ?? {}).length,
          }
      });
      console.log(parsedRooms);
      setRooms(parsedRooms);
    });

    return () => {
      roomsRef.off('value');
    }
  }, []);

  return { rooms }
}