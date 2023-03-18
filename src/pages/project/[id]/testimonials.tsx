import { useState } from "react";
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Layout from '@/components/AppLayout'
import TestimonialDetails from '@/components/TestimonialDetails'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Card, CardContent, CardHeader, Chip } from '@mui/material';
import db from '@/models'
import type { Project } from '@/types/Project'
import type { Testimonial } from '@/types/Testimonial'
import {
  Avatar,
  Stack,
  Typography,
} from '@mui/material';
import useSWR, { SWRConfig } from "swr";

const STATUS_MAP = {
  "PENDING":  <Chip size="small" label="Unapproved" color="warning" />,
  "APPROVED":  <Chip size="small" label="Approved" color="success" />,
  "REJECTED":  <Chip size="small" label="Rejected" color="error" />,
}

const columns: GridColDef[] = [
  {
    field: 'from',
    headerName: 'Person',
    width: 250,
    renderCell: (props) => {
      const row  = props.row as Testimonial
      return (
        <Stack direction="row" gap={1}>
          <Avatar src={row.avatar} alt="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" />
          <Stack>
            <Typography >{row.name}</Typography>
            <Typography variant="caption" color={theme=> theme.palette.grey.A400}>{row.tagline}</Typography>
          </Stack>
        </Stack>
      )
    }

  },
  {
    field: 'body',
    headerName: 'Testimonial',
    flex: 1,
    sortable: false,
    filterable: false
  },
  {
    field: 'created_at',
    headerName: 'Date',
    width: 110,
    renderCell: ({value}) => {
      return new Date(value).toLocaleDateString('en-us');
    }
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    renderCell: (props) => {
      const row  = props.row as Testimonial
      const ChipComponent = STATUS_MAP[row.status || "PENDING"]
      return ChipComponent;
    }
  }
];

//@ts-ignore
const Page = ({fallback, ...rest}) =>
  <SWRConfig value={{fallback}}>
    <ProductDashboard {...rest} />
  </SWRConfig>

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// type ExpandedProject = Project & {testimonials: Testimonial[]}

const ProductDashboard: React.FC = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial>();
  const router = useRouter();
  const { data: testimonials } = useSWR<Testimonial[]>(`/api/project/${router.query.id}/testimonials`, fetcher)
  return (
      <Layout>
        <Card sx={{height: "100%", display: 'flex', flexDirection: 'column', padding: 3, borderRadius: 0, border: 0}}>
          <CardHeader title={'Your Testimonials'} />
          <CardContent sx={{flex: 1}}>
            <DataGrid
              sx={{border: 0}}
              rows={testimonials as Testimonial[]}
              columns={columns}
              hideFooterPagination
              disableRowSelectionOnClick
              disableColumnMenu
              hideFooter
              onRowClick={({row}) => setSelectedTestimonial(row)}
              />
          </CardContent>
        </Card>
        <TestimonialDetails testimonial={selectedTestimonial} onClose={() => setSelectedTestimonial(undefined)}/>
      </Layout>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const project = await db.project.findUnique({
    where: { id: String(id) },
    include: {testimonials: true}
  });
  const testimonial = project?.testimonials || [];
  return { props: {
    fallback: {
      [`/api/project/${id}/testimonials`]: JSON.parse(JSON.stringify(testimonial))
    }
  }}
}

export default Page
