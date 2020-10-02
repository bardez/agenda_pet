import 'package:app_petshop/app/modules/schedule/model/schedule_model.dart';
import 'package:app_petshop/app/modules/schedule/schedule_repository.dart';
import 'package:mobx/mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';

part 'schedule_controller.g.dart';

@Injectable()
class ScheduleController = _ScheduleControllerBase with _$ScheduleController;

abstract class _ScheduleControllerBase with Store {

  final api = Modular.get<ScheduleRepository>();

  _ScheduleControllerBase(){
    fetchSchedules();
  }

  Map<DateTime, List> events = new Map<DateTime, List>();
  List selectedEvents;

  @observable
  bool canShowFab = true;

  @action
  void setFab( bool value ) => canShowFab = value;

  ScheduleModel schedules;

  @action
  Future fetchSchedules() async {
    schedules = await api.fetchSchedules();
    if(schedules.data.count > 0) {
      schedules.data.rows.forEach((element) {
        List<String> _data = element.ageData.split('-');
        List<String> _hora = element.ageHora.split(':');
        DateTime _key = DateTime(
          int.parse(_data.elementAt(0)),
          int.parse(_data.elementAt(1)),
          int.parse(_data.elementAt(2)),
          int.parse(_hora.elementAt(0)),
          int.parse(_hora.elementAt(1)),
          int.parse(_hora.elementAt(2)),
        );
        events[_key] != null ? events[_key].add(element.pet.petNome + ' - ' + element.ageHora) : events[_key] = [element.pet.petNome + ' - ' + element.ageHora];
      });
      print(events);
    }
  }
}
