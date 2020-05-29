import React, { Component } from 'react';
import { Container, Header, Content, Form, Text, Label } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import * as firebase from 'firebase';
import config from '../../config';
import { Button, Input } from 'react-native-elements';
import { View, ToastAndroid } from 'react-native';
export default class NewWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: null,
      name: null,
      explanation: null,
      type: null
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
  submitForm() {
    if (this.state.name != null && this.state.type != null && this.state.explanation != null && this.state.level != null) {
      this.saveWord();
    } else {
      this.showToast("All fields are required!");
    }
  }
  saveWord() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    }
    firebase.database().ref('vocab/').push({
      name: this.state.name,
      explanation: this.state.explanation,
      type: this.state.type,
      level: this.state.level,
      note: 0
    }).then((res) => {
      this.setState({
        level: null,
        name: null,
        explanation: null,
        type: null
      })
      this.showToast("Success!");
    }).catch(err => {
      this.showToast("Oops.. Error!");
    })
  }
  showToast(msg) {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
  render() {
    return (
      <Container>
        <Header />
        <Content style={{ margin: 25 }}>
          <Form>
            <View style={{ marginTop: 5, marginBottom: 5 }}>
              <Label>Word name</Label>
              <Input
                placeholder='Word name'
                value={this.state.name}
                onChangeText={(value) => { this.setState({ ...this, name: value }) }}
              />
            </View>
            <View style={{ marginTop: 5, marginBottom: 5 }}>
              <Label>Word explanation</Label>
              <Input
                placeholder='Word explanation'
                value = {this.state.explanation}
                onChangeText={(value) => { this.setState({ ...this, explanation: value }) }}
              />
            </View>
            <View style={{ marginTop: 15, marginBottom: 15 }}>
              <Label>Level</Label>
              <RNPickerSelect
                placeholder={{
                  label: 'Select a level...',
                  value: null,
                }}
                value={this.state.level}
                onValueChange={(value) => { this.setState({ ...this, level: value }) }}
                items={[
                  { label: 'A1', value: 'A1' },
                  { label: 'A2', value: 'A2' },
                  { label: 'B1', value: 'B1' },
                  { label: 'B2', value: 'B2' }
                ]}
              />
            </View>
            <View style={{ marginTop: 15, marginBottom: 15 }}>
              <Label>Type</Label>
              <RNPickerSelect
                placeholder={{
                  label: 'Select a type...',
                  value: null,
                }}
                value={this.state.type}
                onValueChange={(value) => { this.setState({ ...this, type: value }) }}
                items={[
                  { label: 'Word', value: 'word' },
                  { label: 'Verb', value: 'verb' },
                ]}
              />
            </View>
            <Button
              title="Save"
              onPress={() => { this.submitForm() }}
            />
          </Form>
        </Content>
      </Container>
    );
  }
}