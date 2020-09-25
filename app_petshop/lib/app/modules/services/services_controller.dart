import 'package:mobx/mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';

part 'services_controller.g.dart';

@Injectable()
class ServicesController = _ServicesControllerBase with _$ServicesController;

abstract class _ServicesControllerBase with Store {
  @observable
  int value = 0;

  @action
  void increment() {
    value++;
  }
}
