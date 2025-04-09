


import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import UploadResume from "./uploadResume";




const Home = ({
  onFileUrlChange,
  className,
  playgroundView = false,
}: {
  onFileUrlChange: (fileUrl: string) => void;
  className?: string;
  playgroundView?: boolean;
}) => {
  const [file, setFile] = useState();
  const [load, setLoad] = useState(false)


  useEffect(() => {
    setLoad(true)
  })


//   const [isHoveredOnDropzone, setIsHoveredOnDropzone] = useState(false);
//   const [hasNonPdfFile, setHasNonPdfFile] = useState(false);

//   const hasFile = Boolean(file.name);

//   const setNewFile = (newFile: File) => {
//     if (file.fileUrl) {
//       URL.revokeObjectURL(file.fileUrl);
//     }

//     const { name, size } = newFile;
//     const fileUrl = URL.createObjectURL(newFile);
//     setFile({ name, size, fileUrl });
//     onFileUrlChange(fileUrl);
//   };

//   const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     const newFile = event.dataTransfer.files[0];
//     if (newFile.name.endsWith(".pdf")) {
//       setHasNonPdfFile(false);
//       setNewFile(newFile);
//     } else {
//       setHasNonPdfFile(true);
//     }
//     setIsHoveredOnDropzone(false);
//   };

//   const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (!files) return;

//     const newFile = files[0];
//     setNewFile(newFile);
//   };

//   const onRemove = () => {
//     setFile(defaultFileState);
//     onFileUrlChange("");
//   };

//   const onImportClick = async () => {
//     const resume = await parseResumeFromPdf(file.fileUrl);
//     const settings = deepClone(initialSettings);

//     // Set formToShow settings based on uploaded resume if users have used the app before
//     if (getHasUsedAppBefore()) {
//       const sections = Object.keys(settings.formToShow) as ShowForm[];
//       const sectionToFormToShow: Record<ShowForm, boolean> = {
//         workExperiences: resume.workExperiences.length > 0,
//         educations: resume.educations.length > 0,
//         projects: resume.projects.length > 0,
//         skills: resume.skills.descriptions.length > 0,
//         custom: resume.custom.descriptions.length > 0,
//       };
//       for (const section of sections) {
//         settings.formToShow[section] = sectionToFormToShow[section];
//       }
//     }
//   };

  return (
    <Box>
        {load && <UploadResume />}
    </Box>
  );
};

const getFileSizeString = (fileSizeB: number) => {
  const fileSizeKB = fileSizeB / 1024;
  const fileSizeMB = fileSizeKB / 1024;
  if (fileSizeKB < 1000) {
    return fileSizeKB.toPrecision(3) + " KB";
  } else {
    return fileSizeMB.toPrecision(3) + " MB";
  }
};

export default Home