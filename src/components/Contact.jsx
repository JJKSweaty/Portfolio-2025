import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import styled from 'styled-components';
import { contacts } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 1.5rem;
    flex-direction: column;
    align-items: center;
  }
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #64ffda;
  text-decoration: none;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  padding: 1rem 2rem;
  border: 2px solid rgba(100, 255, 218, 0.2);
  border-radius: 12px;
  background: rgba(17, 25, 40, 0.75);
  min-width: 200px;
  justify-content: center;

  &:hover {
    transform: translateY(-5px);
    border-color: #64ffda;
    box-shadow: 0 0 20px rgba(100, 255, 218, 0.2);
  }

  svg {
    font-size: 1.5rem;
  }

  @media (max-width: 640px) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    width: 100%;
    max-width: 280px;
  }
`;

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        variants={slideIn('up', 'tween', 0.2, 1)}
        className="text-center"
      >
        <p className={`${styles.sectionSubText} text-base sm:text-lg`}>Let's Connect</p>
        <h3 className={`${styles.sectionHeadText} text-2xl sm:text-3xl md:text-4xl`}>Find Me On</h3>

        <ContactLinks>
          {contacts.map((contact, index) => (
            <ContactLink 
              key={index} 
              href={contact.info} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={contact.icon} />
              <span>{contact.name}</span>
            </ContactLink>
          ))}
        </ContactLinks>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');