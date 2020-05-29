import React, { Component } from 'react';
import { Container, Header, Content, Form, Label } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import { Actions } from 'react-native-router-flux'
import { Button } from 'react-native-elements';
import { View } from 'react-native';
export default class QuickReview extends Component {
    constructor(props) {
    super(props);
    this.state = {
      level: "all",
      difficulty:"all",
      type:"all",
    };
  }
  onValueChangeLevel(value) {
    this.setState({
      level: value
    });
  }
  onValueChangeDifficulty(value) {
    this.setState({
      difficulty: value
    });
  }
  onValueChangeType(value) {
    this.setState({
      type: value
    });
  }

  render() {
  return (
      <Container>
        <Header />
        <Content style={{margin:25}}>
          <Form>
          <View style={{marginTop:25,marginBottom:25}}>
              <Label>Level</Label>
              <RNPickerSelect
                  placeholder={{
                    label: 'Select a level...',
                }}
                onValueChange={(value) => this.onValueChangeLevel(value)}
                items={[
                    { label: 'All levels', value: 'all' },
                    { label: 'A1', value: 'A1' },
                    { label: 'A2', value: 'A2' },
                    { label: 'B1', value: 'B1' },
                    { label: 'B2', value: 'B2' }
                ]}
            />
            </View>
             <View style={{marginTop:25,marginBottom:25}}>
            <Label>Difficulty</Label>
            <RNPickerSelect
                placeholder={{
                  label: 'Select a difficulty...',
          
              }}
                onValueChange={(value) => this.onValueChangeDifficulty(value)}
                items={[
                    { label: 'All difficulties', value: 'all' },
                    { label: 'New words', value: 'newWords' },
                    { label: 'Review', value: 'review' },
                ]}
            />
            </View>
            <View style={{marginTop:25,marginBottom:25}}>
            <Label>Type</Label>
            <RNPickerSelect
             placeholder={{
              label: 'Select a type...',
        
            }}
                onValueChange={(value) => this.onValueChangeType(value)}
                items={[
                    { label: 'All', value: 'all' },
                    { label: 'words', value: 'word' },
                    { label: 'Verbs', value: 'verb' },
                ]}
            />
            </View>
            <Button
              onPress = {() => Actions.review({typeWord:this.state.type,level:this.state.level,difficulty:this.state.difficulty})}
              title="Start review"
            />
          </Form>
        </Content>
      </Container>
    );
  }
}