import express from "express";
import {getPassSuggestion,vote,getTotalSuggestion,getProponentByIdx,getSuggestByIdx,setSuggest} from "./vote.js";
const router = express.Router();

router.post("/suggest",setSuggest);
router.get("/suggestion/:suggestionIdx",getSuggestByIdx);
router.get("/proponent/:suggestionIdx",getProponentByIdx);
router.get("/total",getTotalSuggestion);
router.get("/passed",getPassSuggestion);
router.post("/voting",vote);

export default router;
