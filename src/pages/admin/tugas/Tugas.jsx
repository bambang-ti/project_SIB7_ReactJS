import React, {useEffect, useRef, useState} from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import axios from "axios";
function Tugas(){

    const tableRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tugas, setTugas] = useState([]);
    //pengambilan API agama menggunakan axios dan Asynchronus Async/Await
    useEffect(()=>{
      const fetchTugas = async () =>{
        try {
          const response = await axios.get("http://localhost:8000/api/tugas");
          if(response.data.success){
            setTugas(response.data.data);
          } else {
            setError("Failed to Fetch Data Agama");
          }
        }catch(err) {
          setError(err.message || "An Error Occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchTugas()
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
  <h1 className="mt-4">Tugas</h1>
  <ol className="breadcrumb mb-4">
    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
    <li className="breadcrumb-item active">Tugas</li>
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
    Data Table
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
                            <th>No Surat</th>
                            <th>Mulai Tugas</th>
                            <th>Akhir Tugas</th>
                            <th>Wilayah</th>
                            <th>Personel</th>
                            <th>Pimpinan</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>No</th>
                            <th>No Surat</th>
                            <th>Mulai Tugas</th>
                            <th>Akhir Tugas</th>
                            <th>Wilayah</th>
                            <th>Personel</th>
                            <th>Pimpinan</th>
                        </tr>
                    </tfoot>
                    <tbody>
                      {tugas.map((item, index)=>(

                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.no_surat}</td>
                                            <td>{item.mulai}</td>
                                            <td>{item.akhir}</td>
                                            <td>{item.wilayah}</td>
                                            <td>{item.personel}</td>
                                            <td>{item.pimpinan}</td>
                                        </tr>
                      ))}
                                        </tbody>
                                </table>
          )
        }
                                
                            </div>
                        </div>
                    
    )
}
export default Tugas