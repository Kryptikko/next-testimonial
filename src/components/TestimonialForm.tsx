import { useState } from 'react'
import type { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Stack,
  Button,
  TextField,
} from '@mui/material';
import type { Testimonial } from '@/types/Testimonial';

const TestimonialForm: FC<{
  data?: Testimonial,
  onSubmit: SubmitHandler<Testimonial>
}> = ({data, onSubmit}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //TODO: handle errors
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Testimonial>({
    defaultValues: data
  });

  const _onSubmit = async (newdata: Testimonial) => {
    setIsLoading(true)
    await onSubmit(newdata)
    setIsLoading(false)
    reset()
  }
  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Stack gap={2}>
        <Stack flexDirection="row" gap={1} justifyContent="space-between">
          <TextField
            label="Name"
            placeholder="John Doe"
            {...register('name')} />
          <TextField
            label="Tagline"
            placeholder="CEO"
            {...register('tagline')} />
        </Stack>
        <TextField
          variant="outlined"
          label="Testimonial"
          placeholder="Write your testimonial here"
          fullWidth
          {...register('body')}
        />
        <TextField
          label="URL"
          placeholder="https://example.com"
          fullWidth
          {...register('url')}
        />
        <Button
           disabled={isLoading}
           type="submit"
           fullWidth
           variant={'outlined'}>
           Import
        </Button>
      </Stack>
    </form>
  )
}

export default TestimonialForm;
