const cron = require("node-cron");
const { sendMonthlyReport } = require("../controllers/monthlyEmail");


cron.schedule("0 9 1 * *", async () => {
  console.log("Running monthly email job...");
  await sendMonthlyReport();
});


// (async () => {
//   console.log("Running monthly email job manually for testing...");
//   await sendMonthlyReport();
// })();
