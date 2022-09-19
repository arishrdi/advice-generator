import React, { useState, useEffect } from 'react';
import { Grid, GridItem, Text, Button, Box, useMediaQuery } from '@chakra-ui/react';

function App() {
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(false);
  const mobile = useMediaQuery('(min-width: 375px)')


  async function fetchAdviceHandler () {
    setLoading(true);
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();

    const newAdvice = () => {
      return {
        id: data.slip.id,
        advice: data.slip.advice
      };
    };
    setAdvice(newAdvice);
    setLoading(false);
    console.log(advice);
  }

  useEffect(() => {
    fetchAdviceHandler()
  }, [])

  return (
    <Grid minH="100vh" placeItems="center" textAlign="center" bg="hsl(218, 23%, 16%)">
      <GridItem maxW={mobile ? "360px" : "xl"} borderRadius="2xl" p={8} bg="hsl(217, 19%, 24%)" boxShadow='dark-md' pos='relative'>
        {loading ? <Text color="white">Loading ....</Text> : <AdviceGenerator advice={advice} onClick={fetchAdviceHandler}/>}        
      </GridItem>
    </Grid>
  );
}

export default App;

export const AdviceGenerator = ({advice, onClick}) => {
  const mobile = useMediaQuery('(min-width: 375px)')
  return (
    <>
      <Text fontSize='sm' letterSpacing= "3px" color="hsl(150, 100%, 66%)">ADVICE #{advice.id}</Text>
      <Text my={8} fontSize='2xl' color="hsl(193, 38%, 86%)">"{advice.advice}"</Text>
      {mobile ? <DividerMobile /> : <DividerDekstop />}
      <Box pos='absolute' left= "50%" transform= "translateX(-50%)" onClick={onClick}><Dice /></Box>
    </>
  )
}

export const DividerDekstop = () => {
  return (
    <Box align='center' mb={8}>
      <svg width="444" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z"/><g transform="translate(212)" fill="#CEE3E9"><rect width="6" height="16" rx="3"/><rect x="14" width="6" height="16" rx="3"/></g></g></svg>   
    </Box>
  )
}

export const DividerMobile = () => {
  return (
    <Box align='center' mb={8}>
      <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z"/><g transform="translate(138)" fill="#CEE3E9"><rect width="6" height="16" rx="3"/><rect x="14" width="6" height="16" rx="3"/></g></g></svg>
    </Box>
    
  )
}


export const Dice = () => {
  return (
    <Box as='button' _hover={{boxShadow: '0 0 25px hsl(150, 100%, 66%)'}} borderRadius='full' p={4} bg='hsl(150, 100%, 66%)'>
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#202733"/></svg>
    </Box>
  )
}
