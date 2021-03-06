import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import { Button, Input, Div } from '@/styles/styled';
import Glasses from '@/styles/svgs/glasses';
import LabelIcon from '@/styles/svgs/label';
import MilestoneIcon from '@/styles/svgs/milestone';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  height: 1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
`;

const FilterButton = styled.button`
  border: 1px solid ${color.LIGHT_GRAY2};
  border-right: none;
  border-radius: 5px 0 0 5px;
  height: 30px;
  padding: 5px 16px;
  font-size: ${size.DEFAULT_FONT_SIZE};
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background-color: ${color.LIGHT_GRAY};
  }
`;

const SearchInput = styled(Input)`
  border: 1px solid ${color.LIGHT_GRAY2};
  border-radius: 0 5px 5px 0;
  height: 30px;
  width: 100%;
  padding-left: 2rem;
`;

const ButtonContainer = styled(Div.row)`
  margin: 0px 1rem;
`;

const LabelButton = styled(FilterButton)`
  background-color: transparent;
`;

const MileStoneButton = styled(FilterButton)`
  background-color: transparent;
  border-radius: 0 5px 5px 0;
  border: 1px solid ${color.LIGHT_GRAY2};
`;

const NewIssueButton = styled(Button)`
  font-size: ${size.DEFAULT_FONT_SIZE};
  padding: 5px 16px;
  white-space: nowrap;
  height: 30px;
`;

const Label = styled.label`
  display: flex;
  position: relative;
  width: 100%;
`;

// TODO count style 적용, label, milestone context를 useContext로 받아서 count 출력
const SearchContainer = () => {
  return (
    <Container>
      <FilterContainer>
        <FilterButton>Filters &#9662;</FilterButton>
        <Label>
          <SearchInput />
          <Glasses />
        </Label>
      </FilterContainer>
      <ButtonContainer>
        <Link to="/labels">
          <LabelButton>
            <LabelIcon />
            Labels
          </LabelButton>
        </Link>
        <MileStoneButton>
          <MilestoneIcon />
          Milestones
        </MileStoneButton>
      </ButtonContainer>
      <Link to="/issues/new">
        <NewIssueButton>New issue</NewIssueButton>
      </Link>
    </Container>
  );
};

export default SearchContainer;
