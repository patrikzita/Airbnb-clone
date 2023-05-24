import getAllRoomsIds from "@/actions/getAllRoomsIds";
import getRoomById from "@/actions/getRoomById";
import { Box, Typography } from "@mui/material";

export default function Page({ room }: any) {
  return (
    <main>
      <Box>
        <Typography>{room.title}</Typography>
      </Box>
    </main>
  );
}

export async function getStaticProps({ params }: any) {
  const room = await getRoomById({ roomId: params.id });

  return {
    props: {
      room,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const roomIds = await getAllRoomsIds();

  if (!roomIds) {
    return { paths: [], fallback: false };
  }
  const paths = roomIds.map((id) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: false };
}
