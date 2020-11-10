const { Comment } = require('@/models');
const { fn, col } = require('sequelize');
class CommentService {
  constructor(Comment) {
    this.Comment = Comment;
  }

  async getCommentCount() {
    try {
      const comments = await this.Comment.findAndCountAll({
        attributes: ['issue_id', [fn('COUNT', col('id')), 'comment_count']],
        where: { is_issue: false },
        group: 'issue_id',
      });
      return comments;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new CommentService(Comment);
