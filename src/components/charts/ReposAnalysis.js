import React, { useContext } from "react";
import LanguagePieChart from "./LanguagePieChart";
import styled from "styled-components";
import StarsDoughnut from "./StarsDoughnut";
import MostPopularColumn from "./MostPopularColumn";
import MostForkedBar from "./MostForkedBar";
import GithubContext from "../../store/github-data";

function ReposAnalysis() {
  const { repos } = useContext(GithubContext);

  const languages = repos.reduce((acc, curr) => {
    const { language, stargazers_count: cnt } = curr;

    if (!language) {
      return acc;
    }

    if (acc[language]) {
      acc[language] = {
        label: language,
        value: acc[language].value + 1,
        stars: acc[language].stars + cnt,
      };
    } else {
      acc[language] = { label: language, value: 1, stars: cnt };
    }

    return acc;
  }, {});

  const mostUsed = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const mostPopular = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 8)
    .map((curr) => {
      return { label: curr.label, value: curr.stars };
    });

  // Stars, Forks

  let { stars, forks } = repos.reduce(
    (acc, curr) => {
      const { stargazers_count: starsCnt, name, forks } = curr;

      acc.stars[starsCnt] = { label: name, value: starsCnt };
      acc.forks[forks] = { label: name, value: forks };
      return acc;
    },
    {
      stars: {},
      forks: {},
    }
  );

  stars = Object.values(stars).slice(-8).reverse();

  forks = Object.values(forks).slice(-8).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <LanguagePieChart data={mostUsed} />
        <MostPopularColumn data={stars} />
        <StarsDoughnut data={mostPopular} />
        <MostForkedBar data={forks} />
      </Wrapper>
    </section>
  );
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default ReposAnalysis;
