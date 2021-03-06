import React, { useState } from 'react';
import styled from 'styled-components';
import CogWheel from '@/styles/svgs/cogwheel';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import Modal from '@/components/issue/modal';

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${color.LIGHT_GRAY};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${color.DARK_GRAY};

  &:hover {
    cursor: pointer;
    color: ${color.BLUE};
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: ${({ isColumn }) => (isColumn ? 'column' : 'row')};
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  font-size: 14px;
  margin: 0 0 10px 0;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 14px;
  margin: 10px 0;
`;

const SideBarItem = ({
  headerText,
  title,
  textContent,
  handleChange,
  selected,
  component,
  renderContent,
  isColumn = true,
}) => {
  const [isVisible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = checked => {
    setVisible(false);
    handleChange(checked);
  };

  return (
    <Container>
      <Header onClick={showModal}>
        <Title>{title}</Title>
        <CogWheel />
      </Header>
      <Body isColumn={isColumn}>
        {selected?.size
          ? [...selected.values()].map(renderContent)
          : textContent}
      </Body>
      {isVisible && (
        <Modal
          title={headerText}
          selected={selected}
          hideModal={hideModal}
          component={component}
        ></Modal>
      )}
    </Container>
  );
};

export default SideBarItem;
