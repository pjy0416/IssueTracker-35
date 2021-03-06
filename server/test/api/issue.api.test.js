/* eslint-disable jest/no-done-callback */
const request = require('supertest');
const app = require('@/app');
const { users, expectedUserToken } = require('@test/seeds/user');
const { expectedLabels } = require('@test/seeds/label');
const { status } = require('@test/api/response-status');
const { issueIds, otherIssue } = require('@test/seeds/issue');
const { DEFAULT_PROFILE_IMAGE_URL } = require('@/utils/auth');

describe('retrieve all issues', () => {
  const ALL_ISSUE_URL = '/issues';

  it('successfully', done => {
    //given
    const expectedIssue = {
      id: 3,
      title: '세 번째 이슈입니다.',
      isOpen: true,
      author: { nickname: 'user11' },
      milestone: [],
      assignees: [Object.assign({}, users[2], { password: undefined })],
      labels: [Object.assign({}, expectedLabels[1], { content: undefined })],
      commentCount: 2,
    };
    try {
      //when
      request(app)
        .get(ALL_ISSUE_URL)
        .set('Authorization', expectedUserToken)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { issues } = res.body;
          const recievedIssue = issues.find(
            issue => issue.id === expectedIssue.id
          );
          delete recievedIssue.createdAt;
          delete recievedIssue.updatedAt;

          //then
          expect(true).toBe(true);
          expect(recievedIssue).toEqual(expectedIssue);
          expect(issues.length).toBeGreaterThanOrEqual(issueIds.size); // issue create test에서 하나 증가했음 (나중에 delete test도 되면, size 그대로 설정)
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('with invalid token -> 401 Unauthorized', done => {
    try {
      request(app)
        .get(ALL_ISSUE_URL)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { code, message } = res.body;
          expect(code).toBe(status.code.UNAUTHORIZED);
          expect(message).toBe(status.message.UNAUTHORIZED);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});

describe('retrieve issue details', () => {
  const ISSUE_DETAIL_URL = '/issues/2';

  it('successfully', done => {
    //given
    const expectedIssue = {
      id: 2,
      title: '두 번째 이슈입니다.',
      isOpen: true,
      author: 'user11',
      milestone: { id: 1, title: 'sprint 2' },
      labels: [
        {
          id: expectedLabels[0].id,
          title: expectedLabels[0].title,
          color: expectedLabels[0].color,
        },
      ],
      assignees: [
        {
          id: 2,
          nickname: 'user22',
          image: DEFAULT_PROFILE_IMAGE_URL,
        },
      ],
      comments: [
        {
          id: 2,
          content: '두 번째 이슈 내용~!!',
          owner: { id: 1, nickname: 'user11', image: 'hi' },
        },
        {
          id: 4,
          content: '두 번째 이슈에 대한 댓글!!!!#!',
          owner: {
            id: 2,
            nickname: 'user22',
            image:
              'https://user-images.githubusercontent.com/49153756/98246728-0696ff00-1fb6-11eb-8303-162a5bc3581b.png',
          },
        },
      ],
    };
    try {
      //when
      request(app)
        .get(ISSUE_DETAIL_URL) // when
        .set('Authorization', expectedUserToken)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { issue } = res.body;
          delete issue.createdAt;
          delete issue.comments.createdAt;
          issue.comments.forEach(comment => {
            delete comment.createdAt;
          });

          //then
          expect(issue).toStrictEqual(expectedIssue);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
  it('with invalid token -> 401 Unauthorized', done => {
    try {
      request(app)
        .get(ISSUE_DETAIL_URL)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          const { code, message } = res.body;
          expect(code).toBe(status.code.UNAUTHORIZED);
          expect(message).toBe(status.message.UNAUTHORIZED);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});

describe('update title of an issue', () => {
  const ISSUE_DETAIL_URL = `/issues/${otherIssue.id}`;
  const data = { title: '우욱' };

  it('successfully', done => {
    try {
      request(app)
        .patch(ISSUE_DETAIL_URL)
        .set('Authorization', expectedUserToken)
        .send(data)
        .end((err, res) => {
          const { code } = res.body;
          expect(code).toBe(status.code.SUCCESS);
          done();
        });
    } catch (err) {
      done(err);
    }
  });

  it('with invalid title', done => {
    try {
      request(app)
        .patch(ISSUE_DETAIL_URL)
        .set('Authorization', expectedUserToken)
        .send({ data: { title: '?' } })
        .end((err, res) => {
          const { code } = res.body;
          expect(code).toBe(status.code.BAD_REQUEST);
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});
