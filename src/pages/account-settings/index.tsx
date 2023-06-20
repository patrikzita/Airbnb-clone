import getCurrentUser from "@/actions/getCurrentUser";
import CustomHead from "@/components/Others/CustomHead";
import MainContent from "@/components/layouts/MainContent";
import useCreateHomeModal from "@/hooks/useCreateHomeModal";
import { SafeUser } from "@/types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-hot-toast";
type AccountSettingsPage = {
  currentUser?: SafeUser;
};

const AccountSettingsPage = ({ currentUser }: AccountSettingsPage) => {
  const createHomeModal = useCreateHomeModal();

  return (
    <CustomHead
      title="Account Settings - Airbnb"
      description="Manage your Airbnb clone account settings. Update your personal details, preferences, and security settings. Access options for logout and more."
    >
      <MainContent>
        <Typography
          component="h1"
          color="initial"
          sx={{ fontSize: "1.7rem", fontWeight: 500 }}
        >
          Profile
        </Typography>
        <Box
          mt={2}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            onClick={() => toast.error("Function is not available. ")}
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              gap: 3,
              cursor: "pointer",
            }}
          >
            <Avatar
              alt={`${currentUser?.name}'s name`}
              src={currentUser?.image?.toString()}
              sx={{ width: 50, height: 50 }}
            />
            <Box>
              <Typography variant="body1" color="initial">
                {currentUser?.name}
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontWeight: "300", fontSize: ".9rem" }}
              >
                Show profile
              </Typography>
            </Box>
          </Box>
          <Box>
            <ArrowForwardIosIcon />
          </Box>
        </Box>
        <Divider sx={{ marginBlock: 2 }} />
        <Paper sx={{ p: 3, borderRadius: 4 }} onClick={createHomeModal.onOpen}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
                Airbnb your place
              </Typography>
              <Typography sx={{ fontSize: ".8rem", fontWeight: 300 }}>
                It’s simple to get set up and start earning.
              </Typography>
            </Box>
            <Image
              src="/images/b0021c55-05a2-4449-998a-5593567220f7.jpg"
              width={60}
              height={60}
              alt="Airbnb home"
            />
          </Box>
        </Paper>
        <Button
          variant="outlined"
          color="inherit"
          sx={{
            mt: 4,
            width: "100%",
            fontSize: "1.2rem",
          }}
          onClick={() => signOut()}
        >
          Log Out
        </Button>
      </MainContent>
    </CustomHead>
  );
};
export default AccountSettingsPage;

export async function getServerSideProps({ req, res }: any) {
  const currentUser = await getCurrentUser(req, res);

  if (!currentUser) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      currentUser,
    },
  };
}
