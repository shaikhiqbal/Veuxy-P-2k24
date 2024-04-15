import React, { useState } from "react";
import { Input } from "reactstrap";

const Index = () => {
    const [file, setFile] = useState(null);
    
    const handleChange=(e)=>{
        let file=e.target.files[0]
        console.log(file)
        setFile(file)
    }
  return <div>
    <Input type="file" onChange={handleChange}/>
    <iframe src={file} height={800} width={350}/>
    <p>Hello</p>
  </div>;
};

export default Index;
