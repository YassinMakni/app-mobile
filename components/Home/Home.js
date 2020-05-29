import React, { Component } from 'react';
import { StyleSheet ,TouchableOpacity,Text} from 'react-native'
import { Container, Header, Content, Button, ListItem, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux'
const styles = StyleSheet.create({
  itemView: {
    marginTop: 40,
  },

})
export default class Home extends Component {


  render() {
    return (
      <Container>
        <Header />
        <Content >
          <ListItem icon style={styles.itemView}>
         
             <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon  name="ios-clock" />
              </Button>
            </Left>
            <Body>
            <TouchableOpacity onPress = {() => Actions.quickReviw()}> 
              <Text>Quick review</Text>
              </TouchableOpacity>
            </Body>
            <Right>
            <TouchableOpacity onPress = {() => Actions.quickReviw()}>
            <Icon  name="arrow-forward" />
              </TouchableOpacity>
            </Right>
   
      
          </ListItem>
          <ListItem icon style={styles.itemView}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon  name="add" />
              </Button>
            </Left>
            <Body>
            <TouchableOpacity onPress = {() => Actions.newWords()}>
              <Text>New words</Text>
              </TouchableOpacity>
            </Body>
            <Right>
            <TouchableOpacity onPress = {() => Actions.newWords()}>
              <Icon  name="arrow-forward" />
              </TouchableOpacity>
            </Right>
          </ListItem>
          <ListItem icon style={styles.itemView}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon  name="md-stats" />
              </Button>
            </Left>
            <Body>
            <TouchableOpacity onPress = {() => Actions.statistic()}>
              <Text>Statistic</Text>
              </TouchableOpacity>
            </Body>
            <Right>
            <TouchableOpacity onPress = {() => Actions.statistic()}>
              <Icon  name="arrow-forward" />
              </TouchableOpacity>
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
    
  }

}