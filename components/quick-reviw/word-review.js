import { Component } from 'react';
import React from 'react';
import { Button,ToastAndroid,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Badge, View ,Icon} from "native-base";
import * as firebase from 'firebase' ; 
import config from '../../config' ; 
import { Actions } from 'react-native-router-flux'
export default class WordReview extends Component {
    constructor(props) {
    super(props);
    this.state = {
      answer: false,
    };
  }
  onPressAnswerResult(result){
      if (result) {
          if (this.props.data.note < 10) {
              this.updateWordNote(this.props.data.note + 1) ; 
              this.showToast("Good Job!") ;
          }
          
      }else{
          if (this.props.data.note >1) {
             this.updateWordNote(this.props.data.note - 1) ; 
             this.showToast("Oops..") ;   
          }
      }
      this.setState({answer:false})
  }
   showToast(msg){
    ToastAndroid.showWithGravityAndOffset(
        msg,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
  updateWordNote(notee){
    if(!firebase.apps.length){
        firebase.initializeApp(config)
    }
    firebase.database().ref('vocab/'+this.props.id).update({
        name: this.props.data.name,
        explanation: this.props.data.explanation,
        type: this.props.data.type,
        level: this.props.data.level,
        note: notee
        }).then((res)=> {
            this.props.data.note = notee; 
        })
  }
  delete(){
    if(!firebase.apps.length){
        firebase.initializeApp(config)
    }
    firebase.database().ref('vocab/'+this.props.id).remove().then((res) => {
        this.showToast("Deleted!");
      }).catch(err => {
        this.showToast("Oops.. Error!");
      })
  }
  render() {
    const buttonAnswer =  <View style={{ marginTop: 30 }}>
    <Button
        onPress = {() => {this.setState({...this,answer:true})}}
        title="Answer"
        color="#3f51b5"
    />
</View>
    const success =   <Badge success  style={{ marginLeft: 25 }}>
    <Text>{this.props.data.note * 10} %</Text>
    </Badge>
    const warning =   <Badge warning  style={{ marginLeft: 25 }}>
    <Text>{this.props.data.note * 10} %</Text>
    </Badge>
    const danger =   <Badge danger style={{ marginLeft: 25 }}>
    <Text>{this.props.data.note * 10} %</Text>
    </Badge>
    const answer = <View>
    <Card>
        <CardItem header bordered>

            <Badge primary >
                <Text>Answer</Text>
            </Badge>
        </CardItem>
        <CardItem bordered>
            <Body>
                <Text style={{ fontSize: 30, textAlign: "center" }}>
                    {this.props.data.explanation}
                </Text>
            </Body>
        </CardItem>
        <CardItem footer bordered>
            <View style={{ marginLeft: 60 }}>
                <Button
                    onPress= {() => {this.onPressAnswerResult(false)}}
                    title="Incorrect"
                    color="#d9534f"
                />
            </View>
            <View style={{ marginLeft: 15 }}>
                <Button
                    onPress= {() => {this.onPressAnswerResult(true)}}
                    title="Correct"
                    color="#5cb85c"
                    containerStyle={{ backgroundColor: "red" }}
                />
            </View>

        </CardItem>
    </Card>
</View>
    return (
        <Container>
            <Header />
            <Content padder>
                <Card>
                    <CardItem header bordered>

                        <Badge primary >
                            <Text>{this.props.data.level}</Text>
                        </Badge>
                        <Badge primary style={{ marginLeft: 25 }}>
                            <Text>{this.props.data.type}</Text>
                        </Badge>
                      {this.props.data.note == 10 ? success : null }
                      { 10 > this.props.data.note &&  this.props.data.note > 4 ? warning : null }
                      { this.props.data.note <= 4 ? danger : null }
                      <TouchableOpacity onPress = {() => Actions.edit({id:this.props.id,data:this.props.data})}> 
                      <Icon style={{color:'rgb(63, 81, 181)', marginLeft: 25}} name="ios-settings" />
                     </TouchableOpacity>
                     <TouchableOpacity onPress = {() => this.delete()}> 
                      <Icon style={{color:'rgb(63, 81, 181)', marginLeft: 25}} name="md-trash" />
                     </TouchableOpacity>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                            <Text style={{ fontSize: 30, textAlign: "center" }}>
                                {this.props.data.name}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
               
                
                {this.state.answer ? answer : buttonAnswer}
            </Content>
        </Container>
    );
  }
}