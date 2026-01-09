const router = require("express").Router();
const { searchVideos } = require("../controllers/searchController");

router.get("/search", searchVideos);

module.exports = router;
