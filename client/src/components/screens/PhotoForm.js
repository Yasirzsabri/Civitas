import { useState , useEffect} from "react"
import './form.css';

const PhotoForm = (porps) => {
  
    const [imgUrl, setImgUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState();

    // useEffect(()=>{
    //     getUserLevelList()
    // }, [])

    const handleFile = (e) => {
        console.log("e.target.files[0].name = ", e.target.files[0].name);
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmission = () => {
		const formData = new FormData();

		formData.append('file', selectedFile);

		fetch('/api/photos',
			{
				method: 'POST',
				body: formData,
			}
		)
        .then(res => res.json())
        .then(data => setImgUrl(data))

        console.log("2 - imgUrl = ", imgUrl);
	};
 
    return (
        <div className="createform">
            <div className="popup-in">
                <h4>Upload a image</h4>
                <div>
                    <input type="file"  onChange={handleFile} />
                </div>
                <div>
				    <button onClick={handleSubmission}>Submit</button>
			    </div>
            </div>          
        </div>
    )
}
 
export default PhotoForm;