import {
  createCommentService,
  getCommentsService,
  updateCommentService
} from "../services/comment.service.js"

export const addComment = async (req, res) => {
  const { taskId, comment } = req.body;
  const userId = req.user.id;

  if (!comment || !comment.trim()) {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }

  const result = await createCommentService(taskId, userId, comment.trim());
  res.json(result);
};

export const getComments = async (req, res) => {
  const { taskId } = req.params;
  const result = await getCommentsService(Number(taskId));
  res.json(result);
};

export const editComment = async (req, res) => {
  try {
    // FIX: Extract id and parse it to an Integer cleanly
    const idParam = req.params.id;
    const parsedId = parseInt(idParam, 10);

    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "Invalid comment id" });
    }

    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: "Comment required" });
    }

    // Pass the parsed Integer to the service
    const updated = await updateCommentService(parsedId, comment);

    res.json(updated);
  } catch (err) {
    console.error("UPDATE COMMENT ERROR:", err); 
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};