import type { FC } from "react";
import { useState } from "react";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Avatar, Box, Drawer, Typography, IconButton,  Card, CardContent, CardHeader } from '@mui/material';
import type { Testimonial } from '@/types/Testimonial';
import { Status } from '@/types/Testimonial';
import TestimonialForm from './TestimonialForm';

// TODO: export the methods into an api or "service" file?
const _updateTestimonial = (data: Testimonial) => fetch(`/api/testimonial/${data.id}`, {
  method: "PUT",
  body: JSON.stringify(data)
}).then(res => res.json())

const _deleteTestimonial = (id: string) => fetch(`/api/testimonial/${id}`, {
  method: "DELETE"
}).then(res => res.json())

const TestimonialDetails: FC<{
  onClose: () => void,
  testimonial?: Testimonial
}> = ({onClose, testimonial}) => {
  const [edit, setEdit] = useState<boolean>(false);
  if (!testimonial)
    return <></>
  return (
    <Drawer
      anchor={'right'}
      open={Boolean(testimonial)}
      onClose={onClose}
    >
      <Card sx={{width: "500px", height: '100%', borderRadius: 0}}>
        { edit
          ? <>
              <CardHeader
                title="Edit Testimonial"
                action={
                  <IconButton onClick={() => setEdit(false)}>
                    <CloseOutlinedIcon />
                  </IconButton>
                } />
              <CardContent>
                <TestimonialForm data={testimonial} onSubmit={async data => {
                  await _updateTestimonial(data)
                  setEdit(false);
                }} />
              </CardContent>
            </>
          :
          <>
            <CardHeader
              avatar={
                <Avatar src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png">
                  Avatar
                </Avatar>
              }
              title={testimonial.name}
              subheader={testimonial.tagline}
              action={
                <>
                  { ["PENDING", "REJECTED"].includes(testimonial.status) &&
                    <IconButton color="success" onClick={async () => {
                      await _updateTestimonial({...testimonial, status: Status.APPROVED})
                    }}>
                      <DoneOutlinedIcon />
                    </IconButton>
                  }
                  { ["PENDING", "APPROVED"].includes(testimonial.status) &&
                    <IconButton color="error" onClick={async () => {
                      await _updateTestimonial({...testimonial, status: Status.REJECTED})
                    }}>
                      <CloseOutlinedIcon />
                    </IconButton>
                  }
                  <IconButton onClick={() => {
                    _deleteTestimonial(testimonial.id)
                      .then(() => onClose());
                  }}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                  <IconButton onClick={() => setEdit(true)}>
                    <EditOutlinedIcon />
                  </IconButton>
                </>
              }
            />
            <CardContent>
              <Typography m={2} variant="body1">{testimonial.body}</Typography>
              <Box bgcolor={theme => theme.palette.grey.A100} p={2} borderRadius={1} >
                <Typography variant="body2">Date: {new Date(testimonial.created_at).toLocaleDateString('en-US')}</Typography>
              </Box>
            </CardContent>
        </>
        }

      </Card>
    </Drawer>
  )
}

export default TestimonialDetails;
