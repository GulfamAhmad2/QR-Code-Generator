import QrScanner from "qr-scanner";
import { useState } from "react";
const Qr = () => {
  /* ========= image data ========= */
  const [result, setResult] = useState();

  /* ========= image url  ========= */
  const [fileData, setFileData] = useState();

  /* ========= active button  ========= */
  const [active, setActive] = useState(false);

  /* ========= empty class for active button  ========= */
  let addClass = [];

  /* ========= input Onchange event  ========= */
  const imageHandle = async (e) => {
    const imgData = e.target.files[0];
    setFileData(URL.createObjectURL(imgData));
    const result = await QrScanner.scanImage(imgData);
      setResult(result);
      console.log(result)
    setActive(true);
  };


  

  /* ========= push active class ========= */
  if (active === true) {
    addClass.push("active");
  }

  

  /* ========= copyText button ========= */
  const copy = () => {
    navigator.clipboard.writeText(result);
  };
 
  return (
    <>
      <div className="container">
        <div className="qr-image">
          <input
            type="file"
            accept=".png, .jpeg, webp, .jpg"
            name="images"
            onChange={imageHandle}
          />
          {fileData !== undefined && fileData !== "" && active === true ? (
            <div className="image">
              <img src={fileData} alt="qr" />
            </div>
          ) : (
            <div className={` upload-icon ${addClass}`}>
              <i className="uil uil-cloud-upload"></i>
              <span className="upload-span">Upload</span>
            </div>
          )}
        </div>
        {fileData !== undefined && fileData !== "" && active === true && (
          <>
            <div className={`qr-details `}>
              <p disabled>{result}</p>
            </div>
            <div className={`btn `}>
              <button className="copy" onClick={copy}>Copy</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Qr;
