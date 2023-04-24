import React from 'react';
import {Box, View, Text, Accordion, ScrollView} from 'native-base';

import Header from '~/components/Header';
import {styles} from './styles';

function About({navigation}) {
  return (
    <Box style={styles.container}>
      <Header title="About Us" />
      <ScrollView>
        <View style={styles.content}>
          <Accordion index={[0]}>
            <Accordion.Item>
              <Accordion.Summary style={styles.item}>
                <Text style={styles.title}>About Us</Text>
                <Accordion.Icon color="white" />
              </Accordion.Summary>
              <Accordion.Details>
                <Text style={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>
              </Accordion.Details>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Summary style={styles.item}>
                <Text style={styles.title}>Como funciona ?</Text>
                <Accordion.Icon color="white" />
              </Accordion.Summary>
              <Accordion.Details>
                <Text style={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>
              </Accordion.Details>
            </Accordion.Item>
          </Accordion>
        </View>
      </ScrollView>
    </Box>
  );
}

export default About;
