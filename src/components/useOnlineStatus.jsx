import { useEffect } from "react";
import { ref, onDisconnect, set, getDatabase } from "firebase/database";

const useOnlineStatus = (userId) => {
  useEffect(() => {
    const db = getDatabase();
    const userStatusRef = ref(db, `/status/${userId}`);

    set(userStatusRef, "online");
    onDisconnect(userStatusRef).set("offline");

    return () => {
      set(userStatusRef, "offline");
    };
  }, [userId]);
};

export default useOnlineStatus;
