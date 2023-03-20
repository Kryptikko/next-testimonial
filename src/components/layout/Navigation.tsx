import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Avatar,
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import useUser from "@/hooks/useUser";
import type { Project } from "@/types/Project";

const CollectSection = () => {
  const router = useRouter();
  return (
    <>
      <Typography fontWeight={"bold"} variant='button' sx={{marginLeft: 2, color: "grey"}}>COLLECT</Typography>
      <MenuList>
        <MenuItem
          selected={router.route === "/project/[id]/import"}
          component={Link}
          href={`/project/${router.query.id}/import`}
        >
          <ListItemIcon><SystemUpdateAltOutlinedIcon /></ListItemIcon>
          <ListItemText primaryTypographyProps={{variant: "body2"}}>Import Testimonials</ListItemText>
        </MenuItem>
      </MenuList>
    </>
  )
}


const ManageSection = () => {
  const router = useRouter();
  return (
    <>
      <Typography fontWeight={"bold"} variant='button' sx={{marginLeft: 2, color: "grey"}}>MANAGE</Typography>
      <MenuList>
        <MenuItem
          selected={router.route === "/project/[id]/testimonials"}
          component={Link}
          href={`/project/${router.query.id}/testimonials`}
         >
          <ListItemIcon><FavoriteBorderOutlinedIcon /></ListItemIcon>
          <ListItemText primaryTypographyProps={{variant: "body2"}}>Testimonials</ListItemText>
        </MenuItem>
      </MenuList>
    </>
  )
}


export default function Navigation() {
  const { user } = useUser();
  const router = useRouter();
  const project = user?.projects?.find((project: Project) => project.id === router.query.id)
  return (
    <Paper sx={{
        padding: 2,
        width: "300px",
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        bgcolor: theme => theme.palette.grey.A100
      }}
      >
      <Stack direction={'row'} alignItems="center" gap={2} p={2} pb={5}>
        <Avatar src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" />
        <Typography fontWeight={"bold"}>{user?.name || "-"}</Typography>
      </Stack>
      <Box flex={1}>
        <CollectSection />
        <ManageSection />
      </Box>
      <Box>
        <Divider />
        {project &&
          <Typography py={2}>{project.name} {`<${project.url}>`}</Typography>
        }
      </Box>
    </Paper>
  )
}
