import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { List, ListItem } from "react-native-elements";
import Header from '../../components/Header';

import * as Animatable from 'react-native-animatable';
//ListItemAnimated = Animatable.createAnimatableComponent(Header);

export default class UserFlatList extends Component {    
    renderSeparator() {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
    };

    render() {
        return (
            <View>
                <Header>Lista de Usuários</Header>                
                    <List containerStyle={{marginTop:0, borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: '#EFEFEF' }}>

                        <FlatList
                            data={this.props.users.edges}
                            renderItem={({ item, index }) => (
                                <Animatable.View animation="bounceInRight" delay={100*index} >
                                    <ListItem
                                        style={{marginBottom:2, paddingTop:10, paddingBottom:10, backgroundColor:'#517fa4'}}
                                        titleStyle={{ color:'#FFFFFF', fontSize:16}}
                                        key={item.node.id}
                                        title={item.node.name}
                                        subtitle={item.node.id}                            
                                        containerStyle={{ borderBottomWidth: 0 }}
                                        leftIcon={{name: 'av-timer'}}
                                    />
                                </Animatable.View>
                            )}
                            keyExtractor={item => item.node.id}
                        />

                    </List>                
            </View>
        );
    }
}