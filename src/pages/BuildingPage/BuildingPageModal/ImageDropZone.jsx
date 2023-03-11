import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const ImageDropZone = ({ data, setData }) => {
  const [editImages, setEditImage] = useState(data?.images);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 4,
  });

  const files = acceptedFiles.map((file) => {
    return (
      <Grid item xs={6} sx={{ padding: '5px 10px', width: '100%' }} key={file.path}>
        <Box sx={{ border: '2px gray solid', padding: '8px 12px', overflow: 'hidden' }}>
          <img
            style={{ width: '100%', height: '120px', objectFit: 'contain', marginBottom: '10px' }}
            src={URL.createObjectURL(file)}
            alt="Thumb"
          />
          <Typography sx={{ textAlign: 'center' }} variant="body2">
            {file.path}
          </Typography>
        </Box>
      </Grid>
    );
  });

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        images: acceptedFiles.length <= 0 ? editImages : acceptedFiles,
      };
    });
  }, [acceptedFiles]);

  return (
    <section className="container">
      <Box
        sx={{
          background: '#F4F4F4',
          minHeight: '10vh',
          height: 'auto',
          border: '2px dashed gray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: 3,
          py: 2,
        }}
      >
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(Only *.jpeg and *.png images will be accepted) </em>
        </div>
      </Box>

      <Grid container sx={{ mt: 2 }}>
        {files}
      </Grid>

      {acceptedFiles.length <= 0 && (
        <Grid container sx={{ mt: 2 }}>
          {editImages?.map((item) => {
            return (
              <Grid key={item.id} item xs={6} sx={{ padding: '5px 10px', width: '100%' }}>
                <Box sx={{ border: '2px gray solid', padding: '8px 12px' }}>
                  <img
                    style={{ width: '100%', height: '120px', objectFit: 'contain', marginBottom: '10px' }}
                    src={item.url}
                    alt="Thumb"
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </section>
  );
};

export default ImageDropZone;
