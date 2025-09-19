import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const experienceCardRef = useRef(null);

  // Smooth scroll to experience card when activeIndex changes
  useEffect(() => {
    if (experienceCardRef.current) {
      // Small delay to allow the animation to start
      const timer = setTimeout(() => {
        experienceCardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  const experiences = [
    {
      company: "WE Accelerate",
      role: "AI/ML Research",
      period: "Jan 2024 - Apr 2024",
      description: "Researched and implemented a healthcare chatbot using Azure AI, integrating with a healthcare API to provide medical information and support.",
      technologies: ["Javascript", "Healthcare Chatbot API", "React", "Azure AI"]
    },
    {
      company: "Waterloo Electrical and Computer Eng Dept",
      role: "Information Tech Engineer",
      period: "Sep 2024 - Dec 2024",
      description: "Installed and configured desktops, servers, and networking equipment across research labs. Automated computer deployment using Microsoft Deployment Services, reducing setup time by 50%. Recommended hardware and software solutions for graduate researchers' computing needs.",
      technologies: ["Microsoft Deployment Services", "Networking", "Hardware Configuration", "System Administration"]
    },
    {
      company: "University of Waterloo Aerial Robotics",
      role: "Embedded Flight Systems",
      period: "Apr 2025 - Present",
      description: "Designed a motor tester system using STM32, SPI, and PWM to evaluate servo and continuous rotation motors. Configured SPI to interface with external ADCs reading analog potentiometer values. Controlled motor speed and direction by mapping ADC readings to PWM duty cycles.",
      technologies: ["STM32", "SPI", "PWM", "ADC", "Embedded Systems", "C/C++"]
    },
    {
      company: "Electrium Mobility Electric Skateboard",
      role: "CF - Firmware Member",
      period: "May 2025 - Sept 2025",
      description: "Built a custom touchscreen dashboard with ESP32 and FreeRTOS to display real-time motor and battery stats, log data locally, and integrate BLE sensor feedback for responsive wireless communication with the VESC.",
      technologies: ["FreeRTOS", "ESP32", "BLE","C/C++"]
    },  
    {
      company: "Vitruvius Innovation",
      role: "Embedded Systems Intern",
      period: "Sep 2025 - Dec 2025",
      description: "Designed and built custom low-noise PCBs with an ESP32-S3 and over seven environmental and biomedical sensors (IMU, SpO₂, CO₂, O₂, temperature, pressure) for a lightweight health-monitoring device. Developed FreeRTOS firmware using ESP-IDF to collect and stream multi-sensor data via BLE with sub-50 ms latency, implemented power-efficient dual-core task scheduling, and calibrated all sensors to within ±2 % of reference measurements.",
      technologies: ["ESP32-S3", "FreeRTOS", "ESP-IDF", "I2C", "UART", "BLE", "PCB design"]
    }
  ];

  return (
    <section id="work" className="min-h-screen py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#64ffda] text-4xl font-bold mb-12 text-center sm:text-3xl"
        >
          Work Experience
        </motion.h2>

        <TimelineContainer>
          <Timeline>
            {experiences.map((exp, index) => (
              <TimelineItem 
                key={index}
                $isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                <TimelineDot $isActive={index === activeIndex} />
                <TimelineContent>
                  <TimelineDate>{exp.period}</TimelineDate>
                  <TimelineTitle>{exp.company}</TimelineTitle>
                  <TimelineRole>{exp.role}</TimelineRole>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>

          <ExperienceCard
            ref={experienceCardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={activeIndex}
          >
            <CardContent>
              <CardHeader>
                <CompanyName>{experiences[activeIndex].company}</CompanyName>
                <RoleTitle>{experiences[activeIndex].role}</RoleTitle>
                <Period>{experiences[activeIndex].period}</Period>
              </CardHeader>
              
              <Description>{experiences[activeIndex].description}</Description>
              
              <TechStack>
                {experiences[activeIndex].technologies.map((tech, index) => (
                  <TechPill key={index}>{tech}</TechPill>
                ))}
              </TechStack>

              <CardGlow />
              <CardLines>
                <span /><span /><span /><span />
              </CardLines>
              <CornerElements>
                <span /><span /><span /><span />
              </CornerElements>
            </CardContent>
          </ExperienceCard>
        </TimelineContainer>
      </div>
    </section>
  );
};

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

const Timeline = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  position: relative;
  padding: 1rem 0;
  margin: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent,
      rgba(100, 255, 218, 0.3),
      rgba(100, 255, 218, 0.3),
      transparent
    );
    transform: translateY(-50%);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem 0;
    
    &::before {
      display: none;
    }
  }

  @media (max-width: 640px) {
    gap: 1rem;
    padding: 1rem 0;
  }
`;

const TimelineItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;
  position: relative;
  padding-top: 1rem;
  min-width: 200px;

  &:hover {
    transform: translateY(-5px);
  }

  ${props => props.$isActive && `
    transform: translateY(-5px);
  `}

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
    max-width: 300px;
    padding: 1rem;
    background: rgba(100, 255, 218, 0.05);
    border-radius: 10px;
    border: 1px solid rgba(100, 255, 218, 0.1);
    
    &:hover {
      background: rgba(100, 255, 218, 0.1);
      transform: translateY(-2px);
    }

    ${props => props.$isActive && `
      background: rgba(100, 255, 218, 0.1);
      border-color: rgba(100, 255, 218, 0.3);
      transform: translateY(-2px);
    `}
  }
`;

const TimelineDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.$isActive ? '#64ffda' : 'rgba(100, 255, 218, 0.3)'};
  border: 2px solid ${props => props.$isActive ? '#64ffda' : 'rgba(100, 255, 218, 0.5)'};
  box-shadow: 0 0 10px ${props => props.$isActive ? 'rgba(100, 255, 218, 0.5)' : 'transparent'};
  transition: all 0.3s ease;
  position: absolute;
  top: 0;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin-bottom: 0.5rem;
  }
`;

const TimelineContent = styled.div`
  text-align: center;
`;

const TimelineDate = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
`;

const TimelineTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-top: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.3;
  }

  @media (max-width: 640px) {
    font-size: 0.85rem;
  }
`;

const TimelineRole = styled.div`
  font-size: 0.875rem;
  color: #64ffda;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.3;
  }

  @media (max-width: 640px) {
    font-size: 0.75rem;
  }
`;

const ExperienceCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== 'ref',
})`
  background: linear-gradient(45deg, #1a1a1a, #262626);
  border-radius: 15px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
  box-shadow: 
    0 0 20px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(0, 0, 0, 0.2);
`;

const CardContent = styled.div`
  padding: 2rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const CompanyName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #64ffda;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 640px) {
    font-size: 1.1rem;
  }
`;

const RoleTitle = styled.h4`
  font-size: 1.25rem;
  color: white;
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const Period = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);

  @media (max-width: 640px) {
    font-size: 0.8rem;
  }
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  @media (max-width: 640px) {
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 640px) {
    gap: 0.375rem;
  }
`;

const TechPill = styled.span`
  background: rgba(100, 255, 218, 0.1);
  color: #64ffda;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  border: 1px solid rgba(100, 255, 218, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(100, 255, 218, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
  }

  @media (max-width: 640px) {
    font-size: 0.75rem;
    padding: 0.15rem 0.5rem;
  }
