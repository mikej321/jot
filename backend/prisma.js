const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/* Use this statement for testing to delete everything from the database */

// const main = async () => {
//   try {
//     await prisma.user.deleteMany();
//     console.log("all users deleted");
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// main();

module.exports = prisma;
