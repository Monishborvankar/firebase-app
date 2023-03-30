import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import {toast} from "react-toastify";
import { storage } from '../firebase';
import { dataref } from '../firebase'

const initialState = {
    name: "",
    email: "",
    contact: "",
    status:"",
    url:"",
    url2:"",
    url3:"",
    url4:"",

}

const AddEdit = () => {
    const [image ,setImage] = useState('');
    const [image2 ,setImage2] = useState('');
    const [image3 ,setImage3] = useState('');
    const [image4 ,setImage4] = useState('');
    const [Url , setUrl] = useState('');
    const [Url2 , setUrl2] = useState('');
    const [Url3 , setUrl3] = useState('');
    const [Url4 , setUrl4] = useState('');
    const [selectedImage, setSelectedImage] = useState(Url)
    const [allImag, setAllImg] = useState([Url, Url2, Url3, Url4])
    const[state, setState] = useState(initialState);
    const[data, setData] = useState({});

    const {name, email, contact, status, url, url2, url3, url4 } = state;

const navigate = useNavigate();

const { id } = useParams();

const upload = () =>{
    if(image == null)
    return;
    setUrl("gettingg urls...")
      // first image
      //storage.ref('/images/'+image.name).put(image)
      storage.ref('/images/'+image.name).put(image)
    // .on("state_changed", alert("success"), alert , () => {
  
    storage.ref("images").child(image.name).getDownloadURL()
    .then((url) =>{console.log(url)})
      // seconnd image
      storage.ref('/images/'+image2.name).put(image2)
    // .on("state_changed", alert("success"), alert , () => {
  
    storage.ref("images").child(image2.name).getDownloadURL()
    .then((url2) =>{
      
     //third image
     storage.ref('/images/'+image3.name).put(image3)
    //  .on("state_changed", alert("success"), alert , () => {
  
     storage.ref("images").child(image3.name).getDownloadURL()
     .then((url3) =>{
  
      //forth image
      storage.ref('/images/'+image4.name).put(image4)
     .on("state_changed", alert("Data is uploaded successfuly"), alert , () => {
  
     storage.ref("images").child(image4.name).getDownloadURL()
     .then((url4) =>{
  
      dataref.ref("contacts").push().set({
   
        url : url,
        url2: url2,
        url3 : url3,
        url4 : url4,
      }).catch(alert);
  
      setUrl(url);
      setUrl2(url2);
      setUrl3(url3);
      setUrl4(url4);
    })
  // })
  })
  // })
  });
    // });
  })
  });
  }

useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
    if(snapshot.val()!== null) {
      setData({... snapshot.val()})
    } else{
      setData({});
    }
    });

    return () => {
      setData({})
    }
  }, [id]);
  useEffect(() => {
    if(id) {
        setState({ ...data [id]});
    } else {
        setState({...initialState});
    }

    return () => {
        setState({...initialState});
    }

  }, [id, data]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !contact || !status) {
            toast.error("please provide value in each input field");
        } else {
            if(!id) {
                fireDb.child("contacts").push(state, (err) => {
                    if(err) {
                        toast.error(err);
                    } else {
                        toast.success("Contact Added Successfully");
                    }
                });
            } else {
                fireDb.child(`contacts/${id}`).set(state, (err) => {
                    if(err) {
                        toast.error(err);
                    } else {
                        toast.success("Contact Updated Successfully");
                    }
                });
            }
            upload()
           
            setTimeout(() => navigate("/"), 500);
        }
    };
  return (
    <div style={{marginTop: "100px"}}>
        <form style={{
            margin:"auto", 
            padding: "15px", 
            maxWidth: "400px", 
            alignContent: "center",
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor='name'>Name</label>
                <input
                type="text"
                id="name" 
                name="name" 
                placeHolder ="Your Name..."
                value={name || ""}
                onChange={handleInputChange}
                />

                 <label htmlFor='email'>Email</label>
                <input
                type="email"
                id="email" 
                name="email" 
                placeHolder ="Your Email..."
                value={email || ""}
                onChange={handleInputChange}
                />

                 <label htmlFor='contact'>Contact</label>
                <input
                type="number"
                id="contact" 
                name="contact" 
                placeHolder ="Your Contact Number..."
                value={contact || ""}
                onChange={handleInputChange}
                />
                <label htmlFor='status'>Status</label>
                <input
                type="text"
                id="status" 
                name="status" 
                placeHolder ="Your Status..."
                value={status || ""}
                onChange={handleInputChange}
                />
                <input type="file" onChange={(e) => {setImage(e.target.files[0])
    }}></input>
    <br/>
    <br/>
    <input type="file" onChange={(e) => {setImage2(e.target.files[0])
    }}></input>
    <br/>
    <br/>
    <input type="file" onChange={(e) => {setImage3(e.target.files[0])
    }}></input>
    <br/>
    <br/>
     <input type="file" onChange={(e) => {setImage4(e.target.files[0])
    }}></input>
    <br/>
    <br/>
                <input type="submit" value="Save" />
        </form>
    </div>
  )
}

export default AddEdit;
