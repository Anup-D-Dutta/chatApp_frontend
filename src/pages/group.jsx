import { Add as AddIcon, Delete as DeleteIcon, Menu as MenuIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Done as DoneIcon, Chair } from '@mui/icons-material'
import { Backdrop, Box, Button, ButtonGroup, colors, Drawer, Grid, IconButton, Stack, styled, TextField, Tooltip, Typography } from '@mui/material'
import React, { memo, Suspense, useEffect, useState, lazy } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { Link } from '../components/styles/styleComponents'
import AvatarCard from '../components/Shared/AvatarCard'
import { sampleChats, sampleUsers } from '../constants/sampleData'
import UserItem from '../components/Shared/UserItem'


const ConfirmDeleteDialog = lazy(() => import('../components/dialogs/ConformDeleteDialog'));
const AddMemberDialog = lazy(() => import('../components/dialogs/AddMemberDialog'));


const isAddMember = false;

const group = () => {

  const chatId = useSearchParams()[0].get('group');
  console.log(chatId)

  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [conformDeleteDialog, setconformDeleteDialog] = useState(false)

  const [groupName, setgroupName] = useState('')
  const [groupNameUpdatedValue, setgroupNameUpdatedValue] = useState('')

  const navigateBack = () => {
    navigate('/')
  }

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  }

  const updateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  }

  const closeConformDeleteHandler = () => {
    setconformDeleteDialog(false)
  }

  const openConformDeleteHandler = () => {
    setconformDeleteDialog(true)
  }

  const deleteHandler = () => {
    closeConformDeleteHandler()
  }

  const removeMemberHandler = (id) => {

  }

  useEffect(() => {

    // console.log(chatId);
    if (chatId) {
      setgroupName(`Group Name ${chatId}`);
      setgroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setgroupName('');
      setgroupNameUpdatedValue('');
      setIsEdit(false)

    }
  }, [chatId]);

  const IconBtns = <>

    <Box
      sx={{
        display: {
          xs: 'block',
          sm: 'none',
          position: 'fixed',
          right: '1rem',
          top: '2rem',
          bgcolor: 'black'
        },
      }}
    >
      <IconButton onClick={handleMobile}>
        <MenuIcon />
      </IconButton>
    </Box>


    {/* Back Button */}
    <Tooltip title='back'>
      <IconButton
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          color: 'white',
          '&:hover': {
            bgcolor: '#777',
            color: 'white'
          }
        }}
        onClick={navigateBack}
      >

        <KeyboardBackspaceIcon />

      </IconButton>

    </Tooltip>
  </>

  const GroupName = <Stack
    direction={'row'}
    alignItems={'center'}
    justifyContent={'center'}
    spacing={'1rem'}
    padding={'3rem'}
    color={'white'}
  >

    {
      isEdit ? (<>

        <TextField
        sx={{
          border: '1px solid white',
          input: { color: 'white' }
        }}
          value={groupNameUpdatedValue}
          onChange={(e) =>
            setgroupNameUpdatedValue(e.target.value)
          } />

        <IconButton sx={{color: 'white'}} onClick={updateGroupName}>
          <DoneIcon />
        </IconButton>

      </>
      ) : (
        <>
          <Typography variant='h4'>{groupName}</Typography>
          <IconButton sx={{color: 'white'}} onClick={() => setIsEdit(true)}><EditIcon /></IconButton>
        </>
      )}

  </Stack>

  const ButtonGroup = <Stack
    direction={{
      xs: 'column-reverse',
      sm: 'row',
    }}
    spacing={'1rem'}
    p={{
      xs: '0',
      sm: "1rem",
      md: '1rem 4rem'
    }}
    // bgcolor={'black'}
  >
    <Button
      size='large'
      color='error'
      startIcon={<DeleteIcon />}
      onClick={openConformDeleteHandler}
    >
      Delete Group
    </Button>
    <Button
      size='large'
      variant='contained'
      startIcon={<AddIcon />}
      onClick={closeConformDeleteHandler}
    >
      Add Member
    </Button>
  </Stack>

  return (
    <Grid container height={'100vh'}>
      <Grid item sx={{
        display: {
          xs: 'none',
          sm: 'block',
          overflow: 'auto',
          height: '100%'
        },
      }}
        sm={4}
      >
        <GroupList myGroups={sampleChats} chatId={chatId} />
      </Grid>
      {/* Main container */}
      <Grid item xs={12} sm={8} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        padding: '1rem 3rem ',
        bgcolor: 'rgba(0,0,0,0.85)',
        boxShadow: 4
      }}
      >
        {IconBtns}

        {groupName && (<>
          {GroupName}
          <Typography
            margin={'2rem'}
            alignSelf={'flex-start'}
            variant='body1'
            color='white'
          >
            Members
          </Typography>

          <Stack
            maxWidth={'45rem'}
            width={'100%'}
            boxSizing={'border-box'}
            padding={{
              sm: '1rem',
              xs: '0',
              md: '1rem 4rem',
            }}
            spacing={'1rem'}
            bgcolor={'#333'}
            height={'50vh'}
            overflow={'auto'}
            borderRadius={3}
          >
            {
              sampleUsers.map((i) => (
                <UserItem user={i} key={i._id} isAdded
                  styling={{
                    boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                    // bgcolor: "black"
                  }}
                  handler={removeMemberHandler}
                />
              ))
            }
          </Stack>

          {ButtonGroup}
        </>
        )}
      </Grid>

      {isAddMember &&
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>}

      {conformDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={conformDeleteDialog}
            handleClose={closeConformDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>)}


      <Drawer
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
          }
        }} open={isMobileMenuOpen} onClose={handleMobileClose}>

        <GroupList w={'50vw'} myGroups={sampleChats} chatId={chatId} />

      </Drawer>

    </Grid>
  );
};


// Sidebar Group List
const GroupList = ({ w = '100%', myGroups = [], chatId }) => (
  <Stack width={w}  bgcolor={'rgba(0,0,0,0.85)'} boxShadow={4}>
    {myGroups.length > 0 ? (
      myGroups.map((group) =>
        <GroupListItem group={group} chatId={chatId} key={group._id} />)
    ) : (
      <Typography textAlign={'center'} padding={'1rem'}>
        No groups
      </Typography>
    )}
  </Stack>
)


// Sidebar Group List
const GroupListItem = memo(({ group, chatId }) => {

  const { name, avatar, _id } = group

  return (
    <Link
      to={`/group?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id)
          e.preventDefault();
      }}
    >
      <Stack
        direction={'row'}
        spacing={'-0.8rem'}
        alignItems={'center'}
        color={'white'}
        // boxShadow={4}
        borderBottom={'1px solid white'}
      >
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>

    </Link >
  )
});

export default group
