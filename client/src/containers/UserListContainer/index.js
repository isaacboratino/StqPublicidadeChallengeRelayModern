import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';
import idx from 'idx';
import { QueryRenderer, graphql } from 'react-relay';
import RelayEnvironment from '../../relay/RelayEnvironment';
import UserFlatList from './UserFlatList';

const query = graphql`
  query UserListContainerQuery {
    users {
      edges {
        node {
          name
        }
      }
    }
  }
`;

export default class UserListContainer extends Component {
  static navigationOptions = {
    title: '',
    header: null
  }

  render() {
    return (
        <QueryRenderer 
          environment={RelayEnvironment} 
          query={query} 
          render={({ error, props }) => {
            if (error) {
              return <Text>{error.message}</Text>;
            } else if (props) {
              console.log('====================================');
              console.log('props', props);
              console.log('====================================');              
              return <UserFlatList users={idx(props, _ => _.users)} />;
            }
            return <Text>Loading...</Text>;
          }} 
        /> 
    );
  }
}