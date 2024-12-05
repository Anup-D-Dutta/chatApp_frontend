import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../Shared/UserItem'

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {

    // const [] = useState

    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);


    const selectMemberHandler = (id) => {

        setSelectedMembers((prev) =>
            prev.includes(id) ? prev.filter((currentElement) => currentElement !== id) :
                [...prev, id]
        );
    };


    const closeHandler = () => {
        setMembers([])
        setSelectedMembers([])
    }
    const addMemberSubmitHandler = () => { }


    return (
        <Dialog open onClose={closeHandler}>

            <Stack p={'2rem'} textAlign={'center'} spacing={'1rem'}>

                <DialogTitle textAlign={'center'}>Add Member</DialogTitle>

                <Stack spacing={'0.8rem'}>

                    {members && members.length > 0 ?
                        members.map((i) => (
                            <UserItem key={i.id} user={i}
                                handler={selectMemberHandler}
                                isAdded={selectedMembers.includes(i._id)} />
                        )) : <Typography>No Friends</Typography>}

                </Stack>

                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-evenly'}
                >

                    <Button onClick={closeHandler} color='error'>Cancel</Button>
                    <Button onClick={addMemberSubmitHandler} /*variant='contained'*/ disabled={isLoadingAddMember}>Submit</Button>


                </Stack>

            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog
