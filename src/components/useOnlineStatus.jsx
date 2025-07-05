import { useEffect } from "react";
import { db } from "./firebase.config";
import { ref, onDisconnect, set } from "firebase/database";

const useOnlineStatus = (userId) => {
  useEffect(() => {
    const userStatusRef = ref(db, `/status/${userId}`);

    set(userStatusRef, "online");

    // Automatically set status to offline on disconnect
    onDisconnect(userStatusRef).set("offline");

    return () => {
      set(userStatusRef, "offline");
    };
  }, [userId]);
};

export default useOnlineStatus;
