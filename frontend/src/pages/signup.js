// import MobileLoginNav from "../partials/mobileLoginNav";
// import UsernameInput from "../partials/components/usernameInput";
// import PasswordInput from "../partials/components/passwordInput";
// import FirstNameInput from "../partials/components/firstNameInput";
// import LastNameInput from "../partials/components/lastNameInput";
// import SignupButton from "../partials/components/signupButton";
// import "../styles/signupPage.css";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { axios } from "axios";

// const containerVariant = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       when: "beforeChildren",
//       staggerChildren: 0.3,
//     },
//   },
// };

// const navbarVariant = {
//   hidden: {
//     opacity: 0,
//     x: -50,
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.35,
//       ease: "easeOut",
//     },
//   },
// };

// const contentVariant = {
//   hidden: {
//     opacity: 0,
//     x: -50,
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.35,
//       ease: "easeOut",
//     },
//   },
// };

// const inputVariant = {
//   hidden: {
//     opacity: 0,
//     y: -20,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.35,
//     },
//   },
// };

// function SignupPage() {
//   const [firstNameMobile, setFirstNameMobile] = useState("");
//   const [lastNameMobile, setLastNameMobile] = useState("");
//   const [usernameMobile, setUsernameMobile] = useState("");
//   const [passwordMobile, setPasswordMobile] = useState("");

//   const getFirstNameMobile = (firstNameVal) => {
//     setFirstNameMobile(firstNameVal);
//     console.log("changing mobile first name value");
//   };

//   const getLastNameMobile = (lastNameVal) => {
//     setLastNameMobile(lastNameVal);
//     console.log("changing mobile last name value");
//   };

//   const getUsernameMobile = (usernameVal) => {
//     setUsernameMobile(usernameVal);
//     console.log("changing mobile username value");
//   };

//   const getPasswordMobile = (passwordVal) => {
//     setPasswordMobile(passwordVal);
//     console.log("changing mobile password value");
//   };

//   // check for size

//   // Set up the navigation for redirecting to another page on success
//   const navigate = useNavigate();

//   // function for handling the signup submission

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//   };

//   return (
//     <motion.div
//       className="mainContainer signupContainer"
//       variants={containerVariant}
//       initial="hidden"
//       animate="visible"
//       exit="hidden"
//     >
//       <motion.div variants={navbarVariant}>
//         <MobileLoginNav />
//       </motion.div>
//       <motion.div className="pageContent signupPage" variants={contentVariant}>
//         <h1>Please Sign Up</h1>
//       </motion.div>
//       <motion.form
//         onSubmit={handleFormSubmit}
//         className="pageInputContainer signupInputContainer"
//         variants={inputVariant}
//       >
//         <FirstNameInput getFirstNameMobile={getFirstNameMobile} />
//         <LastNameInput getLastNameMobile={getLastNameMobile} />
//         <UsernameInput getUsernameMobile={getUsernameMobile} />
//         <PasswordInput getPasswordMobile={getPasswordMobile} />
//       </motion.form>
//       <motion.div className="landingButtonContainer" variants={inputVariant}>
//         <SignupButton />
//       </motion.div>
//     </motion.div>
//   );
// }

// export default SignupPage;
