import axios from "axios";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddAgama(){
    const [agama, setAgama] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8000/api/agama/create", {
                agama,
            });
            if(response.data.success){
                alert("Data Berhasil ditambah");
                navigate("/agama") //jika berhasil ditambahkan maka akan diredirect ke halaman agama
            } else{
                alert("Gagal menambahkan data")
            }
        } catch(error){
            alert("Terjadi Kesalahan. silahkan coba lagi");
            console.error(error);
        }
    };
    return(
<Fragment>
        <h1 style={{textAlign: 'center'}}>Tambah Agama</h1>
<form onSubmit={handleSubmit}>
  <div class="form-group row">
    <label for="text" class="col-4 col-form-label">Agama</label> 
    <div class="col-8">
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <i class="fa fa-address-card"></i>
          </div>
        </div> 
        <input id="agama" name="agama"
         type="text" class="form-control" 
         value={agama} 
         onChange={(e) =>setAgama(e.target.value)}
         required
         />
      </div>
    </div>
  </div> 
  <div class="form-group row">
    <div class="offset-4 col-8">
      <button name="submit" type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</form>
</Fragment>
    )
}

export default AddAgama;