import 'package:flutter/material.dart';
import 'package:flutter_login/flutter_login.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'login_controller.dart';

class LoginPage extends StatefulWidget {
  final String title;
  const LoginPage({Key key, this.title = "Login"}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends ModularState<LoginPage, LoginController> {
  //use 'controller' variable to access controller

  @override
  Widget build(BuildContext context) {
    return FlutterLogin(
      // title: 'AgendaPet',
      logo: 'assets/images/logo-agenda-pet.png',
      onLogin: controller.authUser,
      onSignup: controller.authUser,
      onSubmitAnimationCompleted: () {
        Modular.to.pushReplacementNamed('/Home');
      },
      onRecoverPassword: controller.recoverPassword,
      messages: LoginMessages(
        loginButton: "Entrar",
        usernameHint: "Email",
        passwordHint: "Senha",
        confirmPasswordError: "Confirmar Senha",
        forgotPasswordButton: "Esqueceu a senha?",
        signupButton: "Cadaste-se",
        recoverPasswordButton: "Recuperar Senha",
        goBackButton: "Voltar",
        confirmPasswordHint: "As senhas devem ser iguais" 
      ),
    );
  }
}
