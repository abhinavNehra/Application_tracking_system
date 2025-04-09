import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, styled } from "@mui/material";

import { parseResumeFromPdf } from "../../lib/parse-resume-from-pdf";



const defaultFileState = {
    name: "",
    size: 0,
    fileUrl: "",
  };
  
  const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
    });
  
    
const UploadResume = () => {


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;

    const newFile = files[0];
    const fileUrl = URL.createObjectURL(newFile);

    console.log('name ---', newFile.name)
    console.log('size ---', newFile.size)
    console.log('fileUrl ---', fileUrl)

    const resume = await parseResumeFromPdf(fileUrl);
    console.log(resume)
    // setFile({
    //   name: newFile.name,
    //   size: newFile.size,
    //   fileUrl: fileUrl
    // });
  };
    return <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<FontAwesomeIcon icon={faCloudArrowUp} />}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </Button>
}

export default UploadResume