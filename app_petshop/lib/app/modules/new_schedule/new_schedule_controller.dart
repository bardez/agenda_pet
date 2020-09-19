import 'package:mobx/mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';

part 'new_schedule_controller.g.dart';

@Injectable()
class NewScheduleController = _NewScheduleControllerBase
    with _$NewScheduleController;

abstract class _NewScheduleControllerBase with Store {
  @observable
  int value = 0;

  @action
  void increment() {
    value++;
  }
}
