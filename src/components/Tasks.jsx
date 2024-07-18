// import React, { useState, useEffect } from "react";
// import { db } from "../firebase";
// import { collection, query, onSnapshot } from "firebase/firestore";
// import { DataGrid } from '@mui/x-data-grid';

// const Tasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [lists, setLists] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch lists
//     const qLists = query(collection(db, "lists"));
//     const unsubscribeLists = onSnapshot(qLists, (querySnapshot) => {
//       const listsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setLists(listsData);
//     });

//     // Fetch tasks
//     const qTasks = query(collection(db, "tasks"));
//     const unsubscribeTasks = onSnapshot(qTasks, (querySnapshot) => {
//       const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       console.log("Fetched tasks:", tasksData); // Debugging log
//       setTasks(tasksData);
//       setLoading(false);
//     });

//     return () => {
//       unsubscribeLists();
//       unsubscribeTasks();
//     };
//   }, []);

//   // Map list titles to tasks
//   const tasksWithListTitles = tasks.map(task => {
//     const list = lists.find(list => list.id === task.listId);
//     return { ...task, listTitle: list ? list.name : "Unknown List" };
//   });

//   const columns = [
//     { field: 'title', headerName: 'Task Title', width: 200 },
//     { field: 'description', headerName: 'Task Description', width: 300 },
//     { field: 'listTitle', headerName: 'Task List Title', width: 200 },
//     { field: 'email', headerName: 'Created By (Email ID)', width: 250 },
//     { 
//       field: 'creationTime', 
//       headerName: 'Creation Time', 
//       width: 200,
//       valueGetter: (params) => {
//         console.log('params:', params); // Check what params are being passed
//         if (!params || !params.row || !params.row.creationTime) {
//           console.log('Missing creationTime:', params.row); // Log if creationTime is missing
//           return 'N/A';
//         }
//         const creationTime = params.row.creationTime.toDate();
//         console.log('Converted creationTime:', creationTime); // Log the converted Date object
//         return creationTime ? new Date(creationTime).toLocaleString() : 'N/A';
//       }
//     },
//   ];
//   return (
//     <div className="tasks-container">
//       <h2 className="text-2xl mb-4">Tasks</h2>
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={tasksWithListTitles}
//           columns={columns}
//           pageSize={5}
//           rowsPerPageOptions={[5]}
//           loading={loading}
//           getRowId={(row) => row.id}
//         />
//       </div>
//     </div>
//   );
// };

// export default Tasks;

import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch lists
    const qLists = query(collection(db, "lists"));
    const unsubscribeLists = onSnapshot(qLists, (querySnapshot) => {
      const listsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLists(listsData);
    });

    // Fetch tasks
    const qTasks = query(collection(db, "tasks"));
    const unsubscribeTasks = onSnapshot(qTasks, (querySnapshot) => {
      const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Fetched tasks:", tasksData); // Debugging log
      setTasks(tasksData);
      setLoading(false);
    });

    return () => {
      unsubscribeLists();
      unsubscribeTasks();
    };
  }, []);

  // Map list titles to tasks
  const tasksWithListTitles = tasks.map(task => {
    const list = lists.find(list => list.id === task.listId);
    return { ...task, listTitle: list ? list.name : "Unknown List" };
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="tasks-container">
      <h2 className="text-2xl mb-4">Tasks</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Task Title</th>
            <th className="px-4 py-2">Task Description</th>
            <th className="px-4 py-2">Task List Title</th>
            <th className="px-4 py-2">Created By (Email ID)</th>
            <th className="px-4 py-2">Creation Time</th>
          </tr>
        </thead>
        <tbody>
          {tasksWithListTitles.map(task => (
            <tr key={task.id}>
              <td className="border px-4 py-2">{task.title}</td>
              <td className="border px-4 py-2">{task.description}</td>
              <td className="border px-4 py-2">{task.listTitle}</td>
              <td className="border px-4 py-2">{task.email}</td>
              <td className="border px-4 py-2">
                {task.creationTime ? new Date(task.creationTime.toDate()).toLocaleString() : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;

