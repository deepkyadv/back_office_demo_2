// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { DataGrid } from '@mui/x-data-grid';

// // const TaskLists = () => {
// //   const [taskLists, setTaskLists] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchTaskLists();
// //   }, []);

// //   const fetchTaskLists = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:5000/task-lists');
// //       setTaskLists(response.data);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error('Error fetching task lists:', error);
// //     }
// //   };

// //   const columns = [
// //     { field: 'id', headerName: 'ID', width: 250 },
// //     { field: 'title', headerName: 'Task List Title', width: 250 },
// //     { field: 'createdBy', headerName: 'Created By(Email Id)', width: 200 },
// //     { field: 'numTasks', headerName: 'Number of Tasks', width: 150 },
// //     { field: 'creationTime', headerName: 'Creation Time', width: 200 },
// //     { field: 'lastUpdated', headerName: 'Last Updated', width: 200 },
// //   ];

// //   return (
// //     <div style={{ height: 400, width: '100%' }}>
    
// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : (
// //         <DataGrid rows={taskLists} columns={columns} pageSize={5} />
// //       )}
// //     </div>
// //   );
// // };

// // export default TaskLists;

// import React, { useState, useEffect } from 'react';
// import { db } from "../firebase";
// import { collection, query, onSnapshot } from 'firebase/firestore';
// import { DataGrid } from '@mui/x-data-grid';

// function TaskList() {
//   const [taskList, setTaskList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const q = query(collection(db, 'lists'));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       setTaskList(querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })));

//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const columns = [
//     { field: 'name', headerName: 'Task List Title', width: 300 },
//     { field: 'email', headerName: 'Created By (Email ID)', width: 200 },
//     { field: 'taskCount', headerName: 'No. Of Tasks', width: 150 },
//     { 
//       field: 'creationTime', 
//       headerName: 'Creation Time', 
//       width: 200, 
//       valueGetter: (params) => {
//         if (!params || !params.row || !params.row.creationTime) {
//           return 'N/A';
//         }
//         return new Date(params.row.creationTime.toDate()).toLocaleString();
//       } 
//     },
//     { 
//       field: 'lastUpdated', 
//       headerName: 'Last Updated', 
//       width: 200, 
//       valueGetter: (params) => {
//         if (!params || !params.row || !params.row.lastUpdated) {
//           return 'N/A';
//         }
//         return new Date(params.row.lastUpdated.toDate()).toLocaleString();
//       } 
//     },
//   ];

//   return (
//     <div style={{ height: 500, width: '100%' }}>
//       <DataGrid
//         rows={taskList}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         loading={loading}
//         getRowId={(row) => row.id}
//       />
//     </div>
//   );
// }

// export default TaskList;

import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, query, onSnapshot } from 'firebase/firestore';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'lists'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTaskList(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="task-list-container p-4">
      <h2 className="text-2xl mb-4 font-bold">Task Lists</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 border">Task List Title</th>
              <th className="px-4 py-2 border">Created By (Email ID)</th>
              <th className="px-4 py-2 border">No. Of Tasks</th>
              <th className="px-4 py-2 border">Creation Time</th>
              <th className="px-4 py-2 border">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((list, index) => (
              <tr key={list.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="border px-4 py-2">{list.name}</td>
                <td className="border px-4 py-2">{list.email}</td>
                <td className="border px-4 py-2">{list.taskCount}</td>
                <td className="border px-4 py-2">
                  {list.creationTime ? new Date(list.creationTime.toDate()).toLocaleString() : 'N/A'}
                </td>
                <td className="border px-4 py-2">
                  {list.lastUpdated ? new Date(list.lastUpdated.toDate()).toLocaleString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;



