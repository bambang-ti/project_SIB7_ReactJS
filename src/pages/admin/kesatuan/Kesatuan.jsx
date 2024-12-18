import React, {useEffect, useRef, useState} from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import axios from "axios";
function Kesatuan(){

    const tableRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [kesatuan, setKesatuan] = useState([]);
    //pengambilan API agama menggunakan axios dan Asynchronus Async/Await
    useEffect(()=>{
      const fetchKesatuan = async () =>{
        try {
          const response = await axios.get("http://localhost:8000/api/kesatuan");
          if(response.data.success){
            setKesatuan(response.data.data);
          } else {
            setError("Failed to Fetch Data Kesatuan");
          }
        }catch(err) {
          setError(err.message || "An Error Occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchKesatuan()
    }, []);

    useEffect(()=>{
      if(!loading && !error){
        const table = $(tableRef.current).DataTable();
        return() => {
            table.destroy(false)
        };
      }
    }, [loading, error]);
    return(
<div className="container-fluid px-4">
  <h1 className="mt-4">Kesatuan</h1>
  <ol className="breadcrumb mb-4">
    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
    <li className="breadcrumb-item active">Kesatuan</li>
  </ol>
  <div className="card mb-4">
    <div className="card-body">
      DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the
      <a target="_blank" href="https://datatables.net/">official DataTables documentation</a>
      .
    </div>
  </div>
  <div className="card mb-4">
    <div className="card-header">
      <i className="fas fa-table me-1" />
      DataTable Example
    </div>
  </div>
            <div className="card-body">
              {loading ? (
            <p>Loading</p>  
            ): error ? (
              <p>Error</p>
            ): (
                <table ref={tableRef}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Agama</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                        <th>No</th>
                        <th>Agama</th>
                        </tr>
                    </tfoot>
                    <tbody>
                      {kesatuan.map((item, index)=>(

                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.kesatuan}</td>
                                        </tr>
                      ))}
                                        </tbody>
                                </table>
          )}
                                
                            </div>
                        </div>
                    
    )
}
export default Kesatuan