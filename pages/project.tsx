import Image from 'next/image';
import styled from 'styled-components';
import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Header, Footer } from '../components';
import ScheduleBox from '../components/ScheduleBox';
import { steps } from '../resources/data/schedule';
import projectsData from '../resources/data/projects';
import { media } from '../styles/theme';
import Projects from '../components/Projects';

const Project = () => (
  <div className="no-scroll-bar" style={{ overflow: 'scroll' }}>
    <TransparentableHeader />
    <TopBackground>
      <Image
        src="/project_background_image.svg"
        alt="project page background"
        layout="fill"
        loading="lazy"
      />
    </TopBackground>
    <CenterAlignedContainer>
      <div className="wrapper">
        <Catchphrase>
          <span className="catchphrase__bold">
            런칭 뿐만 아니라 개선까지 <br />
          </span>{' '}
          특별한 경험을 제공합니다.{' '}
        </Catchphrase>
        <AllProjects />
        <AllSchedule />
      </div>
    </CenterAlignedContainer>
    <Footer />
  </div>
);

const TransparentableHeader = () => {
  const [isTransparent, setTransparent] = useState(true);
  const handleScroll = useCallback(() => {
    const yOffset = window?.pageYOffset;
    if (yOffset === 0) {
      setTransparent(true);
    } else if (isTransparent) {
      setTransparent(false);
    }
  }, [isTransparent, setTransparent]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  return <Header isTransparent={isTransparent} />;
};

const AllProjects = () => {
  const [expanded, setExpanded] = useState(false);

  const onClickExpandButton = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const ArrowDownGreen = dynamic(
    () => import('../resources/images/arrow_down_green.svg')
  );

  return (
    <ProjectSection>
      <Title>
        모든 작업물<sup>{projectsData.length}</sup>
      </Title>
      <Boxes>
        <Projects expanded={expanded} />
      </Boxes>
      <div
        className="button button__green"
        role="button"
        onClick={onClickExpandButton}
        onKeyDown={() => {}}
        tabIndex={0}
      >
        {expanded ? '접기' : '더보기'}
        <div className={`button--img ${expanded ? 'button--img__usd' : ''}`}>
          <ArrowDownGreen />
        </div>
      </div>
    </ProjectSection>
  );
};

const AllSchedule = () => (
  <ScheduleSection>
    <Title>
      14주간 여정
      <span className="title--desc">
        Depromeet 11기는 매주 토요일 14주간 진행됩니다.
      </span>
    </Title>
    <Schedules>
      {steps.map((v, idx) => (
        <ScheduleBox detail={v} key={`steps-${idx}`} index={idx} />
      ))}
    </Schedules>
  </ScheduleSection>
);

const TopBackground = styled.div`
  z-index: -10;
  position: absolute;
  top: 0;
  left: 0;
  height: 43.4rem;
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    object-fit: cover;
    width: 100%;
  }

  ${media.mobile} {
    height: 30rem;
  }
`;

const CenterAlignedContainer = styled.div`
  /* position: relative; */
  background-color: transparent;
  width: 114rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 2.4rem;
  margin-top: 30rem;
  margin-bottom: 16rem;
  ${media.mobile} {
    width: 100%;
    margin-top: 24rem;
    box-sizing: border-box;
    margin-bottom: 7rem;
  }
`;

const Catchphrase = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 3.6rem;
  line-height: 5.6rem;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-bottom: 7.8rem;
  ${media.mobile} {
    font-weight: 300;
    font-size: 2.8rem;
    line-height: 4rem;
  }
  .catchphrase__bold {
    font-weight: bold;
    ${media.mobile} {
      font-weight: 800;
    }
  }
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 2.2rem;
  line-height: 2.6rem;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-bottom: 4rem;
  ${media.mobile} {
    font-size: 1.6rem;
  }
  sup {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.2rem;
    margin-left: 1rem;
    vertical-align: super;
    ${media.mobile} {
      font-size: 1rem;
    }
  }
  .title--desc {
    font-style: normal;
    font-weight: normal;
    font-size: 1.4rem;
    line-height: 2rem;
    text-transform: uppercase;
    color: #ffffff;
    margin-left: 2.4rem;
    vertical-align: center;
    ${media.mobile} {
      display: none;
    }
  }
`;

const Boxes = styled.div`
  margin-bottom: 5.6rem;
`;

const ProjectSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 11.8rem;
  .button {
    border-radius: 2.7rem;
    font-size: 1.4rem;
    line-height: 1.7rem;
    padding: 1.2rem 3rem;
    width: fit-content;
    position: relative;
    display: ${projectsData.length > 12 ? 'flex' : 'none'};
    align-self: center;
    :hover {
      background-color: rgba(56, 227, 168, 0.3);
    }
    &__green {
      border: ${({ theme }) => `0.1rem solid ${theme.color.green}`};
      color: ${({ theme }) => theme.color.green};
    }
    &--img {
      width: 1.4rem;
      height: 1.4rem;
      margin-left: 0.8rem;
      margin-top: 0.1rem;
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;

      &__usd {
        transform: rotate(180deg);
      }
    }
  }
`;

const ScheduleSection = styled.div``;

const Schedules = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.2rem 0;
`;

export default Project;
