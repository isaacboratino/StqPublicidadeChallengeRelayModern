import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import {ColorsConfig, GlobalVariablesConfig} from '../../configs';
import Title from '../../components/Title';
import Spinner from '../../components/Spinner';
import Header from '../../components/Header';
import Input from '../../components/Input';

import {
    commitMutation,
    graphql,
} from 'react-relay';
import RelayEnvironment from '../../relay/RelayEnvironment';

const mutation = graphql`
mutation LoginContainerMutation (
    $input: LoginEmailInput!
) {
    LoginEmail(input: $input) {
        token,
        error,
        clientMutationId
    }
  }   
`;

export default class LoginContainer extends Component {  
    static navigationOptions = {
      title: '',
      header: null
    }       

    constructor() {
      super();
      this.state = {
        userError: {code: '', message:''},
        keyError: {code: '', message:''},
        LoginEmail: {token:''}
      }
      this.tryLogin = this.tryLogin.bind(this);
      this.tryLoginSuccess = this.tryLoginSuccess.bind(this);
      this.tryLoginError = this.tryLoginError.bind(this);
      this.validateForm = this.validateForm.bind(this);
      this.showError = this.showError.bind(this);
    }
  
    tryLogin() {
        
      this.props.loading = true;      

      if (this.validateForm()) {                  

        const variables = {
            input: {
                clientMutationId: 'abc',
                email: this.userInput._lastNativeText,
                password: this.keyInput._lastNativeText
            },
          };

        commitMutation ( 
            RelayEnvironment , 
            { 
                mutation, 
                variables, 
                onCompleted : this.tryLoginSuccess , 
                onError : this.tryLoginError
            });   
       }    
    }
  
    tryLoginSuccess(response) {
      this.props.loading = false;
      if (response.LoginEmail.error) {
          switch (response.LoginEmail.error) {
            case 'INVALID_EMAIL_PASSWORD':
                this.showError('Email ou senha inválidos');
                break;
            default:
                this.showError('Não foi possivel se logar erro: '+response.LoginEmail.error);
          }
      } else {
         if (response.LoginEmail.token != null) {
            GlobalVariablesConfig.token = response.LoginEmail.token;
            this.props.navigation.navigate('RestrictedArea');
          } else {
            this.showError('Não foi retornado nenhum token de acesso');
          }
      }
    }
  
    tryLoginError() {
        this.showError('Não foi possivel efetuar login');
    }

    showError(error) {
        this.setState({error: error});
        this.refs.toast.show(this.state.error, 4000);
    }

    validateForm() {        
      this.setState({
          userError: {code: '', message:''}, 
          keyError: {code: '', message:''},
          error: ''
      });
  
      let formIsValid = true;
  
      if (this.userInput._lastNativeText === undefined || this.userInput._lastNativeText.trim().length < 1) {
        this.setState({userError: {code: '', message:'Usuario obrigatório'}});
        formIsValid = false;
      }
  
      if (this.keyInput._lastNativeText === undefined || this.keyInput._lastNativeText.trim().length < 1) {
        this.setState({keyError: {code: '', message:'Senha obrigatória'}});
        formIsValid = false;
      }

      return formIsValid;
  
    }
  
    renderButton() {
      if (this.props.loading) {
        return (<Spinner size='large'></Spinner>);
      }
  
      return (
        <Button title='Entrar' 
          backgroundColor={ColorsConfig.primaryColor}
          onPress={this.tryLogin}></Button>
      );
    }
  
    render() {
        return (        
  
          <View style={styles.viewStyle}>
            <Header>STQ Publicidade</Header>
            <ScrollView style={styles.containerStyle}>
  
              <Card>
                
                <Title>Login</Title>
  
                <Input 
                  inputRef={input => this.userInput = input}
                  label='Usuário'
                  icon={{reverse:true, name:'user', type:'font-awesome', color:'#517fa4'}}
                  error={this.state.userError}></Input>
                
                <Input 
                  inputRef={input => this.keyInput = input}
                  label='Senha'
                  secureTextEntry={true} 
                  icon={{reverse:true, name:'key', type:'font-awesome', color:'#517fa4'}}
                  error={this.state.keyError}></Input>
  
                {this.renderButton()}
  
              </Card>
  
          </ScrollView>

          <Toast ref="toast" style={styles.toastStyle.container} textStyle={styles.toastStyle.text} />

        </View>
      );
    }
  }

const styles = {
    viewStyle: {
      paddingTop: 0,
      marginTop:0
    },
    containerStyle: {
      paddingHorizontal: 0,
      paddingVertical: 0,
      paddingTop: 10,
    },
    cardStyle: {
      paddingVertical: 10
    },
    toastStyle: {
        container: {
            backgroundColor: '#B4354F',            
        }, 
        text: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#EEEEEE',
        }        
    }
  };
  
  LoginContainer.defaultProps = {
    user: null, 
    password: null,
    error: null,
    loading: false
  };
  
  LoginContainer.propTypes = {
    user: PropTypes.string, 
    password: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool
  };