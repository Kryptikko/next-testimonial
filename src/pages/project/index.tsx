import React from 'react'
import Head from '@/components/layout/Head'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import db from '@/models'
import type { Project } from '@/types/Project'
import {
  Box,
  Button,
  Container,
  Typography,
  ListItemText
} from '@mui/material';


const ProjectList: React.FC<{projects: Project[]}> = ({projects}) => {
  return (
    <>
      <Head />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          }}
        >
        <Typography>Select a project:</Typography>
          {
            projects.map((proj, idx) => {
              return (
                <Button
                  key={idx}
                  variant="outlined"
                  component={Link}
                  href={`/project/${proj.id}`}>
                  {proj.name}
                </Button>
              );
            })
          }
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const projects = await db.project.findMany();

    // serializing the date fields, TODO: find a cleaner solution
    return { props: { projects: JSON.parse(JSON.stringify(projects)) } }
}

export default ProjectList;
