import 'dart:io';

import 'package:app_petshop/app/modules/services/models/servico.model.dart';
import 'package:app_petshop/app/shared/constants.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:dio/native_imp.dart';

@Injectable()
class ServicesRepository extends Disposable {
  final DioForNative client;

  ServicesRepository(this.client);

  Future<ServicoModel>fetchServices() async {
    final response = await client.get(BASE_URL + 'servico');
    if (response.statusCode != HttpStatus.ok) {
      throw Exception();
    } else {
      return ServicoModel.fromJson(response.data);
    }

  }

  //dispose will be called automatically
  @override
  void dispose() {}
}
