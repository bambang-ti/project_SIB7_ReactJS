import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

function AddPersonel(){
    const [formData, setFormData] = useState({
        nama: '',
        nrp: '',
        alamat: '',
        agama_id: '',
        kesatuan_id: ''
    });
    const [agama, setAgama] = useState([]);
    const [kesatuan, setKesatuan] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const agamaResponse = await axios.get('http://localhost:8000/api/agama');
                setAgama(agamaResponse.data.data);
                const kesatuanResponse = await axios.get('http://localhost:8000/api/kesatuan');
                setKesatuan(kesatuanResponse.data.data);
            } catch(error) {
                setError(error.message);
            }
        };
        fetchData()
    }, []);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try{
            const response = await axios.post('http://localhost:8000/api/personel/create', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.data.success){
                alert('Data berhasil ditambahkan');
                navigate('/personel');
            } else {
                setError('Gagal menambahkan data');
            }
        } catch(error){
            setError('Terjadi kesalahan ');
            console.log(error);
        }
    }
    return(
<div className="container-fluid px-4">
<h2 style={{textAlign: 'center'}}>Tambah Data Personel</h2>
{error && <div className="error">{error}</div>}
<form onSubmit={handleSubmit}> 
  <div className="form-group row">
    <label htmlFor="text" className="col-4 col-form-label">Nama</label> 
    <div className="col-8">
      <input id="text" name="nama" 
      type="text" className="form-control"
      value={formData.nama}
      onChange={handleChange}
      required
      />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="text1" className="col-4 col-form-label">NRP</label> 
    <div className="col-8">
      <input id="text1" name="nrp" 
      type="text" className="form-control"
      value={formData.nrp}
      onChange={handleChange}
      required
      />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="text2" className="col-4 col-form-label">Alamat</label> 
    <div className="col-8">
      <input id="text2" name="alamat" 
      type="text" className="form-control"
      value={formData.alamat}
      onChange={handleChange}
      />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="select" className="col-4 col-form-label">Agama</label> 
    <div className="col-8">
      <select id="select" name="agama_id" 
      className="custom-select"
      value={formData.agama_id}
      onChange={handleChange}
      >
        <option value="">Pilih Agama</option>
        {agama.map(ag => (
        <option key={ag.id} value={ag.id}>{ag.agama}</option>
        ))}
      </select>
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="select1" className="col-4 col-form-label">Kesatuan</label> 
    <div className="col-8">
      <select id="select1" name="kesatuan_id" 
      value={formData.kesatuan_id}
      onChange={handleChange}
      className="custom-select">
        <option value="">Pilih Kesatuan</option>
        {kesatuan.map(kes => (
        <option key={kes.id} value={kes.id}>{kes.kesatuan}</option>
        ))}
      </select>
    </div>
  </div> 
  <div className="form-group row">
    <div className="offset-4 col-8">
      <button name="submit" type="submit" className="btn btn-primary">Submit</button>
    </div>
  </div>
</form>
</div>

    )
}
export default AddPersonel;