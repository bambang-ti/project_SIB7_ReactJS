import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPersonel() {
  const [agama, setAgama] = useState([]);
  const [kesatuan, setKesatuan] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama: "",
    nrp: "",
    alamat: "",
    agama_id: "",
    kesatuan_id: "",
  });

  useEffect(() => {
    if (!id) {
      setError("Invalid ID.");
      return;
    }

    const fetchEditPersonel = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/personel-edit/${id}`
        );
        if (response.data.success && response.data.data.length > 0) {
          setFormData({
            nama: response.data.data[0].nama || "",
            nrp: response.data.data[0].nrp || "",
            alamat: response.data.data[0].alamat || "",
            agama_id: response.data.data[0].agama_id || "",
            kesatuan_id: response.data.data[0].kesatuan_id || "",
          });
        } else {
          setError("No personel data found");
        }
      } catch (err) {
        setError("An error occurred while fetching personel data");
      }
    };

    const fetchKesatuan = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/kesatuan`);
        if (response.data.success) {
          setKesatuan(response.data.data);
        } else {
          setError("Failed to fetch kesatuan data");
        }
      } catch (err) {
        setError("An error occurred while fetching kesatuan data.");
      }
    };

    const fetchAgama = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/agama`);
        if (response.data.success) {
          setKesatuan(response.data.data);
        } else {
          setError("Failed to fetch agama data");
        }
      } catch (err) {
        setError("An error occurred while fetching agama data.");
      }
    };

    fetchEditPersonel();
    fetchKesatuan();
    fetchAgama();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/personel/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        alert("Personel updated succesfully.");
        navigate("/personel");
      } else {
        setError(response.data.message || "Update failed.");
      }
    } catch (error) {
      setError("An error occurred during the update.");
    }
  };

  return (
    <div className="container-fluid px-4">
      <h2 style={{ textAlign: "center" }}>Edit Data Personel</h2>
      {/* {error && <div className="error">{error}</div>} */}
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="text" className="col-4 col-form-label">
            Nama
          </label>
          <div className="col-8">
            <input
              id="text"
              name="nama"
              type="text"
              className="form-control"
              value={formData.nama}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="text1" className="col-4 col-form-label">
            NRP
          </label>
          <div className="col-8">
            <input
              id="text1"
              name="nrp"
              type="text"
              className="form-control"
              value={formData.nrp}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="text2" className="col-4 col-form-label">
            Alamat
          </label>
          <div className="col-8">
            <input
              id="text2"
              name="alamat"
              type="text"
              className="form-control"
              value={formData.alamat}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="select" className="col-4 col-form-label">
            Agama
          </label>
          <div className="col-8">
            <select
              id="select"
              name="agama_id"
              className="custom-select"
              value={formData.agama_id}
              onChange={handleChange}
            >
              <option value="">Pilih Agama</option>
              {agama.map((agamaItem) => (
                <option key={agamaItem.id} value={agamaItem.id}>
                  {agamaItem.agama}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="select1" className="col-4 col-form-label">
            Kesatuan
          </label>
          <div className="col-8">
            <select
              id="select1"
              name="kesatuan_id"
              value={formData.kesatuan_id}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Pilih Kesatuan</option>
              {kesatuan.map((kesatuanItem) => (
                <option key={kesatuanItem.id} value={kesatuanItem.id}>
                  {kesatuanItem.kesatuan}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-4 col-8">
            <button name="submit" type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPersonel;
