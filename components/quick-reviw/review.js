import { Component } from 'react';
import React from 'react';
import { Dimensions ,Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import WordReview from './word-review';
import { View } from "native-base";
import * as firebase from 'firebase' ; 
import config from '../../config' ; 
export default class Review extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            data: [],
            loading:false
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
                if (this.getLevel(snapshot.val()[key].level) && this.getType(snapshot.val()[key].type) && this.getDifficulty(snapshot.val()[key].note)) {
                    data.push({id:key,data:snapshot.val()[key]}) ; 
                }
            })
            this.setState({data:data,loading:true})
        })
    }
    getLevel(level){        
        if (this.props.level == "all") {
            return true ; 
        }
        if (this.props.level == level ) {
            return true ; 
        }
        return false ; 
    }
    getType(type){
        if (this.props.typeWord == "all") {
            return true; 
        }
        if (this.props.typeWord == type) {
            return true ; 
        }
        return false; 
    }
    getDifficulty(difficulty){
        if (this.props.difficulty == "all") {
                return true ;
        }
        if (this.props.difficulty == "newWords") {
            if (difficulty <= 4) {
                return true;
            }
        }else {
            if (difficulty < 10 && difficulty > 4) {
                return true; 
            }
        }
        return false; 
    }
    render() {
        let screenWidth = Dimensions.get('window').width;
        if (!this.state.loading) {
            return <Text>loading..</Text>
        }
        else{
            if(this.state.data.length == 0){
                return <Text>No data found !</Text>
            }
            return (
                <ScrollView horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={true}
                >
                    {this.state.data.map(item => <View key={item.id} style={{
                        flex:1,
                        width:screenWidth,
                   
                    }}><WordReview id={item.id} data={item.data}></WordReview></View>)}
                </ScrollView>
            );
        }
    }
}
