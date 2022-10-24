const express = require("express");
const router = express.Router();
const authorizationMiddleware = require('../middleware/authorization');

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

router.use(authorizationMiddleware);
router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
