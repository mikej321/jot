import { motion } from "framer-motion";
import "../../styles/dashboard.css";

function DashboardCanvas({ children, dashboardState }) {
  return (
    <motion.div
      className={`dashboardCanvas ${
        dashboardState === "main"
          ? "mainCanvas"
          : dashboardState === "jots"
          ? "jotCanvas"
          : dashboardState === "add"
          ? "addCanvas"
          : ""
      }`}
      transition={{
        staggerChildren: 0.3,
      }}
    >
      {children}
    </motion.div>
  );
}

/* Note to self

When I make the searchbar with the dividers
on the top and bottom, there are 2 ways I can do it
that I know of off the top of my head. I can either
put the searchbar and icon inside of a container and make
the container's left and right border transparent
while making the top and bottom the color and height
of the design or I could make the dividers separately.
I think I am going to make it the first way for convenience
and when it's converted to desktop, I'll just revert
all of the properties of the container and make the
border fully transparent.

*/

export default DashboardCanvas;
