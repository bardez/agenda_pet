import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';

part 'new_service_controller.g.dart';

@Injectable()
class NewServiceController = _NewServiceControllerBase
    with _$NewServiceController;

abstract class _NewServiceControllerBase with Store {
  @observable
  int value = 0;

  @action
  void increment() {
    value++;
  }
 /****** REMOVER ACIMA */

 @observable
 List<DropdownMenuItem> serviceTypeList = new List<DropdownMenuItem>();

 @action
 void createServiceTypeList(List<DropdownMenuItem> list) => serviceTypeList = list;
}
