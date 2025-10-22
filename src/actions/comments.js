"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function saveComment({ postId, parentCommentId }, formData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to comment.");
  }

  const comment = formData.get("comment");
  if (!comment || comment.trim().length === 0) {
    throw new Error("Comment cannot be empty");
  }

  await db.query(
    "INSERT INTO comments (user_id, post_id, parent_comment_id, body) VALUES ($1, $2, $3, $4)",
    [session.user.id, postId, parentCommentId, comment]
  );

  revalidatePath(`/post/${postId}`);
  return { success: true };
}
