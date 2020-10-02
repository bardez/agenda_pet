import 'dart:io';

import 'package:app_petshop/app/modules/schedule/model/schedule_model.dart';
import 'package:app_petshop/app/shared/constants.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:dio/native_imp.dart';

@Injectable()
class ScheduleRepository extends Disposable {
  final DioForNative client;

  ScheduleRepository(this.client);

  Future<ScheduleModel>fetchSchedules() async {
    final response = await client.get(BASE_URL + 'agendamento');
    if (response.statusCode != HttpStatus.ok) {
      throw Exception();
    } else {
      return ScheduleModel.fromJson(response.data);
    }
  }

  // Future<ServicoModel>postServices( ) async {
  //   final response = await client.get(BASE_URL + 'servico');
  //   if (response.statusCode != HttpStatus.ok) {
  //     throw Exception();
  //   } else {
  //     return ServicoModel.fromJson(response.data);
  //   }

  // }

  //dispose will be called automatically
  @override
  void dispose() {}
}
