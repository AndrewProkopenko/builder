import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';

import {  Box, Container  } from "@material-ui/core"; 

function SkeletonPage() {
    return (
        <Box mt={5} mb={3} clone={true} >
            <Container>
              <Box >
                <Skeleton 
                  variant='rect'
                  height={60}
                  animation={false}
                />
              </Box>
              <Box display='flex' alignItems='center'>
                <Box mr={1}>
                  <Skeleton
                    width={30}
                    height={30}
                    variant='circle' 
                    animation='wave'
                  />
                </Box>
                <Skeleton 
                  variant='text'  
                  height={50}
                  width='100%'
                  animation='wave'
                />
              </Box>
              <Box mb={2}>
                <Skeleton 
                  variant='rect'
                  height={150}
                  animation={false}
                />
              </Box>
              <Skeleton 
                variant='rect'
                height={80}
                animation={false}
              />
            </Container>
        </Box>
    )
}

export default SkeletonPage
