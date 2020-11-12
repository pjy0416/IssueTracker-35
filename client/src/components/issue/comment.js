import React from 'react';
import styled from 'styled-components';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import { Div } from '@/styles/styled';
import getTimestamp from '@/utils/timestamp';

const Container = styled.div`
  display: flex;
  flex: 1 1;
  justify-content: center;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 1rem;
`;

const ProfileImage = styled.img`
  object-fit: cover; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  margin: 10px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const ContentContainer = styled.div`
  margin: 10px 35px 0 20px;
  flex: 1 1;
  border: 1px solid ${color.LIGHT_GRAY};
  border-radius: 7px;
`;

const Header = styled(Div.row)`
  justify-content: space-between;
  border-bottom: 1px solid ${color.LIGHT_GRAY};
  padding: 10px;
  background-color: ${color.THIN_GRAY};
`;

const HeaderLeft = styled(Div.row)`
  justify-content: space-between;
`;

const Nickname = styled.span`
  font-size: ${size.DEFAULT_FONT_SIZE};
  font-weight: 600;
  margin-right: 10px;
`;

const Timestamp = styled.span`
  font-size: ${size.DEFAULT_FONT_SIZE};
  font-weight: 400;
`;

const Body = styled.div`
  padding: 10px;
`;

const Comment = ({ comment }) => {
  return (
    <Container>
      <ProfileImage src={comment.owner.image} alt="" />
      <ContentContainer>
        <Header>
          <HeaderLeft>
            <Nickname>{comment.owner.nickname}</Nickname>
            <Timestamp>
              commented {getTimestamp(new Date(), comment.createdAt)}
            </Timestamp>
          </HeaderLeft>
        </Header>
        <Body>{comment.content}</Body>
      </ContentContainer>
    </Container>
  );
};

export default Comment;
