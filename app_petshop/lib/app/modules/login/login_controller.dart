import 'package:flutter_login/flutter_login.dart';
import 'package:mobx/mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';

part 'login_controller.g.dart';

@Injectable()
class LoginController = _LoginControllerBase with _$LoginController;

const users = const {
  'bardez@gmail.com': '12345',
  'pereira@gmail.com': '12345',
  'silva@gmail.com': '12345',
};


abstract class _LoginControllerBase with Store {
  Duration get loginTime => Duration(milliseconds: 2250);

  Future<String> authUser(LoginData data) {
    print('Email: ${data.name}, Senha: ${data.password}');
    return Future.delayed(loginTime).then((_) {
      if (!users.containsKey(data.name)) {
        return 'Email não existe';
      }
      if (users[data.name] != data.password) {
        return 'Senha incorreta';
      }
      return null;
    });
  }

  Future<String> recoverPassword(String name) {
    print('Email: $name');
    return Future.delayed(loginTime).then((_) {
      if (!users.containsKey(name)) {
        return 'Email não existe';
      }
      return null;
    });
  }
}
