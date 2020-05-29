import React, { Component } from 'react';
import { StyleSheet ,TouchableOpacity,Text} from 'react-native'
import { Container, Header, Content, Button, ListItem, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase';
import config from '../../config';
const styles = StyleSheet.create({
  itemView: {
    marginTop: 40,
  },

})
export default class Statistic extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            loading:false,
            data: [],
            loading:false,
            learned:null,
            inProgress:null,
            toLearn:null,
            verb:null,
            word:null
        };
    }
    componentWillMount(){ 
        if(!firebase.apps.length){
            firebase.initializeApp(config)
        }
       const ref = firebase.database().ref('vocab');
        ref.on('value', snapshot => {
            let data = [];
            Object.keys(snapshot.val()).map((key,index)=>{
                    data.push(snapshot.val()[key]) ; 
            })
            this.setState({data:data,loading:true})
            this.getStatistic(data) ; 
        })
    }
    getStatistic(data){
        this.setState({...this,learned:data.filter(item => item.note == 10).length})
        this.setState({...this,inProgress:data.filter(item => item.note < 10 && item.note >= 5 ).length})
        this.setState({...this,toLearn:data.filter(item => item.note < 5 ).length}); 
        this.setState({...this,verb:data.filter(item => item.type == "verb").length})
        this.setState({...this,word:data.filter(item => item.type == "word").length})
    }

  render() {
    if (!this.state.loading) {
      return <Text>loading..</Text>
    }
    return (
      <Container>
        <Header />
        <Content >
          <ListItem icon style={styles.itemView}>
         
             <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon  name="md-stats" />
              </Button>
            </Left>
            <Body>
              <Text>Total</Text>
            </Body>
            <Right>
                <Text>{this.state.data.length} - 100%</Text>
            </Right>
          </ListItem>

          <ListItem icon style={styles.itemView}>
         
         <Left>
          <Button style={{ backgroundColor: "#007AFF" }}>
            <Icon  name="md-stats" />
          </Button>
        </Left>
        <Body>
          <Text>Learned</Text>
        </Body>
        <Right>
            <Text>{this.state.learned} - {Math.trunc(this.state.learned*100/this.state.data.length)}%</Text>
        </Right>
      </ListItem>

      <ListItem icon style={styles.itemView}>
         
         <Left>
          <Button style={{ backgroundColor: "#007AFF" }}>
            <Icon  name="md-stats" />
          </Button>
        </Left>
        <Body>
          <Text>In Progress </Text>
        </Body>
        <Right>
            <Text>{this.state.inProgress} - {Math.trunc(this.state.inProgress*100/this.state.data.length)}%</Text>
        </Right>
      </ListItem>

      <ListItem icon style={styles.itemView}>
         
         <Left>
          <Button style={{ backgroundColor: "#007AFF" }}>
            <Icon  name="md-stats" />
          </Button>
        </Left>
        <Body>
          <Text>To learn</Text>
        </Body>
        <Right>
            <Text>{this.state.toLearn} - {Math.trunc(this.state.toLearn*100/this.state.data.length)}%</Text>
        </Right>
      </ListItem>

      <ListItem icon style={styles.itemView}>
         
         <Left>
          <Button style={{ backgroundColor: "#007AFF" }}>
            <Icon  name="md-stats" />
          </Button>
        </Left>
        <Body>
          <Text>Words</Text>
        </Body>
        <Right>
            <Text>{this.state.word} - {Math.trunc(this.state.word*100/this.state.data.length)}%</Text>
        </Right>
      </ListItem>

      <ListItem icon style={styles.itemView}>
         
         <Left>
          <Button style={{ backgroundColor: "#007AFF" }}>
            <Icon  name="md-stats" />
          </Button>
        </Left>
        <Body>
          <Text>Verbs</Text>
        </Body>
        <Right>
            <Text>{this.state.verb} - {Math.trunc(this.state.verb*100/this.state.data.length)}%</Text>
        </Right>
      </ListItem>
  
        </Content>
      </Container>
    );
    
  }

}