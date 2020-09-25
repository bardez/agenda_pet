import 'package:mobx/mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';

part 'configurations_controller.g.dart';

@Injectable()
class ConfigurationsController = _ConfigurationsControllerBase
    with _$ConfigurationsController;

abstract class _ConfigurationsControllerBase with Store {
  @observable
  int value = 0;

  @action
  void increment() {
    value++;
  }
}
