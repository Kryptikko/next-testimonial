import { useState } from "react";
import { GetServerSideProps } from 'next'
import Layout from '@/components/AppLayout'
import TestimonialForm from '@/components/TestimonialForm'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Card, CardContent, CardHeader, Chip } from '@mui/material';
import db from '@/models'
import type { Project } from '@/types/Project'
import type { Testimonial } from '@/types/Testimonial'


const STATUS_MAP = {
  "PENDING":  <Chip size="small" label="Unapproved" color="warning" />,
  "APPROVED":  <Chip size="small" label="Approved" color="success" />,
  "REJECTED":  <Chip size="small" label="Rejected" color="error" />,
}


type ExpandedProject = Project & {testimonials: Testimonial[]}

const TextTrackList: React.FC<{project: ExpandedProject}> = ({project}) => {
  return (
    <Layout>
      <Card sx={{
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        padding: 3,
        borderRadius: 0,
        border: 0
      }}>
        <CardHeader title={'Import Testimonials'} />
        <TestimonialForm onSubmit={(data) => console.log('submit', data)} />
      </Card>
    </Layout>
  );
}

export default TextTrackList