`;

const CardGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(100, 255, 218, 0.1) 0%,
    rgba(0, 162, 255, 0.05) 50%,
    transparent 100%
  );
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  ${ExperienceCard}:hover & {
    opacity: 1;
  }
`;

const CardLines = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  span {
    position: absolute;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(100, 255, 218, 0.2),
      transparent
    );
  }

  span:nth-child(1) {
    top: 20%;
    left: 0;
    width: 100%;
    height: 1px;
    transform: scaleX(0);
    transform-origin: left;
    animation: lineGrow 3s linear infinite;
  }

  span:nth-child(2) {
    top: 40%;
    right: 0;
    width: 100%;
    height: 1px;
    transform: scaleX(0);
    transform-origin: right;
    animation: lineGrow 3s linear infinite 1s;
  }

  span:nth-child(3) {
    top: 60%;
    left: 0;
    width: 100%;
    height: 1px;
    transform: scaleX(0);
    transform-origin: left;
    animation: lineGrow 3s linear infinite 2s;
  }

  span:nth-child(4) {
    top: 80%;
    right: 0;
    width: 100%;
    height: 1px;
    transform: scaleX(0);
    transform-origin: right;
    animation: lineGrow 3s linear infinite 1.5s;
  }
`;

const CornerElements = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  span {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid rgba(100, 255, 218, 0.3);
    transition: all 0.3s ease;
  }

  span:nth-child(1) {
    top: 8px;
    left: 8px;
    border-right: 0;
    border-bottom: 0;
  }

  span:nth-child(2) {
    top: 8px;
    right: 8px;
    border-left: 0;
    border-bottom: 0;
  }

  span:nth-child(3) {
    bottom: 8px;
    left: 8px;
    border-right: 0;
    border-top: 0;
  }

  span:nth-child(4) {
    bottom: 8px;
    right: 8px;
    border-left: 0;
    border-top: 0;
  }

  ${ExperienceCard}:hover & span {
    border-color: rgba(100, 255, 218, 0.8);
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
  }
`;

export default Experience;