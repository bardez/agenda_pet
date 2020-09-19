import 'package:flutter/material.dart';
import 'package:app_petshop/app/app_module.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:intl/date_symbol_data_local.dart';

void main() => initializeDateFormatting().then((_) => runApp(ModularApp(module: AppModule())));
