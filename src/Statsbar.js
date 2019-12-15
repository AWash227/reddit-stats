import React from "react";
import styled from "styled-components";
import { numberWithCommas } from "./funcs";

const StatsbarWrapper = styled.div`
  width: 100%;
  padding: 0.25rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: flex-start;
  justify-items: center;
  flex-wrap: wrap;
`;

const Stat = styled.span`
  margin: 0.25rem 0.5rem 0.25rem 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background-color: ${props =>
    props.color === "red"
      ? "#ef9a9a"
      : props.color === "blue"
      ? "#81D4FA"
      : props.color === "purple"
      ? "#B39DDB"
      : "#EEEEEE"};
  color: ${props =>
    props.color === "red"
      ? "#c62828"
      : props.color === "blue"
      ? "#1565C0"
      : props.color === "purple"
      ? "#4527A0"
      : "#424242"};
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const Statsbar = ({ title, subs, active, avgTitle, avgWords }) => (
  <StatsbarWrapper>
    {title ? (
      <Stat>
        <strong>{title}</strong>
      </Stat>
    ) : null}
    {subs ? (
      <Stat color="blue">
        {subs ? `Subscribers: ${numberWithCommas(subs)}` : null}
      </Stat>
    ) : null}
    {active ? (
      <Stat color="red">
        {active ? `Active users: ${numberWithCommas(active)}` : null}
      </Stat>
    ) : null}
    {avgTitle ? (
      <Stat color="purple">{`Avg Title Length: ${avgTitle} chars`}</Stat>
    ) : null}
    {avgWords ? <Stat>{`Avg # Words: ${avgWords} words`}</Stat> : null}
  </StatsbarWrapper>
);
