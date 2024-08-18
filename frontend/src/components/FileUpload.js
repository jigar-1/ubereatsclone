import axios from 'axios';
import React, { useState } from 'react'
import API_BASE_URL from '../utils/constants';

const FileUpload = () => {

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();

        console.log(file)
        formData.append('file', file);

        try {
            const res = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });

        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }

        }
    };
    const fileSelect = e => {
        console.log(e)
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }
    return (
        <div>
            <img src={uploadedFile} alt="Profile" className="img-thumbnail" />
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" onChange={fileSelect} id="customFile" />
                    <label className="custom-file-label" htmlFor="customFile" >{filename}</label>

                    <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
                </div>
            </form>



        </div >
    )
}

export default FileUpload
