import { motion } from 'framer-motion';

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const AnimatedText = ({ text }: { text: string[] }) => {
  const arrayText = Array.isArray(text) ? text : [text];

  return (
    <>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={defaultAnimations}
        transition={{ duration: 0.5 }}
      >
        {arrayText.map((line) => (
          <motion.h2 variants={defaultAnimations} key={line}>
            - {line}
            {text.length > 1 && <div className="h-2"> </div>}
          </motion.h2>
        ))}
      </motion.span>
    </>
  );
};

export default AnimatedText;
