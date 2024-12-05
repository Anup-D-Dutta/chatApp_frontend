import React from 'react'
import { transformImage } from '../../lib/Features';
import { FileOpen as FileOpenIcon } from '@mui/icons-material';

const RandereAttachment = (file, url ) => {

    switch (file) {

        case 'image':
            return <img
                src={transformImage(url, 200)}
                alt='Attachement'
                style={{
                    objectFit: 'contain',
                    width:'220px',
                    height:'160px',
                    marginTop: '0.5rem',
                    padding: '0.2rem'
                }}
            />
        // case 'video':
            // return <video src={url} preload='none' width={'200px'} controls />

        // case 'audio':
        //     return <audio src={url} preload='none' controls />


        default:
            return <FileOpenIcon />

    }
}

export default RandereAttachment
