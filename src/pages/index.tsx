import getCurrentUser from "@/actions/getCurrentUser";
import MainContent from "@/components/layouts/MainContent";
import CarouselRoomCard from "@/components/rooms/RoomCard";
import RoomCardSkeleton from "@/components/rooms/RoomCardSkeleton";
import { SafeUser } from "@/types";
import { useIntersection } from "@mantine/hooks";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import { useRouter as useNavRouter } from "next/navigation";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useEffect, useRef } from "react";

const EmptyResults = () => {
  const router = useNavRouter();
  return (
    <MainContent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "1.4rem", sm: "1.9rem" },
            fontWeight: 500,
          }}
        >
          No exact matches
        </Typography>
        <Typography>Try changing or removing some filters</Typography>
        <Box>
          <Button onClick={() => router.push("/")}>Remove all filters</Button>
        </Box>
      </Box>
    </MainContent>
  );
};

type HomeProps = {
  currentUser: SafeUser;
};

export default function Home({ currentUser }: HomeProps) {
  const router = useRouter();
  const searchParams = router.query;

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      ["rooms", searchParams],
      async ({ pageParam = 1 }) => {
        const response = await axios.get(
          `/api/get-rooms?${queryString.stringify({
            page: pageParam,
            ...searchParams,
          })}`
        );
        return response.data;
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.length === 0) {
            return null;
          }
          return allPages.length + 1;
        },
      }
    );
  const skeletonCount = 6;
  const skeletons = [...Array(skeletonCount)].map((_, i) => (
    <Grid item xs={12} sm={6} md={4} key={i}>
      <RoomCardSkeleton />
    </Grid>
  ));

  const lastRoomRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastRoomRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) fetchNextPage();
  }, [entry, hasNextPage]);

  const rooms = data?.pages.flatMap((page) => page);

  if (rooms?.length === 0) {
    return <EmptyResults />;
  }

  return (
    <>
      <Head>
        <title>Vacation Homes & Condo Rentals - Airbnb</title>
        <meta
          name="description"
          content="Discover the best vacation homes and condo rentals. AirbnbClone makes it easy to find and book unique accommodations anywhere in the world."
        />

        <meta
          property="og:title"
          content="Vacation Homes & Condo Rentals - AirbnbClone"
        />
        <meta
          property="og:description"
          content="Discover the best vacation homes and condo rentals. AirbnbClone makes it easy to find and book unique accommodations anywhere in the world."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={router.asPath} />
        <meta property="og:image" content="/airbnb-icon.svg" />

        <meta name="twitter:card" content="/airbnb-icon.svg" />
        <meta name="twitter:creator" content="@patrikzit" />
        <meta
          name="twitter:title"
          content="Vacation Homes & Condo Rentals - AirbnbClone"
        />
        <meta
          name="twitter:description"
          content="Discover the best vacation homes and condo rentals. AirbnbClone makes it easy to find and book unique accommodations anywhere in the world."
        />
        <meta name="twitter:image" content="/airbnb-icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MainContent>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          px={"2rem"}
          sx={{
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          {rooms?.map((room, i) => (
            <Grid
              ref={i === rooms.length - 1 ? ref : null}
              item
              xs={12}
              sm={6}
              md={4}
              key={room.id}
            >
              <CarouselRoomCard room={room} currentUser={currentUser} />
            </Grid>
          ))}
          {isFetchingNextPage && hasNextPage && skeletons}
        </Grid>
      </MainContent>
    </>
  );
}

export async function getServerSideProps({ req, res }: any) {
  const currentUser = await getCurrentUser(req, res);
  return {
    props: {
      currentUser,
    },
  };
}
