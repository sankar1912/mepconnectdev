import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, logOutRequest } from "../redux/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import {
  ExploreOutlined,
  Group,
  Home,
  PersonSearch,
  AccountCircle,
  Logout,
  Inbox,
  CheckCircle,
  Search,
  AddCircle,
  VolunteerActivism,
  Explore,
  FilterFrames,
  Payment,
  ChildFriendly,
  LightMode,
  Light,
  DarkMode,
  Verified,
  Edit,
  DeleteForever,
  PasswordOutlined,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useThemeMode } from "../themes/ThemeContext";

const pages = [
  {
    name: "Notice Board",
    loc: "contact",
    icon: <FilterFrames sx={{ color: { xs: "primary.main", md: "white" } }} />,
  },
  {
    name: "Jobs",
    loc: "jobs",
    icon: (
      <ExploreOutlined sx={{ color: { xs: "primary.main", md: "white" } }} />
    ),
  },
  {
    name: "People",
    loc: "searchpeople",
    icon: <PersonSearch sx={{ color: { xs: "primary.main", md: "white" } }} />,
  },
  {
    name: "Friends",
    loc: "friends",
    icon: <Group sx={{ color: { xs: "primary.main", md: "white" } }} />,
  },
  {
    name: "Home",
    loc: "",
    icon: <Home sx={{ color: { xs: "primary.main", md: "white" } }} />,
  },
];
const jobs = [
  { name: "Search", loc: "jobs/search", icon: <Search color="primary" /> },
  {
    name: "Applied",
    loc: "jobs/applied",
    icon: <CheckCircle color="primary" />,
  },
  { name: "Create", loc: "jobs/create", icon: <AddCircle color="primary" /> },
];

const erp = [
  { name: "Requests", loc: "erp/requests", icon: <Verified color="primary" /> },
  {
    name: "Edit",
    loc: "erp/edit",
    icon: <Edit color="primary" />,
  },
  { name: "Manage", loc: "erp/manage", icon: <DeleteForever color="primary" /> },
];

