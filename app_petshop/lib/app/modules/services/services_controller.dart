import 'package:app_petshop/app/modules/services/models/servico.model.dart';
import 'package:app_petshop/app/modules/services/services_repository.dart';
import 'package:mobx/mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';

part 'services_controller.g.dart';

@Injectable()
class ServicesController = _ServicesControllerBase with _$ServicesController;

abstract class _ServicesControllerBase with Store {
  final api = Modular.get<ServicesRepository>();

  @observable
  ServicoModel services;

  _ServicesControllerBase(){
    fetchServices();
  }

  @action
  fetchServices() async => services = await api.fetchServices();

}
