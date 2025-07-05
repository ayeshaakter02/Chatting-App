// import { useEffect, useState } from "react";
// import { ref, onValue, getDatabase } from "firebase/database";

// const UserStatus = ({ userId }) => {

//     const db = getDatabase();
//   const [status, setStatus] = useState("offline");

//   useEffect(() => {
//     const statusRef = ref(db, `/status/${userId}`);

//     const unsubscribe = onValue(statusRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setStatus(snapshot.val());
//       }
//     });

//     return () => unsubscribe();
//   }, [userId]);

//   return (
//     <div>
//       {status === "online" ? (
//         <span style={{ color: "green" }}>● Active</span>
//       ) : (
//         <span style={{ color: "gray" }}>● Offline</span>
//       )}
//     </div>
//   );
// };

// export default UserStatus;
