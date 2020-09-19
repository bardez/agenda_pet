import 'package:mobx/mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';

part 'schedule_controller.g.dart';

@Injectable()
class ScheduleController = _ScheduleControllerBase with _$ScheduleController;

abstract class _ScheduleControllerBase with Store {
  @observable
  bool canShowFab = true;

  @action
  void setFab( bool value ) => canShowFab = value;
}
