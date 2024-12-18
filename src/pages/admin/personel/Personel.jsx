import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import axios from "axios";
function Personel() {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [personel, setPersonel] = useState([]);
  //pengambilan API agama menggunakan axios dan Asynchronus Async/Await
  useEffect(() => {
    const fetchPersonel = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/personel");
        if (response.data.success) {
          setPersonel(response.data.data);
        } else {
          setError("Failed to Fetch Data Agama");
        }
      } catch (err) {
        setError(err.message || "An Error Occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchPersonel();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      const table = $(tableRef.current).DataTable();
      return () => {
        table.destroy(false);
      };
    }
  }, [loading, error]);
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Personel</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <a href="index.html">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">Personel</li>
      </ol>
      <div className="card mb-4">
        <div className="card-body">
          DataTables is a third party plugin that is used to generate the demo
          table below. For more information about DataTables, please visit the
          <a target="_blank" href="https://datatables.net/">
            official DataTables documentation
          </a>
          .
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <a href="/personel/create" className="btn btn-primary btn-sm">
            Tambah
          </a>
        </div>
      </div>
      <div className="card-body">
        {loading ? (
          <p>Loading</p>
        ) : error ? (
          <p>Error</p>
        ) : (
          <table ref={tableRef}>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>NRP</th>
                <th>Alamat</th>
                <th>Agama</th>
                <th>Kesatuan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>NRP</th>
                <th>Alamat</th>
                <th>Agama</th>
                <th>Kesatuan</th>
                <th>Action</th>
              </tr>
            </tfoot>
            <tbody>
              {personel.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.nrp}</td>
                  <td>{item.alamat}</td>
                  <td>{item.agama}</td>
                  <td>{item.kesatuan}</td>
                  <td>
                    <a
                      href={`/personel/edit/${item.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export default Personel;
