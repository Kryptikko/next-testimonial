import { useState } from "react";
import { GetServerSideProps } from 'next'
import Layout from '@/components/layout/AppLayout'
import TestimonialForm from '@/components/TestimonialForm'
import { Card, CardContent, CardHeader, Snackbar } from '@mui/material';
import db from '@/models'
import type { Project } from '@/types/Project'
import type { Testimonial } from '@/types/Testimonial'

type ExpandedProject = Project & {testimonials: Testimonial[]}

const _importTestimonial = (data: Testimonial) => fetch("/api/testimonial", {
  method: "POST",
  body: JSON.stringify(data)
}).then(res => res.json())

const TestimonialImport: React.FC<{project: ExpandedProject}> = ({project}) => {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

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
        <CardContent sx={{maxWidth: "32rem"}}>
          <TestimonialForm onSubmit={(data) => {
            data.project_id = project.id
            const promise =  _importTestimonial(data)
            // TODO: handle error
            setShowSnackbar(true)
            return promise;
          }} />
        </CardContent>
      </Card>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message="New testimonial saved"
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const project = await db.project.findUnique({
    where: { id: String(id) },
    include: {testimonials: true}
  });
  // serializing the date fields, TODO: find a cleaner solution
  return { props: { project: JSON.parse(JSON.stringify(project)) } }
}

export default TestimonialImport;
