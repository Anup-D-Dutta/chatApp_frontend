import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu, setUploadingLoader } from '../../redux/reducers/misc'
import { Image as ImageIcon } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { useSendAttachmentsMutation } from '../../redux/api/api'

const FileMenu = ({ anchorEl, chatId }) => {

  const { isFileMenu } = useSelector((state) => state.misc)

  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);


  const [sendAttachments] = useSendAttachmentsMutation();

  const dispatch = useDispatch();

  const closeFileMenu = () => dispatch(setIsFileMenu(false));

  // const selectRef = (ref) => {
  //   ref.current.click();
  // }


  const selectImage = () => imageRef.current?.click();


  const fileChangeHandler = async(e, key) => {


    const files = Array.from(e.target.files);

    if(files.length <= 0) return;

    if(files.length > 5)
      return toast.error(`You can only send 5 ${key} at a time`)

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);
    closeFileMenu();

    try {
      const myForm = new FormData();

      myForm.append('chatId', chatId);
      files.forEach((file) => myForm.append('files',file))

      const res = await sendAttachments(myForm);

      if (!chatId) {
        toast.error("Chat ID is missing. Please select a chat.");
        return;
      }


      if(res.data) toast.success(`${key} sent Successfully`,{
        id: toastId});
      else{
        toast.error(`Failed to send ${key}`, {id: toastId});
      }  

    } catch (error) {
      toast.error(error,{id:toastId})
      console.error("Error details:", error);
    }
    finally{
      dispatch(setUploadingLoader(false));
    }
  }


  // const fileChangeHandler = async (e, key) => {
  //   const files = Array.from(e.target.files);

  //   if (files.length <= 0) return;

  //   if (files.length > 5) {
  //     return toast.error(`You can only send 5 ${key} at a time`);
  //   }

  //   dispatch(setUploadingLoader(true));

  //   const toastId = toast.loading(`Sending ${key}...`);

  //   closeFileMenu();

  //   try {
  //     const myForm = new FormData();
  //     myForm.append('chatId', chatId);
  //     files.forEach((file) => myForm.append('files', file));
  //     console.log(myForm);

  //     const res = await sendAttachments(myForm);

  //     if (res.data) {
  //       throw new Error(res.error.data.message || 'Failed to send attachments');
  //     }

  //     if (res.data) {
  //       toast.success(`${key} sent Successfully`, { id: toastId });
  //       // toast.success(`${key} sent Successfully`);

  //     }

  //     if (res.data) {
  //       throw new Error(res.error.data.message || 'Failed to send attachments');
  //     }


  //   } catch (error) {
  //     console.error("Error details:", error);
  //     toast.error(error.message || 'An error occurred', { id: toastId });
  //     // toast.error(error.message || 'An error occurred');

  //   } finally {
  //     dispatch(setUploadingLoader(false));
  //   }

  // };


  // const fileChangeHandler = async (e, key) => {
  //   const files = Array.from(e.target.files);

  //   if (!chatId) {
  //     toast.error("Chat ID is missing. Please select a chat.");
  //     return;
  //   }

  //   if (files.length <= 0) return;

  //   if (files.length > 5) {
  //     toast.error(`You can only send 5 ${key} at a time`);
  //     return;
  //   }

  //   // Continue with the upload logic
  //   dispatch(setUploadingLoader(true));

  //   const toastId = toast.loading(`Sending ${key}...`);
  //   closeFileMenu();

  //   try {
  //     const myForm = new FormData();
  //     myForm.append('chatId', chatId);
  //     files.forEach((file) => myForm.append('files', file));

  //     console.log("Sending attachments for chatId:", chatId);

  //     const res = await sendAttachments(myForm);

  //     if (res.error) {
  //       throw new Error(res.error.data.message || 'Failed to send attachments');
  //     }

  //     toast.success(`${key} sent Successfully`, { id: toastId });
  //   } catch (error) {
  //     console.error("Error details:", error);
  //     toast.error(error.message || 'An error occurred', { id: toastId });
  //   } finally {
  //     dispatch(setUploadingLoader(false));
  //   }
  // };


  return (
    <Menu
      anchorEl={anchorEl}
      open={isFileMenu}
      onClose={closeFileMenu}

      sx={{
        bgcolor: 'transparent', // Make the menu background fully transparent
        backdropFilter: 'blur(1px)',
        '& .MuiPaper-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          boxShadow: 'none',
        },
      }}>
      <div
        style={{
          width: '10rem',
          backgroundColor: 'transparent',

        }}
      >
        <MenuList>
          <MenuItem onClick={selectImage}>
            <Tooltip title={'Image'}>
              <ImageIcon sx={{ color: 'white' }} />
            </Tooltip>
            <ListItemText style={{ color: 'white', marginLeft: '0.5rem' }}>Image</ListItemText>
            <input type='file' multiple accept='image/png, image/jpeg, image/gif'
              style={{ display: 'none' }}
              onChange={(e) => {
                console.log("onChange fired");
                console.log("File selected:", e.target.files);
                fileChangeHandler(e, 'Image')
              }}
              ref={imageRef}
            />
          </MenuItem>
        </MenuList>

      </div>
    </Menu>
  )
}

export default FileMenu
