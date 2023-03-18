import { GetServerSideProps } from 'next'
import Layout from '@/components/AppLayout'
import TestimonialForm from '@/components/TestimonialForm'
import { Card, CardContent, CardHeader } from '@mui/material';
import db from '@/models'
import type { Project } from '@/types/Project'
import type { Testimonial } from '@/types/Testimonial'

type ExpandedProject = Project & {testimonials: Testimonial[]}

const _importTestimonial = (data: Testimonial) => fetch("/api/testimonial", {
  method: "POST",
  body: JSON.stringify(data)
}).then(res => res.json())

const TestimonialImport: React.FC<{project: ExpandedProject}> = ({project}) => {
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
            return _importTestimonial(data)
          }} />
        </CardContent>
      </Card>
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
