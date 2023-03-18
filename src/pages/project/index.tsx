import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import db from '@/models'
import type { Project } from '@/types/Project'
import {
  Box,
  Container,
  Typography,
  MenuItem,
  MenuList,
  ListItemText
} from '@mui/material';


const ProjectList: React.FC<{projects: Project[]}> = ({projects}) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          <MenuList>
          {
              projects.map((proj, idx) => {
                return (
                  <MenuItem
                    key={idx}
                    component={Link}
                    href={`/project/${proj.id}`}>
                    <ListItemText>
                      {proj.name}
                    </ListItemText>
                  </MenuItem>
                );
              })
            }
          </MenuList>
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