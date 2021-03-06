const { Assignment, User } = require('@/models');

class AssignmentService {
  constructor(Assignment) {
    this.Assignment = Assignment;
  }

  async getAssigneesByAllIssues() {
    try {
      const assignees = await this.Assignment.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'nickname', 'image'],
          },
        ],
        group: ['id', 'issue_id'],
        required: false,
      });
      return assignees;
    } catch (err) {
      throw Error(err);
    }
  }
  async getAssigneesByIssue(issueID) {
    try {
      const assignees = await this.Assignment.findAll({
        where: { issue_id: issueID },
        include: [
          {
            model: User,
            attributes: ['id', 'nickname', 'image'],
          },
        ],
        required: false,
      });
      return assignees;
    } catch (err) {
      throw Error(err);
    }
  }
  async create(issueID, assignees, transaction) {
    try {
      const bulkData = assignees.map(assignee => {
        const data = Object.assign({ issue_id: issueID }, { assignee });
        return data;
      });

      const result = await this.Assignment.bulkCreate(bulkData, {
        transaction: transaction,
      });

      return result ? true : false;
    } catch (err) {
      throw Error(err);
    }
  }
  async removeAllByIssueID(issueID, transaction) {
    try {
      const removed = this.Assignment.destroy({
        where: { issue_id: issueID },
        transaction: transaction,
      });
      return removed;
    } catch (err) {
      throw Error(err);
    }
  }
}

module.exports = new AssignmentService(Assignment);
