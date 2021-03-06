const { Comment, User } = require('@/models');
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

  async getAuthorByCommentID(id) {
    const comment = await this.Comment.findByPk(id);
    return comment;
  }

  async getCommentsByIssueID(issueID) {
    try {
      const comments = await this.Comment.findAll({
        attributes: ['id', 'content', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['id', 'nickname', 'image'],
            order: [['createdAt', 'DESC']],
          },
        ],
        where: { issue_id: issueID },
        order: ['id'],
        required: false,
      });
      return comments;
    } catch (err) {
      throw Error(err);
    }
  }

  async createIssueComment(content, issueID, userID, transaction) {
    try {
      const result = await this.Comment.create(
        {
          is_issue: true,
          content,
          issue_id: issueID,
          user_id: userID,
        },
        { transaction: transaction }
      );

      return result.id;
    } catch (err) {
      throw Error(err);
    }
  }

  async create(content, issueID, userID) {
    const result = await this.Comment.create({
      is_issue: false,
      content,
      issue_id: issueID,
      user_id: userID,
    });

    return result.id;
  }

  async update(content, id) {
    await this.Comment.update({ content }, { where: { id } });
  }
}

module.exports = new CommentService(Comment);