const homeDetails = [
  { name: "Explore", loc: "", icon: <Home color="primary" /> },
  { name: "Friends", loc: "/friends", icon: <Group color="primary" /> },
  {
    name: "Payments",
    loc: "profile/payments",
    icon: <Payment color="primary" />,
  },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [activePage, setActivePage] = React.useState("");

  const { auth } = useSelector(getAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const settings = [
    {
      name: "Profile",
      loc: "myprofile",
      icon: <AccountCircle fontSize="small" color="primary" />,
    },
    {
      name:"Reset Password",
      loc:"user/forgotpassword",
      icon:<PasswordOutlined fontSize="small" color="primary"/>
    }
    ,
    {
      name: "Logout",
      loc: "logout",
      icon: <Logout fontSize="small" color="primary" />,
    },
  ];

  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgb(25, 118, 210)",
        width: "100%",
        paddingLeft: "20px",
        color: "black",
        height: "8vh",
      }}
    >
      <Toolbar disableGutters>
        <img src="/Assets/img/mepco.png" width="50px" height="50px" alt="Img" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              padding: "15px",
              mr: 5,
              display: { xs: "none", sm: "none", md: "flex" },
              fontFamily: "Poppins",
              fontWeight: 1000,
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            MEPCO
          </Typography>
        </motion.div>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            aria-label="menu"
            onClick={handleOpenNavMenu}
          >
            <MenuIcon sx={{color:'white'}} />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiPaper-root": {
                borderRadius: 3,
                // backgroundColor: "#fefefe",
                // boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
                padding: 1,
              },
            }}
          >
            {pages.map((job) => (
              <MenuItem
                key={job.loc}
                onClick={() => {
                  if (job.name === "Go Home") {
                    localStorage.removeItem("start");
                  }
                  navigate(`${job.loc}`);
                  handleCloseUserMenu();
                }}
                sx={{
                  px: 2,
                  py: 1,
                  transition: "background 0.2s ease",
                  "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.1)" },
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  {job.icon}
                  <Typography sx={{ fontFamily: "Poppins", fontSize: 14 }}>
                    {job.name}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
          variant="h6"
          noWrap
          sx={{
            display: { xs: "flex", md: "none" },
            fontFamily: "Poppins",
            letterSpacing: ".3rem",
            color: "white",
            textDecoration: "none",
          }}
        >
          MEPCO
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: {
              xs: "none",
              md: "flex",
              marginRight: "40px",
              flexDirection: "row-reverse",
            },
            justifyContent: "center",
          }}
        >
          {pages.map((page) => (
            <Button
              key={page.loc}
              onClick={() => {
                navigate(`/${page.loc}`);
                setActivePage(page.loc);
              }}
              sx={{
                my: 2,
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                justifyContent: "left",
                fontSize: "1rem",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor:
                    activePage === page.loc ? "white" : "transparent",
                  transition: "background-color 0.3s ease",
                },
                "&:hover": {
                  "&::after": {
                    color: "rgba(3, 91, 255, 0.7)",
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {page.icon}
              </Box>
              <Typography sx={{ fontSize: 12, fontFamily: "Poppins" }}>
                {page.name}
              </Typography>
            </Button>
          ))}
        </Box>

        {/* <IconButton onClick={()=>{toggleMode()}}>
           {mode ==="light" ? (<DarkMode/>):(<LightMode/>)} 
          </IconButton> */}

        {auth?.isLoggedIn ? (
          <Box sx={{ flexGrow: 0, marginRight: "2%" }}>
            <Tooltip title="Open Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="img"
                  src={auth.user.profileImage}
                  sx={{ width: 50, height: 50 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
                "& .MuiPaper-root": {
                  borderRadius: 2,
                  padding: "8px 0",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
                  minWidth: 220,
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "flex",
                  flexDirection: window.innerWidth < 900 ? "column" : "row",
                }}
              >
                <Box px={2}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", color: "text.secondary", mb: 1 }}
                  >
                    Activities
                  </Typography>
                  {homeDetails.map((job) => (
                    <MenuItem
                      key={job.loc}
                      onClick={() => {
                        if (job.name === "Go Home") {
                          localStorage.removeItem("start");
                        }
                        navigate(`${job.loc}`);
                        handleCloseUserMenu();
                      }}
                      sx={{
                        px: 2,
                        py: 1,
                        transition: "background 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.1)",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        {job.icon}
                        <Typography
                          sx={{ fontFamily: "Poppins", fontSize: 14 }}
                        >
                          {job.name}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Box>
                <hr />
                <Box px={2}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", color: "text.secondary", mb: 1 }}
                  >
                    Your Jobs
                  </Typography>
                  {jobs.map((job) => (
                    <MenuItem
                      key={job.loc}
                      onClick={() => {
                        navigate(`/${job.loc}`);
                        handleCloseUserMenu();
                      }}
                      sx={{
                        px: 2,
                        py: 1,
                        transition: "background 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.1)",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        {job.icon}
                        <Typography
                          sx={{ fontFamily: "Poppins", fontSize: 14 }}
                        >
                          {job.name}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Box>

                {auth?.user?.role === "admin" && (
                  <>
                    <hr />
                    <Box px={2}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: "bold",
                          color: "text.secondary",
                          mb: 1,
                        }}
                      >
                        ERP
                      </Typography>
                      {erp.map((job) => (
                        <MenuItem
                          key={job.loc}
                          onClick={() => {
                            navigate(`/${job.loc}`);
                            handleCloseUserMenu();
                          }}
                          sx={{
                            px: 2,
                            py: 1,
                            transition: "background 0.2s ease",
                            "&:hover": {
                              backgroundColor: "rgba(25, 118, 210, 0.1)",
                            },
                          }}
                        >
                          <Box display="flex" alignItems="center" gap={1}>
                            {job.icon}
                            <Typography
                              sx={{ fontFamily: "Poppins", fontSize: 14 }}
                            >
                              {job.name}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Box>
                  </>
                )}
                <hr />
                <Box px={2} mb={1}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", color: "text.secondary", mb: 1 }}
                  >
                    Account
                  </Typography>
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.loc}
                      onClick={() => {
                        setActivePage("");
                        if (setting.loc === "logout") {
                          dispatch(logOutRequest());
                          navigate("/");
                        } else {
                          navigate(`/${setting.loc}`);
                        }
                        handleCloseUserMenu();
                      }}
                      sx={{
                        px: 2,
                        py: 1,
                        transition: "background 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.1)",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        {setting.icon}
                        <Typography
                          sx={{ fontFamily: "Poppins", fontSize: 14 }}
                        >
                          {setting.name}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Box>
              </motion.div>
            </Menu>
          </Box>
        ) : (
          <Button sx={{ color: "white" }} onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
